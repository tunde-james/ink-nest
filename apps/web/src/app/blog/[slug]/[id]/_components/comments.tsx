'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getPostComments } from '@/lib/actions/comment-actions';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import CommentCard from './comment-card';
import CommentPagination from './comment-pagination';
import CommentCardSkeleton from './comment-card-skeleton';
import { SessionUser } from '@/lib/session';
import AddComment from './add-comment';

interface Props {
  postId: number;
  user?: SessionUser;
}

function Comments({ postId, user }: Props) {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['GET_POST_COMMENTS', postId, page],
    queryFn: async () =>
      await getPostComments({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);

  return (
    <div className="p-2 rounded-md shadow-md">
      <h6 className="text-lg text-slate-700">Comments</h6>

      {!!user && <AddComment user={user} postId={postId} refetch={refetch} />}

      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <CommentCardSkeleton key={index} />
            ))
          : data?.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
      </div>

      <CommentPagination
        currentPage={page}
        setCurrentPage={(p) => setPage(p)}
        totalPages={totalPages}
        className="p-2"
      />
    </div>
  );
}

export default Comments;
