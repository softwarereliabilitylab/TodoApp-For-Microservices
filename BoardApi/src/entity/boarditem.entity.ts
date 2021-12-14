import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Boarditem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ip: string;

  @Column()
  comment: string;

  @Column()
  date: Date;

  @Column()
  isChange: boolean;
}
