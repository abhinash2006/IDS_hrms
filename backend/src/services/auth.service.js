const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const userRepository =
require(
"../repositories/user.repository"
);

const login =
async (
    username,
    password
) => {

    const user =
        await userRepository
        .findByUsername(
            username
        );

    if(!user){

        throw new Error(
            "Invalid Credentials"
        );
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if(!isMatch){

        throw new Error(
            "Invalid Credentials"
        );
    }

    const token =
        jwt.sign(
            {
                id:user.id,
                username:
                    user.username,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );

    return token;
};

const register =
async (
    userData
) => {

    const {
        username,
        email,
        password,
        role
    } = userData;

    const existingUsername =
        await userRepository
        .findByUsername(
            username
        );

    if (
        existingUsername
    ) {

        throw new Error(
            "Username already exists"
        );

    }

    const existingEmail =
        await userRepository
        .findByEmail(
            email
        );

    if (
        existingEmail
    ) {

        throw new Error(
            "Email already exists"
        );

    }

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

    const result =
        await userRepository
        .createUser({
            username,
            email,
            password:
                hashedPassword,
            role
        });

    return result;
};

module.exports = {
    login,
    register
};