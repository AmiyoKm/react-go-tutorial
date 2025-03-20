import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";
import TodoItem from "./todo-item";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderCircle } from "lucide-react";

export type Todo = {
	_id: number;
	body: string;
	completed: boolean;
};

const TodoList = () => {
	const { data: todos, isLoading } = useQuery<Todo[]>({
		queryKey: ["todos"],
		queryFn: async () => {
			try {
				const res = await fetch(`${BASE_URL}/todos`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data || [];
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<div className="flex flex-col items-center gap-4 w-full">
			<h1 className="text-4xl font-bold text-center my-2 bg-gradient-to-l from-blue-500 to-cyan-400 bg-clip-text text-transparent">
				Today's Tasks
			</h1>
			{isLoading && (
				<div className="flex justify-center my-4">
					<LoaderCircle className="size-20 animate-spin" />
				</div>
			)}
			{!isLoading && todos?.length === 0 && (
				<Card className="w-full max-w-lg p-4 text-center">
					<CardContent>
						<p className="text-xl text-gray-500">All tasks completed! 🤞</p>
						<img
							src="/go.png"
							alt="Go logo"
							width={70}
							height={70}
							className="mx-auto mt-2"
						/>
					</CardContent>
				</Card>
			)}
			<ScrollArea className="w-full max-w-lg h-[70vh] p-2 border rounded-lg overflow-y-auto">
				<div className="flex flex-col gap-3">
					{todos?.map((todo) => (
						<TodoItem key={todo._id} todo={todo} />
					))}
				</div>
			</ScrollArea>
		</div>
	);
};

export default TodoList;
