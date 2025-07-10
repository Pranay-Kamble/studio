'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, HelpCircle, Tag, Book, Beaker, Code, Sigma, History, Filter } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { subjects, tags } from '@/lib/data';

export function AppSidebar() {
  const pathname = usePathname();


  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold font-headline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 2l-2 4-4 2 4 2 2 4 2-4 4-2-4-2z"/><path d="M2 12l2 4 4 2-4 2-2 4-2-4-4-2 4-2z"/></svg>
            <span className="">Nexus Node</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === '/' && 'bg-muted text-primary'
              )}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/ask"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === '/ask' && 'bg-muted text-primary'
              )}
            >
              <HelpCircle className="h-4 w-4" />
              Ask a Question
            </Link>
          </nav>
        </div>
        <div className="flex-1 overflow-auto">
            <div className="px-2 lg:px-4">
                <h3 className="mb-2 mt-4 px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-3">
                    <Filter className="h-4 w-4" />
                    Filters
                </h3>
            </div>
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

            <h4 className="mb-1 mt-2 px-3 text-sm font-semibold text-foreground">Subjects</h4>
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => {
                  // Handle subject filtering here
                  // For now, we'll just log the subject
                  console.log('Filtering by subject:', subject.name);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-sm"
              >
                {subject.icon ? (
 <subject.icon className="h-4 w-4" />
 ) : (
 <Tag className="h-4 w-4" /> // Fallback icon if subject.icon is null or undefined
 )}
 {subject.name}
              </button>
            ))}
          </nav>
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-4">
             <h4 className="mb-1 mt-2 px-3 text-sm font-semibold text-foreground">Tags</h4>
            {tags.slice(0, 5).map((tag) => (
              <Link
                key={tag.id}
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-sm"
              >
                <Tag className="h-4 w-4" />
                {tag.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          {/* Placeholder for future sidebar footer content */}
        </div>
      </div>
    </div>
  );
}
