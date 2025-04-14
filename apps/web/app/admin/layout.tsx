import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div>{children}</div>
    </ClerkProvider>
  );
}

export default AdminLayout;
