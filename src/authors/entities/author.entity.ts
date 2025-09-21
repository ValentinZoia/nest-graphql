import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'authors' })
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  //un author puede tener muchos posts - reladion con tabla posts
  @OneToMany(() => Post, (post) => post.author)
  @Field(() => [Post])
  posts: Post[];
}
