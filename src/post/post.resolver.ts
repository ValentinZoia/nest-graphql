import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './services/post.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/post.dto';
import { Author } from 'src/authors/entities/author.entity';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query((returns) => [Post]) //[Post] significa que va a retornar Post[]
  post() {
    return this.postService.findAll();
  }

  //el decorador Args es para recibir argumentos osea el body de la peticion
  @Mutation((returns) => Post)
  createPost(@Args('post') post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Query((returns) => Post)
  postById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOneById(id);
  }

  @ResolveField((returns) => Author)
  author(@Parent() post: Post): Promise<Author> {
    return this.postService.getAuthorById(post.authorId);
  }
}
