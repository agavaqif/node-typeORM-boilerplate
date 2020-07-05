import { Request, Response } from 'express';
import { buildUserErrorMessage } from '@utils/error.util';
import { notify } from 'node-notifier';

// import { Container } from '@config/container.config';
// import { getErrorStatusCode, getErrorOutput } from '@utils/error.util';

/**
 * Error catch/output middleware
 *
 * @dependency libnotify-bin
 * @dependency node-notifier
 *
 * @see https://www.npmjs.com/package/node-notifier
 */
export class Catcher {
  constructor() {}

  /**
   * Log errors
   *
   * @param Error err Error object
   * @param Request req Express request object derived from http.incomingMessage
   * @param Response res Express response object
   * @param Function next Callback function
   */
  static log = (err: Error, req: Request, res: Response, next: Function) => {
    const message = {
      method: req.method || null,
      url: req.url || null,
      message: err.message || null,
      stack: err.stack || null,
    };
    console.log(message);
    next(err, req, res, next);
  };

  /**
   * Send user friendly error message to client in case of Validation,DB or Server errors
   *
   * @param Error err Error object
   * @param Request req Express request object derived from http.incomingMessage
   * @param Response res Express response object
   * @param Function next Callback function
   */
  static exit = (err: any, req: Request, res: Response, next: Function) => {
    const message = buildUserErrorMessage(err);
    res.status(message.status);
    res.json(message);
  };

  /**
   * Send user friendly error message to client in case of route not found
   *
   * @param Request req Express request object derived from http.incomingMessage
   * @param Response res Express response object
   * @param Function next Callback function
   */
  static notFound = (req: Request, res: Response, next: Function) => {
    const err = {
      name: 'NoRoute',
    };
    const message = buildUserErrorMessage(err);
    res.status(404);
    res.json(message);
  };
}
