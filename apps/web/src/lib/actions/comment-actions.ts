'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetch-graphql';
import { GET_POST_COMMENTS } from '../gql-queries';
import { CommentEntity } from '../types/model-types';

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number;
  skip: number;
  take: number;
}) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number,
  };
}
