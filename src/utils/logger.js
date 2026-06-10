const logger = (
    action,
    message
) => {

    console.log(
        `[${new Date().toISOString()}] [${action}] ${message}`
    );

};

module.exports =
logger;