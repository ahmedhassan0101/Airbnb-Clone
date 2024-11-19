'use client';
import { useState } from 'react';
import { Button } from '@/src/components/ui/button';

function Comment({ comment }: { comment: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);
  const isLongComment = comment.length > 130;
  const displayedComment = isLongComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;

  return (
    <div>
      <p className='text-sm'>{displayedComment}</p>
      {isLongComment && (
        <Button
          variant='link'
          className='pl-0 text-muted-foreground'
          onClick={toggleExpanded}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
}

export default Comment;
