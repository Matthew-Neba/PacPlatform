import { useState, useEffect } from "react";

import { AuthService } from "@/api/AuthService";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

export default function Profile() {
	const [username, setUsername] = useState(() =>
		localStorage.getItem("username")
	);

	useEffect(() => {
		try {
			AuthService.checkAuth();
		} catch (error) {
			console.error("Check auth failed " + error.response.data);
		}
	}, []);

	const handleSelectChange = (value) => {
		console.log(value);
	};

	return (
		<div className="w-full h-screen flex flex-col items-center justify-evenly md:flex-row gap-10">
			<div className="w-2/5 rounded-md shadow-2xl shadow-foreground flex flex-col gap-12">
				<div className=" h-1/4 flex flex-row items-center justify-center gap-8 ">
					<Avatar className="mt-1 w-8 h-8  md:w-16 md:h-16">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>Your Image</AvatarFallback>
					</Avatar>
					<div className=" font-bold ">{username}</div>
				</div>
				<Card className="h-full">
					<CardContent className="flex flex-col">
						<Table>
							<TableRow>
								<TableCell>Highest Score</TableCell>
								<TableCell>50</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Highest Score</TableCell>
								<TableCell>50</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Highest Score</TableCell>
								<TableCell>50</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Highest Score</TableCell>
								<TableCell>50</TableCell>
							</TableRow>
						</Table>
					</CardContent>

					<CardFooter className="flex flex-row justify-center">
						<Button>View Friends</Button>
					</CardFooter>
				</Card>
			</div>

			<Card className=" h-3/4 w-2/5 rounded-md shadow-2xl shadow-foreground">
				<CardHeader className="flex flex-row items-center justify-center gap-20 ">
					<div className="text-center font-bold">Leaderboard</div>

					<Select onValueChange={handleSelectChange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">
									Blueberry
								</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">
									Pineapple
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</CardHeader>

				<CardContent className="h-full">
					<ScrollArea className="h-4/5 w-full rounded-md border">
						<Table>
							<TableCaption>
								A list of your recent invoices.
							</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead>Invoice</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Method</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{invoices.map((invoice) => (
									<TableRow key={invoice.invoice}>
										<TableCell className="font-medium">
											{invoice.invoice}
										</TableCell>
										<TableCell>
											{invoice.paymentStatus}
										</TableCell>
										<TableCell>
											{invoice.paymentMethod}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}