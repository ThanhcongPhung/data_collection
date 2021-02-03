import {
  GET_MESSAGES,
  AFTER_POST_MESSAGE
} from '../_actions/types'

export default function(state={}, action){
  switch(action.type){
    case GET_MESSAGES:
      return {...state, messages: action.payload}
    case AFTER_POST_MESSAGE:
      return {...state, messages: state.messages.concat(action.payload)}
    default:
      return state;
  }
}
