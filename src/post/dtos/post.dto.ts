import { Field, InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreatePostDto {
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @MaxLength(255)
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  content: string;

  @IsInt()
  @Field(() => Number)
  authorId: number;
}

export class UpdatePostDto {
  @MaxLength(50)
  @IsOptional()
  @IsString()
  title: string;

  @MaxLength(255)
  @IsOptional()
  @IsString()
  content: string;
}
