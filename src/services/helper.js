export const isNullOrEmpty = (obj) => {
	try {
		let json = {};
		let arr = [];
		if (
			obj === null ||
			obj === "" ||
			obj === undefined ||
			((json.constructor === obj.constructor ||
				arr.constructor === obj.constructor) &&
				Object.keys(obj).length === 0) ||
			(obj && obj.length === 0)
		) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return true;
	}
};

export const getPaginationPage = (count = 1, pageSize) => {
	const mod = count % pageSize;
	const getNext = mod !== 0 ? 1 : 0;
	const totalPage = parseInt(count / pageSize) + getNext;

	return totalPage;
};
