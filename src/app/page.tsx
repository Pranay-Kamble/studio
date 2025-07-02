import { QuestionList } from '@/components/question-list';
import { subjects } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="container mx-auto">
       <Tabs defaultValue={subjects[0].id} className="w-full">
        <div className="flex items-center">
            <TabsList>
                {subjects.map(subject => (
                    <TabsTrigger key={subject.id} value={subject.id}>{subject.name}</TabsTrigger>
                ))}
            </TabsList>
        </div>
        {subjects.map(subject => (
            <TabsContent key={subject.id} value={subject.id}>
                 <QuestionList />
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
