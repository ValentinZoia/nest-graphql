import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';

@Module({
  //EXPLICAR QUE ES ESTE MODULO
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, //Que modulo de configuracion vas a usar?
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`, // => ".develop.env"
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: true, // crea la tabla si no existe
    }),
    PostModule,
    AuthorsModule,
  ],
  providers: [],
})
export class AppModule {}
