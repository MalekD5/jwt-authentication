import userModel from "../models/userModel.js";

export const logut = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) 
        return res.sendStatus(204);
    
    const refreshToken = cookies.jwt;

    const user = await userModel.findOne({ refreshToken }).exec();

    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
        return res.sendStatus(204);
    }
    
    user.refreshToken = '';
    await user.save();

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
    res.sendStatus(204);
}
