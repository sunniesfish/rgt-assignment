import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './books.entity';

@Entity('book_metadata')
export class BookMetadata {
  @PrimaryColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false })
  author: string;

  @Column({ type: 'int', default: 0 })
  stockQuantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Book, (book) => book.metadata, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  book: Book;
}
