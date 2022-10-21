import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

export const __dirname = "";

export const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password)
        return res.status(400).json({ message: 'username and password are required '});
    const duplicates = await userModel.findOne({ user }).exec();

    if (duplicates)
        return res.sendStatus(409);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            user,
            password: hashedPassword,
        });
        res.sendStatus(201);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

