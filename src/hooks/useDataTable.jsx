import { useMemo, useState } from "react";

import { useCustomQuery } from "./useCustomQuery";

export const useDataTable = ({
	api = () => {},
	queryKey,
	queryParams = {},
	enabled = true,
}) => {
	const [{ pageSize, pageIndex }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize],
	);

	const { data, isLoading } = useCustomQuery({
		api,
		queryKey: [queryKey, { page: pageIndex, limit: pageSize }],
		queryParams: {
			page: pageIndex + 1,
			limit: pageSize,
			...queryParams,
		},
		enabled,
	});

	return {
		pagination,
		setPagination,
		data,
		isLoading,
	};
};
