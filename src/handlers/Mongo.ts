import mongoose from "mongoose";
import logger from "../utils/winston";
module.exports = () => {
    const MONGO_URI = process.env.MONGO_URI
    if (!MONGO_URI) return logger.crit("No MongoDB URI provided. Aborting startup.") && process.exit(1)
    
    mongoose.set('strictQuery', true)

    
    mongoose.connect(`${MONGO_URI}/${process.env.MONGO_DATABASE_NAME}?authSource=admin`)
    
    .then(() => logger.info("MongoDB connection has been established!"))
    .catch((e) => logger.error("MongoDB connection failed!", e))
}