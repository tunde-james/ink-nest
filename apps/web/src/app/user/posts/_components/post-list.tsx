import { Post } from '@/lib/types/model-types';
import PostListItem from './post-list-item';
import Pagination from '@/components/pagination';

interface Props {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

function PostList({ posts, currentPage, totalPages }: Props) {
  return (
    <>
      <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-2 text-center">
        <div className="col-span-2"></div>
        <div></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}

      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
}

export default PostList;
