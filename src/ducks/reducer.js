const initialState = {
  user: {},
  selectedTime: '',
  paid: false
}

const GET_USER_DATA = 'GET_USER_DATA'
const SELECT_TIME = 'SELECT_TIME'
const SET_PAID = 'SET_PAID'
//action types


export function getUserData(userInfo) {
  return {
    type: GET_USER_DATA,
    payload: userInfo
  }
}
//action creators

export function selectTime(time) {
  return {
    type: SELECT_TIME,
    payload: time
  }
}

export function setPaid(bool) {
  return {
    type: SET_PAID,
    payload: bool
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, user: action.payload }
      case SELECT_TIME:
      return {...state, selectedTime: action.payload}
      case SET_PAID:
      return {...state, paid: action.payload}
    default:
      return state
  }
}