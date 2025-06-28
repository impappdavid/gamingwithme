function TopCreators() {
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <div className="text-xl font-medium">Top Creators</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div className="p-2 bg-zinc-800/30 hover:bg-zinc-800/50 cursor-pointer rounded-lg border border-zinc-800 flex flex-col gap-4 w-full sm:max-w-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 bg-zinc-800 rounded-md"></div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>

                                        <div className="text-sm">Ethan Wong</div>
                                    </div>
                                    <div className="text-xs text-zinc-400">@ethan</div>
                                </div>
                            </div>
                            <div className="px-2 py-1 bg-blue-500/30 text-white h-fit text-xs rounded-lg">$4.99/30m</div>
                        </div>
                        <div className="w-fit text-xs text-zinc-400">
                            Hello my name is Ethan and im ready to play with you!
                        </div>
                        <div className="flex gap-1">
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">Valorant</div>
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">CS2</div>
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">LoL</div>
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">R6</div>
                        </div>
                    </div>

                    <div className="p-2 bg-zinc-800/30 hover:bg-zinc-800/50 cursor-pointer rounded-lg border border-zinc-800 flex flex-col gap-4 w-full sm:max-w-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 bg-zinc-800 rounded-md"></div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <span className="relative flex h-2 w-2">
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
                                        </span>

                                        <div className="text-sm">Pacos</div>
                                    </div>
                                    <div className="text-xs text-zinc-400">@pacos</div>
                                </div>
                            </div>
                            <div className="px-2 py-1 bg-blue-500/30 text-white h-fit text-xs rounded-lg">$0.99/game</div>
                        </div>
                        <div className="w-fit text-xs text-zinc-400">
                            This user doesn't have a description
                        </div>
                        <div className="flex gap-1">
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">Valorant</div>
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">CS2</div>
                        </div>
                    </div>

                    <div className="p-2 bg-zinc-800/30 hover:bg-zinc-800/50 cursor-pointer rounded-lg border border-zinc-800 flex flex-col gap-4 w-full sm:max-w-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 bg-zinc-800 rounded-md"></div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>

                                        <div className="text-sm">Poppins</div>
                                    </div>
                                    <div className="text-xs text-zinc-400">@poppins</div>
                                </div>
                            </div>
                            <div className="px-2 py-1 bg-blue-500/30 text-white h-fit text-xs rounded-lg">$49.99/session</div>
                        </div>
                        <div className="w-fit text-xs text-zinc-400">
                            Hello i will teach you how to be famous on tiktok and youtube
                        </div>
                        <div className="flex gap-1">
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">Tiktok</div>
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">Youtube</div>
                        </div>
                    </div>

                    <div className="p-2 bg-zinc-800/30 hover:bg-zinc-800/50 cursor-pointer rounded-lg border border-zinc-800 flex flex-col gap-4 w-full sm:max-w-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 bg-zinc-800 rounded-md"></div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>

                                        <div className="text-sm">Einstein</div>
                                    </div>
                                    <div className="text-xs text-zinc-400">@ein</div>
                                </div>
                            </div>
                            <div className="px-2 py-1 bg-blue-500/30 text-white h-fit text-xs rounded-lg">$144.99/1h</div>
                        </div>
                        <div className="w-fit text-xs text-zinc-400">
                            I will explain you the string theory
                        </div>
                        <div className="flex gap-1">
                            <div className="p-1 bg-zinc-800 rounded-md px-2 border text-xs cursor-pointer">Just Chatting</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default TopCreators