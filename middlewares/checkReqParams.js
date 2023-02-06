const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const checkReqParams = catchAsync(async (req, res, next) => {
    let { count, page, sort_by, order, fields } = req.query;
    let params = { count, page, sort_by, order, fields };
    let errorsList = [];
    // Count
    if (count) {
        if (isNaN(count) || count <= 0 || count > 500) {
            errorsList.push("count");
        } else {
            params.count = parseInt(count);
        }
    } else {
        params.count = 500;
    }
    // Page
    if (page) {
        if (isNaN(page) || page <= 0 || page > req.quakes.length / params.count) {
            errorsList.push("page");
        } else {
            params.page = parseInt(page);
        }
    } else {
        params.page = 1;
    }
    // Sort by
    if (sort_by) {
        let sort_by_options = ["date", "latitude", "longitude", "depth", "magnitude", "place", "city"];
        if (!sort_by_options.includes(sort_by)) {
            errorsList.push("sort_by");
        } else {
            params.sort_by = sort_by;
        }
    } else {
        params.sort_by = "date";
    }
    // Order
    if (order) {
        let order_options = ["asc", "desc"];
        if (!order_options.includes(order)) {
            errorsList.push("order");
        } else {
            params.order = order;
        }
    } else {
        params.order = "desc";
    }
    // Fields
    if (fields) {
        let fields_options = ["date", "latitude", "longitude", "depth", "magnitude", "place", "city"];
        fields = fields.split(",");
        for (let i = 0; i < fields.length; i++) {
            if (!fields_options.includes(fields[i])) {
                errorsList.push("fields");
                break;
            }
        }
        params.fields = fields;
    } else {
        params.fields = ["date", "latitude", "longitude", "depth", "magnitude", "place", "city"];
    }
    // If there are errorsList, throw an error
    if (errorsList.length > 0) {
        throw new AppError(`Invalid query parameters: ${errorsList.join(", ")}`, 400);
    }
    // Next
    req.query = params;
    next();
});

module.exports = checkReqParams;