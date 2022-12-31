const catchAsync = require("../utils/catchAsync");

exports.getEarthQuakes = catchAsync(async (req, res) => {
    // Get the query parameters
    let { page, count, sort_by, order, fields } = req.query;
    // Get earthquakes
    let quakes = req.quakes;
    /// Make filterings and sortings
    // Sort by and order
    quakes.sort((a, b) => { return a[sort_by] - b[sort_by] });
    if (order === "desc") quakes.reverse();
    // Count and page
    quakes = quakes.slice((page - 1) * count, page * count);
    // Fields
    quakes = quakes.map((quake) => {
        let newQuake = {};
        fields.forEach((field) => {
            newQuake[field] = quake[field];
        });
        return newQuake;
    });
    // Set the headers
    res.header("X-Total-Count", req.quakes.length);
    res.header("X-Total-Pages", Math.ceil(req.quakes.length / count));
    res.header("X-Current-Page", page);
    res.header("X-Per-Page", count);
    // Send the data to the client
    res.status(200).send({
        success: true,
        message: "Data is fetched successfully.",
        data: quakes
    });
});

