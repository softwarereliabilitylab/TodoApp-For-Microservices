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

  @Column({ default: new Date() })
  date: Date;
}
