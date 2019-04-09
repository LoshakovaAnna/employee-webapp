import React from 'react';

import RecordTime from './RecordTime';

export default function TableTimeRecords(props) {

    const  { listTime } = props;
    
    return(      
        <table className="table table-hover table-sm">
            <thead>
            <tr>
                <th scope="col">Время</th>
                <th scope="col">Статус</th>
                <th scope="col">Описание</th>                      
            </tr>
            </thead>
            <tbody>
                { 
                    listTime.map( (el, i) => {
                        return <RecordTime key={i} record={el}/> 
                    })
                }
            </tbody>
        </table>
    )
}