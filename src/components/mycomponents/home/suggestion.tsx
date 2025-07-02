
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        invoice: "@ted",
        paymentStatus: "30m",
        totalAmount: "$4.99",
        matchedCategory: "Valorant",
    },
    {
        invoice: "@marlon",
        paymentStatus: "30m",
        totalAmount: "$4.99",
        matchedCategory: "Fortnite",
    },
    {
        invoice: "@nick",
        paymentStatus: "1 game",
        totalAmount: "$0.99",
        matchedCategory: "Fortnite",
    },
]

function Suggestions() {
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">Suggested users</div>
                </div>
                <Table className="bg-zinc-800/30 border border-zinc-800 rounded-lg">
                    <TableHeader>
                        <TableRow >
                            <TableHead className="w-[100px] sm:w-[250px]">User</TableHead>
                            <TableHead >Duration</TableHead>
                            <TableHead className="hidden sm:flex items-center py-0">Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium text-xs text-blue-400">{invoice.invoice}</TableCell>
                                <TableCell className=" text-xs text-zinc-400">{invoice.paymentStatus}</TableCell>
                                <TableCell className="hidden sm:flex text-xs text-zinc-400">{invoice.matchedCategory}</TableCell>
                                <TableCell className="text-right text-xs text-green-400 "><span className="p-1 px-2 cursor-pointer rounded-md bg-green-500/10 hover:bg-green-500/20 transition-all duration-200">{invoice.totalAmount} </span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
export default Suggestions