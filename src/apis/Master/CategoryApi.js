import { GET } from "@/libs/request";

export default {
	getAll: (params) => GET({ path: "/category", params }),
};
