import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, ChevronRight, TriangleAlert, X, CircleHelp } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { login } from "@/api/auth";

// Animation keyframes: for any animated ring effects (injects only once per load)
const verifyAnimation = `
@keyframes verify-ring { 0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); } 50% { box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3); } 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); } }
@keyframes success-ring { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } 50% { box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
@keyframes error-ring { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } 50% { box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
.animate-verify-slot { animation: verify-ring 1s ease-in-out; }
.animate-success-slot { animation: success-ring 1s ease-in-out; }
.animate-error-slot { animation: error-ring 1s ease-in-out; }
.animate-verify-slot:nth-child(1) { animation-delay: 0s; }
.animate-verify-slot:nth-child(2) { animation-delay: 0.1s; }
.animate-verify-slot:nth-child(3) { animation-delay: 0.2s; }
.animate-verify-slot:nth-child(4) { animation-delay: 0.3s; }
.animate-verify-slot:nth-child(5) { animation-delay: 0.4s; }
.animate-verify-slot:nth-child(6) { animation-delay: 0.5s; }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = verifyAnimation;
document.head.appendChild(styleSheet);

function LogInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const navigate = useNavigate();

    // Toggle show/hide password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    // Animated error popup, clears after timeout or immediate close
    const showError = (message: string) => {
        setError(message);
        setIsErrorVisible(true);
        setTimeout(() => {
            setIsErrorVisible(false);
            setTimeout(() => {
                setError(null);
            }, 300);
        }, 3000);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email.includes('@')) {
            showError('Invalid email. Try again');
            setLoading(false);
            return;
        }

        if (email.length < 1 || password.length < 1) {
            showError('Please enter your credentials');
            setLoading(false);
            return;
        }

        try {
            await login(email, password, true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error: any) {
            showError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    }

    // For simple Google OAuth: just bounce to backend Google login endpoint
    const handleGoogleAuth = async () => {
        try {
            const API_URL = 'https://localhost:7091';
            window.location.href = `${API_URL}/api/account/login/google`;
        } catch (error) {
            console.error('Google authentication error:', error);
            showError('Google authentication failed. Please try again.');
        }
    }

    return (
        <div className="w-full h-screen sm:justify-center items-center flex flex-col gap-2 p-0 sm:py-0 transition-all">
            <div className="sm:rounded-4xl w-full h-screen sm:h-fit sm:w-92 relative bg-zinc-900 sm:border border-zinc-800 drop-shadow-xl p-4 transition-all duration-300 ease-in-out overflow-hidden sm:max-h-[510px]">
                <div className="flex justify-between items-center">
                    <div className="p-1.5 hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer">
                        <CircleHelp className="w-4.5 h-4.5" />
                    </div>
                    <h1 className="text-md py-1.5 font-medium">Login to GamingWithMe</h1>
                    <Link to='../' className="p-1.5 hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer">
                        <X className="w-4.5 h-4.5" />
                    </Link>
                </div>

                {/* Animated error notification */}
                {error && (
                    <div className={`absolute z-50 top-4 p-2 bg-red-500/10 backdrop-blur-2xl border border-red-500/20 rounded-xl w-88 sm:w-84 flex justify-between items-center transition-all duration-300 ease-in-out transform ${isErrorVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
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
                            className="p-2 px-3 pr-4 group flex gap-2 justify-between items-center h-12 rounded-xl border border-zinc-800 hover:bg-zinc-800/80 bg-zinc-800/40 transition-all duration-300 cursor-pointer"
                        >
                            <div className="p-1 bg-zinc-950/40 border border-zinc-800 rounded-lg">
                                {/* Google colored svg */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
                                    <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
                                    <path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
                                    <path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                                    <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
                                </svg>
                            </div>
                            <div className="text-sm text-zinc-200 font-medium">Continue With Google</div>
                            <div className="opacity-0 w-8 flex justify-end group-hover:opacity-100 transition-all duration-300">
                                <ChevronRight className="w-4 h-4 text-white" />
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
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember" className="text-sm text-zinc-400">Remember me</Label>
                                </div>
                                <div className="">
                                    <Link to={"/forgot-password"} className="text-xs text-zinc-400 hover:underline">forgot password?</Link>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-11 rounded-xl bg-green-500 text-black hover:bg-green-500/80 transition-all duration-300 cursor-pointer"
                            >
                                {loading ? "Loggin in..." : "Login"}
                            </Button>
                        </form>

                        <div className="text-center text-sm text-zinc-400 mt-2">
                            Don't have an account?{" "}
                            <Link to="/registration" className="text-green-500 hover:text-green-400 underline">
                                Registration
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogInForm
