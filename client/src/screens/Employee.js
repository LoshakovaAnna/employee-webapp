import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getTimeWork, getEmployeeInfo, clearWorkingData } from '../redux/actions';
import TableTimeRecords from '../components/TableTimeRecords';

class Employee extends Component {
    
  state = {
    date      : null,
    currentId : null,
    currentEmployee: null
  }
  
  datePickerRef = React.createRef();

  componentDidMount(){    
    var  today = moment( new Date() );
    this.datePickerRef.current.valueAsDate = new Date();  
    var idEmployee =  this.props.match.params.id;
    var curEmployee = this.props.getEmployeeInfo(idEmployee);
    
    this.setState ( { 
                      currentId       : idEmployee, 
                      currentEmployee : curEmployee,
                      date            : today.format('YYYYMMDD')
                    }
                  );   
  }
  
  componentWillUnmount(){
    this.props.clearWorkingData();
  }

  handleChangeDate = (e) => {
    var  date = moment(e.target.value);
    this.setState( { date: date.format('YYYYMMDD') } );
  }

  handleCalculateTime = (e) => {
    const { date, currentId : idEmployee} = this.state;
    this.props.getTimeWork( { date, idEmployee} );
  }

  render(){
    const { EmployeeID, FIO } = this.props.currentEmployee;
    const { currentDayListTime } = this.props;

    return(
        <>
          <h2 className = "text-center  text-primary  pb-2">Отчет о рабочем времени</h2>
          <h3 className = "text-muted pb-3">{EmployeeID}. {FIO} </h3>

          <div className = "d-flex flex-column  flex-sm-row justify-content-between p-2"> 
            <input  type = "date" 
                    ref = { this.datePickerRef }
                    onChange = {this.handleChangeDate}
                    className="form-control col-md-8"
            />                
            <button className="btn btn-success col-md-3" 
                    onClick={this.handleCalculateTime}>
                    Вывести данные
            </button>
          </div>
         
          <h4 className="mt-4 mb-4">Общее рабочее время: 
            <span className="text-danger">{this.props.workingTime}</span>
          </h4>
                
          {
            ( !currentDayListTime ) && ( <p> Записей нет </p>    )
          }
          {
            ( currentDayListTime ) && (currentDayListTime.length === 0) && 
            ( <p> Записей нет </p>    )
          }

          { 
            ( currentDayListTime ) &&
            ( currentDayListTime.length > 0 ) && 
            ( <TableTimeRecords listTime={currentDayListTime} /> )
          }
        </>
      )
    }
}

const mapStateToProps = state => {
    return {
      currentEmployee     : state.currentEmployee,
      currentDayListTime  : state.currentDayListTime,
      workingTime         : state.workingTime
    }
  }
  export default connect(mapStateToProps, { getTimeWork, getEmployeeInfo, clearWorkingData  })(Employee);
  