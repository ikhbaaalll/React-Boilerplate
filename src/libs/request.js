import axios from "axios";
// import jwtDecode from "jwt-decode";
import { isNil, isObject, omitBy } from "lodash";

import env from "@/configs/env";
import { isNullOrEmpty } from "@/services/helper";

const { API } = env;

const request = axios.create({
	timeout: 30000,
});

request.interceptors.response.use(
	(response) => response,
	(error) => {
		throw error;
	},
);

export const getValidToken = async () => {
	const token = localStorage.getItem("token");
	if (!token) {
		return "";
	}
	const decoded = "";
	const currentTime = Date.now() / 1000;
	if (decoded.exp > currentTime) {
		return token;
	} else {
		const refresh_token = localStorage.getItem("refreshToken");
		const refreshedToken = await request.post(`${API}/token/refresh`, {
			refresh_token,
		});

		localStorage.setItem("token", refreshedToken?.data?.token);
		localStorage.setItem(
			"refreshToken",
			refreshedToken?.data?.refresh_token,
		);

		return refreshedToken?.data?.token;
	}
};

export const GET = async ({
	path,
	params = {},
	domain = API,
	responseType = "json",
}) => {
	const token = await getValidToken();
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	let url = `${domain}${path}`;

	return new Promise((resolve, reject) => {
		request
			.get(url, {
				headers,
				params: isObject(params) && !isNullOrEmpty(params) ? params : undefined,
				responseType,
			})
			.then((response) => {
				return resolve(response);
			})
			.catch((err) => {
				const error = err?.response?.data || err?.response;
				return reject(error);
			});
	});
};

export const POST = async ({
	path,
	payload = {},
	params = {},
	domain = API,
}) => {
	const token = await getValidToken();
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};

	let url = `${domain}${path}`;

	return new Promise((resolve, reject) => {
		request
			.post(url, payload, {
				headers,
				params:
					isObject(params) && !isNullOrEmpty(params)
						? omitBy(params, isNil)
						: undefined,
			})
			.then((response) => {
				return resolve(response.data);
			})
			.catch((err) => {
				return reject(err?.response?.data);
			});
	});
};

export const PUT = async ({ path, payload, params = {}, domain = API }) => {
	const token = await getValidToken();
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};

	let url = `${domain}${path}`;

	return new Promise((resolve, reject) => {
		request
			.put(url, payload, {
				headers,
				params: isObject(params) && !isNullOrEmpty(params) ? params : undefined,
			})
			.then((response) => {
				return resolve(response);
			})
			.catch((err) => {
				const error = err?.response?.data || err?.response;
				return reject(error);
			});
	});
};

export const DELETE = async ({
	path,
	payload = {},
	params = {},
	domain = API,
}) => {
	const token = await getValidToken();
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};

	let url = `${domain}${path}`;

	return new Promise((resolve, reject) => {
		request
			.delete(url, {
				headers,
				data: payload,
				params: isObject(params) && !isNullOrEmpty(params) ? params : undefined,
			})
			.then((response) => {
				return resolve(response);
			})
			.catch((err) => {
				const error = err?.response?.data || err?.response;
				return reject(error);
			});
	});
};
