import {
  GET_ONE,
  GET_ALL,
  GET_RANDOM,
} from '../_actions/types'

export default function(state={}, action){
  switch(action.type){
    case GET_ALL:
      return {...state, rooms: action.payload}
    case GET_ONE: 
    case GET_RANDOM:
      return {...state, roomFound: action.payload}
  }
}