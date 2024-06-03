import * as React from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

import { cn } from "@/libs/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn("border-b", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

AccordionItem.propTypes = {
	className: PropTypes.string,
};

const AccordionTrigger = React.forwardRef(
	({ className, isUsingIcon = true, children, ...props }, ref) => (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				ref={ref}
				className={cn(
					"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				{isUsingIcon ? (
					<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
				) : null}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

AccordionTrigger.propTypes = {
	className: PropTypes.string,
	isUsingIcon: PropTypes.bool,
	children: PropTypes.node,
};

const AccordionContent = React.forwardRef(
	({ className, children, ...props }, ref) => (
		<AccordionPrimitive.Content
			ref={ref}
			className="w-full overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
			{...props}
		>
			<div className={cn("pb-4 pt-0", className)}>{children}</div>
		</AccordionPrimitive.Content>
	),
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

AccordionContent.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
