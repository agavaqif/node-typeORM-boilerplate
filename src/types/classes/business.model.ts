import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export abstract class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: Number,
    nullable: false,
  })
  businessId;

  @Column({
    type: Number,
    nullable: false,
  })
  projectId;
}
