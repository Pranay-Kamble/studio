'use client';

import { useState, useTransition } from 'react';
import type { Answer } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Sparkles, Loader2, Paperclip } from 'lucide-react';
import { getResponseSummary } from '@/lib/actions';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';

type AnswerCardProps = {
  answer: Answer;
};

export function AnswerCard({ answer }: AnswerCardProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState(answer.summary || '');
  const [isPending, startTransition] = useTransition();

  const handleSummary = () => {
    if (summary) {
      setShowSummary(!showSummary);
      return;
    }
    startTransition(async () => {
      const result = await getResponseSummary(answer.content);
      setSummary(result.summary);
      setShowSummary(true);
    });
  };

  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
        <AvatarFallback>{answer.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="grid w-full gap-1.5">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-semibold">{answer.author.name}</span>
            <span className="text-muted-foreground"> • {answer.createdAt.toLocaleDateString()}</span>

          </div>
          <Button onClick={handleSummary} variant="ghost" size="sm" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {showSummary ? 'Hide' : 'AI'} Summary
          </Button>
        </div>

        {showSummary && summary && (
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4">
              <p className="text-sm text-primary-foreground/90">{summary}</p>
            </CardContent>
          </Card>
        )}

        <div className="prose prose-stone dark:prose-invert max-w-none text-sm">
          <p>{answer.content}</p>
        </div>

        {answer.attachments && Array.isArray(answer.attachments) && answer.attachments.length > 0 && (

            <div className="mt-2">
                <div className="flex flex-col gap-2">
                    {answer.attachments.map(att => (
                        <Link href={att.url} key={att.id} target="_blank" className='flex items-center gap-2 text-xs text-primary hover:underline'>
                            <Paperclip className='h-3 w-3' />
                            {att.name}
                        </Link>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
