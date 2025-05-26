"use client";

import React from "react";
import { Form, Input, Button, Link } from "@heroui/react";

export default function LoginForm() {
  const [action, setAction] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setAction(`submit ${JSON.stringify(data)}`);
  };

  const handleReset = () => {
    setAction("reset");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-md  bg-zinc-950 border border-zinc-800 shadow-xl rounded-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-200">Welcome Back</h1>
          <p className="text-zinc-500 text-sm mt-1">Login to your account</p>
        </div>

        <Form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Input
            isRequired
            label="Name"
            name="name"
            placeholder="Enter your name"
            type="text"
            labelPlacement="outside"
          />
          <Input
            isRequired
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            labelPlacement="outside"
            errorMessage="Please enter a valid email"
          />
          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            labelPlacement="outside"
            errorMessage="Password is required"
          />

          <Button color="primary" type="submit" className="w-full mt-5">
            Sign In
          </Button>

          <Button
            type="reset"
            variant="flat"
            className="w-full text-sm text-zinc-500"
          >
            Clear Form
          </Button>

          {action && (
            <div className="text-sm text-center text-zinc-500 mt-2">
              Action: <code>{action}</code>
            </div>
          )}
        </Form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            <Link href="/auth/login">LogIn</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
