import React from "react";

import PropTypes from "prop-types";

import CardTicket from "../Card/CardTicket";

const SectionTicket = ({ tickets = [] }) => {
	return (
		<div className="grid w-full grid-cols-2 gap-8 md:grid-cols-4">
			{tickets.map((ticket, i) => (
				<CardTicket key={i} ticket={ticket} />
			))}
		</div>
	);
};

SectionTicket.propTypes = {
	tickets: PropTypes.array,
};

export default SectionTicket;
