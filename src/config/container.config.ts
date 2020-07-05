import * as awilix from 'awilix';
import { RoutePlugger } from '@config/routePlugger.config';

import { ItemController } from '@api/item/item.controller';
/**
 * Dependencies Management container
 */
export class Container {
  /**
   * @description Wrapped awilix container
   */
  private static container: any;

  constructor() {}

  /**
   * @description Creates and fill new awilix container
   */
  private static init(): any {
    this.container = awilix.createContainer({
      injectionMode: awilix.InjectionMode.PROXY,
    });
    this.container
      .register({
        RoutePlugger: awilix.asClass(RoutePlugger).singleton(),
      })
      .register({
        ItemController: awilix.asClass(ItemController).singleton(),
      });
    return this.container;
  }

  /**
   * @description Wrap awilix resolve method
   *
   * @param string instance Name of the class to instanciate
   */
  static resolve(instance: string) {
    if (!this.container) {
      return this.init().resolve(instance);
    }
    return this.container.resolve(instance);
  }
}
