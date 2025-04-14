import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
    }}
    >
      <header className="flex justify-end p-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div>{children}</div>
    </ClerkProvider>
  );
}

export default AdminLayout;
