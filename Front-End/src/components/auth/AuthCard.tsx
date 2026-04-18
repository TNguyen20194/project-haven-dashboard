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
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Please include at least 1 uppercase character.")
  .regex(/[a-z]/, "Please include at least 1 lowercase character.")
  .regex(/\d/, "Please include at least 1 number.")
  .regex(/[^A-Za-z0-9]/, "Please include at least 1 special character.");

const AuthCard = () => {
  return <h3>TEST</h3>;
};

export default AuthCard;
