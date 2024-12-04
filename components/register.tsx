"use client";
import { useState } from "react";
import api from "../utils/axios";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "./ui/button";
import { AxiosError } from "axios";
import Loading from "./ui/loading";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Attempting registration with:", { email, password });
      const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/account";
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Registration error:", err);
      setError(
        "Failed to register: " +
          (error.response?.data?.message || error.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <form
        className="w-full max-w-md flex  flex-col gap-4"
        onSubmit={handleSubmit}
      >
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
