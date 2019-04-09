const initialState = {
  employees         : null,
  currentEmployee   : [],
  currentDayListTime: null,
  workingTime       : 0
}

export default function reducer( state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_EMPLOYEES_SUCCESS":      
      return {
        ...state,
        employees: action.payload
      }
    case "GET_TIME_WORK_SUCCESS":      
      return {
        ...state, 
        workingTime        : action.payload.workingHours, 
        currentDayListTime : action.payload.workingTimeList     
      }
    case "GET_EMPLOYEE_INFO_SUCCESS":
      return {
        ...state,
        currentEmployee : action.payload
      }    
    case "CLEAR_WORKING_DATA" : 
      return {
        ...state,
        currentDayListTime : action.payload,
        workingTime        : 0
      }
    case "GET_ALL_EMPLOYEES_ERROR" || "GET_TIME_WORK_ERROR" || "GET_EMPLOYEE_INFO_ERROR":
      return state;
    
    default:
      return state;
  }
}