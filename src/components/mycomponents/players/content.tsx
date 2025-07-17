import { useTranslation } from "react-i18next";
import Navbar from "../navbar/navbar"
import UserCard from "../global/usercard"
import Filter from "../global/filter"
import { useState, useMemo } from "react"
import Footer from "../global/footer";

// User type
type User = {
  name: string;
  profilePic: string;
  games: string[];
  cost: string;
  active: boolean;
};

function Content() {
  // Generate users up to 116.jpg - only game-related categories
  const users: User[] = useMemo(() => {
    const baseUsers: User[] = [
      { name: "IAmLiam", profilePic: "/profile/7.jpg", games: ["valorant", "csgo", "minecraft"], cost: "$0.99/game", active: true },
      { name: "Ava", profilePic: "/profile/58.jpg", games: ["fortnite"], cost: "$4.99/30m", active: true },
      { name: "Maya", profilePic: "/profile/48.jpg", games: ["valorant", "minecraft"], cost: "$14.99/1h", active: false },
      { name: "Peter", profilePic: "/profile/77.jpg", games: ["minecraft"], cost: "$5.99/30m", active: false },
      { name: "Gamer1", profilePic: "/profile/11.jpg", games: ["valorant"], cost: "$2.99/game", active: true },
      { name: "CSGOPRO", profilePic: "/profile/23.jpg", games: ["csgo"], cost: "$3.50/game", active: false },
      { name: "FortniteKing", profilePic: "/profile/34.jpg", games: ["fortnite"], cost: "$6.99/30m", active: true },
      { name: "MinecraftBuilder", profilePic: "/profile/45.jpg", games: ["minecraft"], cost: "$4.25/30m", active: false },
      { name: "ValorantPro", profilePic: "/profile/56.jpg", games: ["valorant"], cost: "$8.99/game", active: true },
      { name: "GameMaster", profilePic: "/profile/67.jpg", games: ["valorant", "csgo"], cost: "$12.50/game", active: false },
    ];
    
    // Add more users with only game categories
    for (let i = 1; i <= 116; i++) {
      const gameCategories = ["valorant", "csgo", "fortnite", "minecraft"];
      const randomGames = gameCategories.slice(0, Math.floor(Math.random() * 3) + 1); // 1-3 random games
      
      baseUsers.push({
        name: `Gamer${i}`,
        profilePic: `/profile/${i}.jpg`,
        games: randomGames,
        cost: `$${(Math.random() * 20 + 1).toFixed(2)}/game`,
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
        <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
          <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
            <Navbar page={t("Players")} />
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
          <div className="mt-34">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
export default Content