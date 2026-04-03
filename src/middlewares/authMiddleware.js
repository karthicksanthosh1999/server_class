import jwt from 'jsonwebtoken';

export default async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({
                message: "Token Not Found",
                statusCode: 400
            })
        }

        const decodedToken = jwt.decode(token, "JWT-KEY");

        if (!decodedToken) {
            return res.json({
                message: "Not a valid token",
                statusCode: 401
            })
        };

        next()

    } catch (error) {
        return res.json({ error })
    }
}

