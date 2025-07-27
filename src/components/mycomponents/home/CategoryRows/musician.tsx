import { type TopCreators, GetRandomsByTagAndTop } from "@/api/home";
import { GetServicesById } from "@/api/service";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MessagesSquare } from "lucide-react";

function Musician() {
  const { t } = useTranslation();
  const [topcreators, setTopCreators] = useState<TopCreators[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Holds first service info for each creator by user.id
  const [creatorServices, setCreatorServices] = useState<Record<string, any>>({});
  const [servicesLoading, setServicesLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTopCreators = async () => {
      setLoading(true);
      try {
        const data = await GetRandomsByTagAndTop("Musician", 8);
        if (Array.isArray(data)) {
          setTopCreators(data as TopCreators[]);
        } else {
          setTopCreators([]);
          setError("Invalid data format received from server");
        }
      } catch (err: any) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    getTopCreators();
  }, []);

  // Fetch first service for each top creator for price/desc
  useEffect(() => {
    if (topcreators.length === 0) {
      setCreatorServices({});
      setServicesLoading(false);
      return;
    }
    setServicesLoading(true);
    const fetchAllServices = async () => {
      const servicesData: Record<string, any> = {};
      await Promise.all(
        topcreators.map(async (user) => {
          try {
            const service = await GetServicesById(String(user.id));
            // API may return array; if so pick first, else use as is
            servicesData[user.id] = Array.isArray(service) && service.length > 0 ? service[0] : service;
          } catch (err) {
            servicesData[user.id] = null;
          }
        })
      );
      setCreatorServices(servicesData);
      setServicesLoading(false);
    };
    fetchAllServices();
  }, [topcreators]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex w-full justify-between items-center">
          <div className="text-xl font-medium">
            <Skeleton className="w-32 h-6" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-1 2xl:gap-2">
          {Array.from({ length: 7 }).map((_, idx) => (
            <Skeleton key={idx} className="h-40 rounded-2xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div className="flex w-full justify-between items-center">
          <div className="text-xl font-medium">{t("Music")}</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-1 2xl:gap-2">
          {topcreators.length > 0 ? (
            // Use element.username as key for React stability if unique
            topcreators.map((element: TopCreators) => (
              <div key={element.username} className="p-1.5 relative bg-gradient-to-br group from-zinc-900 to-zinc-950 cursor-pointer rounded-2xl border border-zinc-800 flex flex-col gap-2 w-full">
                <div className="flex flex-col relative w-full overflow-hidden rounded-2xl">
                  {element.avatarurl.length > 0 ? (
                    <img
                      src={element.avatarurl}
                      alt={element.username}
                      className="w-full rounded-xl object-cover ease-in-out group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <img
                      src="/profile/6.jpg"
                      alt={element.username}
                      className="w-full rounded-xl object-cover ease-in-out group-hover:scale-105 transition-all duration-300"
                    />
                  )}

                  <div className="flex flex-col gap-0.5 px-1 pt-1 rounded-b-2xl w-full">
                    <div className="flex gap-1 items-center">
                      <div className="text-lg">{element.username}</div>
                    </div>
                    {/* Service description: loading, fallback, or value */}
                    <div className="text-xs text-zinc-400 min-h-6">
                      {servicesLoading
                        ? "Loading..."
                        : creatorServices[element.id]?.description ??
                          (creatorServices[element.id] === null
                            ? "No description"
                            : "Loading...")}
                    </div>
                    <div className="flex items-center">
                      <div className="grid grid-cols-4 gap-1 pt-1">
                        {element.tags.map((tag, idx) => (
                          <span key={idx}>
                            {tag === "Just chatting" ? (
                              <div className="p-1 bg-white rounded-md">
                                <MessagesSquare className="w-4 h-4 text-black" />
                              </div>
                            ) : tag === "Musician" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill="#ff04ec"
                                  fillRule="evenodd"
                                  d="m10.995 0l.573.001q.241 0 .483.007c.35.01.705.03 1.051.093c.352.063.68.166.999.329a3.36 3.36 0 0 1 1.47 1.468c.162.32.265.648.328 1c.063.347.084.7.093 1.051q.007.241.007.483l.001.573v5.99l-.001.573q0 .241-.008.483c-.01.35-.03.704-.092 1.05a3.5 3.5 0 0 1-.33 1a3.36 3.36 0 0 1-1.468 1.468a3.5 3.5 0 0 1-1 .33a7 7 0 0 1-1.05.092q-.241.007-.483.008l-.573.001h-5.99l-.573-.001q-.241 0-.483-.008a7 7 0 0 1-1.052-.092a3.6 3.6 0 0 1-.998-.33a3.36 3.36 0 0 1-1.47-1.468a3.6 3.6 0 0 1-.328-1a7 7 0 0 1-.093-1.05Q.002 11.81 0 11.568V5.005l.001-.573q0-.241.007-.483c.01-.35.03-.704.093-1.05a3.6 3.6 0 0 1 .329-1A3.36 3.36 0 0 1 1.9.431A3.5 3.5 0 0 1 2.896.1A7 7 0 0 1 3.95.008Q4.19.002 4.432 0h.573zm-.107 2.518l-4.756.959H6.13a.66.66 0 0 0-.296.133a.5.5 0 0 0-.16.31c-.004.027-.01.08-.01.16v5.952c0 .14-.012.275-.106.39c-.095.115-.21.15-.347.177l-.31.063c-.393.08-.65.133-.881.223a1.4 1.4 0 0 0-.519.333a1.25 1.25 0 0 0-.332.995c.031.297.166.582.395.792c.156.142.35.25.578.296c.236.047.49.031.858-.043c.196-.04.38-.102.555-.205a1.4 1.4 0 0 0 .438-.405a1.5 1.5 0 0 0 .233-.55c.042-.202.052-.386.052-.588V6.347c0-.276.08-.35.302-.404c.024-.005 3.954-.797 4.138-.833c.257-.049.378.025.378.294v3.524c0 .14-.001.28-.096.396c-.094.115-.211.15-.348.178l-.31.062c-.393.08-.649.133-.88.223a1.4 1.4 0 0 0-.52.334a1.26 1.26 0 0 0-.34.994c.03.297.174.582.404.792a1.2 1.2 0 0 0 .577.294c.237.048.49.03.858-.044c.197-.04.381-.098.556-.202a1.4 1.4 0 0 0 .438-.405q.173-.252.233-.549a2.7 2.7 0 0 0 .044-.589V2.865c0-.273-.143-.443-.4-.42c-.04.003-.383.064-.424.073"
                                />
                              </svg>
                            ) : tag === "Tiktoker" ? (
                              <div className="p-1 bg-black rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"
                                  />
                                </svg>
                              </div>
                            ) : tag === "Youtuber" ? (
                              <div className="p-1 bg-red-600 rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className=""></div>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Profile link, shows $ and price */}
                    <div className="py-2 w-full">
                      <Link
                        to={`/profile/${element.username}`}
                        className="py-1.5 justify-center bg-[#19FF00] hover:bg-[#1aff0096] transition-all duration-200 px-3 rounded-lg flex items-center text-sm text-black font-semibold"
                      >
                        $
                        {servicesLoading
                          ? "--"
                          : creatorServices[element.id]?.price ??
                            (creatorServices[element.id] === null
                              ? "--"
                              : "--")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="flex flex-col items-start  justify-center h-24 text-center">
              <div className="text-md mb-1">❌</div>
              <h3 className="text-md font-semibold text-red-400 mb-1">Error</h3>
              <p className="text-zinc-400 max-w-md text-xs">{error}</p>
            </div>
          ) : (
            <div className="h-24 rounded-2xl flex text-zinc-400 items-center justify-start ">
              <div className="text-sm">{t(`No musicians yet`)}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Musician;
