import axios from 'axios';

export const getAllEmployees = () => dispatch => {
  axios.get('http://localhost:3010/api/employees')
    .then ( ( { data } ) =>  dispatch( getAllEmployeesSuccess(data) ) )    
    .catch( error => dispatch( getAllEmployeesError( error ) ) );
}

export const getTimeWork = ( dateId ) => dispatch => {
  axios.post('http://localhost:3010/api/date', dateId)
    .then ( ( { data } ) =>  dispatch( getTimeWorkSuccess(data) ) )    
    .catch( error => dispatch( getTimeWorkError( error ) ) );
}

export const getEmployeeInfo = (idEmployee) => dispatch => {
  axios.post('http://localhost:3010/api/employee/info', {idEmployee})
    .then(({ data }) => dispatch(getEmployeeInfoSuccess(data)))
    .catch(error => dispatch(getEmployeeInfoError(error)));
}

export const  clearWorkingData = () => ({ type: "CLEAR_WORKING_DATA", payload: null });

const getAllEmployeesSuccess = data => ({ type: "GET_ALL_EMPLOYEES_SUCCESS", payload: data });
const getAllEmployeesError = error => ({ type: "GET_ALL_EMPLOYEES_ERROR", payload: error });

const getTimeWorkSuccess = data => ({ type: "GET_TIME_WORK_SUCCESS", payload: data });
const getTimeWorkError = error => ({ type: "GET_TIME_WORK_ERROR", payload: error });


const getEmployeeInfoSuccess = data => ({ type: "GET_EMPLOYEE_INFO_SUCCESS", payload: data });
const getEmployeeInfoError = error => ({ type: "GET_EMPLOYEE_INFO_ERROR", payload: error });
