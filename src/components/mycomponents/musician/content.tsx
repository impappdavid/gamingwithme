// Content.tsx

import { useTranslation } from "react-i18next";
import Navbar from "../navbar/navbar";
import UserCard from "../global/usercard";
import Filter from "../global/filter";
import { useState, useMemo, useEffect } from "react";
import Footer from "../global/footer";
import { getUsersByTag } from "@/api/user";
import { GetServicesById } from "@/api/service"; // <-- Make sure this is correct
import type { UserProfileWithTags } from "@/api/types";

// User type for UI
type User = {
  id: number;
  username: string;
  avatarurl: string;
  bio: string;
  isActive: boolean;
  languages: string[];
  games: string[];
  tags: string[];
  hasStripeAccount: boolean;
  bookings: {
    id: string,
    startTime: Date,
    duration: string,
    customerName: string
  }[];
  availability: {
    id: string,
    date: Date,
    startTime: string,
    endTime: string,
    isAvailable: boolean
  }[];
  joined: string;
  service?: any; // New: first service for this user, may be undefined/null
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
  joined: apiUser.joined
});

function Content() {
  const { t } = useTranslation();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filterText, setFilterText] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  // Service fetching state
  const [userServices, setUserServices] = useState<Record<number, any>>({});
  const [servicesLoading, setServicesLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUsers = await getUsersByTag("Musician");
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

  // Fetch services for each user and save the first to userServices map
  useEffect(() => {
    if (users.length === 0) {
      setUserServices({});
      setServicesLoading(false);
      return;
    }
    setServicesLoading(true);

    const fetchAllServices = async () => {
      const servicesData: Record<number, any> = {};
      await Promise.all(
        users.map(async (user) => {
          try {
            const res = await GetServicesById(String(user.id));
            servicesData[user.id] = Array.isArray(res) && res.length > 0 ? res[0] : res;
          } catch (e) {
            servicesData[user.id] = null;
          }
        })
      );
      setUserServices(servicesData);
      setServicesLoading(false);
    };
    fetchAllServices();
  }, [users]);

  // Filter and sort users (add price/orderBy filtering if you want)
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const textMatch =
        filterText === "" ||
        user.username.toLowerCase().includes(filterText.toLowerCase()) ||
        user.games.some(game =>
          game.toLowerCase().includes(filterText.toLowerCase())
        );
      return textMatch;
    });
    return filtered;
  }, [users, filterText, minPrice, maxPrice]);

  // Merge service data into user objects
  const filteredUsersWithService = filteredUsers.map(u => ({
    ...u,
    service: userServices[u.id]
  }));

  return (
    <div className="w-full h-full xl:h-screen sm:p-2">
      <div className="w-full min-h-screen sm:min-h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
          <Navbar page={t("Music")} />
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
                <div className="text-zinc-400">Loading users...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-red-400">{error}</div>
              </div>
            ) : (
              <UserCard
                users={filteredUsersWithService}
                servicesLoading={servicesLoading}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Content;