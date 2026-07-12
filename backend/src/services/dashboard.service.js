const dashboardRepository =
require(
    "../repositories/dashboard.repository"
);

const getDashboardStats =
async (user) => {

    return await
    dashboardRepository
    .getDashboardStats(
        user
    );

};

module.exports = {
    getDashboardStats
};