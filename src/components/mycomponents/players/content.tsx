import { useTranslation } from "react-i18next";
import Navbar from "../global/navbar"
import UserCard from "../global/usercard"
import Filter from "./filter"
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
  // Generate users up to 116.jpg
  const users: User[] = useMemo(() => {
    const baseUsers: User[] = [
      { name: "IAmLiam", profilePic: "/profile/7.jpg", games: ["valorant", "csgo", "just-chatting", "minecraft"], cost: "$0.99/game", active: true },
      { name: "Noah", profilePic: "/profile/104.jpg", games: ["youtube"], cost: "$1.99/1h", active: false },
      { name: "Ava", profilePic: "/profile/58.jpg", games: ["fortnite"], cost: "$4.99/30m", active: true },
      { name: "Isla", profilePic: "/profile/35.jpg", games: ["just-chatting"], cost: "$2.99/s", active: false },
      { name: "Ethan", profilePic: "/profile/17.jpg", games: ["just-chatting"], cost: "$4.99/s", active: true },
      { name: "Maya", profilePic: "/profile/48.jpg", games: ["valorant", "minecraft"], cost: "$14.99/1h", active: false },
      { name: "Alex", profilePic: "/profile/15.jpg", games: ["tiktok"], cost: "$9.99/video", active: true },
      { name: "Peter", profilePic: "/profile/77.jpg", games: ["minecraft"], cost: "$5.99/30m", active: false },
      { name: "Ben", profilePic: "/profile/82.jpg", games: ["musician"], cost: "$14.99/s", active: true },
      { name: "Ash", profilePic: "/profile/52.jpg", games: ["musician"], cost: "$14.99/s", active: false },
    ];
    // Add more users up to 116.jpg
    for (let i = 1; i <= 116; i++) {
      baseUsers.push({
        name: `User${i}`,
        profilePic: `/profile/${i}.jpg`,
        games: ["valorant", "minecraft"],
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
        <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-zinc-900 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
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
        </div>
      </div>
    </>
  );
}
export default Content