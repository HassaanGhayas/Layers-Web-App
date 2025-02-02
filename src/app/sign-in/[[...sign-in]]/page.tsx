import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="py-10">
        <SignIn />
      </div>
    </div>
  );
}
