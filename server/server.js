const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
var moment = require('moment-timezone');

var dbConfig = {
    server: "localhost",    
    user: "UserTest",
    password: "1122334455",
    dialect: 'mssql',
    database: "SPGAcademy",
    port: 53604,
    connectionTimeout : 35000,
    dialectOptions: {
        instanceName: 'SQLEXPRESS' 
    }
};

var app = express();
const db_pool = new sql.ConnectionPool(dbConfig);
var conn = db_pool;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static('public') );
app.use( cors() );

app.get('/api/employees', function(req, res){
  console.log("get all employees");
  const sqlUSer = `SELECT ev.EmployeeID, ev.EventDescriptionID, ev.EventDate, ev.EventDescription, em.FIO 
                    FROM Event AS ev 
                    JOIN Employee AS em ON  ev.EmployeeID = em.EmployeeID
                    WHERE EventDate  = (SELECT MAX(EventDate) FROM Event GROUP BY  EmployeeID 
                                        HAVING EmployeeID = ev.EmployeeID) 
                    ORDER BY EmployeeID`;

  conn.connect()
    .then(  () => {
        var request = new sql.Request(conn);
        request.query(sqlUSer)
                .then(response => {
                    conn.close();

                    let employeesWithFormatDate = response.recordset.map( ( el ) =>{
                        date =   moment(el.EventDate).clone().tz("Europe/London");
                        el.EventDate = date.format('YYYY-MM-DD  HH:mm:ss') ;
                        return el;
                    })
                    
                    res.status(200).send(employeesWithFormatDate);
                })
                .catch( err => {
                    console.log(err);
                    conn.close();
                    res.status(500).send(err);
                });
    })
    .catch( err => {
        console.log(err);        
        res.status(500).send(err);
    });    
});

app.post('/api/employee/info', function(req, res){
    const {  idEmployee } = req.body;
    console.log("GET info about employee , id =", idEmployee);

    const sqlEmlInfo = `SELECT * FROM Employee WHERE EmployeeID=${idEmployee}`;
  
    conn.connect()
        .then( () => {
            var req = new sql.Request(conn);
            req.query(sqlEmlInfo)
                .then( response => {
                    conn.close();
                    res.status(200).send(response.recordset[0]);
                })
                .catch( err => {
                    conn.close();
                    res.status(500).send(err);
                });
        })
        .catch(function (err) {
          console.log(err);          
          res.status(500).send(err);
      });
  });
  

app.post('/api/date', function(req, res){
    console.log("get working time ");
    
    const { date, idEmployee  } = req.body;
    console.log(date, idEmployee);
 
    const sqlEmplDate =  `SELECT  ev.EventID, ev.EventDate, ev.EventDescriptionID, ev.EventDescription, ev.EmployeeID 
                        FROM Event as ev 
                        JOIN Employee as em ON  ev.EmployeeID = em.EmployeeID
                        WHERE  ( ev.EmployeeID = ${idEmployee} )
                        AND
                        (ev.EventDate BETWEEN '${date}  00:00:00' AND  '${date}  23:59:59')
                        ORDER BY ev.EventDate`;    
    
    conn.connect()
        .then( () => {
            var request = new sql.Request(conn);
            request.query(sqlEmplDate)
                    .then( response => {                        
                        conn.close();
                        return(response);
                    })
                    .then( date => {                        
                        var workingTimeList = date.recordset.map( (el) =>{
                            let dateTimeEvent = el.EventDate;
                            let idEvent = el.EventDescriptionID
                            return { dateTimeEvent, idEvent};                            
                        });
                        
                        let workingHours = (workingTimeList.length != 0) ? calculateTime(workingTimeList) : 0;  
                       
                        workingTimeList =  date.recordset.map( (el ) =>{
                            let date =   moment(el.EventDate).clone().tz("Europe/London");
                            let dateTimeEvent = date.format('HH:mm') ;                             
                            let status = (el.EventDescriptionID === 45) ? "Пришел" : "Ушел";
                            let EventDescription = el.EventDescription;
                            return {dateTimeEvent,  status, EventDescription};
                          })

                        res.status(200).send( { workingTimeList, workingHours } );
                
                    })
                    .catch( err => {
                        console.log(err);
                        conn.close();
                        return(err);
                    });
                })
                .catch( err => {
                    console.log(err);
                    return(err);
                });               
});

function calculateTime(arr) {
    if (arr.length ===0) return 0;

    //45 in,  46 out
    var prevEvent = { 
                        status      : 46, 
                        countMs     : 0, 
                        timeEvent   : null
                    }
                    
    if ( arr[0].idEvent == 46 ){
        var startDay = moment(arr[0].dateTimeEvent).startOf('day');
        prevEvent.status = 45;
        prevEvent.timeEvent = startDay;
    } 

    for ( let i = 0; i < arr.length; i++ ) {        
        if ( (arr[i].idEvent == 45) && (arr[i].idEvent != prevEvent.status) ){
            prevEvent.status = 45;
            prevEvent.timeEvent = arr[i].dateTimeEvent;
        }
        else 
        if ( (arr[i].idEvent == 46) && (arr[i].idEvent != prevEvent.status) ){
            let differenceTime  =  arr[i].dateTimeEvent - prevEvent.timeEvent;
            prevEvent.countMs += differenceTime;
            prevEvent.status = 46;
            prevEvent.timeEvent = arr[i].dateTimeEvent;
        }
    }

    const lastInd = arr.length - 1;
    if ( arr[lastInd].idEvent == 45){
        var endDay = moment(arr[lastInd].dateTimeEvent).endOf('day');
        prevEvent.countMs += (endDay - arr[lastInd].dateTimeEvent);
    } 
    
    return msToTime(prevEvent.countMs);
}

function msToTime(duration) {
    milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds ;
}

app.listen(3010);
console.log("сервер запущен!");
