const { RateLimiterMemory } = require("rate-limiter-flexible");
const catchAsync = require("../utils/catchAsync");

const opts = {
    points: 3, // 6 points
    duration: 5, // second
};

const rateLimiter = new RateLimiterMemory(opts);

const checkRateLimit = catchAsync(async (req, res, next) => {
    rateLimiter.consume(req.ip, 1)
        .then((rate) => {
            res.header("X-RateLimit-Limit", opts.points);
            res.header("X-RateLimit-Used", rate.consumedPoints);
            res.header("X-RateLimit-Remaining", rate.remainingPoints);
            res.header("X-RateLimit-Reset", rate.msBeforeNext / 1000);
            next();
        })
        .catch((rate) => {
            res.header("X-RateLimit-Limit", opts.points);
            res.header("X-RateLimit-Used", rate.consumedPoints);
            res.header("X-RateLimit-Remaining", rate.remainingPoints);
            res.header("X-RateLimit-Reset", rate.msBeforeNext / 1000);
            res.header("Retry-After", rate.msBeforeNext / 1000);
            res.status(429).send({
                success: false,
                message: "Too many requests. Retry after 5 seconds.",
                data: null
            });
        });
});

module.exports = checkRateLimit;