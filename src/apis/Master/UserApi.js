import { GET } from "@/libs/request";

export default {
	getAll: (params) => GET({ path: "/v1/master/user", params }),
};
