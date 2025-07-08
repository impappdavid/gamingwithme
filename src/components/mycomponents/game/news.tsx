function News() {
    return (
        <>
            <div className="border-b w-full flex flex-col gap-2 p-4 px-4 hover:bg-zinc-800/20 cursor-pointer">
                <div className="flex justify-between items-center">
                    <div className="text-2xl">Season 3 soon???</div>
                    <div className="text-xs text-zinc-400">07/08/2025 2:30 PM</div>
                </div>
                <div className=" text-sm text-zinc-300">
                    Season 3 is shaping up to be a massive refresh—new maps, ranking resets, cosmetic drops, and a revamped progression system. It’s the perfect time to gear up, rank up, and dive back in.
                </div>
            </div>
            <div className="border-b w-full flex flex-col gap-2 p-4 px-4 hover:bg-zinc-800/20 cursor-pointer">
                <div className="flex justify-between items-center">
                    <div className="text-2xl">🔫 CS2 Armory Pass – What’s New?</div>
                    <div className="text-xs text-zinc-400">05/24/2025 6:30 PM</div>
                </div>
                <div className=" text-sm text-zinc-300 flex flex-col gap-2">
                    <span>
                        Valve has dropped the Armory Pass in CS2, and it’s their boldest step yet toward a modern battle pass system. Unlike previous operations, the Armory Pass gives players weekly missions, exclusive weapon skins, and a progression-based reward system.
                    </span>
                    <span>
                        Players can complete challenges to earn stars, which unlock tiered rewards like limited-time cosmetics, stickers, and cases. It’s sleek, accessible, and feels much more integrated into CS2’s competitive rhythm.
                    </span>
                    With a fresh map pool and ranking reset coming in Season 3, the Armory Pass is the perfect way to grind rewards while climbing the ranks.
                </div>
            </div>
            
        </>
    )
}
export default News