import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      path="/sign-in"
      appearance={{
        elements: {
          emailAddressInput: {
            placeholder: "Enter your email address",
          },
        },
      }}
    />
  );
}
