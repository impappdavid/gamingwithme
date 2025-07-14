import { Mail, Lock, Eye, EyeOff, Tag, ChevronRight, TriangleAlert, CircleHelp, X, CircleAlert } from "lucide-react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { registration } from "@/api/registration"

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
    const navigate = useNavigate();


    const [staticError, setStaticError] = useState<string | null>(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

       

        // Validate password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }
        try {
            await registration(email, password, username, googleId);
            navigate('/login')
            setShowSuccess(true)
            // Clear form
            setEmail("");
            setPassword("");
        } catch (error: any) {
            setError(error.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    }



    const removeStaticError = () => {
        setIsErrorVisible(false);
        setTimeout(() => {
            setStaticError(null);
        }, 300);
    }




    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
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
    }, [success, navigate]); // Add success and navigate to dependencies


    return (
        <>
            <div className="w-full h-screen sm:justify-center items-center flex flex-col gap-2 p-0 sm:py-0 transition-all">
                <div className={`sm:rounded-4xl relative bg-zinc-900 sm:border h-screen sm:h-fit w-full sm:w-92 border-zinc-800 drop-shadow-xl p-4 transition-all duration-500 ease-in-out overflow-hidden `}>
                    {!success ? (
                        <div className="flex justify-between items-center">
                            <div className=" p-1.5 hover:bg-zinc-800  rounded-lg transition-all duration-300 cursor-pointer">
                                <CircleHelp className="w-4.5 h-4.5" />
                            </div>
                            <h1 className="text-md py-1.5 font-medium">Registrate To GamingWithMe</h1>
                            <Link to='../' className=" p-1.5 hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer" >
                                <X className="w-4.5 h-4.5" />
                            </Link>
                        </div>
                    ) : (
                        <div className=""></div>
                    )}
                    {staticError && (
                        <div className={`absolute top-4 p-2 z-50  bg-red-500/10 backdrop-blur-2xl border border-red-500/20  rounded-xl w-88 sm:w-84 flex justify-between items-center transition-all duration-300 ease-in-out transform ${isErrorVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-red-500/20 rounded-md">
                                    <TriangleAlert className="text-red-400 w-5 h-5" />
                                </div>
                                <div className="text-sm">
                                    {staticError}
                                </div>
                            </div>
                            <div onClick={removeStaticError} className="p-1.5 hover:text-red-500 rounded-lg transition-all duration-300 cursor-pointer">
                                <X className="w-4.5 h-4.5" />
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        {!success ? (
                            <div className={`py-3 flex flex-col gap-2 w-full sm:w-84 transition-all duration-500 transform`}>
                                <Link to="/" onClick={()=> setGoogleId("asd")} className="p-2 px-3 pr-4 group flex gap-2 justify-between items-center h-12 rounded-xl hover:bg-zinc-800/80 bg-zinc-800/40 transition-all duration-300">
                                    <div className="p-1 bg-zinc-950/40 border border-zinc-800  rounded-lg">
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
                                </Link>
                                
                                <Link to="/" className="p-2 px-3 pr-4 group flex gap-2 justify-between items-center h-12 rounded-xl hover:bg-zinc-800/80 bg-zinc-800/40 transition-all duration-300">
                                    <div className="p-1 bg-zinc-950/40 border border-zinc-800  rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256">
                                            <path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" />
                                            <path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z" />
                                        </svg>
                                    </div>
                                    <div className="text-sm text-zinc-200 font-medium">Continue With Facebook</div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </Link>
                                <div className="flex items-center gap-2 w-full py-1">
                                    <Separator className="flex-1" />
                                    <span className="text-xs text-zinc-600">OR</span>
                                    <Separator className="flex-1" />
                                </div>
                                <form className="flex flex-col gap-2">

                                    <div className="flex flex-col gap-0.5">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Tag className="h-4 w-4 text-zinc-500" />
                                            </div>
                                            <Input
                                                id="username"
                                                type="text"
                                                placeholder="Username"
                                                className="pl-10 h-12 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
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
                                                className="pl-10 h-12 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />

                                        </div>

                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-500" />
                                        </div>
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            className="pl-10 h-12 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <div className="pr-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute inset-y-1.5 pr-2 right-0 flex items-center justify-center hover:bg-transparent dark:hover:bg-transparent text-gray-500 hover:text-white  cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4 " /> : <Eye className="h-4 w-4 " />}
                                            </Button>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="text-red-400 p-2 h-8 text-xs border border-red-500/40 bg-red-500/20 rounded-lg transition-all duration-300 flex items-center gap-1">
                                            <CircleAlert className="w-4 h-4 text-red-400" />
                                            <div className="">
                                                {error}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between my-2 ">
                                        <div className="flex items-center space-x-1 ">
                                            <Checkbox id="terms" />
                                            <Label htmlFor="terms" className="text-xs text-zinc-400 cursor-pointer font-medium">I agree to the Terms & Privacy</Label>
                                        </div>
                                    </div>
                                    <Button
                                        disabled={loading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubmit(e); // still call the async logic
                                        }}
                                        className="rounded-xl h-12 bg-green-500 hover:bg-green-600 transition-all duration-300 cursor-pointer">
                                        {loading ? 'Creating Account... ' : 'Sign up'}
                                    </Button>
                                    <div className="flex justify-center w-full mt-2">
                                        <div className="text-xs text-zinc-400">Already have an account? <Link to="../login" className="text-green-400 hover:underline">Login</Link></div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="py-8">
                                <motion.div
                                    className="flex justify-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.4, 0, 0.2, 1],
                                        scale: {
                                            type: "spring",
                                            damping: 15,
                                            stiffness: 200,
                                        },
                                    }}
                                >
                                    <div className="relative">
                                        <motion.div
                                            className="absolute inset-0 blur-xl bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: 0.2,
                                                duration: 0.8,
                                                ease: "easeOut",
                                            }}
                                        />
                                        <Checkmark
                                            size={80}
                                            strokeWidth={4}
                                            color="rgb(16 185 129)"
                                            className="relative z-10 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                                        />
                                    </div>
                                </motion.div>
                                <div className="text-xl font-medium text-center">Account Created</div>
                                <div className="text-center text-sm">redirecting...</div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}
export default RegistrationForm