import { createClient } from '@supabase/supabase-js';

export async function uploadThumbnail(image: File) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_API_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  if (image.size > 5 * 1024 * 1024) {
    throw new Error('File size exceeds 5MB limit.');
  }

  const thumbnailData = await supabase.storage
    .from('ink-nest-thumbnails')
    .upload(`${image.name}_${Date.now()}`, image, { upsert: true });

  if (!thumbnailData.data?.path) throw new Error('failed to upload the file');

  const urlData = await supabase.storage
    .from('ink-nest-thumbnails')
    .getPublicUrl(thumbnailData.data?.path);

  if (!urlData.data?.publicUrl) {
    throw new Error('Failed to retrieve public URL');
  }

  return urlData.data.publicUrl;
}
