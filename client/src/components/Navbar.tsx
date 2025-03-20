import { ModeToggle } from "./add-mode-toggle";

const Navbar = () => {
	return (
		<div className="px-80 rounded-lg bg-gray-200 dark:bg-gray-800 flex justify-between w-full items-center relative shadow-sm font-mono p-4">
			<div className="h-max flex items-center space-x-5">
				<img
					src="/react.png"
					alt="logo"
					width={50}
					height={50}
					className="animate-spin"
					style={{ animationDuration: "3s" }}
				/>
				<span className="text-4xl">+</span>
				<img src="/go.png" alt="logo" width={40} height={40} />
			</div>
			<ModeToggle />
		</div>
	);
};

export default Navbar;
