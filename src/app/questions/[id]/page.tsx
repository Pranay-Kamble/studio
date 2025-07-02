import { questions, users } from '@/lib/data';
import type { Question } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AnswerCard } from '@/components/answer-card';
import { PostAnswerForm } from '@/components/post-answer-form';
import { Paperclip } from 'lucide-react';
import Link from 'next/link';

async function getQuestion(id: string): Promise<Question | undefined> {
  // In a real app, you would fetch this from a database
  return questions.find((q) => q.id === id);
}

export default async function QuestionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const question = await getQuestion(params.id);

  if (!question) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <article>
            <header className="mb-4">
            <h1 className="text-3xl font-bold font-headline mb-2">{question.title}</h1>
            <div className="text-sm text-muted-foreground">
                Asked on {question.createdAt.toLocaleDateString()}
            </div>
            </header>

            <div className="prose prose-stone dark:prose-invert max-w-none">
            <p>{question.content}</p>
            </div>

            {question.attachments.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Attachments</h3>
                    <div className="flex flex-col gap-2">
                        {question.attachments.map(att => (
                            <Link href={att.url} key={att.id} target="_blank" className='flex items-center gap-2 text-sm text-primary hover:underline'>
                                <Paperclip className='h-4 w-4' />
                                {att.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="mt-6 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
            ))}
            </div>

            <div className="mt-6 flex items-center justify-end">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                    <AvatarImage src={question.author.avatar} alt={question.author.name} />
                    <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                    <div className="text-sm font-semibold">{question.author.name}</div>
                    <div className="text-xs text-muted-foreground">Author</div>
                    </div>
                </div>
            </div>
        </article>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">
            {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          <div className="space-y-6">
            {question.answers.map((answer) => (
              <AnswerCard key={answer.id} answer={answer} />
            ))}
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Your Answer</h2>
          <PostAnswerForm />
        </section>

      </div>

      <aside className="space-y-6">
        <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold font-headline mb-2">Subject</h3>
            <div className="flex items-center gap-2">
                <question.subject.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{question.subject.name}</span>
            </div>
        </div>
        <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold font-headline mb-2">Related Questions</h3>
            <ul className="space-y-2 text-sm">
                {questions.slice(0,3).map(q => q.id !== question.id && (
                    <li key={q.id}>
                        <Link href={`/questions/${q.id}`} className="text-primary hover:underline">{q.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
      </aside>
    </div>
  );
}
