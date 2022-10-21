import mongoose from 'mongoose';

const schema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    roles: {
        user: {
            type: Number,
            default: 1000
        },
        mod: Number,
        admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

const userModel = mongoose.model('userModel', schema);

export default userModel;
