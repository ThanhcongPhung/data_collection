import axios from 'axios';
import {
  GET_ONE,
  GET_ALL,
  GET_RANDOM,
  DELETE_AUDIO,
} from './types';
import { ROOM_SERVER } from '../components/Config.js';

export function getRoom(roomID) {
  const request = 
    axios.get(`${ROOM_SERVER}/${roomID}`)
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

export function getRandomRoom() {
  const request = 
    axios.get(`${ROOM_SERVER}/random`)
      .then(response => response.data);

  return {
    type: GET_RANDOM,
    payload: request
  }
}

export function removeLatestAudio(roomID, userRole) {
  const request =
    axios.put(`${ROOM_SERVER}/${roomID}/${userRole}`)
      .then(response => response.data);

  return {
    type: DELETE_AUDIO,
    payload: request,
  }
}