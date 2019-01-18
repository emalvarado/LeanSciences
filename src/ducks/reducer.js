const initialState = {
  user: {},
  selectedTime: ''
}

const GET_USER_DATA = 'GET_USER_DATA'
const SELECT_TIME = 'SELECT_TIME'


export function getUserData(userInfo) {
  return {
    type: GET_USER_DATA,
    payload: userInfo
  }
}

export function selectTime(time) {
  return {
    type: SELECT_TIME,
    payload: time
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, user: action.payload }
      case SELECT_TIME:
      return {...state, selectedTime: action.payload}
    default:
      return state
  }
}