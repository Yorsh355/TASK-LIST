import { ROLES } from 'src/constants/enums';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  userName: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  //@Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    nullable: false,
  })
  role: ROLES;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
