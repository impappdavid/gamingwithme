import { Link } from "react-router-dom"

function Infos() {
    return (
        <>
            <div className="flex flex-row gap-2 w-full">
                <Link to={'aboutus'} className="w-fit flex justify-center items-center text-sm text-zinc-400 hover:bg-zinc-950 p-2 rounded-lg hover:text-white transition-all duration-300">
                    ABOUT US
                </Link>
                <Link to={'howitworks'} className="w-fit flex justify-center items-center text-sm text-zinc-400 hover:bg-zinc-950 p-2 rounded-lg hover:text-white transition-all duration-300">
                    HOW IT WORKS?
                </Link>
                <Link to={'download'} className="w-fit flex justify-center items-center text-sm text-zinc-400 hover:bg-zinc-950 p-2 rounded-lg hover:text-white transition-all duration-300">
                    Download
                </Link>
                <Link to={'news'} className="w-fit flex justify-center items-center text-sm text-zinc-400 hover:bg-zinc-950 p-2 rounded-lg hover:text-white transition-all duration-300">
                    NEWS
                </Link>
            </div>
        </>
    )
}
export default Infos