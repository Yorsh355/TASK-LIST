import { ROLES } from 'src/constants/roles';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
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
    unique: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    nullable: false,
    unique: true,
  })
  role: ROLES;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  status: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;
}
