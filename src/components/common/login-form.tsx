"use client";

import * as React from "react";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import { LoginFormData } from "@/lib/types";
import { validateForm } from "@/lib/helpers";
import { useAuth } from "@/lib/hooks/use-auth";

const LoginForm = (): React.ReactElement => {
  const { login, error } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] =
    useState<Partial<LoginFormData>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetData = () => {
    setFormData({
      email: "",
      password: "",
    });
    setValidationErrors({});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      router.push("/calls");
      resetData();
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setValidationErrors({ email: err.message });
      } else {
        setValidationErrors({ email: "Login failed. Please try again." });
      }
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <Logo />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                  {validationErrors?.email && (
                    <div className="text-red-500 text-sm">
                      {validationErrors.email}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                  {validationErrors?.password && (
                    <div className="text-red-500 text-sm">
                      {validationErrors.password}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="mt-4 text-red-500 text-sm">{error}</div>
              )}

              <div className="pt-4">
                <Button
                  loading={isLoading}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Log in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
