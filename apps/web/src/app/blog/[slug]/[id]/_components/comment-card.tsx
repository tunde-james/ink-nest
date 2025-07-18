import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentEntity } from '@/lib/types/model-types';
import { UserIcon } from '@heroicons/react/20/solid';

interface Props {
  comment: CommentEntity;
}

function CommentCard({ comment }: Props) {
  return (
    <div className="p-2 shadow rounded">
      <div className="flex gap-2 text-slate-500 items-center">
        <Avatar className="border-2">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>
            <UserIcon className="w-8" />
          </AvatarFallback>
        </Avatar>

        <p className="">{comment.author.name} |</p>
        <p className="">{new Date(comment.createdAt).toLocaleDateString()}</p>
      </div>

      <p className="mt-4">{comment.content}</p>
    </div>
  );
}

export default CommentCard;
