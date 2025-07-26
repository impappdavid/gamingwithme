import { useTranslation } from "react-i18next"
import Carousel from "./carousel"
import Navbar from "../navbar/navbar"
import type { UserProfile } from "@/api/types";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/api/user";
import { Link, useParams } from "react-router-dom";
import { fetchGame } from "@/api/rawg";
import Services from "./services";
import GamerServices from "./gamerService";

function Content() {
    const { slug } = useParams<{ slug: string }>();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gameImages, setGameImages] = useState<string[]>([]); // holds fetched images
    const [userId, setUserId] = useState("")

    useEffect(() => {
        if (!slug) return;

        const fetchUser = async () => {
            setLoading(true);
            try {
                const apiUser = await getUserProfile(slug);
                setUser(apiUser);
                setUserId(String(apiUser.id))
            } catch (err) {
                setError("Failed to fetch user");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [slug]);

    // Fetch game images from user.games
    useEffect(() => {
        const fetchImages = async () => {
            if (!user?.games || user.games.length === 0) return;

            const gamesToFetch = user.games.slice(0, 3); // limit to 3 games
            const images: string[] = [];

            for (const gameName of gamesToFetch) {
                try {
                    const game = await fetchGame(gameName);
                    images.push(game?.background_image || "/profile/6.jpg");
                } catch (err) {
                    console.error(`Failed to fetch game ${gameName}`, err);
                    images.push("/profile/6.jpg");
                }
            }

            setGameImages(images);
        };

        fetchImages();
    }, [user]);



    const { t } = useTranslation()

    if (loading) {
        return (
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("profile")} />
                    </div>
                    <div className="flex items-center justify-center h-64">
                        <div className="text-zinc-400">Loading profile...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("profile")} />
                    </div>
                    <div className="flex items-center justify-center h-64">
                        <div className="text-red-400">{error || "User not found"}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full xl:h-screen sm:p-2">
            <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                    <Navbar page={t("profile")} />
                </div>
                <div className="p-2 sm:p-4 flex flex-col gap-4">
                    <div className="pl-4 flex flex-col sm:flex-row gap-2">
                        <div className=" rounded-2xl w-fit">
                            {user.avatarurl && user.avatarurl.length > 0 ? (
                                <img src={user.avatarurl} alt="user" className="w-24 sm:min-w-36 sm:h-36 rounded-2xl" />
                            ) : (
                                <img src="/profile/6.jpg" alt="user" className="w-24 sm:min-w-36 sm:h-36 rounded-2xl" />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl">{user.username}</div>
                            <div className="text-sm text-zinc-400 max-w-4xl">
                                {user.bio}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {user.tags.map((tag, index) => (
                                    <div key={index}>
                                        {tag === "Gamer" ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-xs w-fit">
                                                    {tag}
                                                </div>
                                                <div className="flex gap-2 flex-wrap mt-2">
                                                    {gameImages.length > 0 ? (
                                                        gameImages.map((img, i) => (
                                                            <img
                                                                key={i}
                                                                src={img}
                                                                alt={`Game ${i + 1}`}
                                                                className="w-10 h-10 object-cover rounded-lg "
                                                            />
                                                        ))
                                                    ) : (
                                                        <div className="text-zinc-500 text-sm">No games found</div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : tag === "Just chatting" ? (
                                            <div className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-xs w-fit">
                                                {tag}
                                            </div>
                                        ) : tag === "Musician" ? (
                                            <div className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-xs w-fit">
                                                {tag}
                                            </div>
                                        ) : tag === "Tiktoker" ? (
                                            <div className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-xs w-fit">
                                                {tag}
                                            </div>
                                        ) : tag === "Youtuber" ? (
                                            <div className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-xs w-fit">
                                                {tag}
                                            </div>
                                        ) : (
                                            <div className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-xs w-fit">
                                                {tag}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                {user?.twitterUrl?.length > 0 ? (
                                    <Link to={user.twitterUrl} className="text-sm underline">Twitter</Link>
                                ) : (
                                    <div className=""></div>
                                )}
                                {user?.instagramUrl?.length > 0 ? (
                                    <Link to={user.instagramUrl} className="text-sm underline">Instagram</Link>
                                ) : (
                                    <div className=""></div>
                                )}
                                {user?.facebookUrl?.length > 0 ? (
                                    <Link to={user.facebookUrl} className="text-sm underline text-blue-500">Facebook</Link>
                                ) : (
                                    <div className=""></div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="px-4 py-2 flex flex-col gap-2">
                        {user.tags.includes("Gamer") ? (
                            <div className="grid lg:grid-cols-2 gap-4">
                                <Carousel userId={String(user.id)} />
                                {/* Services expects a string, so pass user.id as a string */}
                                <GamerServices userId={user.id} />
                            </div>
                        ) : (
                            <>
                                <Services userId={userId} />
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Content