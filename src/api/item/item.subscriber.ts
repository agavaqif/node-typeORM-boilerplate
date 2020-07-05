import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { Item } from './item.model';

/**
 * TypeORM Subscriber to entity. Fire function before/after CRUD operations
 */
@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Item;
  }

  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<Item>) {}
}
