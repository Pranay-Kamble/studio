'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Paperclip, Tag as TagIcon } from 'lucide-react';
import { subjects } from '@/lib/data';
import { getTagSuggestions } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast'; // Corrected import path for useToast
import { addQuestion } from '@/lib/firestore'; // Import the addQuestion function

const askQuestionSchema = z.object({
  subject: z.string().min(1, 'Please select a subject.'),
  title: z.string().min(15, 'Title must be at least 15 characters.').max(150),
  content: z.string().min(30, 'Question body must be at least 30 characters.'),
  tags: z.array(z.string()).min(1, 'Please add at least one tag.').max(5),
});

type AskQuestionFormValues = z.infer<typeof askQuestionSchema>;

export function AskQuestionForm() {
  const [isPending, startTransition] = useTransition();
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<AskQuestionFormValues>({
    resolver: zodResolver(askQuestionSchema),
    defaultValues: {
      subject: '',
      title: '',
      content: '',
      tags: [],
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGenerateTags = () => {
    const questionContent = form.getValues('content');
    if (questionContent.length < 30) {
        toast({
            variant: "destructive",
            title: "Content too short",
            description: "Please write at least 30 characters before generating tags.",
        });
        return;
    }

    startTransition(async () => {
        const { tags } = await getTagSuggestions(questionContent);
        setSuggestedTags(tags);
    });
  };

  const addTag = (tag: string) => {
    const currentTags = form.getValues('tags');
    if (!currentTags.includes(tag) && currentTags.length < 5) {
      form.setValue('tags', [...currentTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };
  
  // function onSubmit(values: AskQuestionFormValues) {
    // console.log(values);
    // toast({
    //   title: "Question Posted!",
    //   description: "Your question has been successfully posted.",
  //   });
  // }

  async function onSubmit(values: AskQuestionFormValues) {
    console.log('Form submitted. Preparing to add question...');
    console.log('Form values:', values);

    // You'll need to get the authorId from Firebase Auth later
    // For now, use a placeholder or get it from your authentication state
    const authorId = 'placeholder-author-id'; // Replace with actual author ID when ready

    const questionData = {
      title: values.title,
      content: values.content,
      authorId: authorId,
      subjectId: values.subject,
      tags: values.tags,
    };

    console.log('Calling addQuestion with:', questionData);

    try {
      const docId = await addQuestion(questionData);
      console.log('addQuestion completed. Document ID:', docId);

      // If addQuestion was successful:
      toast({
        title: "Question Posted!",
        description: `Your question has been successfully posted with ID: ${docId}`,
      });

      // Consider resetting the form here
      // form.reset(); // If you are using react-hook-form's reset method

    } catch (err: any) {
      console.error('Error during question submission in onSubmit:', err);
      // setError(err.message || 'An error occurred while posting your question.'); // If you have an error state
      toast({
        variant: "destructive",
        title: "Failed to post question.",
        description: err.message || "An error occurred.",
      });
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className='font-headline'>Subject</CardTitle>
            <CardDescription>Choose the subject that best fits your question.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            <div className='flex items-center gap-2'>
                                <subject.icon className="h-4 w-4 text-muted-foreground" />
                                {subject.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='font-headline'>Your Question</CardTitle>
            <CardDescription>
              Provide a clear, descriptive title and explain your question in detail.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. How do I use React Hooks with TypeScript?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Include all the information someone would need to answer your question." className="min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Tags</CardTitle>
                <CardDescription>Add up to 5 tags to describe what your question is about.</CardDescription>
            </CardHeader>
            <CardContent>
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="border rounded-md p-2 flex flex-wrap gap-2 min-h-[40px]">
                                    {field.value.map(tag => (
                                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-foreground">
                                                &times;
                                            </button>
                                        </Badge>
                                    ))}
                                    <Input 
                                        className="flex-1 border-none shadow-none focus-visible:ring-0 min-w-[100px]"
                                        placeholder={field.value.length > 0 ? "" : "e.g. (react typescript hooks)"}
                                        onKeyDown={(e) => {
                                            if (e.key === ' ' || e.key === 'Enter') {
                                                e.preventDefault();
                                                const newTag = (e.target as HTMLInputElement).value.trim();
                                                if (newTag) {
                                                    addTag(newTag);
                                                    (e.target as HTMLInputElement).value = '';
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <div className="mt-4">
                    <Button type="button" variant="outline" size="sm" onClick={handleGenerateTags} disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Suggest Tags with AI
                    </Button>
                    {suggestedTags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                             <p className="text-sm text-muted-foreground w-full">Click to add:</p>
                            {suggestedTags.map(tag => (
                                <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => addTag(tag)}>
                                    <TagIcon className="mr-1 h-3 w-3" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>

        <div className="flex justify-between items-center">
            <div>
                 <Button type="button" variant="outline">
                    <Paperclip className="mr-2 h-4 w-4" />
                    Attach Files
                </Button>
            </div>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Post Your Question</Button>
        </div>
      </form>
    </Form>
  );
}
