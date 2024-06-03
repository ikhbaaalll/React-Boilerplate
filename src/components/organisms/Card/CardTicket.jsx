import React from "react";

import PropTypes from "prop-types";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

import {
	Badge,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui";

const CardTicket = ({ ticket }) => {
	return (
		<Link to={`${ticket.id}`}>
			<Card className="rounded-xl">
				<CardHeader className="rounded-xl p-0">
					<img
						alt={`banner-${ticket.id}`}
						className="rounded-xl"
						src={ticket.eventBanner.find((i) => i.isCover).url}
					/>
				</CardHeader>
				<CardContent className="flex flex-col gap-2 p-3">
					<Badge
						className={"w-fit bg-ternary-purple-100 text-ternary-blue-900"}
					>
						{ticket.date}
					</Badge>
					<p>{ticket.name}</p>
					<p className="font-bold text-ternary-blue-900">
						RP {ticket.tickets[0].price}
					</p>
					<div className="border-b border-dashed border-b-secondary" />
				</CardContent>
				<CardFooter className="flex gap-2 px-3">
					<Avatar name={ticket.organization} round size="24" />
					<span className="font-bold">{ticket.organization}</span>
				</CardFooter>
			</Card>
		</Link>
	);
};

CardTicket.propTypes = {
	ticket: PropTypes.object,
};

export default CardTicket;
