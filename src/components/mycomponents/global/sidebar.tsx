import { BadgeCheck, Crown, Gamepad2, MessagesSquare, Music, Plus, Swords, Youtube } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import '../../../i18n';

import { getUserCommonInfos, getUserIsOnboarding, getUserProfile, continueStripe } from "@/api/user"
import { becomeACreator  } from "@/api/creator"

// Define interfaces for better type safety
interface OnboardingInfo {
    onboardingComplete: boolean;
}
interface BecomeCreatorResponse {
    onboardingUrl: string;
    connectedAccountId: string;
}
interface ContinueStripeResponse {
    url: string;
    type: "account_onboarding";
}

function Sidebar() {
    const { t } = useTranslation();
    const [isCreator, setIsCreator] = useState(false);
    const [onboardingComplete, setOnboardingComplete] = useState(false);
    const [tags, setTags] = useState([""]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const baseClass = "flex gap-2 items-center p-2 rounded-lg transition-all duration-200";

    // Navigation function used for redirection; fallback if React Router's useNavigate isn't available
    const navigate = (window as any).navigate || ((url: string) => { window.location.href = url });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const common = await getUserCommonInfos();
                if (common && common.username) {
                    const full = await getUserProfile(common.username);
                    const isOnBoard = await getUserIsOnboarding() as OnboardingInfo;

                    setIsCreator(full.hasStripeAccount);
                    setOnboardingComplete(isOnBoard?.onboardingComplete || false);
                    setTags(full.tags);

                    if (common.isAdmin) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    setIsCreator(false);
                    setOnboardingComplete(false);
                }
            } catch (err: any) {
                setError(err?.message || "Failed to fetch user info");
                setIsCreator(false);
                setOnboardingComplete(false);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Handles Stripe creator onboarding/continuation
    const handleSetupClick = async () => {
        try {
            const common = await getUserCommonInfos();
            if (!common) {
                navigate("/login");
                return;
            }

            if (isCreator && !onboardingComplete) {
                // Continue onboarding flow in Stripe
                const response = await continueStripe("onboarding") as ContinueStripeResponse;
                if (response && response.url) {
                    window.open(response.url, '_blank');
                }
            } else {
                // Begin becoming a creator
                const response = await becomeACreator();
                if (response && response.data) {
                    const data = response.data as BecomeCreatorResponse;
                    if (data && data.onboardingUrl) {
                        window.open(data.onboardingUrl, '_blank');
                    }
                }
            }
        } catch (err) {
            console.error("Failed to handle creator setup:", err);
            navigate("/login");
        }
    };

    return (
        <div className="xl:min-w-60 h-screen hidden sm:flex flex-col justify-between py-4">
            <div className="flex flex-col gap-2">
                <Link to={'../'} className="flex gap-1 items-center p-3 px-4">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                    <h1 className="text-lg font-semibold hidden xl:flex">GamingWithMe</h1>
                </Link>

                <div className="flex flex-col gap-1 p-2">
                    <NavLink
                        to="../just-chatting"
                        className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black`
                                : `${baseClass} text-[#19FF00] hover:text-[#1aff00c0]`
                        }
                    >
                        <MessagesSquare className="w-5 h-5 text-[#2856F4]" />
                        <div className="text-md font-medium hidden xl:flex">{t("Just Chatting")}</div>
                    </NavLink>
                    <NavLink
                        to="../gamers"
                        className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black`
                                : `${baseClass} text-[#19FF00] hover:text-[#1aff00c0]`
                        }
                    >
                        <Gamepad2 className="w-5 h-5 text-[#2856F4]" />
                        <div className="text-md font-medium hidden xl:flex">{t("Gamers")}</div>
                    </NavLink>
                    <NavLink
                        to="../music"
                        className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black`
                                : `${baseClass} text-[#19FF00] hover:text-[#1aff00c0]`
                        }
                    >
                        <Music className="w-5 h-5 text-[#2856F4]" />
                        <div className="text-md font-medium hidden xl:flex">{t("Music")}</div>
                    </NavLink>
                    <NavLink
                        to="../tiktok"
                        className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black fill-black`
                                : `${baseClass} text-[#19FF00] hover:text-[#1aff00c0] fill-[#19FF00] hover:fill-[#1aff00c0]`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-[#2856F4]">
                            <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
                        </svg>
                        <div className="text-md font-medium hidden xl:flex">Tiktok</div>
                    </NavLink>
                    <NavLink
                        to="../youtube"
                        className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black fill-black`
                                : `${baseClass} text-[#19FF00] hover:text-[#1aff00c0]`
                        }
                    >
                        <Youtube className="w-5 h-5 text-[#2856F4]" />
                        <div className="text-md font-medium hidden xl:flex">Youtube</div>
                    </NavLink>
                    <NavLink
                        to="../games"
                        className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black fill-black`
                                : `${baseClass} text-[#19FF00] hover:text-[#1aff00c0]`
                        }
                    >
                        <Swords className="w-5 h-5 text-[#2856F4]" />
                        <div className="text-md font-medium hidden xl:flex">{t("Games")}</div>
                    </NavLink>
                </div>

                <div className="px-2">
                    <div className="h-[1.5px] w-full bg-zinc-900"></div>
                </div>

                <div className="flex flex-col gap-1 p-2">
                    {loading ? (
                        <div className={`${baseClass} opacity-50`}>
                            <div className="w-5 h-5 bg-zinc-700 rounded animate-pulse"></div>
                            <div className="w-20 h-4 bg-zinc-700 rounded animate-pulse hidden xl:block"></div>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="text-6xl mb-4">❌</div>
                            <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
                            <p className="text-zinc-400 max-w-md">{error}</p>
                        </div>
                    ) : isCreator ? (
                        <>
                            {onboardingComplete ? (
                                <>
                                    {tags.includes("Gamer") ? (
                                        <>
                                            <NavLink
                                                to="/create-listing"
                                                className={`${baseClass} bg-[#1aff00c0] cursor-pointer border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}
                                            >
                                                <Plus className="w-5 h-5" />
                                                <div className="text-md font-medium hidden xl:flex">{t("Create listing")}</div>
                                            </NavLink>
                                            <NavLink
                                                to="/create-service"
                                                className={`${baseClass} bg-[#1aff00c0] cursor-pointer border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}
                                            >
                                                <Plus className="w-5 h-5" />
                                                <div className="text-md font-medium hidden xl:flex">{t("Create service")}</div>
                                            </NavLink>
                                        </>
                                    ) : (
                                        <NavLink
                                            to="/create-service"
                                            className={`${baseClass} bg-[#1aff00c0] cursor-pointer border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}
                                        >
                                            <Plus className="w-5 h-5" />
                                            <div className="text-md font-medium hidden xl:flex">{t("Create service")}</div>
                                        </NavLink>
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={handleSetupClick}
                                    className={`${baseClass} bg-[#1aff00c0] border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}
                                >
                                    <BadgeCheck className="w-5 h-5" />
                                    <div className="text-md font-medium hidden xl:flex">{t("Continue setup")}</div>
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={handleSetupClick}
                            className={`${baseClass} bg-[#1aff00c0] border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}
                        >
                            <BadgeCheck className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">{t("Become")}</div>
                        </button>
                    )}
                </div>

                <div className="px-2">
                    <div className="h-[1.5px] w-full bg-zinc-900"></div>
                </div>

                <div className="flex flex-col gap-1 p-2">
                    {isAdmin === true ? (
                        <NavLink
                            to="../admin"
                            className={`${baseClass} text-[#19FF00] hover:text-[#1aff00c0]`}
                        >
                            <Crown className="w-5 h-5 text-[#2856F4]" />
                            <div className="text-md font-medium hidden xl:flex">{t("Admin")}</div>
                        </NavLink>
                    ) : (
                        <div className=""></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
