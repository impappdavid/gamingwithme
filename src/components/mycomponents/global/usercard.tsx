import { MessagesSquare } from "lucide-react"
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
  service?: any // added field for their first service
};

const ITEMS_PER_PAGE = 21;

function UserCard({
  users,
  servicesLoading,
}: {
  users: User[];
  servicesLoading: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  // Bounds-checked page control, scroll to top of list
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logic for page #s and ellipses in pagination bar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
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
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-zinc-200 mb-2">No users found</h3>
            <p className="text-zinc-400 max-w-md">
              Try adjusting your search criteria or filters to find more users.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7  gap-3 2xl:gap-6">
            {currentUsers.map((user, index) => (
              // Use user.id as key if available for better React performance, fall back to index
              <div key={user.id ?? index} className="p-1.5 relative bg-gradient-to-br group from-zinc-900 to-zinc-950 cursor-pointer rounded-2xl border border-zinc-800 flex flex-col gap-2 w-full">
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
                    {/* Service Description (shows loading, empty, or first service description) */}
                    <div className="text-xs text-zinc-400 min-h-6">
                      {servicesLoading
                        ? "Loading..."
                        : user.service?.description ??
                          (user.service === null ? "No description" : "Loading...")}
                    </div>
                    {/* Tag icons */}
                    <div className="flex items-center">
                      <div className="grid grid-cols-4 gap-1 pt-1">
                        {user.tags.map((tag, idx) => (
                          <span key={idx}>
                            {tag === "Just chatting" ? (
                              <div className="p-1 bg-white rounded-md">
                                <MessagesSquare className="w-4 h-4 text-black" />
                              </div>
                            ) : tag === "Musician" ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                                <path fill="#ff04ec" fillRule="evenodd" d="m10.995 0l.573.001q.241 0 .483.007c.35.01.705.03 1.051.093c.352.063.68.166.999.329a3.36 3.36 0 0 1 1.47 1.468c.162.32.265.648.328 1c.063.347.084.7.093 1.051q.007.241.007.483l.001.573v5.99l-.001.573q0 .241-.008.483c-.01.35-.03.704-.092 1.05a3.5 3.5 0 0 1-.33 1a3.36 3.36 0 0 1-1.468 1.468a3.5 3.5 0 0 1-1 .33a7 7 0 0 1-1.05.092q-.241.007-.483.008l-.573.001h-5.99l-.573-.001q-.241 0-.483-.008a7 7 0 0 1-1.052-.092a3.6 3.6 0 0 1-.998-.33a3.36 3.36 0 0 1-1.47-1.468a3.6 3.6 0 0 1-.328-1a7 7 0 0 1-.093-1.05Q.002 11.81 0 11.568V5.005l.001-.573q0-.241.007-.483c.01-.35.03-.704.093-1.05a3.6 3.6 0 0 1 .329-1A3.36 3.36 0 0 1 1.9.431A3.5 3.5 0 0 1 2.896.1A7 7 0 0 1 3.95.008Q4.19.002 4.432 0h.573zm-.107 2.518l-4.756.959H6.13a.66.66 0 0 0-.296.133a.5.5 0 0 0-.16.31c-.004.027-.01.08-.01.16v5.952c0 .14-.012.275-.106.39c-.095.115-.21.15-.347.177l-.31.063c-.393.08-.65.133-.881.223a1.4 1.4 0 0 0-.519.333a1.25 1.25 0 0 0-.332.995c.031.297.166.582.395.792c.156.142.35.25.578.296c.236.047.49.031.858-.043c.196-.04.38-.102.555-.205a1.4 1.4 0 0 0 .438-.405a1.5 1.5 0 0 0 .233-.55c.042-.202.052-.386.052-.588V6.347c0-.276.08-.35.302-.404c.024-.005 3.954-.797 4.138-.833c.257-.049.378.025.378.294v3.524c0 .14-.001.28-.096.396c-.094.115-.211.15-.348.178l-.31.062c-.393.08-.649.133-.88.223a1.4 1.4 0 0 0-.52.334a1.26 1.26 0 0 0-.34.994c.03.297.174.582.404.792a1.2 1.2 0 0 0 .577.294c.237.048.49.03.858-.044c.197-.04.381-.098.556-.202a1.4 1.4 0 0 0 .438-.405q.173-.252.233-.549a2.7 2.7 0 0 0 .044-.589V2.865c0-.273-.143-.443-.4-.42c-.04.003-.383.064-.424.073" />
                              </svg>
                            ) : tag === "Tiktoker" ? (
                              <div className="p-1 bg-black rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
                                </svg>
                              </div>
                            ) : tag === "Youtuber" ? (
                              <div className="p-1 bg-red-600 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73" />
                                </svg>
                              </div>
                            ) : (
                              <div className=""></div>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Profile button: shows price from service, or -- if loading/missing */}
                    <div className="py-2 w-full">
                      <Link
                        to={`/profile/${user.username}`}
                        className="py-1.5 justify-center bg-[#19FF00] hover:bg-[#1aff0096] transition-all duration-200 px-3 rounded-lg flex items-center text-sm text-black font-semibold"
                      >
                        $
                        {servicesLoading
                          ? "--"
                          : typeof user.service?.price === "number"
                            ? user.service.price
                            : "--"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination controls, only show if multiple pages */}
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
                    {/* Fix: this now goes to previous page not same page */}
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

export default UserCard
