import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ValueTransformer,
} from 'typeorm';
import { Exclude } from 'class-transformer';

class BigIntTransformer implements ValueTransformer {
  to(value: number): string {
    return value.toString();
  }

  from(value: string): number {
    return parseInt(value, 10);
  }
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column()
  version: number;

  @Column('bigint', {
    transformer: new BigIntTransformer(),
  })
  createdAt: number;

  @Column('bigint', {
    transformer: new BigIntTransformer(),
  })
  updatedAt: number;
}
