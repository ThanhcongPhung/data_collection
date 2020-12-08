import axios from 'axios';
import {
  GET_ONE,
  GET_ALL,
  // GET_RANDOM,
} from './types';
import { ROOM_SERVER } from '../components/Config.js';

export function getRoom(dataToSubmit) {
  const request = 
    axios.get(`${ROOM_SERVER}/${dataToSubmit}`)
      .then(response => response.data);

  return {
    type: GET_ONE,
    payload: request
  }
}

export function getAllRooms() {
  const request = 
    axios.get(`${ROOM_SERVER}`)
      .then(response => response.data);

  return {
    type: GET_ALL,
    payload: request
  }
}