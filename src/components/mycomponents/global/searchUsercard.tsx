import { MessagesSquare, Music } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 16;

// Accept users as a prop!
function SearchUserCard({ users }: { users: any[] }) {
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    // Handle page change
    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // For filtered pagination
    useEffect(() => {
        setCurrentPage(1);
    }, [users]);

    

    // Pagination slice
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentUsers = users.slice(startIndex, endIndex);

    // Pagination numbers
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 4;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) pages.push(i);
            pages.push("ellipsis", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "ellipsis");
            for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1, "ellipsis");
            for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
            pages.push("ellipsis", totalPages);
        }
        return pages;
    };

    // Loading state skeleton
    if (!users) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-1 2xl:gap-2">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                    <Skeleton key={idx} className="h-40 rounded-3xl w-full" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex-1">
                {users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-zinc-200 mb-2">No users found</h3>
                        <p className="text-zinc-400 max-w-md">
                            Try adjusting your search criteria or filters to find more users.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 2xl:gap-4">
                        {currentUsers.map((element, index) => (
                            <div key={index} className="p-1.5 relative bg-gradient-to-br group from-zinc-900 to-zinc-950 cursor-pointer rounded-2xl border border-zinc-800 flex flex-col gap-2 w-full">
                                <div className="flex flex-col relative w-full overflow-hidden rounded-2xl">
                                    {element.avatarurl && element.avatarurl.length > 0 ? (
                                        <img
                                            src={element.avatarurl}
                                            alt={element.username}
                                            className="w-full rounded-xl object-cover ease-in-out group-hover:scale-105 transition-all duration-300"
                                        />
                                    ) : (
                                        <img
                                            src="/profile/6.jpg"
                                            alt={element.username}
                                            className="w-full rounded-xl object-cover ease-in-out group-hover:scale-105 transition-all duration-300"
                                        />
                                    )}

                                    <div className="flex flex-col gap-0.5 px-1 pt-1 rounded-b-2xl w-full">
                                        <div className="flex gap-1 items-center">
                                            <div className="text-lg text-white">{element.username}</div>
                                        </div>
                                        
                                        
                                        <div className="py-2 w-full">
                                            <Link
                                                to={`/profile/${element.username}`}
                                                className="py-1.5 justify-center bg-[#19FF00] hover:bg-[#1aff0096] transition-all duration-200 px-3 rounded-lg flex items-center text-sm text-black font-semibold"
                                            >
                                                Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && users.length > 0 && (
                <div className="mt-auto pt-6 pb-3 sm:pb-0 absolute -bottom-14 w-full">
                    <div className="flex items-center justify-center px-4">
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
                                        <PaginationItem key={index}>
                                            {page === "ellipsis" ? (
                                                <PaginationEllipsis />
                                            ) : (
                                                <PaginationLink
                                                    onClick={() => {
                                                        goToPage(page as number);
                                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                                    }}
                                                    isActive={currentPage === page}
                                                    className="cursor-pointer rounded-xl"
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
    );
}

import { useEffect, useState } from "react"; // add this if missing, for useState/useEffect!
import { Link } from "react-router-dom";

export default SearchUserCard;
