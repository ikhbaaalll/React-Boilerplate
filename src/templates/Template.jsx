import React from "react";

import { Database } from "lucide-react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
} from "@/components/ui";

const Template = () => {
	return (
		<>
			<div className="flex">
				<div
					className={`scrollbar-hide left-0 top-0 hidden h-screen w-1/12 flex-shrink-0 translate-x-0 items-center overflow-y-scroll border-r border-slate-200 duration-200 ease-linear lg:block lg:w-1/6`}
				>
					<div className={`flex flex-col gap-1 px-4 pb-2`}>
						<a href="#" target="_blank" rel="noreferrer">
							Logo
							{/* <img src={Logo} alt="logo" className="w-12 pt-3" /> */}
						</a>
						<div className="mt-8 flex flex-col">
							<Accordion type="single" collapsible>
								<AccordionItem value="accordion-master">
									<AccordionTrigger
										isUsingIcon={false}
										className="w-full hover:no-underline"
									>
										<Button className="w-full justify-start gap-3 bg-ternary-blue-900 px-4 py-6 text-lg text-white">
											<Database /> Master
										</Button>
									</AccordionTrigger>
									<AccordionContent>
										<Button
											asChild
											variant="ghost"
											className="w-full justify-start"
										>
											<Link to={"/master/user"}>User</Link>
										</Button>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</div>
				<div className="font-Roboto-Condensed h-screen w-10/12 flex-grow overflow-y-hidden">
					<div className="flex h-full w-full flex-col overflow-hidden p-2 md:p-4 lg:p-6">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default Template;
