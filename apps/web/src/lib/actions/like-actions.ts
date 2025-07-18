'use server';

import { print } from 'graphql';

import { authFetchGraphQL } from '../fetch-graphql';
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  UNLIKE_POST_MUTATION,
} from '../gql-queries';

export async function getPostLikedData(postId: number) {
  const data = await authFetchGraphQL(print(POST_LIKES), {
    postId,
  });

  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean,
  };
}

export async function likePost(postId: number) {
  const data = await authFetchGraphQL(print(LIKE_POST_MUTATION), {
    postId,
  });
}

export async function unlikePost(postId: number) {
  const data = await authFetchGraphQL(print(UNLIKE_POST_MUTATION), {
    postId,
  });
}
