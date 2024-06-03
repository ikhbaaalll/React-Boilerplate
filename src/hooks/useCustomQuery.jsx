import { useQuery } from "@tanstack/react-query";

import { camelizeKeys } from "@/libs/utils";

export const useCustomQuery = ({
	api,
	queryKey,
	enabled = true,
	staleTime = 30 * 1000,
	queryParams = {},
	isRefetchInBackground = false,
	refetchInterval = false,
}) => {
	const { data, isFetching, isLoading, error, refetch, isSuccess } = useQuery({
		queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
		queryFn: () => api({ ...queryParams }),
		enabled,
		staleTime,
		select: (res) => camelizeKeys(res.data),
		refetchIntervalInBackground: isRefetchInBackground,
		refetchInterval: refetchInterval,
	});

	return {
		data,
		isLoading: isLoading || isFetching,
		error,
		refetch,
		isSuccess,
	};
};
