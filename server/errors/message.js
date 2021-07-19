const codes = require('./code');

const getErrorMessage = (code) => {
  switch (code) {
    case codes.CONVERT_LOGIN:
      return 'convert login';
    case codes.USER_NOT_FOUND:
      return 'User is not found';
    case codes.WRONG_PASSWORD:
      return 'Wrong password';
    case codes.USER_EXIST:
      return 'User exist';
    case codes.CAMPAIGN_EXIST:
      return 'Campaign exist';
    case codes.REGISTERED:
      return 'Registered campaign';
    case codes.UNREGISTER:
      return 'Unregister';
    case codes.MESSAGE_NOT_FOUND:
      return 'Message not found';
    case codes.USECASE_NOT_FOUND:
      return 'Usecase is not found';
    case codes.RESULT_NOT_FOUND:
      return 'Result is not found';
    case codes.YOU_ARE_NOT_INVITED:
      return 'You are not invited';
    case codes.YOU_JOINED:
      return 'You joined';
    case codes.STATUS_NOT_FINISH:
      return 'status not finish';
    default:
      return null;
  }
};

module.exports = getErrorMessage;
