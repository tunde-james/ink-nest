'use client';

import { useEffect, useState } from 'react';

interface Props {
  content: string;
  className?: string;
}

function SanitizedContent({ content, className }: Props) {
  const [cleanedHTML, setCleanedHTML] = useState('');

  useEffect(() => {
    // Dynamically import DOMPurify only on the client
    import('dompurify').then((DOMPurify) => {
      const cleaned = DOMPurify.default.sanitize(content); // Remove the hardcoded <script> tag
      setCleanedHTML(cleaned);
    });
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanedHTML }}
      className={className}
    />
  );
}

export default SanitizedContent;
