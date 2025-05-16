import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import router from "./routers/Routers";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<div className="max-w-screen-xl mx-auto">
					<RouterProvider router={router} />
				</div>
			</QueryClientProvider>
		</AuthProvider>
	</React.StrictMode>
);
