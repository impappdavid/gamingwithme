import { useTranslation } from "react-i18next";
import Navbar from "../global/navbar"
import UserCard from "../global/usercard"
import Filter from "../global/filter"
import { useState, useMemo } from "react"

// User type
type User = {
  name: string;
  profilePic: string;
  games: string[];
  cost: string;
  active: boolean;
};

function Content() {
  // Generate users for Musician category
  const users: User[] = useMemo(() => {
    const baseUsers: User[] = [
      { name: "Ben", profilePic: "/profile/82.jpg", games: ["musician"], cost: "$14.99/s", active: true },
      { name: "Ash", profilePic: "/profile/52.jpg", games: ["musician"], cost: "$14.99/s", active: false },
      { name: "Melody", profilePic: "/profile/33.jpg", games: ["musician"], cost: "$12.99/s", active: true },
      { name: "Harmony", profilePic: "/profile/67.jpg", games: ["musician"], cost: "$18.50/s", active: true },
      { name: "Rhythm", profilePic: "/profile/44.jpg", games: ["musician"], cost: "$9.99/s", active: false },
      { name: "Beat", profilePic: "/profile/91.jpg", games: ["musician"], cost: "$22.99/s", active: true },
      { name: "Chord", profilePic: "/profile/15.jpg", games: ["musician"], cost: "$16.75/s", active: false },
      { name: "Note", profilePic: "/profile/28.jpg", games: ["musician"], cost: "$11.25/s", active: true },
      { name: "Tempo", profilePic: "/profile/73.jpg", games: ["musician"], cost: "$19.99/s", active: false },
      { name: "Scale", profilePic: "/profile/56.jpg", games: ["musician"], cost: "$13.50/s", active: true },
    ];
    
    // Add more users for variety
    for (let i = 1; i <= 40; i++) {
      baseUsers.push({
        name: `Musician${i}`,
        profilePic: `/profile/${(i % 116) + 1}.jpg`,
        games: ["musician"],
        cost: `$${(Math.random() * 25 + 8).toFixed(2)}/s`,
        active: i % 2 === 0 // alternate active status
      });
    }
    return baseUsers;
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
        <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-zinc-900 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
          <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
            <Navbar page={t("Music")} />
          </div>
          <div >
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
              <UserCard users={filteredUsers} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Content 