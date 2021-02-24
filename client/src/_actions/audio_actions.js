import axios from 'axios';
import {
  GET_AUDIOS
} from './types';
import { AUDIO_SERVER } from '../components/Config.js';

export function getAudios(roomID) {
  const request =
      axios.get(`${AUDIO_SERVER}/${roomID}`)
          .then(response => response.data);
  return {
    type: GET_AUDIOS,
    payload: request
  }
}

