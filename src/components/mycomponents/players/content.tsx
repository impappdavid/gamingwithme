import { useTranslation } from "react-i18next";
import Navbar from "../navbar/navbar"
import UserCard from "../global/usercard"
import Filter from "../global/filter"
import { useState, useMemo, useEffect } from "react"
import { GetAllUser } from "@/api/categories"
import type { UserInfos } from "@/api/categories"
import Footer from "../global/footer";

// User type for UserCard
type User = {
  name: string;
  profilePic: string;
  games: string[];
  cost: string;
  active: boolean;
};

// Helper to map API user to UserCard user
const mapApiUserToUserCard = (apiUser: UserInfos): User => ({
  name: apiUser.username,
  profilePic: apiUser.avatarurl || "/profile/default.jpg",
  games: apiUser.games,
  cost: "$0.00/game", // You can update this if your API provides cost info
  active: apiUser.isActive,
});

function Content() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const apiUsers = await GetAllUser();
        if (apiUsers && Array.isArray(apiUsers)) {
          setUsers(apiUsers.map(mapApiUserToUserCard));
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

  // Filter state
  const [filterText, setFilterText] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [orderBy, setOrderBy] = useState<string>("highest");
  const [showActive, setShowActive] = useState<boolean>(false);

  // Filtering logic
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      // Text filter (name or game)
      const textMatch =
        filterText === "" ||
        user.name.toLowerCase().includes(filterText.toLowerCase()) ||
        user.games.some(game => game.toLowerCase().includes(filterText.toLowerCase()));
      
      // Price filter
      const price = parseFloat(user.cost.replace(/[^\d.]/g, ""));
      const minOk = minPrice === undefined || price >= minPrice;
      const maxOk = maxPrice === undefined || price <= maxPrice;
      
      // Active filter
      const activeOk = !showActive || user.active;
      
      return textMatch && minOk && maxOk && activeOk;
    });
    
    // Order
    if (orderBy === "highest") filtered.sort((a, b) => parseFloat(b.cost.replace(/[^\d.]/g, "")) - parseFloat(a.cost.replace(/[^\d.]/g, "")));
    if (orderBy === "lowest") filtered.sort((a, b) => parseFloat(a.cost.replace(/[^\d.]/g, "")) - parseFloat(b.cost.replace(/[^\d.]/g, "")));
    // Newest: just reverse the array for demo
    if (orderBy === "newest") filtered = filtered.slice().reverse();
    return filtered;
  }, [users, filterText, minPrice, maxPrice, orderBy, showActive]);
  
  const { t } = useTranslation()
  return (
    <>
      <div className="w-full h-full xl:h-screen sm:p-2">
        <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
          <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
            <Navbar page={t("Players")} />
          </div>
          <div className="min-h-[950px]">
            <Filter
              filterText={filterText}
              setFilterText={setFilterText}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              showActive={showActive}
              setShowActive={setShowActive}
            />
            <div className="p-2">
              {loading ? (
                <div>Loading users...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <UserCard users={filteredUsers} />
              )}
            </div>
          </div>
          <div >
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
export default Content