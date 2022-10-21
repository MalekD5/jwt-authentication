import { allowedOrigins } from "../config/corsOptions.js";

export const credentialMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) !== -1)
        res.header('Access-Control-Allow-Credentials', true);
    
    next();
}
