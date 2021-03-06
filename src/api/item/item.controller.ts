import { CREATED, NO_CONTENT } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { Item } from './item.model';
import { getRepository } from 'typeorm';
import { paginate } from '@utils/serializing.util';
import { PAGINATION_DEFAULT } from '@enums/pagination.enum';
import { validateEntity } from '@utils/validate.util';

/**
 * Controller class for entities which include CRUD logic
 */
export class ItemController {
  constructor() {}

  /**
   * Get Entity list in paginatied format
   *
   * @param Request req Express request object 
   * @param Response res Express response object
   * @param Function next Callback function
   *
   * @returns Response in paginatied format
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(Item);
      const page =
        parseInt(req.query.page as string, 10) || PAGINATION_DEFAULT.PAGE;
      const perPage =
        parseInt(req.query.perPage as string, 10) || PAGINATION_DEFAULT.PERPAGE;
      const enities = await repository.find();
      const paginatedEntities = paginate(enities, page, perPage);
      res.locals.data = paginatedEntities;
      next();
    } catch (e) {
      next(e);
    }
  }

  /**
   * Get Entity from DB by using entity id
   *
   * @param Request req Express request object 
   * @param Response res Express response object
   * @param Function next Callback function
   *
   * @returns Entity as response
   */
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(Item);
      const entity = await repository.findOneOrFail(req.params.ItemId);
      res.locals.data = entity.blacklist();
      next();
    } catch (e) {
      next(e);
    }
  }

  /**
   * Create new Entity
   *
   * @param Request req Express request object 
   * @param Response res Express response object
   * @param Function next Callback function
   *
   * @returns Newly created entity
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(Item);
      const entity = new Item(req.body);
      const errors = await validateEntity(entity);
      const savedEntity = await repository.save(entity);
      res.status(CREATED);
      res.locals.data = savedEntity;
      next();
    } catch (e) {
      next(e);
    }
  }

  /**
   * Update existing Entity
   *
   * @param Request req Express request object 
   * @param Response res Express response object
   * @param Function next Callback function
   *
   * @returns Newly updated entity
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(Item);
      const entity = await repository.findOneOrFail(req.params.ItemId);
      const errors = await validateEntity(new Item(req.body));
      repository.merge(entity, req.body);
      repository.save(entity);
      res.locals.data = entity;
      next();
    } catch (e) {
      next(e);
    }
  }

  /**
   * Delete Entity
   *
   * @param Request req Express request object 
   * @param Response res Express response object
   * @param Function next Callback function
   *
   * @returns
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const repository = getRepository(Item);
      const entity = await repository.findOneOrFail(req.params.ItemId);
      await repository.remove(entity);
      res.status(NO_CONTENT);
      next();
    } catch (e) {
      next(e);
    }
  }
}


