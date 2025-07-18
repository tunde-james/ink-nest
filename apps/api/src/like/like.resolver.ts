import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';

import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;

    return await this.likeService.likePost({ postId, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unlikePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;

    return await this.likeService.unlikePost({ postId, userId });
  }

  @Query(() => Int)
  async postLikesCount(@Args('postId', { type: () => Int }) postId: number) {
    return await this.likeService.gePostLikesCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  async userLikedPost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;

    return await this.likeService.userLikedPost({ postId, userId });
  }
}
