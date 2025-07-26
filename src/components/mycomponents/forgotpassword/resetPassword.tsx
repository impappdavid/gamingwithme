import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, TriangleAlert, X, CircleHelp, EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ResetPasswordEndpoin } from "@/api/auth";

// --- Removed unused stylesheet creation ---

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const navigate = useNavigate();

    // Pull email/token values from URL query params
    const url = new URL(window.location.href);
    const email = url.searchParams.get("email");
    const token = url.searchParams.get("token");

    // Error popup (auto-hides after a delay)
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

    // Handle reset form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Require email and token present before submitting
        if (!email || !token) {
            showError("Missing email or token.");
            setLoading(false);
            return;
        }
        try {
            await ResetPasswordEndpoin(email, token, newPassword);
            setSuccess(`Your new password is saved`);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error: any) {
            showError("Wrong email. We didn't find this email in our system.");
        } finally {
            setLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="w-full h-screen sm:justify-center items-center flex flex-col gap-2 p-0 sm:py-0 transition-all">
            <div className="sm:rounded-4xl w-full h-screen sm:h-fit sm:w-92 relative bg-zinc-900 sm:border border-zinc-800 drop-shadow-xl p-4 transition-all duration-300 ease-in-out overflow-hidden sm:max-h-[510px]">
                <div className="flex justify-between items-center">
                    <div className="p-1.5 hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer">
                        <CircleHelp className="w-4.5 h-4.5" />
                    </div>
                    <h1 className="text-md py-1.5 font-medium">Reset Password</h1>
                    <Link to='../' className="p-1.5 hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer">
                        <X className="w-4.5 h-4.5" />
                    </Link>
                </div>

                {/* Error alert, animates in and out */}
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

                {/* Success alert */}
                {success && (
                    <div className={`absolute z-50 top-4 p-2 bg-green-500/10 backdrop-blur-2xl border border-green-500/20 rounded-xl w-88 sm:w-84 flex justify-between items-center transition-all duration-300 ease-in-out transform ${success.length > 0 ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
                        <div className="flex gap-2 items-center">
                            <div className="p-2 bg-green-500/20 rounded-md">
                                <TriangleAlert className="text-green-500 w-5 h-5" />
                            </div>
                            <div className="text-sm">{success}</div>
                        </div>
                        <div onClick={() => setSuccess(null)} className="p-1.5 hover:text-green-500 rounded-lg transition-all duration-300 cursor-pointer">
                            <X className="w-4.5 h-4.5" />
                        </div>
                    </div>
                )}

                <div className="relative">
                    <div className="py-6 flex flex-col gap-2 w-full sm:w-84 transition-all duration-500 transform translate-x-0 opacity-100">
                        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-0.5">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Lock className="h-4 w-4 text-zinc-500" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New password"
                                        className="pl-10 pr-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
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

                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-11 rounded-xl bg-green-500 text-black hover:bg-green-500/80 transition-all duration-300 cursor-pointer"
                            >
                                {loading ? "Saving..." : "Save"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword
