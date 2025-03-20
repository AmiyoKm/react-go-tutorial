import Navbar from "./Navbar";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";

const LayoutAPP = () => {
	return (
		<div className=" mx-auto flex flex-col items-center min-h-screen w-full">
			<Navbar />
			<div className="container mx-auto grow flex flex-col items-center m-4">
				<TodoForm />
				<TodoList />
			</div>
		</div>
	);
};

export default LayoutAPP;
