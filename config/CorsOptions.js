const optionsCors = {
    origin: (origin, callback) => {
        const whiteList = process.env.ORIGINS

        if (whiteList.includes(origin)) return callback(null, origin)
        return callback("Error the origin " + origin + " is not allowed!")
    },
    optionsSuccessStatus: 200,
    credentials: true
}

module.exports = optionsCors;
