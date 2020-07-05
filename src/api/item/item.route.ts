import { Router } from '@abstracts/router.class';
import { Container } from '@config/container.config';

/**
 * Entity Router which which uses {@link Container} to inject Controller and extends {@link Router}
 */
 export class ItemRouter extends Router {
  constructor() {
    super();
  }

  /**
   * Define controlled routes
   */
  define(): void {
    this.router.route('/').get(Container.resolve('ItemController').getAll);
    this.router.route('/:ItemId').get(Container.resolve('ItemController').getById);
    this.router.route('/').post(Container.resolve('ItemController').create);
    this.router.route('/:ItemId').put(Container.resolve('ItemController').update);
    this.router.route('/:ItemId').delete(Container.resolve('ItemController').delete);
  }
}
