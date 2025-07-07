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
  // Generate users for YouTube category
  const users: User[] = useMemo(() => {
    const baseUsers: User[] = [
      { name: "Noah", profilePic: "/profile/104.jpg", games: ["youtube"], cost: "$1.99/1h", active: false },
      { name: "YouTuber1", profilePic: "/profile/22.jpg", games: ["youtube"], cost: "$3.50/1h", active: true },
      { name: "VideoMaster", profilePic: "/profile/41.jpg", games: ["youtube"], cost: "$2.25/1h", active: false },
      { name: "ContentCreator", profilePic: "/profile/63.jpg", games: ["youtube"], cost: "$4.99/1h", active: true },
      { name: "StreamKing", profilePic: "/profile/85.jpg", games: ["youtube"], cost: "$1.75/1h", active: false },
      { name: "LivePro", profilePic: "/profile/16.jpg", games: ["youtube"], cost: "$6.50/1h", active: true },
      { name: "ChannelStar", profilePic: "/profile/37.jpg", games: ["youtube"], cost: "$3.25/1h", active: false },
      { name: "BroadcastQueen", profilePic: "/profile/59.jpg", games: ["youtube"], cost: "$2.99/1h", active: true },
      { name: "VideoWizard", profilePic: "/profile/81.jpg", games: ["youtube"], cost: "$5.75/1h", active: false },
      { name: "StreamMaster", profilePic: "/profile/103.jpg", games: ["youtube"], cost: "$2.50/1h", active: true },
    ];
    
    // Add more users for variety
    for (let i = 1; i <= 70; i++) {
      baseUsers.push({
        name: `YouTuber${i}`,
        profilePic: `/profile/${(i % 116) + 1}.jpg`,
        games: ["youtube"],
        cost: `$${(Math.random() * 8 + 1).toFixed(2)}/1h`,
        active: i % 3 === 0 // some active, some not
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
  
  return (
    <>
      <div className="w-full h-full xl:h-screen sm:p-2">
        <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-zinc-900 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
          <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
            <Navbar page="YouTube" />
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