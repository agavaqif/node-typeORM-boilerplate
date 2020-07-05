import { Router } from 'express';
import { IRoute } from '@interfaces/IRoute.interface';
import { ItemRouter } from '@api/item/item.route';

export class RoutePlugger {
  /**
   * @description Wrapper Express.Router
   */
  public router: Router;

  /**
   * @description Routes descriptions
   */
  private routes = [{ segment: '/item/', router: ItemRouter }];

  constructor() {
    this.router = Router();
    this.plug();
  }

  /**
   * @description Plug sub routes on main router
   */
  private plug() {
    this.routes.forEach((route: IRoute) => {
      const router = new route.router().router;
      this.router.use(route.segment, router);
    });
  }
}
