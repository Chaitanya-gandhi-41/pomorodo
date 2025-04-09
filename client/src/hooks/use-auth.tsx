import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { User, insertUserSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<Omit<User, "password">, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<Omit<User, "password">, Error, RegisterData>;
};

type LoginData = {
  username: string;
  password: string;
};

// Extend the user schema with validation for registration
const registerUserSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirm: z.string(),
}).superRefine(({ password, passwordConfirm }, ctx) => {
  if (password !== passwordConfirm) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords don't match",
      path: ["passwordConfirm"]
    });
  }
});

type RegisterData = z.infer<typeof registerUserSchema>;

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        return await apiRequest<User>("/api/user");
      } catch (error) {
        if ((error as Error).message.includes("401")) {
          return null;
        }
        throw error;
      }
    },
  });

  const loginMutation = useMutation<Omit<User, "password">, Error, LoginData>({
    mutationFn: async (credentials) => {
      return apiRequest<Omit<User, "password">>("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(["/api/user"], userData);
      toast({
        title: "Welcome back!",
        description: `You are now logged in as ${userData.username}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation<Omit<User, "password">, Error, RegisterData>({
    mutationFn: async (credentials) => {
      // Omit the passwordConfirm field before sending to server
      const { passwordConfirm, ...registerData } = credentials;
      return apiRequest<Omit<User, "password">>("/api/register", {
        method: "POST",
        body: JSON.stringify(registerData),
      });
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(["/api/user"], userData);
      toast({
        title: "Registration successful!",
        description: `Welcome to BeProd, ${userData.username}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await apiRequest("/api/logout", {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}