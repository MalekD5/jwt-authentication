import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const authUser = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) 
        return res.status(400).json({ message: "Username and password are required." });

    const dbUser = await userModel.findOne({ user: user }).exec();
    console.log(dbUser);
    if (!dbUser)
        return res.sendStatus(401);
    
    const evaluate = await bcrypt.compare(password, dbUser.password);
    if (evaluate) {
        const roles = Object.values(dbUser.roles);
        const accessToken = jwt.sign(
            { 
                user: dbUser.user,
                roles
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { user: dbUser.user }, 
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        dbUser.refreshToken = refreshToken;
        await dbUser.save();

        // remove 'secure: true' while testing or you will keep recieving unauthorized response
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        
        res.status(200).json({ accessToken });
    } else 
        res.sendStatus(401);
}
