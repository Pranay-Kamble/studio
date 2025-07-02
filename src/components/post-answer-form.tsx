'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Paperclip } from 'lucide-react';

const postAnswerSchema = z.object({
  content: z.string().min(20, 'Answer must be at least 20 characters.'),
});

type PostAnswerFormValues = z.infer<typeof postAnswerSchema>;

export function PostAnswerForm() {
  const { toast } = useToast();

  const form = useForm<PostAnswerFormValues>({
    resolver: zodResolver(postAnswerSchema),
    defaultValues: {
      content: '',
    },
  });

  function onSubmit(values: PostAnswerFormValues) {
    console.log(values);
    toast({
      title: 'Answer Submitted!',
      description: 'Thank you for your contribution.',
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share your knowledge. Be clear and concise."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Button type="button" variant="outline">
            <Paperclip className="mr-2 h-4 w-4" />
            Attach File
          </Button>
          <Button type="submit" className='bg-accent hover:bg-accent/90 text-accent-foreground'>Post Your Answer</Button>
        </div>
      </form>
    </Form>
  );
}
