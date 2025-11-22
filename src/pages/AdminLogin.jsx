import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useUser()

  const navigate = useNavigate();

  function handleLogin() {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, {
      email: email,
      password: password
    },
      { withCredentials: true }
    )
      .then(res => {
        toast.success(`${res.data.message}`)
        setEmail("")
        setPassword("")
        navigate("/admin")
        setUser(res.data.user)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // console.log(res.data)
      }
      )
      .catch(err => {
        console.log(err)
        toast.error(`${err.response.data.message}`)
      })
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 w-full">
      <Card className="w-96 shadow-2xl shadow-gray-500">
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
