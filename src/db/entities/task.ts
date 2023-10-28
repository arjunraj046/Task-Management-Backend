// src/entities/Task.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "varchar", nullable: false })
  heading: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  imageUrl: string;

  @Column({ type: "varchar", nullable: false })
  priority: string;
}
