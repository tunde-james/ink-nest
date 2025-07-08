import { ObjectType, Field, Int } from '@nestjs/graphql';

import { CommentEntity } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field()
  content: string;

  @Field(() => Boolean)
  published: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  author: User;

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => [CommentEntity])
  comments: CommentEntity[];
}
