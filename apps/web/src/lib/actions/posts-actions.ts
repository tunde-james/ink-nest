'use server';

import { print } from 'graphql';

import { fetchGraphQL } from '../fetch-graphql';
import { GET_POSTS } from '../gql-queries';
import { Post } from '../types/model-types';
import { transformTakeSkip } from '../helpers';

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });

  return { posts: data.posts as Post[], totalPosts: data.postCount };
};
