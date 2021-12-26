/* ACTUALMENTE NO FUNCIONA */
/* pm2 start ecosystem.js --env [development] */
/* pm2 start ecosystem.js --env [production] */

module.exports = {
    apps: [
        {
          name: 'MAIN_API',
          script: './api/index.js',
          instances: 2,
          autorestart: true,
          watch: true,
          max_memory_restart: '1G',
          env: {
            NODE_ENV: 'development'
          },
          env_production: {
            NODE_ENV: 'production'
          }
        },
        {
          name: 'MYSQL_API',
          script: './mysql/index.js',
          instances: 2,
          autorestart: true,
          watch: true,
          max_memory_restart: '1G',
          env: {
            NODE_ENV: 'development'
          },
          env_production: {
            NODE_ENV: 'production'
          }
        },
        {
          name: 'POST_API',
          script: './post/index.js',
          instances: 2,
          autorestart: true,
          watch: true,
          max_memory_restart: '1G',
          env: {
            NODE_ENV: 'development'
          },
          env_production: {
            NODE_ENV: 'production'
          }
        }
    ],
}