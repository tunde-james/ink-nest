'use server';

import { print } from 'graphql';

import { authFetchGraphQL, fetchGraphQL } from '../fetch-graphql';
import { GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS } from '../gql-queries';
import { Post } from '../types/model-types';
import { transformTakeSkip } from '../helpers';

export async function fetchPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });

  return { posts: data.posts as Post[], totalPosts: data.postCount };
}

export async function fetchPostById(id: number) {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });

  return data.getPostById as Post;
}

export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { skip, take } = transformTakeSkip({ page, pageSize });

  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    take,
    skip,
  });

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
}
