import * as Express from 'express';
import * as Hpp from 'hpp';
import * as BodyParser from 'body-parser';
import * as Cors from 'cors';
import { Container } from '@config/container.config';
import { Resolver } from '@middlewares/resolver.middleware';
import { Catcher } from '@middlewares/catcher.middleware';
import { contentType, apiVersion } from '@config/environment.config';

/**
 * Instanciate and set Express application.
 * Configure and plug middlewares from local options or dedicated files in ./config.
 */
export class Application {
  /**
   * @description Wrapped Express.js application
   */
  public app: Express.Application;

  /**
   * @description Middlewares options
   */
  private options = {
    cors: {
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: [
        'Accept',
        'Content-Type',
        'Authorization',
        'Origin',
        'From',
      ],
    },
  };

  constructor() {
    this.init();
    this.plug();
  }

  /**
   * @description Instantiate Express application
   */
  private init(): void {
    this.app = Express();
  }

  /**
   * @description Plug and set middlewares on Express app
   */
  private plug(): void {
    /**
     * Expose body on req.body
     *
     * @see https://www.npmjs.com/package/body-parser
     */
    this.app.use(BodyParser.urlencoded({ extended: false }));
    this.app.use(BodyParser.json({ type: contentType }));

    /**
     * Prevent request parameter pollution
     *
     * @see https://www.npmjs.com/package/hpp
     */
    this.app.use(Hpp({ checkBody: false }));

    /**
     * Enable CORS - Cross Origin Resource Sharing
     *
     * @see https://www.npmjs.com/package/cors
     */
    this.app.use(Cors(this.options.cors));

    /**
     * Set global middlewares on Express Application
     *
     * Note that after router, and before resolver, some routes pass by the Serializer middleware
     * See services/proxy-router.service.ts to check which route serializes her data before exiting
     *
     * Note also that middlewares are implemented in each route file
     * (Guard, Validation, Upload, ...)
     *
     * - RateLimit
     * - Deserializer (if Content-Type is application/vnd.api+json)
     * - Router(s)
     * - Resolver
     */
    this.app.use(
      `/api/${apiVersion}`,
      Container.resolve('RoutePlugger').router,
      Resolver.resolve
    );

    this.app.use(Catcher.log, Catcher.exit, Catcher.notFound);
  }
}
