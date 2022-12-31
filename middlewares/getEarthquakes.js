const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const catchAsync = require("../utils/catchAsync");

const parseEarthQuakes = catchAsync(async (req, res, next) => {
    // Get the data from the website
    let resp = await axios.get("http://www.koeri.boun.edu.tr/scripts/lst0.asp");
    const $ = cheerio.load(resp.data);
    const response = $("pre").text();
    let result = response.split("\n");
    result = result.splice(6, result.length + 1);
    result = result.splice(0, result.length - 2);
    let quakes = result.map((element, index) => {
        let quakeString = element.split(" ");
        let quakeInfo = [];
        for (let i = 0; i < quakeString.length; i++) {
            if (quakeString[i].length > 0) {
                quakeInfo.push(quakeString[i]);
            }
        }
        let date = quakeInfo[0];
        let time = quakeInfo[1];
        let latitude = quakeInfo[2];
        let longitude = quakeInfo[3];
        let depth = quakeInfo[4];
        let magnitude = quakeInfo[6];
        let place = quakeInfo[8];
        let city = quakeInfo[9];
        if (city != null) {
            if (quakeInfo[9].includes("(")) {
                city = quakeInfo[9];
            } else {
                city = "";
            }
        } else {
            city = "";
        }
        // Get moment date from the date and time
        return {
            id: index + 1,
            date: moment(date + " " + time, "YYYY.MM.DD HH:mm:ss").format(),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            depth: parseFloat(depth),
            magnitude: parseFloat(magnitude),
            place,
            city: city.replace("(", "").replace(")", "")
        };
    });
    req.quakes = quakes;
    next();
});

module.exports = parseEarthQuakes;