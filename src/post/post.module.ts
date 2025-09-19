import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { PostResolver } from './post.resolver';

@Module({
  controllers: [PostController],
  providers: [PostService, PostResolver]
})
export class PostModule {}
