import { questions } from '@/lib/data';
import { QuestionCard } from './question-card';

export function QuestionList() {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
