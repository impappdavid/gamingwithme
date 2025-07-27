import { useState, useEffect } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { fetchGame } from "@/api/rawg";

type User = {
    id: number
    username: string
    avatarurl: string
    bio: string
    isActive: boolean
    languages: string[]
    games: string[]
    tags: string[]
    hasStripeAccount: boolean
    bookings: {
        id: string,
        startTime: Date,
        duration: string,
        customerName: string
    }[]
    availability: {
        id: string,
        date: Date,
        startTime: string,
        endTime: string,
        isAvailable: boolean
    }[]
    joined: string
};

const ITEMS_PER_PAGE = 21;

function GamerCard({ users }: { users: User[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const [gameImages, setGameImages] = useState<{ [username: string]: string[] }>({});

    // Reset to first page when user list changes (filter, etc)
    useEffect(() => {
        setCurrentPage(1);
    }, [users]);

    // Calculate items on current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentUsers = users.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Fetch RAWG images (limit two per user for performance)
    useEffect(() => {
        const fetchImages = async () => {
            const images: { [username: string]: string[] } = {};
            await Promise.all(currentUsers.map(async (creator) => {
                // Only fetch up to two games per user for display
                const games = creator.games ? creator.games.slice(0, 2) : [];
                const imgArr: string[] = [];
                for (const gameName of games) {
                    const game = await fetchGame(gameName);
                    imgArr.push(game && game.background_image ? game.background_image : "/profile/6.jpg");
                }
                images[creator.username] = imgArr;
            }));
            setGameImages(images);
        };
        if (currentUsers.length > 0) {
            fetchImages();
        }
    }, [currentUsers]);

    // Render pagination controls, compressing for large numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 4;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex-1">
                {users.length === 0 ? (
                    // No users found message
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-zinc-200 mb-2">{t("No users found")}</h3>
                        <p className="text-zinc-400 max-w-md">
                        {t("Try adjusting your search criteria or filters to find more users.")}
                        </p>
                    </div>
                ) : (
                    // User grid
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 2xl:gap-6">
                        {currentUsers.map((user) => (
                            <div key={user.id} className="p-1.5 relative bg-gradient-to-br group from-zinc-900 to-zinc-950 cursor-pointer rounded-2xl border border-zinc-800 flex flex-col gap-2 w-full ">
                                <div className="flex flex-col relative w-full overflow-hidden rounded-2xl">
                                    {user.avatarurl.length > 0 ? (
                                        <img src={user.avatarurl} alt={user.username} className="w-full rounded-xl object-cover ease-in-out group-hover:scale-105 transition-all duration-300" />
                                    ) : (
                                        <img src="/profile/6.jpg" alt={user.username} className="w-full rounded-xl object-cover ease-in-out group-hover:scale-105 transition-all duration-300" />
                                    )}

                                    <div className="flex flex-col gap-0.5 px-1 pt-1 rounded-b-2xl w-full" >
                                        <div className="flex gap-1 items-center">
                                            <div className="text-lg">{user.username}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="grid grid-cols-4 gap-1">
                                                {gameImages[user.username] && gameImages[user.username].length > 0 && (
                                                    <>
                                                        <img
                                                            src={gameImages[user.username][0]}
                                                            alt={user.games[0] || "game"}
                                                            className="w-6 h-6 rounded-md object-cover"
                                                        />
                                                        {user.games.length > 2 ? (
                                                            <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-white">
                                                                +{user.games.length - 1}
                                                            </div>
                                                        ) : user.games.length === 2 && gameImages[user.username][1] ? (
                                                            <img
                                                                src={gameImages[user.username][1]}
                                                                alt={user.games[1] || "game"}
                                                                className="w-6 h-6 rounded-md object-cover"
                                                            />
                                                        ) : null}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="py-2 w-full">
                                            <Link to={`/profile/${user.username}`} className="py-1.5 justify-center bg-[#19FF00] hover:bg-[#1aff0096] transition-all duration-200 px-3 rounded-lg flex items-center text-sm text-black font-semibold">{t("BOOK")}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Controls - Fixed at bottom */}
            {totalPages > 1 && users.length > 0 && (
                <div className="mt-auto pt-6 pb-3 sm:pb-0 absolute -bottom-22 w-full">
                    <div className="flex items-center justify-center sm:justify-between px-4">
                        <div className="text-sm text-zinc-400 sm:flex hidden">
                            {Math.min(endIndex, users.length)} / {users.length} {t("users")}
                        </div>
                        <div className="flex justify-end">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => goToPage(currentPage - 1)}
                                            className={`rounded-xl ${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                                        />
                                    </PaginationItem>

                                    {getPageNumbers().map((page, index) => (
                                        <PaginationItem key={page === 'ellipsis' ? `ellipsis-${index}` : page}>
                                            {page === 'ellipsis' ? (
                                                <PaginationEllipsis />
                                            ) : (
                                                <PaginationLink
                                                    onClick={() => {
                                                        goToPage(page as number);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    isActive={currentPage === page}
                                                    className="cursor-pointer rounded-xl "
                                                >
                                                    {page}
                                                </PaginationLink>
                                            )}
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => goToPage(currentPage + 1)}
                                            className={`rounded-xl ${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default GamerCard
