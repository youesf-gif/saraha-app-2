import { User } from "../../common/db/models/user.model.js";

async function findUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
}

async function createUser(userName, email, password) {
    const user = await User.create({ userName, email, password });
    return user;
}

async function updateUser(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, {
        returnDocument: "after",
    });
    return user;
}

export default { findUserByEmail, createUser, updateUser };
