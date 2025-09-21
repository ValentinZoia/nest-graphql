import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'posts' })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true }) //opcional
  content?: string;

  @Column()
  @Field(() => Int)
  authorId: number;

  @ManyToOne(() => Author, (author) => author.posts)
  @Field(() => Author)
  author: Author;
}
