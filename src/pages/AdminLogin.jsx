import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
  if (email === "admin@example.com" && password === "admin123") {
    localStorage.setItem("authToken", "logged-in");
    navigate("/admin/dashboard");
  } else {
    alert("Invalid credentials");
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>

        <CardFooter>
          <Button className="w-full bg-stone-900" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
