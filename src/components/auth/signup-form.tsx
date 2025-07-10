// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export function SignupForm() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null); // State to hold error messages

//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-xl">Sign Up</CardTitle>
//         <CardDescription>
//           Enter your information to create an account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="full-name">Full name</Label>
//             <Input id="full-name" placeholder="Max Robinson" required onChange={(e) => setFullName(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email or College ID</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />

//           </div>
//           <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
//             Create an account
//           </Button>
//         </div>
//         <div className="mt-4 text-center text-sm">
//           Already have an account?{' '}
//           <Link href="/login" className="underline">
//             Login
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// // Import your Firebase signup function here
// // import { firebaseSignup } from '@/lib/firebaseAuth'; // Example import

// export function SignupForm() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null); // State to hold error messages
//   const [loading, setLoading] = useState(false); // State to manage loading state

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null); // Clear previous errors
//     setLoading(true); // Set loading to true

//     // Basic validation
//     if (!fullName || !email || !password) {
//       setError('Please fill in all fields.');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Replace with your actual Firebase signup function call
//       console.log('Attempting signup with:', { fullName, email, password });
//       // Example placeholder for a Firebase signup function:
//       // await firebaseSignup(email, password);

//       // Simulate a network request
//       await new Promise(resolve => setTimeout(resolve, 1000));


//       // If signup is successful, you might redirect the user or show a success message
//       console.log('Signup successful!');
//       // router.push('/dashboard'); // Example redirect

//     } catch (err: any) {
//       // Handle errors from the signup function
//       console.error('Signup error:', err);
//       setError(err.message || 'An error occurred during signup.');
//     } finally {
//       setLoading(false); // Set loading to false regardless of success or failure
//     }
//   };

//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-xl">Sign Up</CardTitle>
//         <CardDescription>
//           Enter your information to create an account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="full-name">Full name</Label>
//             <Input id="full-name" placeholder="Max Robinson" required onChange={(e) => setFullName(e.target.value)} value={fullName} disabled={loading} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email or College ID</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               disabled={loading}
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={loading} />
//           </div>
//           <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
//             {loading ? 'Creating account...' : 'Create an account'}
//           </Button>
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>} {/* Display error message */}
//         </form>
//         <div className="mt-4 text-center text-sm">
//           Already have an account?{' '}
//           <Link href="/login" className="underline">
//             Login
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError(null); // Clear previous errors

//   // Basic validation
//   if (!fullName || !email || !password) {
//     setError('Please fill in all fields.');
//     return;
//   }

//   try {
//     // Replace with your actual Firebase signup function call
//     console.log('Attempting signup with:', { fullName, email, password });
//     // Example placeholder for a Firebase signup function:
//     // await firebaseSignup(email, password);

//     // If signup is successful, you might redirect the user or show a success message
//     console.log('Signup successful!');
//     // router.push('/dashboard'); // Example redirect
//   } catch (err: any) {
//     // Handle errors from the signup function
//     console.error('Signup error:', err);
//     setError(err.message || 'An error occurred during signup.');
//   }
// };


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import your Firebase signup function here
import { signupWithEmailAndPassword } from '@/lib/firebaseAuth'; // Example import

export function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Set loading to true

    // Basic validation
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual Firebase signup function call
      console.log('Attempting signup with:', { fullName, email, password });
      const user = await signupWithEmailAndPassword(email, password);

      // Simulate a network request
      // await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Signpu Successful');

      // If signup is successful, you might redirect the user or show a success message
      // router.redirect('/'); // Example redirect

    } catch (err: any) {
      // Handle errors from the signup function
      console.error('Signup error:', err);
      setError(err.message || 'An error occurred during signup.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full name</Label>
            <Input id="full-name" placeholder="Max Robinson" required onChange={(e) => setFullName(e.target.value)} value={fullName} disabled={loading} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email or College ID</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={loading} />
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
            {loading ? 'Creating account...' : 'Create an account'}
          </Button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>} {/* Display error message */}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
