import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export abstract class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: Date,
    default: new Date(),
  })
  createdAt;

  @Column({
    type: Date,
    default: null,
  })
  updatedAt;
}
