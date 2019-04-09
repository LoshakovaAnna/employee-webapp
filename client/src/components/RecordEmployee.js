import React from 'react';
import { Link } from 'react-router-dom';

export default function RecordEmployee(props) {

    const  { employee } = props;

    return (
        <tr>
            <th scope="row"> {employee.EmployeeID} </th>
            <td>
                <Link to = { `/employee/${ employee.EmployeeID }` } 
                      className = "link-employee"
                      title = "Отчет	о	рабочем	времени">
                    { employee.FIO }  
                </Link>
            </td>
            <td> 
                { (employee.EventDescriptionID === 45) && (<p className="text-success">Присутствует</p>) }
                { (employee.EventDescriptionID === 46) && (<p className="text-danger">Отсутствует</p>) }
            </td>
            <td>{ employee.EventDate }</td>
        </tr>
    )
} 