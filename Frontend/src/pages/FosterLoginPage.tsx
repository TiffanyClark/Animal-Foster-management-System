import { LoginCard } from '@/components/shared/loginCard';

export default function FosterLoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <LoginCard
        title="Foster Parent Login"
        description="Sign in to the foster parent portal"
        signUpTitle="Create Foster Account"
        signUpDescription="Enter your details to get started"
      />
    </main>
  );
}
