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
        invoice: "@ethan",
        paymentStatus: "1h",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "@ethan",
        paymentStatus: "30m",
        totalAmount: "$4.99",
        paymentMethod: "PayPal",
    },
    {
        invoice: "@pacos",
        paymentStatus: "1 game",
        totalAmount: "$0.99",
        paymentMethod: "Bank Transfer",
    },
]

function RecentActivity() {
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">Recent Activities</div>
                </div>
                <Table className="bg-zinc-800/30 border border-zinc-800 rounded-lg">
                    <TableHeader>
                        <TableRow >
                            <TableHead className="w-[100px] sm:w-[200px]">Played with</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="hidden sm:flex items-center py-0">Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium text-xs text-blue-400">{invoice.invoice}</TableCell>
                                <TableCell className=" text-xs text-zinc-400">{invoice.paymentStatus}</TableCell>
                                <TableCell className="hidden sm:flex text-xs">{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right text-xs text-green-400">{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
export default RecentActivity