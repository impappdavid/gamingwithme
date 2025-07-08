import React from "react"
import { Link } from "react-router-dom";

function Games({ filterText }: { filterText: string }) {
    const games = [
        { name: "Fortnite", src: "/fortnite.jpg" },
        { name: "Minecraft", src: "/minecraft.png" },
        { name: "Rainbow Six Siege", src: "/r6.jpg" },
        { name: "Valorant", src: "/valorant.jpg" },
        { name: "Counter-Strike", src: "/cs.jpg" },
        { name: "GTA V", src: "/gta.jpg" },
        { name: "Call of Duty", src: "/cod.jpg" },
        { name: "Satisfactory", src: "/satisfactory.jpg" },
        { name: "League of Legends", src: "/lol.jpg" },
    ];
    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(filterText.toLowerCase())
    );
    return (
        <>
            <div className="flex flex-col gap-4 p-4 ">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">
                    {filteredGames.map(game => (
                        <Link to={`/games/${game.name}`}>
                            <img key={game.name} src={game.src} alt={game.name} title={game.name} className="bg-cover max-h-58 rounded-2xl hover:scale-105 cursor-pointer transition-all duration-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Games