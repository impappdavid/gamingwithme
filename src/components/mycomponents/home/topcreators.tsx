import { Button } from "@/components/ui/button"
import { MessagesSquare, Star } from "lucide-react"

function TopCreators() {
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <div className="text-xl font-medium">Top Creators</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                    <div className="p-4 relative bg-gradient-to-br from-zinc-900 to-zinc-950  cursor-pointer rounded-4xl border border-zinc-800 flex flex-col gap-4 w-full ">
                        <div className="flex justify-center">
                            <img src="/profile.jpg" alt="profile" className="w-20 h-20 rounded-xl" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-1 items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <div className="">Ethan Wong</div>
                            </div>

                            <div className="text-xs text-zinc-400">@ethan</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap gap-1">
                                <div className="bg-[#ff4654] p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M23.792 2.152a.25.25 0 0 0-.098.083q-5.077 6.345-10.15 12.69c-.107.093-.025.288.119.265c2.439.003 4.877 0 7.316.001a.66.66 0 0 0 .552-.25l2.324-2.903a.72.72 0 0 0 .144-.49c-.002-3.077 0-6.153-.003-9.23c.016-.11-.1-.206-.204-.167zM.077 2.166c-.077.038-.074.132-.076.205q.002 4.612.001 9.225a.68.68 0 0 0 .158.463l7.64 9.55c.12.152.308.25.505.247c2.455 0 4.91.003 7.365 0c.142.02.222-.174.116-.265C10.661 15.176 5.526 8.766.4 2.35c-.08-.094-.174-.272-.322-.184z" />
                                    </svg>
                                </div>
                                <div className="bg-[#5b8731] p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M0 0h169.847v172.501H0zm340.775 0h170.094v172.501H340.775zm0 172.502H169.847v85.915H84.785V512h85.062v-86.668h170.928V512h85.866V258.417h-85.866z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-2">
                            <Button className="w-full text-xs bg-zinc-900 text-zinc-400 border hover:bg-zinc-800/10 rounded-xl cursor-pointer">Message</Button>
                            <Button className="w-full rounded-xl bg-green-500 hover:bg-green-500/80 cursor-pointer">$4.99/30m</Button>
                        </div>
                    </div>

                    <div className="p-4 relative bg-gradient-to-br from-zinc-900 to-zinc-950  cursor-pointer rounded-4xl border border-zinc-800 flex flex-col gap-4 w-full ">
                        <div className="flex justify-center">
                            <img src="/profile2.jpg" alt="profile" className="w-20 h-20 rounded-xl" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-1 items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <div className="">Pacos</div>
                            </div>

                            <div className="text-xs text-zinc-400">@pacos</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap gap-1">
                                <div className="bg-[#EDA338] p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M21.71 3.235a.02.02 0 0 1-.022-.022c.002-.081.004-.37.005-.424c0-.129-.143-.183-.212-.083l-.229.333a.02.02 0 0 1-.02.01h-6.55a.047.047 0 0 1-.048-.046l-.013-.177a.048.048 0 0 1 .056-.048l.335.032a.06.06 0 0 0 .063-.045l.244-.989a.05.05 0 0 0-.03-.054l-.227-.085a.04.04 0 0 1-.026-.03c-.041-.171-.377-1.323-1.993-1.58c-.787-.125-1.302.21-1.577.478a1.6 1.6 0 0 0-.302.41l-.097.212a2 2 0 0 0-.046.234l.051.982a.11.11 0 0 0 .043.085l.354.153l-.196.325a.055.055 0 0 1-.053.04s-.417.01-.622.02c-.386.015-1.245.485-1.878 1.838l-.724 1.55a.07.07 0 0 1-.068.04l-.578.001c-.035 0-.073.028-.088.06L6.364 9a.11.11 0 0 0 .017.108l.627.392a.06.06 0 0 1 .02.058l-.328.967a.2.2 0 0 1-.023.062l-.435.382a.1.1 0 0 0-.035.06l-.598 1.53a.06.06 0 0 1-.06.045l-.336.002a.163.163 0 0 0-.162.149l-.201 2.288l-.016.121l-.158.908a.13.13 0 0 1-.034.055l-.558.427a4.8 4.8 0 0 0-.767 1.001l-1.86 3.924a.8.8 0 0 0-.078.322l.132.235c.002.084-.032.456-.07.53l-.624 1.09a.1.1 0 0 0-.003.085l.03.07l.094.187L2.829 24c.118.011.247-.14.251-.3l.103-1.297l-.027-.195l3.606-4.232c.095-.114.222-.317.286-.45l1.719-3.79a.17.17 0 0 1 .1-.088l.109-.035a.17.17 0 0 1 .183.053c.15.181.504.781.676 1.032c.143.208.85 1.23 1.158 1.567c.086.093.349.198.466.27a.083.083 0 0 1 .03.112l-1.03 1.808l-.455 2.136a1 1 0 0 0-.036.152l-.412 1.483c.003.188-.14.286-.153.507l-.15 1.084a.06.06 0 0 0 .059.061l2.544.014q.142-.001.286-.006l.075-.007c.124-.016.563-.076.75-.15a.6.6 0 0 0 .227-.13c.185-.194.2-.278.203-.398a.3.3 0 0 0-.028-.105a.12.12 0 0 0-.06-.047l-1.18-.356a.37.37 0 0 1-.19-.134l-.317-.47a.09.09 0 0 1 .018-.097l.618-.609a.2.2 0 0 0 .048-.072l1.904-4.488c.089-.285.059-.605 0-.944c-.044-.25-.686-1.326-.854-1.624l-1.286-2.251c-.079-.138-.19-.133-.228-.276l-.073-1.118a.04.04 0 0 1 .036-.05l.33-.028a.1.1 0 0 0 .075-.048l1.147-2.155a.1.1 0 0 0-.002-.094l-.235-.29a.09.09 0 0 1-.001-.088l.352-.38a.054.054 0 0 1 .073-.02l.934.526a.4.4 0 0 0 .186.05c.26-.001.686-.154.908-.29a.4.4 0 0 0 .139-.148l.458-1.07c.006-.014.027-.012.03.003l.127.595a.064.064 0 0 0 .079.05l1.35-.3a.066.066 0 0 0 .05-.078l-.319-1.344a.07.07 0 0 1 .01-.054l.13-.203a.3.3 0 0 0 .037-.082l.159-.725a.04.04 0 0 1 .04-.032l3.732.005a.09.09 0 0 0 .093-.093v-.634a.02.02 0 0 1 .022-.021h1.439a.047.047 0 0 0 .046-.047V3.28a.047.047 0 0 0-.046-.047h-1.44z" />
                                    </svg>
                                </div>
                                <div className="bg-[#ff4654] p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M23.792 2.152a.25.25 0 0 0-.098.083q-5.077 6.345-10.15 12.69c-.107.093-.025.288.119.265c2.439.003 4.877 0 7.316.001a.66.66 0 0 0 .552-.25l2.324-2.903a.72.72 0 0 0 .144-.49c-.002-3.077 0-6.153-.003-9.23c.016-.11-.1-.206-.204-.167zM.077 2.166c-.077.038-.074.132-.076.205q.002 4.612.001 9.225a.68.68 0 0 0 .158.463l7.64 9.55c.12.152.308.25.505.247c2.455 0 4.91.003 7.365 0c.142.02.222-.174.116-.265C10.661 15.176 5.526 8.766.4 2.35c-.08-.094-.174-.272-.322-.184z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-2">
                            <Button className="w-full text-xs bg-zinc-900 text-zinc-400 border hover:bg-zinc-800/10 rounded-xl cursor-pointer">Message</Button>
                            <Button className="w-full rounded-xl bg-green-500 hover:bg-green-500/80 cursor-pointer">$2.99/game</Button>
                        </div>
                    </div>


                    <div className="p-4 relative bg-gradient-to-br from-zinc-900 to-zinc-950  cursor-pointer rounded-4xl border border-zinc-800 flex flex-col gap-4 w-full ">
                        <div className="flex justify-center">
                            <img src="/profile3.jpg" alt="profile" className="w-20 h-20 rounded-xl" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-1 items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <div className="">Poppins</div>
                            </div>

                            <div className="text-xs text-zinc-400">@poppins</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap gap-1">
                                <div className="bg-[#FF0000] p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-2">
                            <Button className="w-full text-xs bg-zinc-900 text-zinc-400 border hover:bg-zinc-800/10 rounded-xl cursor-pointer">Message</Button>
                            <Button className="w-full rounded-xl bg-green-500 hover:bg-green-500/80 cursor-pointer">$44.99/session</Button>
                        </div>
                    </div>

                    <div className="p-4 relative bg-gradient-to-br from-zinc-900 to-zinc-950  cursor-pointer rounded-4xl border border-zinc-800 flex flex-col gap-4 w-full ">
                        <div className="flex justify-center">
                            <img src="/ein.jpg" alt="profile" className="w-20 h-20 rounded-xl" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-1 items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <div className="">Einstein</div>
                            </div>

                            <div className="text-xs text-zinc-400">@ein</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap gap-1">
                                <div className="bg-white p-1 rounded-md">
                                    <MessagesSquare className="w-4 h-4 text-black" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-2">
                            <Button className="w-full text-xs bg-zinc-900 text-zinc-400 border hover:bg-zinc-800/10 rounded-xl cursor-pointer">Message</Button>
                            <Button className="w-full rounded-xl bg-green-500 hover:bg-green-500/80 cursor-pointer">$144.99/1h</Button>
                        </div>
                    </div>
                    <div className="p-4 relative bg-gradient-to-br from-zinc-900 to-zinc-950  cursor-pointer rounded-4xl border border-zinc-800 flex flex-col gap-4 w-full ">
                        <div className="flex justify-center">
                            <img src="/profile4.jpg" alt="profile" className="w-20 h-20 rounded-xl" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-1 items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <div className="">Bob</div>
                            </div>

                            <div className="text-xs text-zinc-400">@bobTheBuilder</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap gap-1">
                                <div className="bg-white p-1 rounded-md">
                                    <MessagesSquare className="w-4 h-4 text-black" />
                                </div>
                                <div className="bg-[#EDA338] p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M21.71 3.235a.02.02 0 0 1-.022-.022c.002-.081.004-.37.005-.424c0-.129-.143-.183-.212-.083l-.229.333a.02.02 0 0 1-.02.01h-6.55a.047.047 0 0 1-.048-.046l-.013-.177a.048.048 0 0 1 .056-.048l.335.032a.06.06 0 0 0 .063-.045l.244-.989a.05.05 0 0 0-.03-.054l-.227-.085a.04.04 0 0 1-.026-.03c-.041-.171-.377-1.323-1.993-1.58c-.787-.125-1.302.21-1.577.478a1.6 1.6 0 0 0-.302.41l-.097.212a2 2 0 0 0-.046.234l.051.982a.11.11 0 0 0 .043.085l.354.153l-.196.325a.055.055 0 0 1-.053.04s-.417.01-.622.02c-.386.015-1.245.485-1.878 1.838l-.724 1.55a.07.07 0 0 1-.068.04l-.578.001c-.035 0-.073.028-.088.06L6.364 9a.11.11 0 0 0 .017.108l.627.392a.06.06 0 0 1 .02.058l-.328.967a.2.2 0 0 1-.023.062l-.435.382a.1.1 0 0 0-.035.06l-.598 1.53a.06.06 0 0 1-.06.045l-.336.002a.163.163 0 0 0-.162.149l-.201 2.288l-.016.121l-.158.908a.13.13 0 0 1-.034.055l-.558.427a4.8 4.8 0 0 0-.767 1.001l-1.86 3.924a.8.8 0 0 0-.078.322l.132.235c.002.084-.032.456-.07.53l-.624 1.09a.1.1 0 0 0-.003.085l.03.07l.094.187L2.829 24c.118.011.247-.14.251-.3l.103-1.297l-.027-.195l3.606-4.232c.095-.114.222-.317.286-.45l1.719-3.79a.17.17 0 0 1 .1-.088l.109-.035a.17.17 0 0 1 .183.053c.15.181.504.781.676 1.032c.143.208.85 1.23 1.158 1.567c.086.093.349.198.466.27a.083.083 0 0 1 .03.112l-1.03 1.808l-.455 2.136a1 1 0 0 0-.036.152l-.412 1.483c.003.188-.14.286-.153.507l-.15 1.084a.06.06 0 0 0 .059.061l2.544.014q.142-.001.286-.006l.075-.007c.124-.016.563-.076.75-.15a.6.6 0 0 0 .227-.13c.185-.194.2-.278.203-.398a.3.3 0 0 0-.028-.105a.12.12 0 0 0-.06-.047l-1.18-.356a.37.37 0 0 1-.19-.134l-.317-.47a.09.09 0 0 1 .018-.097l.618-.609a.2.2 0 0 0 .048-.072l1.904-4.488c.089-.285.059-.605 0-.944c-.044-.25-.686-1.326-.854-1.624l-1.286-2.251c-.079-.138-.19-.133-.228-.276l-.073-1.118a.04.04 0 0 1 .036-.05l.33-.028a.1.1 0 0 0 .075-.048l1.147-2.155a.1.1 0 0 0-.002-.094l-.235-.29a.09.09 0 0 1-.001-.088l.352-.38a.054.054 0 0 1 .073-.02l.934.526a.4.4 0 0 0 .186.05c.26-.001.686-.154.908-.29a.4.4 0 0 0 .139-.148l.458-1.07c.006-.014.027-.012.03.003l.127.595a.064.064 0 0 0 .079.05l1.35-.3a.066.066 0 0 0 .05-.078l-.319-1.344a.07.07 0 0 1 .01-.054l.13-.203a.3.3 0 0 0 .037-.082l.159-.725a.04.04 0 0 1 .04-.032l3.732.005a.09.09 0 0 0 .093-.093v-.634a.02.02 0 0 1 .022-.021h1.439a.047.047 0 0 0 .046-.047V3.28a.047.047 0 0 0-.046-.047h-1.44z" />
                                    </svg>
                                </div>
                                <div className="bg-[#ff4654] p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M23.792 2.152a.25.25 0 0 0-.098.083q-5.077 6.345-10.15 12.69c-.107.093-.025.288.119.265c2.439.003 4.877 0 7.316.001a.66.66 0 0 0 .552-.25l2.324-2.903a.72.72 0 0 0 .144-.49c-.002-3.077 0-6.153-.003-9.23c.016-.11-.1-.206-.204-.167zM.077 2.166c-.077.038-.074.132-.076.205q.002 4.612.001 9.225a.68.68 0 0 0 .158.463l7.64 9.55c.12.152.308.25.505.247c2.455 0 4.91.003 7.365 0c.142.02.222-.174.116-.265C10.661 15.176 5.526 8.766.4 2.35c-.08-.094-.174-.272-.322-.184z" />
                                    </svg>
                                </div>
                                <div className="bg-[#6DB8FA] p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="m15.767 14.171l.097-5.05H12.4V5.197h3.99L16.872 0H7.128v24l5.271-.985V14.17z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-2">
                            <Button className="w-full text-xs bg-zinc-900 text-zinc-400 border hover:bg-zinc-800/10 rounded-xl cursor-pointer">Message</Button>
                            <Button className="w-full rounded-xl bg-green-500 hover:bg-green-500/80 cursor-pointer">$1.99/game</Button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default TopCreators