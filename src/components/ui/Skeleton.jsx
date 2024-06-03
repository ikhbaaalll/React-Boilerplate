import React from "react";

import PropTypes from "prop-types";

import { cn } from "@/libs/utils";

function Skeleton({ className, ...props }) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-slate-500/70", className)}
			{...props}
		/>
	);
}

Skeleton.propTypes = {
	className: PropTypes.string,
};

export { Skeleton };
