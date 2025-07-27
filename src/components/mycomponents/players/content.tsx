import { useTranslation } from "react-i18next";
import Navbar from "../navbar/navbar"
import Filter from "../global/filter"
import { useState, useMemo, useEffect } from "react"
import { getUsersByTag } from "@/api/user";
import type { UserProfileWithTags } from "@/api/types";
import Footer from "../global/footer";
import GamerCard from "../global/gamerCard";

// User type for UserCard
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

// Map API user to UI user
const mapApiUserToUI = (apiUser: UserProfileWithTags): User => ({
  id: apiUser.id,
  username: apiUser.username,
  avatarurl: apiUser.avatarurl,
  bio: apiUser.bio,
  isActive: apiUser.isActive,
  languages: apiUser.languages,
  games: apiUser.games,
  tags: apiUser.tags,
  hasStripeAccount: apiUser.hasStripeAccount,
  bookings: apiUser.bookings,
  availability: apiUser.availability,
  joined: apiUser.joined,
});

function Content() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filterText, setFilterText] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const apiUsers = await getUsersByTag("Gamer");
        if (apiUsers) {
          setUsers(apiUsers.map(mapApiUserToUI));
        } else {
          setUsers([]);
        }
      } catch (err) {
        setError("Failed to fetch users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      // Text filter (name or game)
      const textMatch =
        filterText === "" ||
        user.username.toLowerCase().includes(filterText.toLowerCase()) ||
        user.games.some(game => game.toLowerCase().includes(filterText.toLowerCase()));




      return textMatch;
    });



    return filtered;
  }, [users, filterText, minPrice, maxPrice]);

  const { t } = useTranslation()

  return (
    <div className="w-full h-full xl:h-screen sm:p-2">
      <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
          <Navbar page={t("Gamers")} />
        </div>
        <div className="min-h-[950px]">
          <Filter
            filterText={filterText}
            setFilterText={setFilterText}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <div className="p-2">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-zinc-400">Loading players...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-red-400">{error}</div>
              </div>
            ) : (
              <GamerCard users={filteredUsers} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Content