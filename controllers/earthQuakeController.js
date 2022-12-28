exports.getEarthQuakes = async (req, res) => {
    try {
        // Get earthquakes
        let quakes = req.quakes;
        // Get query parameters
        const count = req.query.count ? parseInt(req.query.count) : 50;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const sort_by = req.query.sort_by ? req.query.sort_by : "id";
        const sort_type = req.query.sort_type ? req.query.sort_type : "asc";
        /// Make filterings and sortings
        // Sort
        if (sort_type === "asc") {
            quakes.sort((a, b) => { return a[sort_by] - b[sort_by] });
        } else {
            quakes.sort((a, b) => { return b[sort_by] - a[sort_by] });
        }
        // Count and page
        quakes = quakes.slice((page - 1) * count, page * count);
        // Send the data to the client
        res.status(200).send({
            success: true,
            message: "Data is fetched successfully.",
            data: quakes
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ 
            success: false,
            message: "Error occured while getting the data from the website."
        });
    }
};

