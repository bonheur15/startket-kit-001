"use client";

import { CardWrapper } from "./card-wrapper";

export const VerifyEmailForm = () => {
  return (
    <CardWrapper
      headerLabel="Check your email"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        <p className="text-center">
          We have sent you a confirmation email. Please check your inbox and click the link to verify your account.
        </p>
      </div>
    </CardWrapper>
  );
};
