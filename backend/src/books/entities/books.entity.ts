import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
} from 'typeorm';
import { BookMetadata } from './book-metadata.entity';

@Entity('books')
@Index(['title', 'author'])
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false })
  author: string;

  @Column({ type: 'date', nullable: false })
  publishedDate: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  coverImage: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverImageThumbnail: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne(() => BookMetadata, (metadata) => metadata.book, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  metadata: BookMetadata;
}
