import { QuestionCard } from './question-card';

export function QuestionList({ questions }: { questions: any[] }) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
