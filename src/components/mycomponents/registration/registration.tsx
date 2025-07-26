import { Mail, Lock, Eye, EyeOff, Tag, ChevronRight, TriangleAlert, CircleHelp, X } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { register } from "@/api/auth"

interface CheckmarkProps {
    size?: number
    strokeWidth?: number
    color?: string
    className?: string
}

export function Checkmark({ size = 100, strokeWidth = 2, color = "currentColor", className = "" }: CheckmarkProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            className={className}
        >
            <title>Animated Checkmark</title>
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke={color}
                custom={0}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <motion.path
                d="M30 50L45 65L70 35"
                stroke={color}
                custom={1}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "transparent",
                }}
            />
        </motion.svg>
    )
}

function RegistrationForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [googleId, setGoogleId] = useState("");
    const [facebookId, setFacebookId] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 3000);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate password length
        if (password.length < 6) {
            showError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            await register(email, password, username, googleId, facebookId);
            setShowSuccess(true);
            // Clear form
            setFacebookId("")
            setEmail("");
            setPassword("");
            setUsername("");
        } catch (error: any) {
            showError(error.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleGoogleAuth = async () => {
        try {
            const API_URL = 'https://localhost:7091';
            window.location.href = `${API_URL}/api/account/register/google`;
        } catch (error) {
            setGoogleId("")
            console.error('Google authentication error:', error);
            showError('Google authentication failed. Please try again.');
        }
    }

   

    useEffect(() => {
        if (success) {
            // Wait for checkmark animation to complete (1.5s) before redirecting
            const redirectTimer = setTimeout(() => {
                navigate('/login');
            }, 2000);

            // Cleanup the timer if component unmounts
            return () => clearTimeout(redirectTimer);
        }
    }, [success, navigate]);

    return (
        <div className="w-full h-screen sm:justify-center items-center flex flex-col gap-2 p-0 sm:py-0 transition-all">
            <div className="sm:rounded-4xl relative bg-zinc-900 sm:border h-screen sm:h-fit w-full sm:w-92 border-zinc-800 drop-shadow-xl p-4 transition-all duration-500 ease-in-out overflow-hidden">
                {!success ? (
                    <div className="flex justify-between items-center">
                        <div className="p-1.5 hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer">
                            <CircleHelp className="w-4.5 h-4.5" />
                        </div>
                        <h1 className="text-md py-1.5 font-medium">Register to GamingWithMe</h1>
                        <Link to='../' className="p-1.5 hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer">
                            <X className="w-4.5 h-4.5" />
                        </Link>
                    </div>
                ) : (
                    <div className=""></div>
                )}
                
                {error && (
                    <div className="absolute top-4 p-2 z-50 bg-red-500/10 backdrop-blur-2xl border border-red-500/20 rounded-xl w-88 sm:w-84 flex justify-between items-center transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
                        <div className="flex gap-2 items-center">
                            <div className="p-2 bg-red-500/20 rounded-md">
                                <TriangleAlert className="text-red-400 w-5 h-5" />
                            </div>
                            <div className="text-sm">{error}</div>
                        </div>
                        <div onClick={() => setError(null)} className="p-1.5 hover:text-red-500 rounded-lg transition-all duration-300 cursor-pointer">
                            <X className="w-4.5 h-4.5" />
                        </div>
                    </div>
                )}

                <div className="relative">
                    <div className="py-3 flex flex-col gap-2 w-full sm:w-84 transition-all duration-500 transform translate-x-0 opacity-100">
                        <Button 
                            onClick={handleGoogleAuth} 
                            disabled={loading}
                            className="p-2 px-3 pr-4 group flex gap-2 justify-between items-center h-12 rounded-xl border border-zinc-800 hover:bg-zinc-800/80 bg-zinc-800/40 transition-all duration-300"
                        >
                            <div className="p-1 bg-zinc-950/40 border border-zinc-800 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
                                    <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
                                    <path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
                                    <path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                                    <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
                                </svg>
                            </div>
                            <div className="text-sm text-zinc-200 font-medium">Continue With Google</div>
                            <div className="opacity-0 w-8 flex justify-end group-hover:opacity-100 transition-all duration-300">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </Button>
                        
                       
                        
                        <div className="flex items-center gap-2 w-full py-1">
                            <Separator className="flex-1" />
                            <span className="text-xs text-zinc-500 dark:text-zinc-600">OR</span>
                            <Separator className="flex-1" />
                        </div>
                        
                        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-0.5">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Tag className="h-4 w-4 text-zinc-500" />
                                    </div>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        className="pl-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-0.5">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Mail className="h-4 w-4 text-zinc-500" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        className="pl-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-0.5">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Lock className="h-4 w-4 text-zinc-500" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="pl-10 pr-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-zinc-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-zinc-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" required />
                                <Label htmlFor="terms" className="text-sm text-zinc-400">
                                    I agree to the terms and conditions
                                </Label>
                            </div>
                            
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="h-11 rounded-xl bg-green-500 text-black hover:bg-green-500/80 transition-all duration-300 cursor-pointer"
                            >
                                {loading ? "Creating account..." : "Create account"}
                            </Button>
                        </form>
                        
                        <div className="text-center text-sm text-zinc-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-green-500 hover:text-green-400 underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm