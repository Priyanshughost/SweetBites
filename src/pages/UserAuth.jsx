import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const navigate = useNavigate()
    const [tab, setTab] = useState("login");
    // LOGIN STATE
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [showLoginPass, setShowLoginPass] = useState(false);

    // SIGNUP STATE
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
    });
    const [showSignupPass, setShowSignupPass] = useState(false);

    function handleSignupChange(e) {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }

    function handleSignup() {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/${tab}`, signupData, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                localStorage.setItem("role", res.data.role)
                setLoginEmail("")
                setLoginPass("")
                navigate("/")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    function handleLogin() {
        // console.log(loginEmail, "\n", loginPass)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/${tab}`, { email: loginEmail, password: loginPass }, { withCredentials: true })
            .then((res) => {
                // console.log(res.data)
                toast.success(res.data.message)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                localStorage.setItem("role", res.data.role)
                setLoginEmail("")
                setLoginPass("")
                navigate("/")
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    }
    return (
        <div className="min-h-screen min-w-full flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="min-w-full sm:min-w-md shadow-2xl shadow-gray-700 rounded-2xl"
            >
                <Card className="w-full border">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-3xl font-semibold tracking-tight">
                            Welcome to SweetBites
                        </CardTitle>
                        <CardDescription className="text-stone-600 mt-1">
                            {tab === "login" ? "Login to your account" : "Create a new Account"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Tabs value={tab} onValueChange={setTab} className="w-full mt-4">
                            <TabsList className="grid grid-cols-2 mb-6 rounded-xl">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="signup">Signup</TabsTrigger>
                            </TabsList>

                            {/* LOGIN FORM */}
                            <TabsContent value="login">
                                <motion.div
                                    key="login-form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="space-y-4"
                                >
                                    {/* Email */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="space-y-2"
                                    >
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </motion.div>

                                    {/* Password w/ Toggle */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-2"
                                    >
                                        <Label>Password</Label>
                                        <div className="relative">
                                            <Input
                                                type={showLoginPass ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={loginPass}
                                                onChange={(e) => setLoginPass(e.target.value)}
                                                className="pr-12"
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setShowLoginPass(!showLoginPass)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                            >
                                                {showLoginPass ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </div>
                                    </motion.div>

                                    {/* Login Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Button className="w-full text-base" onClick={handleLogin}>Login</Button>
                                    </motion.div>
                                </motion.div>
                            </TabsContent>

                            {/* SIGNUP FORM */}
                            <TabsContent value="signup">
                                <motion.div
                                    key="signup-form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.05 }}
                                            className="space-y-1.5"
                                        >
                                            <Label>Full Name</Label>
                                            <Input
                                                type="text"
                                                placeholder="John Doe"
                                                name="name"
                                                value={signupData.name}
                                                onChange={handleSignupChange}
                                                required
                                            />
                                        </motion.div>

                                        {/* Email */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="space-y-1.5"
                                        >
                                            <Label>Email</Label>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                name="email"
                                                value={signupData.email}
                                                onChange={handleSignupChange}
                                                required
                                            />
                                        </motion.div>

                                        {/* Phone */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                            className="space-y-1.5"
                                        >
                                            <Label>Phone Number</Label>
                                            <Input
                                                type="number"
                                                placeholder="9876543210"
                                                name="phone"
                                                value={signupData.phone}
                                                onChange={handleSignupChange}
                                                required
                                            />
                                        </motion.div>

                                        {/* Password with toggle */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="space-y-1.5"
                                        >
                                            <Label>Password</Label>
                                            <div className="relative">
                                                <Input
                                                    type={showSignupPass ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    name="password"
                                                    value={signupData.password}
                                                    onChange={handleSignupChange}
                                                    className="pr-12"
                                                    required
                                                />

                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setShowSignupPass(!showSignupPass)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                                >
                                                    {showSignupPass ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </Button>
                                            </div>
                                        </motion.div>

                                        {/* Address */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25 }}
                                            className="space-y-1.5 md:col-span-2"
                                        >
                                            <Label>Address</Label>
                                            <Input
                                                type="text"
                                                placeholder="Street, City, State"
                                                name="address"
                                                value={signupData.address}
                                                onChange={handleSignupChange}
                                                required
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Create Account Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        className="mt-6"
                                    >
                                        <Button className="w-full text-base h-11" onClick={handleSignup}>
                                            Create Account
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
