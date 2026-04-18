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
    confirmPassword: ""
}

const AuthCard = () => {
  return <h3>TEST</h3>;
};

export default AuthCard;
