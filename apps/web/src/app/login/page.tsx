import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login | personalai.cloud',
  description: 'Sign in to your PersonalAI account',
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Welcome Back</h1>
          <p className="text-slate-600">Sign in to your PersonalAI account</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
}
