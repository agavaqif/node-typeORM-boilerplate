import { ENVIRONMENT } from '@enums/environment.enum';
import { env, typeorm } from '@config/environment.config';
import { Connection } from 'typeorm';
import { TypeormConfiguration } from '@config/typeorm.config';
import { Container } from '@config/container.config';

/**
 * Database connection manager for MySQL server
 */
export class PgSQLServer {
  /**
   * @description Stored typeorm connection
   */
  connection: Connection;

  constructor() {}

  /**
   * @description Connection to MySQL database server
   */
  start(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      TypeormConfiguration.connect()
        .then((connection) => {
          this.connection = connection;
          if (env !== ENVIRONMENT.test) {
            console.log(
              `Connection to PgSQL server established on port ${typeorm.port} (${env})`
            );
          }
          resolve(connection);
        })
        .catch((error) => {
          if (env !== ENVIRONMENT.test) {
            console.log(`PgSQL connection error : ${error.message}`);
          }
          reject(error.message);
        });
    });
  }
}
