const userService =
require(
    "../services/user.service"
);

const asyncHandler =
require(
    "../utils/asyncHandler"
);

const getUsers =
asyncHandler(
async (
    req,
    res
) => {

    const page =
        req.query.page || 1;

    const limit =
        req.query.limit || 5;

    const search =
        req.query.search || "";

    const result =
        await userService
        .getUsers(
            page,
            limit,
            search
        );

    res.status(200)
    .json({
        success:true,
        data:
            result.users,
        total:
            result.total
    });

});

const getUserById =
asyncHandler(
async (
    req,
    res
) => {

    const user =
        await userService
        .getUserById(
            req.params.id
        );

    res.status(200)
    .json({
        success:true,
        data:user
    });

});

const updateUser =
asyncHandler(
async (
    req,
    res
) => {

    await userService
        .updateUser(
            req.params.id,
            req.body
        );

    res.status(200)
    .json({
        success:true,
        message:
        "User updated successfully"
    });

});

const deleteUser =
asyncHandler(
async (
    req,
    res
) => {

    await userService
        .deleteUser(
            req.params.id
        );

    res.status(200)
    .json({
        success:true,
        message:
        "User deleted successfully"
    });

});

const getEmployeeUsers =
asyncHandler(
async (
    req,
    res
) => {

    const users =
    await userService
    .getEmployeeUsers();

    res.status(200).json({
        success:true,
        data:users
    });

});

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getEmployeeUsers
};