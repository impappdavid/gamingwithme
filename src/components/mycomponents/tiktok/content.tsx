import Navbar from "../navbar/navbar"
import UserCard from "../global/usercard"
import Filter from "../global/filter"
import { useState, useMemo, useEffect } from "react"
import Footer from "../global/footer";
import { getUsersByTag } from "@/api/user";
import type { UserProfileWithTags } from "@/api/types";

// User type for UI
type User = {
  name: string;
  profilePic: string;
  games: string[];
  cost: string;
  active: boolean;
};

// Map API user to UI user
const mapApiUserToUI = (apiUser: UserProfileWithTags): User => ({
  name: apiUser.username,
  profilePic: apiUser.avatarurl || "/profile/25.jpg",
  games: apiUser.games,
  cost: "$0.00/game", // Update when pricing is available
  active: apiUser.isActive,
});

function Content() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filterText, setFilterText] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [orderBy, setOrderBy] = useState<string>("highest");
  const [showActive, setShowActive] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const apiUsers = await getUsersByTag("tiktok");
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
    
    // Sort by price
    if (orderBy === "highest") {
      filtered.sort((a, b) => parseFloat(b.cost.replace(/[^\d.]/g, "")) - parseFloat(a.cost.replace(/[^\d.]/g, "")));
    }
    if (orderBy === "lowest") {
      filtered.sort((a, b) => parseFloat(a.cost.replace(/[^\d.]/g, "")) - parseFloat(b.cost.replace(/[^\d.]/g, "")));
    }
    if (orderBy === "newest") {
      filtered = filtered.slice().reverse();
    }
    
    return filtered;
  }, [users, filterText, minPrice, maxPrice, orderBy, showActive]);
  
  return (
    <div className="w-full h-full xl:h-screen sm:p-2">
      <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
          <Navbar page="TikTok" />
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
              <div className="flex items-center justify-center h-32">
                <div className="text-zinc-400">Loading users...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-red-400">{error}</div>
              </div>
            ) : (
              <UserCard users={filteredUsers} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Content 