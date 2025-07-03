import { Mail, Lock, Eye, EyeOff, User, Tag, ChevronRight, TriangleAlert, CircleHelp, X } from "lucide-react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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

function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const [staticError, setStaticError] = useState<string | null>(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        if (!email.includes('@')) {
            setStaticError('Invalid email. Try again')
            setTimeout(() => {
                setIsErrorVisible(true);
            }, 0);
            setLoading(false);
        } else if (email.length < 1 || password.length < 1 || username.length < 1) {
            setStaticError('Please enter your creadentials')
            setTimeout(() => {
                setIsErrorVisible(true);
            }, 0);
        } else {
            setTimeout(() => {
                setShowSuccess(true);
            }, 300);
            e.preventDefault();
            setLoading(true);
            removeStaticError();
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
                navigate('/signin');
            }, 2000);

            // Cleanup the timer if component unmounts
            return () => clearTimeout(redirectTimer);
        }
    }, [success, navigate]); // Add success and navigate to dependencies


    return (
        <>
            <div className="w-full h-screen sm:justify-center items-center flex flex-col gap-2 py-4 sm:py-0 transition-all">
                <div className={`rounded-4xl relative bg-zinc-900 sm:border w-96 sm:w-92 border-zinc-800 drop-shadow-xl p-4 transition-all duration-500 ease-in-out overflow-hidden `}>
                    {!success ? (
                        <div className="flex justify-between items-center">
                            <div className=" p-1.5 hover:bg-zinc-800  rounded-lg transition-all duration-300 cursor-pointer">
                                <CircleHelp className="w-4.5 h-4.5" />
                            </div>
                            <h1 className="text-md py-1.5 font-medium">Sign Up To GamingWithMe</h1>
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
                                <Link to="/" className="p-2 px-3 pr-4 group flex gap-2 justify-between items-center h-12 rounded-xl hover:bg-zinc-800/80 bg-zinc-800/40 transition-all duration-300">
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12" />
                                        </svg>
                                    </div>
                                    <div className="text-sm text-zinc-200 font-medium">Continue With Discord</div>
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
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col gap-0.5">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <User className="h-4 w-4 text-zinc-500" />
                                                </div>
                                                <Input
                                                    id="firstName"
                                                    type="text"
                                                    placeholder="First name"
                                                    className="pl-10 h-12 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                />

                                            </div>

                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <User className="h-4 w-4 text-zinc-500" />
                                                </div>
                                                <Input
                                                    id="lastName"
                                                    type="text"
                                                    placeholder="Last name"
                                                    className="pl-10 h-12 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                />

                                            </div>

                                        </div>
                                    </div>
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
                                        <div className="text-xs text-zinc-400">Already have an account? <Link to="../" className="text-green-400 hover:underline">Sign In</Link></div>
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
export default SignUpForm