import 'reflect-metadata';

import { createConnection, Connection } from 'typeorm';

import { Container } from '@config/container.config';
import { typeorm } from '@config/environment.config';

/**
 * Typeorm default configuration
 *
 * @see https://http://typeorm.io
 */
export class TypeormConfiguration {
  constructor() {}

  /**
   * @description Connect to MySQL server
   * @async
   */
  static async connect(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      createConnection({
        type: 'postgres',
        name: typeorm.name,
        host: typeorm.host,
        port: parseInt(typeorm.port, 10),
        username: typeorm.user,
        password: typeorm.pwd,
        database: typeorm.database,
        entities: [`${process.cwd()}/build/api/**/*model.js`],
        subscribers: [`${process.cwd()}/build/api/**/*subscriber.js`],
        synchronize: true,
        logging: false,
      })
        .then((connection: Connection) => {
          resolve(connection);
        })
        .catch((error) => {
          console.log('Error' + error.message);
          reject(error);
        });
    });
  }
}
