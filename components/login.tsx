"use client";
import { useState } from "react";
import api from "../utils/axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import Loading from "./ui/loading";
import { AxiosError } from "axios";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const [formLogin, setFormLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (formLogin) {
      try {
        const response = await api.post("/api/auth/login", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        setError(
          "Failed to login: " +
            (error.response?.data?.message || error.message || "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    } else {
      try {
        console.log("Sending registration data:", { email });
        const response = await api.post("/api/auth/register", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        console.log("User data:", response.data.user);
        setUser(response.data.user);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.error("Registration error details:", error.response?.data);
        setError(
          "Failed to register: " +
            (error.response?.data?.message || error.message || "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <form
        className="w-full max-w-md flex  flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">
          {formLogin ? "Login" : "Register"}
        </h1>
        <Label htmlFor="name">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Label htmlFor="name">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        {error && (
          <div className="bg-red-500/50 text-red-200 p-2 rounded-md border-destructive">
            {error}
          </div>
        )}
        <div className="flex  justify-between items-center">
          <p>
            {formLogin ? "New here?" : "Already have an account?"}{" "}
            <Button
              type="button"
              variant="ghost"
              className="p-1"
              onClick={() => setFormLogin(!formLogin)}
            >
              {formLogin ? "Register" : "Login"}
            </Button>
          </p>
          {formLogin && <p>Forgot Password</p>}
        </div>
        <Button
          type="submit"
          className="w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loading /> : formLogin ? "Login" : "Register"}
        </Button>
      </form>
    </section>
  );
}
