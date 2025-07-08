function Events() {
    return (
        <>
            <div className="w-full p-4 border-b border-l-4 border-l-green-500 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="text-2xl">IEM Cologne 2025</div>
                    <div className=" p-1 px-2 bg-green-500/40 h-fit rounded-md text-xs">ONGOING</div>
                </div>
                <div className="grid sm:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                        <div className="text-xs text-zinc-400">Date</div>
                        <div className="text-sm">Jul 26th - Aug 3rd 2025</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-zinc-400">Prize pool</div>
                        <div className="text-sm">$1,250,000</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-zinc-400">Teams</div>
                        <div className="text-sm">16</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-zinc-400">Location</div>
                        <div className="text-sm">Cologne, Germany</div>
                    </div>
                </div>
            </div>

            <div className="w-full p-4 border-b  flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="text-2xl">Budapest Major 2025</div>
                    <div className=" p-1 px-2 bg-zinc-500/40 h-fit rounded-md text-xs">UPCOMING</div>
                </div>
                <div className="grid sm:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                        <div className="text-xs text-zinc-400">Date</div>
                        <div className="text-sm">Dec 4th - Dec 14th 2025</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-zinc-400">Prize pool</div>
                        <div className="text-sm">$1,250,000</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-zinc-400">Teams</div>
                        <div className="text-sm">16</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-zinc-400">Location</div>
                        <div className="text-sm">Budapest, Hungary</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Events