import { create } from "zustand";

export type AuthMode = "login" | "signup";
export type MessageType = "idle" | "success" | "error";

type AuthUiState = {
  mode: AuthMode;
  message: string;
  messageType: MessageType;
  setMode: (mode: AuthMode) => void;
  setMessage: (message: string, messageType: MessageType) => void;
  clearMessage: () => void;
};

export const useAuthUiStore = create<AuthUiState>((set) => ({
  mode: "login",
  message: "",
  messageType: "idle",

  setMode: (mode) =>
    set({
      mode,
      message: "",
      messageType: "idle",
    }),

    setMessage: (message, messageType) =>
        set({
            message,
            messageType,
        }),

    clearMessage: () =>
        set({
            message: "",
            messageType: "idle"
        })
}));
