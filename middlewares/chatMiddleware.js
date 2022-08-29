const chatMiddleware = (io) => {
    return (req, res, next) => {
        req.chat = io;
        next();
    }
}

module.exports = chatMiddleware;