import LayoutAPP from "./components/layout";
import { ThemeProvider } from "./components/theme-provider";

export const BASE_URL =
	import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";
function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<LayoutAPP />
		</ThemeProvider>
	);
}

export default App;
