import React from 'react';

import RecordEmployee from './RecordEmployee';

export default function TableEmployees(props) {

  const  { listEmpl } = props;
  
  return(      
    <table className="table">
      <thead className="thead-light">   
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Сотрудник</th>
          <th scope="col">Состояние</th>
          <th scope="col">Время	изменения	состояния</th>
        </tr>
      </thead>  
      <tbody>  
        { 
          listEmpl.map( (el, i) => {
            return <RecordEmployee employee={ el } key={i}/>  
          } ) 
        }
      </tbody>
    </table>
  )
}