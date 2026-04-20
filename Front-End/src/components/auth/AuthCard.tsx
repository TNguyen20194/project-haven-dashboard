import { z } from "zod";
import "./authCard.css";

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "@tanstack/react-form";

import { Card, CardContent } from "../ui/card";
import Button from "@/UI/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

import { createUser, loginUser } from "@/lib/auth-storage";
import { type AuthMode, useAuthUiStore } from "@/stores/auth-ui.store";

const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { error: "Must include at least one uppercase letter" })
  .regex(/[a-z]/, { error: "Must include at least one lowercase letter" })
  .regex(/\d/, { error: "Must include at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    error: "Must include at least one special character",
  });

const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { error: "Full name must be at least 3 characters." }),
    email: z.email({ error: "Please enter a valid email." }),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Path of error
    error: "Make sure password match.",
  });

const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
  password: z.string().min(1, { error: "Please enter your password" }),
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

  const isSignup = mode === "signup";

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      clearMessage();

      try {
        if (isSignup) {
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

  const handleModeChange = (nextMode: string) => {
    const safeMode: AuthMode = nextMode === "signup" ? "signup" : "login";

    setMode(safeMode);
    clearMessage();
    form.reset();
    setSearchParams({ mode: safeMode });
  };

  return (
    <main className="auth-page">
      <Card className="auth-page-container">
        <CardContent className="p-0">
          <div className="welcome">
            <h1>Welcome</h1>
            <p>Sign in to your account or create a new one</p>
          </div>

          <Tabs
            value={mode}
            onValueChange={handleModeChange}
            className="w-full"
          >
            <TabsList className="auth-tabs grid w-full grid-cols-2">
              <TabsTrigger value="login" className="auth-tab">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="auth-tab">
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            {isSignup && (
              <form.Field
                name="fullName"
                validators={{
                  onChange: ({ value }) => {
                    const result = signupSchema.shape.fullName.safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="form-group">
                    <Label htmlFor={field.name}>Full Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Full Name"
                      className="auth-input"
                    />
                    {field.state.meta.errors[0] ? (
                      <p className="auth-field-error">
                        {field.state.meta.errors[0]}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>
            )}
            {/* EMAIL */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .email({ error: "Please enter a valid email address." })
                    .safeParse(value);

                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <div className="form-group">
                  <Label htmlFor={field.name}>Email Address</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="email@address.com"
                    className="auth-input"
                  />
                  {field.state.meta.errors[0] ? (
                    <p className="auth-field-error">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* PASSWORD */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const result = isSignup
                    ? passwordSchema.safeParse(value)
                    : z
                        .string()
                        .min(1, { error: "Please enter your password." })
                        .safeParse(value);

                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <div className="form-group">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={
                      isSignup ? "Create Password" : "Enter Password"
                    }
                    className="auth-input"
                  />
                  {field.state.meta.errors[0] ? (
                    <p className="auth-field-error">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            {isSignup && (
              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    const password = String(
                      fieldApi.form.getFieldValue("password") ?? "",
                    );
                    if (!value) return "Please confirm your password.";
                    if (value !== password) return "Make sure passwords match.";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="form-group">
                    <Label htmlFor={field.name}>Confirm Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Confirm Password"
                      className="auth-input"
                    />
                    {field.state.meta.errors[0] ? (
                      <p className="auth-field-error">
                        {field.state.meta.errors[0]}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>
            )}

            <form.Subscribe
              selector={(state) => ({
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ isSubmitting }) => (
                <Button
                  type="submit"
                  className="auth-btn w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Please wait..."
                    : isSignup
                      ? "Create Account"
                      : "Login"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div
            className={[
              "message-container",
              messageType === "success" ? "message-container--success" : "",
              messageType === "error" ? "message-container--error" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <p className={[
                "form-message",
                message ? "form-message--visible" : "",
                messageType === "success" ? "form-message--success" : "",
                messageType === "error" ? "form-message--error" : ""
            ].filter(Boolean).join(" ")
            }>
                {message}
            </p>

          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default AuthCard;
