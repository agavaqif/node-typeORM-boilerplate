import { ENVIRONMENT } from '@enums/environment.enum';
import { env, port } from '@config/environment.config';

import * as Express from 'express';

import { readFileSync } from 'fs';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer, createServer } from 'https';

/**
 * Application server wrapper instance
 */
export class HTTPServer {
  /**
   *
   */
  http: HttpServer | HttpsServer;

  /**
   *
   */
  app: Express.Application;

  /**
   *
   */
  private options = {
    credentials: {
      key: null,
      cert: null,
    },
    port,
  };

  constructor(app: Express.Application) {
    this.app = app;
  }

  /**
   * @description Start servers
   */
  start(): void {
    try {
      const server = this.app;
      this.http = server.listen(port, () => {
        console.log(`HTTP(S) server is now running on port ${port} (${env})`);
      });
    } catch (error) {
      console.log(`Server creation error : ${error.message}`);
    }
  }
}
