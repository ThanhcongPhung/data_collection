import {
  GET_ALL_AUDIO,
  GET_AUDIOS,
} from '../_actions/types'

export default function(state={}, action){
  switch(action.type){
    case GET_AUDIOS:
      return {...state, audios: action.payload}
    case GET_ALL_AUDIO:
      return {...state, allAudio: action.payload}
    default:
      return state;
  }
}
