import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { filter } from '@utils/serializing.util';
import { blacklist } from './item.blacklist';

/**
 * TypeORM based entity
 */
@Entity()
export class Item {
  /**
   * @param payload Object data to assign
   */
  constructor(payload: Object) {
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Filters entity properties based on blacklist
   *
   * @returns Filtered Entity
   */
  public blacklist() {
    return filter(blacklist, this);
  }
}
