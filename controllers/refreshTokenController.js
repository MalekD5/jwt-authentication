import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const dbUser = await userModel.findOne({ refreshToken }).exec();

    if (!dbUser)
        return res.sendStatus(403); // forbidden
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || dbUser.user !== decoded.user)
            return res.sendStatus(403);
        const roles = Object.values(dbUser.roles);
        const accessToken = jwt.sign(
         { 
            user: decoded.user, roles
         }, 
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '30s' }
        );
        
        res.status(200).json({ accessToken });
    });
}
