/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../App";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, Plus } from "lucide-react";

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");

	const queryClient = useQueryClient();

	const { mutate: createTodo, isPending: isCreating } = useMutation({
		mutationKey: ["createTodo"],
		mutationFn: async (e: React.FormEvent) => {
			e.preventDefault();
			try {
				const res = await fetch(BASE_URL + "/todos", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ body: newTodo }),
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				setNewTodo("");
				return data;
			} catch (error: any) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error: any) => {
			alert(error.message);
		},
	});

	return (
		<form onSubmit={createTodo} className="w-full max-w-lg">
			<div className="flex gap-2">
				<Input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<Button
					className="mx-2 active:scale-95"
					type="submit"
					disabled={isCreating}
				>
					{isCreating ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<Plus size={30} />
					)}
				</Button>
			</div>
		</form>
	);
};

export default TodoForm;
