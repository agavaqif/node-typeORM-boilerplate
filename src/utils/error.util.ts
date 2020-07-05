import { NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status';

const buildUserErrorMessage = (error: any) => {
  /**
   *
   *error.code: 22P02: String should be number validation error
   */
  switch (error.name) {
    case 'EntityNotFound':
      return {
        severity: 'error',
        type: 'DBERROR',
        status: NOT_FOUND,
        message: 'Item was not found',
      };
    case 'EntityValidationError':
      return {
        severity: 'alert',
        type: 'ValidationError',
        status: BAD_REQUEST,
        messages: error.messages,
      };
    case 'NoRoute':
      return {
        severity: 'error',
        type: 'NoRoute',
        status: NOT_FOUND,
        message: 'Route not found',
      };
    default:
      return {
        severity: 'error',
        type: 'SERVERERROR',
        status: INTERNAL_SERVER_ERROR,
        message: 'Server Error contact admin',
      };
  }
};

export { buildUserErrorMessage };
