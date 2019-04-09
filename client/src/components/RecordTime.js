import React from 'react';

export default function RecordTime(props) {

    const  { record } = props;
  
    return(      
        <tr >
            <td>{record.dateTimeEvent}</td>
            <td>{record.status}</td>
            <td>{record.EventDescription}</td>                      
        </tr>
    )
}