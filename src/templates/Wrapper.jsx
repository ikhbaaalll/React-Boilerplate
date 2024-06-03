import React from "react";

const Wrapper =
	({ Component }) =>
	() => {
		return (
			<>
				<Component />
			</>
		);
	};

export default Wrapper;
