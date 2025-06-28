import { Link } from "react-router-dom"

function Games() {
    return (
        <>
            <div className="flex flex-col gap-4 p-4 ">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">Games</div>
                    <Link to={``} className="text-xs text-zinc-400 hover:underline ">View All</Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">

                    <img src="/fortnite.jpg" className="bg-cover max-h-64 rounded-lg hover:scale-105 hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                    <img src="/minecraft.png" className="bg-cover max-h-64 rounded-lg hover:scale-105 hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                    <img src="/r6.jpg" className="bg-cover max-h-64 rounded-lg hover:scale-105 hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                    <img src="/valorant.jpg" className="bg-cover max-h-64 rounded-lg hover:scale-105 hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                    <img src="/cs.jpg" className="bg-cover max-h-64 rounded-lg hover:scale-105  hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                    <img src="/gta.jpg" className="bg-cover max-h-64 rounded-lg hover:scale-105 hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                    <img src="/cod.jpg" className="bg-cover max-h-64 rounded-lg hover:scale-105 hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                    <img src="/satisfactory.jpg" className="bg-cover max-h-64 rounded-lg hover:scale-105 hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                    <img src="/lol.jpg" className="bg-cover max-h-64 rounded-lg hover:scale-105 hover:shadow-[0_2px_60px_rgba(96,165,250,0.2)] cursor-pointer transition-all duration-300" />
                </div>
            </div>
        </>
    )
}
export default Games