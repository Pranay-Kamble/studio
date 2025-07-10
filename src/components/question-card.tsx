import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Question } from '@/lib/types';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type QuestionCardProps = {
  question: Question;
};

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                 <CardTitle>
                    <Link href={`/questions/${question.id}`} className="hover:text-primary transition-colors">
                        {question.title}
                    </Link>
                </CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2 text-xs">
                    <Avatar className="h-5 w-5">
                        <AvatarImage src={question.author.avatar} alt={question.author.name} />
                        <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{question.author.name} asked in</span>
                    <span className="font-semibold text-foreground">{question.subject.name}</span>
                    <span>• {formatDistanceToNow(question.createdAt.toDate(), { addSuffix: true })}</span>
                </CardDescription>
            </div>
             <Badge variant="secondary">{question.subject.name}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {question.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
          {question.tags.map((tag) => (
            <Badge key={tag.id} variant="outline">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{question.answerCount} Answers</span>

            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
