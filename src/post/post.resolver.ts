import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './services/post.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/post.dto';

@Resolver()
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
}
