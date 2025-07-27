import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { Input } from "@/components/ui/input"
import { CaseLower, Facebook, Instagram, Tag, User, X } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  getUserAllInformation,
  getUserCommonInfos,
  updateUserBio,
  updateUsername,
  addGameTag,
  deleteGameTag,
  addNewTag,
  deleteTag,
  addUserLanguage,
  deleteUserLanguage,
  EditSocialMedia,
  GetSocialMedia
} from "@/api/settings"
import { fetchPopularGamesFromRAWG, fetchGameFromRAWG } from "@/api/games"
import type { RAWGGame } from "@/api/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

function General() {
  const { t } = useTranslation()
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameTags, setGameTags] = useState<RAWGGame[]>([]);
  const [userGames, setUserGames] = useState<string[]>([]); // store game names from profile
  const [rawgGameTags, setRawgGameTags] = useState<RAWGGame[]>([]); // store RAWG data for user's games

  const [inputValue, setInputValue] = useState("")
  const [filteredData, setFilteredData] = useState<RAWGGame[]>([]);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  // You might want to internationalize this as well.  
  // The label values should match your translation keys.
  const languageOptions = [
    { value: "en", label: t("English") },
    { value: "es", label: t("Spanish") },
    { value: "fr", label: t("French") },
    { value: "de", label: t("German") },
    { value: "pt", label: t("Portuguese") },
    { value: "ru", label: t("Russian") },
    { value: "zh", label: t("Chinese") },
    { value: "ja", label: t("Japanese") },
  ];

  // The same for tag labels
  const tagOptions = [
    { value: "gamer", label: t("Gamer") },
    { value: "just-chatting", label: t("Just chatting") },
    { value: "musician", label: t("Musician") },
    { value: "tiktoker", label: t("Tiktoker") },
    { value: "youtuber", label: t("Youtuber") },
  ];

  const [userAlreadyHasTags, setUserAlreadyHasTags] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const common = await getUserCommonInfos();
        if (common && common.username) {
          const full = await getUserAllInformation(common.username);
          setUsername(full.username);
          setBio(full.bio);
          setUserGames(full.games || []);
          const tagsFromBackend = (full as any).tags;
          setUserAlreadyHasTags(Array.isArray(tagsFromBackend) ? tagsFromBackend : []);
          setSelectedLanguages(full.languages || []);
        }
      } catch (err) {
        setError(t("Failed to fetch user"));
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    const fetchGames = async () => {
      try {
        const games = await fetchPopularGamesFromRAWG();
        setGameTags(games);
        console.log(gameTags)
      } catch (err) {
        console.error("Failed to fetch games:", err);
      }
    };
    fetchGames();
    // eslint-disable-next-line
  }, []);

  // Fetch RAWG data for each game in userGames
  useEffect(() => {
    const fetchRAWGForGames = async () => {
      if (!userGames.length) {
        setRawgGameTags([]);
        return;
      }
      const results: RAWGGame[] = [];
      for (const gameName of userGames) {
        const rawg = await fetchGameFromRAWG(gameName);
        if (rawg) results.push(rawg);
      }
      setRawgGameTags(results);
    };
    fetchRAWGForGames();
  }, [userGames]);

  // Game search: use RAWG API for live search
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredData([]);
      return;
    }
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      const result = await fetchGameFromRAWG(inputValue);
      setFilteredData(result ? [result] : []);
    }, 400);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [inputValue]);

  useEffect(() => {
    const fetchUserSocials = async () => {
      setLoading(true);
      try {
        const common = await GetSocialMedia();
        if (common) {
          setTwitter(common.twitterUrl);
          setInstagram(common.instagramUrl);
          setFacebook(common.facebookUrl)
        }
      } catch (err) {
        setError(t("Failed to fetch user"))
      } finally {
        setLoading(false);
      }
    };
    fetchUserSocials();
    // eslint-disable-next-line
  }, []);

  // Add game tag (from search dropdown)
  const addTag = async (game: RAWGGame) => {
    if (!userGames.includes(game.name)) {
      try {
        await addGameTag(game.name);
        setUserGames([...userGames, game.name]);
      } catch (err) {
        console.error("Failed to add game tag", err);
      }
    }
    setInputValue("");
    setFilteredData([]);
  }

  // Remove game tag by index
  const removeTag = async (indexToRemove: number) => {
    const gameToRemove = rawgGameTags[indexToRemove];
    if (gameToRemove) {
      try {
        await deleteGameTag(gameToRemove.name);
        setUserGames(userGames.filter((name) => name !== gameToRemove.name));
      } catch (err) {
        console.error("Failed to remove game tag", err);
      }
    }
  }

  const handleUsernameChange = async () => {
    try {
      await updateUsername(username);
    } catch (err) {
      console.error("Failed to update username", err);
    }
  }

  const handleBioChange = async () => {
    try {
      await updateUserBio(bio);
    } catch (err) {
      console.error("Failed to update bio", err);
    }
  }

  const handleSocialChange = async () => {
    try {
      await EditSocialMedia(twitter, instagram, facebook);
    } catch (err) {
      console.error("Failed to update socials", err);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen sm:p-2">
        <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 relative flex flex-col">
          <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
            <Navbar page={t("settings")} />
          </div>
          <div className="flex items-center justify-center flex-1">
            <div className="text-zinc-400">{t("Loading settings...")}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen sm:p-2">
        <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 relative flex flex-col">
          <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
            <Navbar page={t("settings")} />
          </div>
          <div className="flex items-center justify-center flex-1">
            <div className="text-red-400">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen sm:p-2">
      <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 relative flex flex-col">
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
          <Navbar page={t("settings")} />
        </div>
        <div className="flex w-full flex-1">
          <SettingsSidebar />
          <div className="w-full p-4">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Tag Multi-Select Combobox */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm font-semibold">{t("Tags")}</label>
                  <Popover>
                    <PopoverTrigger asChild className="w-full">
                      <button
                        type="button"
                        className="w-full h-11 border rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 cursor-pointer px-3 flex items-center justify-between text-left transition-all duration-300"
                      >
                        <span className="truncate text-xs flex gap-1">
                          {userAlreadyHasTags.length > 0 ? (
                            <>
                              {userAlreadyHasTags.map((Element, index) => (
                                <div key={index}>{t(Element)},</div>
                              ))}
                            </>
                          ) : (
                            <div>{t("Select tags...")}</div>
                          )}
                        </span>
                        <svg className="w-4 h-4 ml-2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[200px] p-1 rounded-xl bg-zinc-950">
                      <div className="overflow-y-auto flex flex-col gap-1">
                        {tagOptions.map((element, index) => {
                          const isChecked = userAlreadyHasTags.includes(element.label);
                          const gamerSelected = userAlreadyHasTags.includes(t("Gamer"));
                          const otherTagsSelected = userAlreadyHasTags.some(tag =>
                            [t("Just chatting"), t("Musician"), t("Tiktoker"), t("Youtuber")].includes(tag)
                          );
                          let isDisabled = false;
                          let disabledReason = "";
                          if (element.label === t("Gamer") && otherTagsSelected) {
                            isDisabled = true;
                            disabledReason = t("Cannot select Gamer with other tags.");
                          } else if (
                            [t("Just chatting"), t("Musician"), t("Tiktoker"), t("Youtuber")].includes(element.label) &&
                            gamerSelected
                          ) {
                            isDisabled = true;
                            disabledReason = t("Cannot select this tag with Gamer.");
                          }
                          return (
                            <div className="flex items-center gap-3 p-2 hover:bg-zinc-900 rounded-md cursor-pointer" key={index}>
                              <Checkbox
                                id={`tag-${index}`}
                                checked={isChecked}
                                disabled={isDisabled}
                                title={isDisabled ? disabledReason : undefined}
                                onCheckedChange={async (checked) => {
                                  if (isDisabled) return;
                                  const tag = element.label;
                                  if (checked) {
                                    try {
                                      await addNewTag(tag);
                                      setUserAlreadyHasTags((prev) => [...prev, tag]);
                                    } catch (err) {
                                      console.error("Failed to add tag", err);
                                    }
                                  } else {
                                    try {
                                      await deleteTag(tag);
                                      setUserAlreadyHasTags((prev) => prev.filter((t) => t !== tag));
                                    } catch (err) {
                                      console.error("Failed to remove tag", err);
                                    }
                                  }
                                }}
                              />
                              <Label className="cursor-pointer" htmlFor={`tag-${index}`}>{t(element.label)}</Label>
                            </div>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Language Multi-Select Combobox */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm font-semibold">{t("Languages")}</label>
                  <Popover>
                    <PopoverTrigger asChild className="w-full">
                      <button
                        type="button"
                        className="w-full h-11 border rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 cursor-pointer px-3 flex items-center justify-between text-left transition-all duration-300"
                      >
                        <span className="truncate text-xs flex gap-1">
                          {selectedLanguages.length > 0 ? (
                            <>
                              {selectedLanguages.map((Element, index) => (
                                <div key={index}>{t(Element)},</div>
                              ))}
                            </>
                          ) : (
                            <div>{t("Select languages...")}</div>
                          )}
                        </span>
                        <svg className="w-4 h-4 ml-2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[200px] p-1 rounded-xl bg-zinc-950">
                      <div className="overflow-y-auto flex flex-col gap-1">
                        {languageOptions.map((element, index) => {
                          const isChecked = selectedLanguages.includes(element.label);
                          return (
                            <div className="flex items-center gap-3 p-2 hover:bg-zinc-900 rounded-md cursor-pointer" key={index}>
                              <Checkbox
                                id={`tag-${index}`}
                                checked={isChecked}
                                className="cursor-pointer"
                                onCheckedChange={async (checked) => {
                                  const language = element.label;
                                  if (checked) {
                                    try {
                                      await addUserLanguage(language);
                                      setSelectedLanguages((prev) => [...prev, language]);
                                    } catch (err) {
                                      console.error("Failed to add tag", err);
                                    }
                                  } else {
                                    try {
                                      await deleteUserLanguage(language);
                                      setSelectedLanguages((prev) => prev.filter((t) => t !== language));
                                    } catch (err) {
                                      console.error("Failed to remove tag", err);
                                    }
                                  }
                                }}
                              />
                              <Label className="cursor-pointer" htmlFor={`tag-${index}`}>{t(element.label)}</Label>
                            </div>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Username Section */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">{t("Username")}</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      type="text"
                      placeholder={t("Username")}
                      className="pl-10 h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleUsernameChange} className="h-11 px-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300 cursor-pointer">
                    {t("Update")}
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-2">
                <div className="relative flex-1">
                  <X className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    type="text"
                    placeholder={t("Twitter profile link")}
                    className="pl-10 h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className="relative flex-1">
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    type="text"
                    placeholder={t("Instagram profile link")}
                    className="pl-10 h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div className="relative flex-1">
                  <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    type="text"
                    placeholder={t("Facebook profile link")}
                    className="pl-10 h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleSocialChange} className="h-11 px-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300 cursor-pointer">
                {t("Update Socials")}
              </Button>

              {/* Bio Section */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">{t("Bio")}</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <CaseLower className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                    <Textarea
                      placeholder={t("Tell us about yourself")}
                      className="pl-10 h-20 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300 resize-none"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleBioChange} className="h-11 px-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300">
                    {t("Update")}
                  </Button>
                </div>
              </div>

              {/* Game Tags Section */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">{t("Game tags")}</label>
                <div className="flex gap-2 relative">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      type="text"
                      placeholder={t("Search games...")}
                      className="pl-10 h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      autoComplete="off"
                    />
                    {/* Dropdown for filtered games */}
                    {filteredData.length > 0 && (
                      <div className="absolute left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        {filteredData.map((game, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-zinc-800/60 text-left cursor-pointer"
                            onClick={() => addTag(game)}
                          >
                            {game.background_image && (
                              <img src={game.background_image} alt={game.name} className="w-8 h-8 rounded object-cover" />
                            )}
                            <span className="text-sm">{game.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Display current tags */}
                <div className="flex flex-wrap gap-2">
                  {rawgGameTags.map((tag, index) => (
                    <button key={index} onClick={() => removeTag(index)} className="flex items-center gap-2 bg-zinc-800/40 hover:bg-red-500/20 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer">
                      {tag.background_image && (
                        <img src={tag.background_image} alt={tag.name} className="w-6 h-6 rounded object-cover" />
                      )}
                      <span className="text-sm">{tag.name}</span>
                      <X className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General
