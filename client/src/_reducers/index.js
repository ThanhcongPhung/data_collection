import { combineReducers } from 'redux';
import user from './user_reducer';
import message from './message_reducer';
import audio from './audio_reducer';
const rootReducer = combineReducers({
    user,
    message,
    audio
});

export default rootReducer;
