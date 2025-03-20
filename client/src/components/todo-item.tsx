import { Todo } from "./todo-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { CheckCircle, LoaderCircle, Trash2Icon } from "lucide-react";

const TodoItem = ({ todo }: { todo: Todo }) => {
	const queryClient = useQueryClient();

	const { mutate: updateTodo, isPending: isUpdating } = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: async () => {
			if (todo.completed) return alert("Todo is already completed");
			try {
				const res = await fetch(`${BASE_URL}/todos/${todo._id}`, {
					method: "PATCH",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: async () => {
			try {
				const res = await fetch(`${BASE_URL}/todos/${todo._id}`, {
					method: "DELETE",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	return (
		<Card className="flex items-center gap-2 p-4 border border-gray-600">
			<CardContent className="flex flex-1 items-center justify-between w-full">
				<span
					className={cn(
						"text-lg",
						todo.completed ? "text-green-500 line-through" : "text-yellow-400"
					)}
				>
					{todo.body}
				</span>
				<Badge className={todo.completed ? "bg-green-500" : "bg-yellow-500"}>
					{todo.completed ? "Done" : "In Progress"}
				</Badge>
			</CardContent>
			<div className="flex gap-2 justify-between items-center w-full px-4">
				<Button
					variant="ghost"
					className="text-green-500"
					onClick={() => updateTodo()}
					disabled={isUpdating}
				>
					{isUpdating ? (
						<LoaderCircle size="sm" className="animate-spin" />
					) : (
						<CheckCircle size={30} />
					)}
				</Button>
				<Button
					variant="ghost"
					className="text-red-500"
					onClick={() => deleteTodo()}
					disabled={isDeleting}
				>
					{isDeleting ? (
						<LoaderCircle size="sm" className="animate-spin" />
					) : (
						<Trash2Icon size={30} />
					)}
				</Button>
			</div>
		</Card>
	);
};

export default TodoItem;
