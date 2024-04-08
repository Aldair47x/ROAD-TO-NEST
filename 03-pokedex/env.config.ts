export const envConfig = () => ({
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/nest',
    defaultLimit: parseInt(process.env.DEFAULT_LIMIT, 10) || 10,
});