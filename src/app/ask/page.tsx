import { AskQuestionForm } from '@/components/ask-question-form';

export default function AskPage() {
  return (
    <div className="container mx-auto py-8">
        <h1 className="text-3xl font-headline font-bold mb-6">Ask a Public Question</h1>
        <AskQuestionForm />
    </div>
  );
}
