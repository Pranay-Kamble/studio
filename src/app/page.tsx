'use client';

import { useState, useEffect } from 'react';
import { QuestionList } from '@/components/question-list';
import { subjects } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';
import { getQuestions } from '../lib/firestore';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions as any); // Cast to any for now, refine type later
      } catch (err: any) {
        setError(err.message || 'Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container mx-auto">
       <Tabs defaultValue="popular" className="w-full">
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="newest">Newest</TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="popular">
          {loading && <p>Loading popular questions...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <QuestionList questions={questions} />
          )}
        </TabsContent>
        <TabsContent value="trending">
          {loading && <p>Loading trending questions...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <QuestionList questions={questions} />
          )}
        </TabsContent>
        <TabsContent value="newest">
          {loading && <p>Loading newest questions...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <QuestionList questions={questions} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
