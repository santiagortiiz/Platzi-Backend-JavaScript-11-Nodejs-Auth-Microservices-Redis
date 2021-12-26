const config = {
    host: process.env.HOST || "http://localhost",
    port: process.env.PORT || 3000,
    secret: process.env.JWT_SECRET || "notasecreta",
    dbConfig: {
        host: process.env.MYSQL_HOST || "remotemysql.com",
        user: process.env.MYSQL_USER || "UOeN2h7N27",
        password: process.env.MYSQL_PASSWORD || "fgcy34vYf8",
        database: process.env.MYSQL_DATABASE || "UOeN2h7N27",
    },
    /* Microservicios */
    retomeDB: process.env.REMOTE_DB || false,
    mysqlService: {
        host: process.env.MYSQL_SERVICE_HOST || "localhost",
        port: process.env.MYSQL_SERVICE_PORT || 3001,
    },
    post: {
        host: process.env.POST_HOST || "localhost",
        port: process.env.POST_PORT || 3002, 
    },
    cacheService: {
        port: process.env.POST_PORT || 3003, 
    },
    redis: {
        host: process.env.REDIS_HOST || "redis-19352.c240.us-east-1-3.ec2.cloud.redislabs.com",
        port: process.env.REDIS_PORT || 19352,
        password: process.env.REDIS_PASSWORD || "vXOX6fE0mkdmKPqMpVP354KhNYOdniod",
    }
}


module.exports = config