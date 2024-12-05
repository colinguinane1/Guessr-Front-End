"use client";
import { useState } from "react";
import api from "../utils/axios";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "./ui/button";
import Loading from "./ui/loading";
import Link from "next/link";
import { AxiosError } from "axios";
import { useUser } from "@/context/UserContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Sending registration data:", { email });
      const response = await api.post("/api/auth/register", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      console.log("User data:", response.data.user);
      setUser(response.data.user);
      window.location.href = "/account";
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
  };

  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
      <form
        className="w-full max-w-md flex p-4  flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <Label htmlFor="name">Email</Label>
        <Input
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Label htmlFor="name">Password</Label>
        <Input
          id="password"
          type="text"
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
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </p>
          <p>Forgot Password</p>
        </div>
        <Button
          type="submit"
          className="w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loading /> : "Register"}
        </Button>
      </form>
    </section>
  );
}
