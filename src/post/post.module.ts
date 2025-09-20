import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { PostResolver } from './post.resolver';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Post])], //features de typeorm modules
  controllers: [PostController],
  providers: [PostService, PostResolver],
})
export class PostModule {}
