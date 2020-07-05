import { ENVIRONMENT } from '@enums/environment.enum';

/**
 * Configure dotenv with variables.env file before app, to allow process.env accessibility in
 * app.js
 *
 * @dependency dotenv
 *
 * @see https://www.npmjs.com/package/dotenv
 */
class EnvironmentConfiguration {
  /**
   * @description Current environment (default dev)
   */
  static environment: string = ENVIRONMENT.development;

  /**
   * @description Set environment according to current process args
   */
  static set() {
    if (
      process.argv[2] &&
      process.argv[2] === '--env' &&
      process.argv[3] &&
      ENVIRONMENT.hasOwnProperty(process.argv[3])
    ) {
      this.environment = ENVIRONMENT[process.argv[3]];
    }
    if (
      process.env.ENVIRONMENT &&
      ENVIRONMENT.hasOwnProperty(process.env.ENVIRONMENT)
    ) {
      this.environment = process.env.ENVIRONMENT as ENVIRONMENT;
    }
  }

  /**
   * @description Load .env file according to environment
   */
  static load() {
    this.set();
    require('dotenv').config({
      path: `${process.cwd()}/build/env/${this.environment}.env`,
    });
  }
}

EnvironmentConfiguration.load();

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const authorized = process.env.AUTHORIZED;
const contentType = 'application/json';
const apiVersion = process.env.API_VERSION;
const typeorm = {
  type: process.env.TYPEORM_TYPE,
  name: process.env.TYPEORM_NAME,
  port: process.env.TYPEORM_PORT,
  host: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DB,
  user: process.env.TYPEORM_USER,
  pwd: process.env.TYPEORM_PWD,
  sync:
    this.environment === ENVIRONMENT.production
      ? false
      : !!process.env.TYPEORM_SYNC,
  log: !!process.env.TYPEORM_LOG,
};

export { env, port, authorized, contentType, typeorm, apiVersion };
