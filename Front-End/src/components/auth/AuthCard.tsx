import { z } from "zod";

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "@tanstack/react-form";

import { Card, CardContent } from "../ui/card";
import Button from "@/UI/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsContent } from "../ui/tabs";

import { createUser, loginUser } from "@/lib/auth-storage";
import { type AuthMode, useAuthUiStore } from "@/stores/auth-ui.store";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
  .regex(/\d/, { message: "Must include at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Must include at least one special character",
  });

const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters." }),
    email: z.email({ message: "Please enter a valid email." }),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Path of error
    message: "Make sure password match.",
  });

const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

type AuthFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultValues: AuthFormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthCard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { mode, setMode, message, messageType, setMessage, clearMessage } =
    useAuthUiStore();

  useEffect(() => {
    const urlMode = searchParams.get("mode") === "signup" ? "signup" : "login";
    setMode(urlMode);
  }, [searchParams, setMode]);

  const isSignUp = mode === "signup";

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      clearMessage();

      try {
        if (isSignUp) {
          const parsed = signupSchema.parse(value);

          createUser({
            fullName: parsed.fullName.trim(),
            email: parsed.email.trim(),
            password: parsed.password,
          });

          setMessage("Successfully registered!", "success");

          setTimeout(() => {
            navigate("/dashboard");
          }, 900);

          return;
        }

        const parsed = loginSchema.parse({
          email: value.email,
          password: value.password,
        });

        loginUser(parsed.email, parsed.password);

        setMessage("Login successfully!", "success");

        setTimeout(() => {
          navigate("/dashboard");
        }, 900);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setMessage(
            error.issues[0]?.message ?? "Please check your input.",
            "error",
          );
          return;
        }

        if (error instanceof Error) {
          setMessage(error.message, "error");
          return;
        }

        setMessage("Something went wrong.", "error");
      }
    },
  });

  return <h3>TEST</h3>;
};

export default AuthCard;
