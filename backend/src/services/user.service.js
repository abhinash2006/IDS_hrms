const userRepository =
require(
    "../repositories/user.repository"
);

const getUsers =
async (
    page,
    limit,
    search
) => {

    return await
    userRepository
    .getUsers(
        page,
        limit,
        search
    );

};

const getUserById =
async (id) => {

    return await
        userRepository.getUserById(id);

};

const updateUser =
async (
    id,
    userData
) => {

    return await
        userRepository.updateUser(
            id,
            userData
        );

};

const deleteUser =
async (id) => {

    return await
        userRepository.deleteUser(id);

};

const getEmployeeUsers =
async () => {

    return await userRepository
    .getEmployeeUsers();

};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getEmployeeUsers
};