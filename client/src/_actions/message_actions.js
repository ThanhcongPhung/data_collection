import axios from 'axios';
import {
  GET_MESSAGES,
  AFTER_POST_MESSAGE
} from './types';
import { MESSAGE_SERVER } from '../components/Config.js';

export function getMessages() {
  const request =
      axios.get(`${MESSAGE_SERVER}/getMessages`)
          .then(response => response.data);

  return {
    type: GET_MESSAGES,
    payload: request
  }
}
export function afterPostMessage(data){

  return {
    type: AFTER_POST_MESSAGE,
    payload: data
  }
}
