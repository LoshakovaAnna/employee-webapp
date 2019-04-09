import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllEmployees } from '../redux/actions';
import TableEmployees from '../components/TableEmployees';

class HomePage extends Component {
    
  componentDidMount(){
    const load = this.props.getAllEmployees;
    setTimeout(function run() {
            load();                
            setTimeout(run, 60000);
        }, 5000);  
  }
  
  render() {
    
    const { employees } = this.props;

    return (
      <>
        <h1 className ="text-center  text-primary  pb-3"> Сотрудники </h1>
        
        { ( !employees ) && (<p>Загружаются данные...</p>)}

        { ( employees ) && ( <TableEmployees listEmpl={ employees }  /> ) }       

      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees
  }
}

export default connect(mapStateToProps, { getAllEmployees })(HomePage);
