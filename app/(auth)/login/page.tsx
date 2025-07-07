"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => signIn("google")}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "none",
          background: "#4285F4",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
