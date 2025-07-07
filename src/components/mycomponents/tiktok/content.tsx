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
  // Generate users for TikTok category
  const users: User[] = useMemo(() => {
    const baseUsers: User[] = [
      { name: "Alex", profilePic: "/profile/15.jpg", games: ["tiktok"], cost: "$9.99/video", active: true },
      { name: "TikToker1", profilePic: "/profile/25.jpg", games: ["tiktok"], cost: "$15.99/video", active: false },
      { name: "ViralVicky", profilePic: "/profile/38.jpg", games: ["tiktok"], cost: "$12.50/video", active: true },
      { name: "DanceKing", profilePic: "/profile/47.jpg", games: ["tiktok"], cost: "$8.99/video", active: true },
      { name: "TrendSetter", profilePic: "/profile/62.jpg", games: ["tiktok"], cost: "$20.99/video", active: false },
      { name: "ComedyQueen", profilePic: "/profile/73.jpg", games: ["tiktok"], cost: "$11.75/video", active: true },
      { name: "LipSyncPro", profilePic: "/profile/84.jpg", games: ["tiktok"], cost: "$7.50/video", active: false },
      { name: "SketchMaster", profilePic: "/profile/95.jpg", games: ["tiktok"], cost: "$18.25/video", active: true },
      { name: "LifeHacker", profilePic: "/profile/12.jpg", games: ["tiktok"], cost: "$13.99/video", active: false },
      { name: "FoodieFun", profilePic: "/profile/29.jpg", games: ["tiktok"], cost: "$10.50/video", active: true },
    ];
    
    // Add more users for variety
    for (let i = 1; i <= 60; i++) {
      baseUsers.push({
        name: `TikToker${i}`,
        profilePic: `/profile/${(i % 116) + 1}.jpg`,
        games: ["tiktok"],
        cost: `$${(Math.random() * 25 + 5).toFixed(2)}/video`,
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
            <Navbar page="TikTok" />
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