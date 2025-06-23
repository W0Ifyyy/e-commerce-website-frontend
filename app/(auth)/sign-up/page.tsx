import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
