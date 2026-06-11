const authService =
require(
    "../services/auth.service"
);

const login =
async (
    req,
    res
) => {

    try {

        const {
            username,
            password
        } = req.body;

        const token =
            await authService
            .login(
                username,
                password
            );

        res.status(200)
        .json({
            success: true,
            token
        });

    } catch (error) {

        res.status(401)
        .json({
            success: false,
            message:
                error.message
        });

    }

};

const register =
async (
    req,
    res
) => {

    try {

        const result =
            await authService
            .register(
                req.body
            );

        res.status(201)
        .json({
            success: true,
            message:
                "User registered successfully",
            user_id:
                result.insertId
        });

    } catch (error) {

        res.status(400)
        .json({
            success: false,
            message:
                error.message
        });

    }

};

module.exports = {
    login,
    register
};