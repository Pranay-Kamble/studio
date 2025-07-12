'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getQuestionById, addAnswer } from '@/lib/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnswerCard } from '@/components/answer-card';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'; // Import Firestore real-time functions
import { db } from '@/lib/firestore'; // Import the Firestore instance (assuming you export it from firebase.ts)


export default function QuestionDetailsPage() {
  const params = useParams();
  const questionId = params.id as string;

  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<any[]>([]); // State to hold answers
  const [answersLoading, setAnswersLoading] = useState(true); // Loading state for answers
  const [answersError, setAnswersError] = useState<string | null>(null); // Error state for answers


  const [answerContent, setAnswerContent] = useState('');
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [answerError, setAnswerError] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        const fetchedQuestion = await getQuestionById(questionId);
        if (fetchedQuestion) {
          setQuestion(fetchedQuestion);
           // Initial answers might be fetched here as well if you modify getQuestionById
           // to include answers in the initial fetch.
        } else {
          setError('Question not found.');
        }
      } catch (err: any) {
        console.error("Error fetching question details:", err);
        setError('Error loading question.');
      } finally {
        setLoading(false);
      }
    };

    if (questionId) {
      fetchQuestion();

      // **Set up real-time listener for answers**
      const answersCollectionRef = collection(db, 'questions', questionId, 'answers');
      const answersQuery = query(answersCollectionRef, orderBy('createdAt', 'asc')); // Order answers

      const unsubscribe = onSnapshot(answersQuery, (snapshot) => {
        const fetchedAnswers: any[] = [];
        snapshot.forEach((doc) => {
           const answerData = doc.data();
           // You would also fetch the author data for each answer here if not doing it in getQuestionById
           // Or ensure your AnswerCard handles fetching author data internally

           // For now, let's just add the basic answer data
           fetchedAnswers.push({ id: doc.id, ...answerData });
        });
        console.log("Real-time answers update:", fetchedAnswers);
        setAnswers(fetchedAnswers);
        setAnswersLoading(false);
      }, (error) => {
         console.error("Error fetching real-time answers:", error);
         setAnswersError("Failed to load answers.");
         setAnswersLoading(false);
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();

    }

  }, [questionId]); // Re-run effect if questionId changes

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnswerError(null);
    setIsSubmittingAnswer(true);

    if (!answerContent.trim()) {
      setAnswerError('Answer content cannot be empty.');
      setIsSubmittingAnswer(false);
      return;
    }

    try {
       const authorId = 'placeholder-author-id'; // **Replace with actual authenticated user ID**

       console.log(`Attempting to submit answer for question ${questionId} with content: ${answerContent}`);

       const answerId = await addAnswer(questionId, { content: answerContent, authorId: authorId });

       console.log('Answer added with ID:', answerId);

       toast({
          title: "Answer Posted!",
          description: "Your answer has been successfully added.",
       });

       setAnswerContent(''); // Clear the input

       // The real-time listener will automatically update the answers state

    } catch (err: any) {
       console.error('Error adding answer:', err);
       setAnswerError(err.message || 'An error occurred while posting your answer.');
       toast({
          variant: "destructive",
          title: "Failed to post answer.",
          description: err.message || "An error occurred.",
       });
    } finally {
       setIsSubmittingAnswer(false);
    }
  };


  if (loading) {
    return <div className="container mx-auto py-8">Loading question...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Error: {error}</div>;
  }

  if (!question) {
      return <div className="container mx-auto py-8">Question not found.</div>;
  }


  return (
    <div className="container mx-auto py-8">
      <Card>
        {/* ... (Question Card Header and Content) */}
         <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                 {/* Display answer count from question object */}
                <span>{question.answerCount || 0} Answers</span>
            </div>
        </CardFooter>
      </Card>

      <Separator className="my-8" />

      {/* Section for displaying answers */}
      <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Answers</h2>
          {answersLoading && <div className="text-center">Loading answers...</div>}
          {answersError && <div className="text-red-500 text-center">{answersError}</div>}
          {!answersLoading && !answersError && (
              <div className="space-y-6">
                {answers.length > 0 ? (
                    answers.map((answer: any) => (
                       <AnswerCard key={answer.id} answer={answer} />
                    ))
                ) : (
                    <p>No answers yet. Be the first to answer!</p>
                )}
              </div>
          )}
        </section>

        <Separator className="my-8" />

      {/* Your Answer Form Section */}
      <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Your Answer</h2>
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <Textarea
              placeholder="Write your answer here..."
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              rows={6}
              disabled={isSubmittingAnswer}
            />
            {answerError && <p className="text-red-500 text-sm text-center">{answerError}</p>}
            <Button type="submit" disabled={!answerContent.trim() || isSubmittingAnswer}>
              {isSubmittingAnswer ? 'Submitting...' : 'Post Your Answer'}
            </Button>
          </form>
        </section>

    </div>
  );
}
