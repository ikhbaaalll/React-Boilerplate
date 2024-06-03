import React, { Fragment } from "react";

import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

import { numberWithDelimeter } from "@/services/formatter";

import { Skeleton } from "../ui";

const Table = ({
	columns,
	data = [...Array.from({ length: 5 })],
	pageCount,
	state,
	setPagination,
	total = 0,
	isUsePagination = true,
	className = "",
	rowClass = () => {},
	isLoading = false,
	getRowCanExpand,
	ExpandedComponent,
	classNameHeader,
}) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		pageCount,
		onPaginationChange: setPagination,
		state: { state },
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		initialState: {
			columnVisibility: {
				...Object.assign(
					{},
					...columns.map((item) => ({
						[item.accessorKey]: item.isVisible ?? true,
					})),
				),
			},
			expanded: state?.expanded,
		},
		getRowCanExpand: getRowCanExpand,
		getExpandedRowModel: getExpandedRowModel(),
	});

	return (
		<>
			<div
				className={twMerge(
					"custom-scrollbar round-table overflow-auto p-2 text-black shadow-md",
					className,
				)}
			>
				<table className="custom-scrollbar w-full border-collapse p-1">
					<thead
						className={twMerge(
							"sticky top-0 z-[5] bg-white",
							clsx({
								// "shadow-[0px_1px_10px_5px_rgba(120,120,120,0.3)]":
								// 	headerTransparent,
							}),
						)}
					>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className={twMerge(
											"bg-ternary-blue-100 p-3 text-left",
											classNameHeader,
										)}
									>
										{header.column.columnDef.header}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{(!data?.length || data?.filter(Boolean).length === 0) &&
						!isLoading ? (
							<tr>
								<td
									className="text-ternary-gray-200/80 border border-solid border-slate-200 p-2 text-center font-normal"
									colSpan={table.getAllColumns().length}
								>
									Data not found
								</td>
							</tr>
						) : (
							table.getPaginationRowModel().rows.map((row) => (
								<Fragment key={row.id}>
									<tr
										className={twMerge(
											clsx("bg-slate-200/80" && row?.index % 2 === 0),
											rowClass(row.index),
										)}
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className={twMerge(
													"overflow-hidden overflow-ellipsis border-b border-solid border-slate-200 p-2",
													clsx({
														[cell.column.columnDef.width]:
															!!cell.column.columnDef.width,
														"border-0 border-solid border-slate-200":
															row.getIsExpanded(),
													}),
													cell.column.columnDef.className,
												)}
											>
												{isLoading ? (
													<Skeleton className="h-3" />
												) : (
													flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)
												)}
											</td>
										))}
									</tr>
									{row.getIsExpanded() && (
										<tr>
											<td
												colSpan={row.getVisibleCells().length}
												className="border-b border-solid border-slate-200 px-3 py-3"
											>
												<ExpandedComponent row={row} />
											</td>
										</tr>
									)}
								</Fragment>
							))
						)}
					</tbody>
				</table>
			</div>
			{/* Pagination */}
			{isUsePagination && total > 0 ? (
				<div className="mt-2 flex w-full flex-row justify-between px-2 pb-2 text-black md:px-8">
					<div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
						<span className="flex gap-2">
							Show
							<select
								className="border-primary-500 rounded-md border px-1"
								value={state.pageSize}
								onChange={(e) => {
									table.setPageSize(Number(e.target.value));
									table.setPageIndex(0);
								}}
							>
								{[10, 20, 50, 100].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
								<option value={total}>All</option>
							</select>
						</span>
						<p>from {numberWithDelimeter(total)} data</p>
					</div>
					<div className="flex flex-col items-end gap-2 md:float-right md:flex-row md:items-center">
						<span className="flex gap-2">
							<button
								className={`border-primary-500 flex rounded-md border bg-white p-1 ${
									state.pageIndex === 0 ? "text-gray-400" : "text-slate-900"
								}`}
								onClick={() => table.setPageIndex(0)}
								disabled={state.pageIndex === 0}
								type="button"
							>
								<ChevronLeft className="h-4 w-4" />
								<ChevronLeft className="ml-[-12px] h-4 w-4" />
							</button>
							<button
								className={`border-primary-500 rounded-md border bg-white p-1 ${
									state.pageIndex === 0 ? "text-gray-400" : "text-slate-900"
								}`}
								onClick={() => table.previousPage()}
								disabled={state.pageIndex === 0}
								type="button"
							>
								<ChevronLeft className="h-4 w-4" />
							</button>
							<button
								className={`border-primary-500 rounded-md border bg-white p-1 ${
									state.pageIndex + 1 === pageCount
										? "text-gray-400"
										: "text-slate-900"
								}`}
								onClick={() => table.nextPage()}
								disabled={state.pageIndex + 1 === pageCount}
								type="button"
							>
								<ChevronLeft className="h-4 w-4 rotate-180 transform" />
							</button>
							<button
								className={`border-primary-500 flex rounded-md border bg-white p-1 ${
									state.pageIndex + 1 === pageCount
										? "text-gray-400"
										: "text-slate-900"
								}`}
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={state.pageIndex + 1 === pageCount}
								type="button"
							>
								<ChevronLeft className="h-4 w-4 rotate-180 transform" />
								<ChevronLeft className="ml-[-12px] h-4 w-4 rotate-180 transform" />
							</button>
						</span>
						<span className="flex items-center gap-1">
							<div>Page</div>
							<strong>
								{state.pageIndex + 1} from {table.getPageCount()}
							</strong>
						</span>
					</div>
				</div>
			) : null}
		</>
	);
};

Table.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array,
	pageCount: PropTypes.number,
	state: PropTypes.object.isRequired,
	setPagination: PropTypes.func,
	total: PropTypes.number,
	isUsePagination: PropTypes.bool,
	className: PropTypes.string,
	rowClass: PropTypes.func,
	isLoading: PropTypes.bool,
	getRowCanExpand: PropTypes.func,
	ExpandedComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.node,
		PropTypes.element,
	]),
	classNameHeader: PropTypes.string,
};

const TableHeader = ({ className, ...props }) => {
	return <div className={twMerge(className)} {...props} />;
};

TableHeader.propTypes = {
	className: PropTypes.string,
};

const TableCell = ({ className = "", ...props }) => {
	return (
		<div className={twMerge("text-xs md:text-sm", className)} {...props} />
	);
};

TableCell.propTypes = {
	className: PropTypes.string,
};

export { Table, TableHeader, TableCell };
