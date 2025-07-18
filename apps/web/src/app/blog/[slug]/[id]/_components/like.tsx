'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getPostLikedData,
  likePost,
  unlikePost,
} from '@/lib/actions/like-actions';
import { SessionUser } from '@/lib/session';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/20/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

type Props = {
  postId: number;
  user?: SessionUser;
};

function Like({ postId, user }: Props) {
  const { data, refetch: refetchPostLikedData } = useQuery({
    queryKey: ['GET_POST_LIKE_DATA', postId],
    queryFn: async () => await getPostLikedData(postId),
  });

  const likeMutation = useMutation({
    mutationFn: () => likePost(postId),
    onSuccess: () => refetchPostLikedData(),
  });

  const unLikeMutation = useMutation({
    mutationFn: () => unlikePost(postId),
    onSuccess: () => refetchPostLikedData(),
  });

  return (
    <div className="mt-3 flex items-center justify-start gap-2">
      {data?.userLikedPost ? (
        <button onClick={() => unLikeMutation.mutate()}>
          <SolidHeartIcon className="w-6 text-rose-600" />
        </button>
      ) : (
        <button onClick={() => likeMutation.mutate()}>
          <HeartIcon className="w-6" />
        </button>
      )}

      <p className="text-slate-600">{data?.likeCount}</p>
    </div>
  );
}

export default Like;
