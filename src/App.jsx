import React from "react";

import { Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import Template from "@/templates/Template";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Template />}>
					<Route path="/" element={<LandingPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
