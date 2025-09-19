import { Controller, Get } from '@nestjs/common';

@Controller('post')
export class PostController {
  @Get()
  getPost() {
    return { id: 1, title: 'mi first post omg!' };
  }
}
