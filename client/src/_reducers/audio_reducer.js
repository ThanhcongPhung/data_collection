import {
  GET_AUDIOS,
} from '../_actions/types'

export default function(state={}, action){
  switch(action.type){
    case GET_AUDIOS:
      return {...state, audios: action.payload}
    default:
      return state;
  }
}
