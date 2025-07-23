'use client';

import { saveNewPost } from '@/lib/actions/posts-actions';
import { useActionState } from 'react';
import UpsertPostForm from './upsert-post-form';

function CreatePostContainer() {
  const [state, action] = useActionState(saveNewPost, undefined);

  return <UpsertPostForm state={state} formAction={action} isUpdate={false} />;
}

export default CreatePostContainer;
