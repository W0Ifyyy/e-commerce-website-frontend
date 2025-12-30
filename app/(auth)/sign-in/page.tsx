import LogInForm from "@/components/auth/LogInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <LogInForm />
    </div>
  );
}
