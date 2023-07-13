import mongoose from "mongoose";

const connectMongo = async () => {
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        if(connection.readyState === 1) return Promise.resolve(true)
    }
    catch
    {
        return Promise.reject(false)
    }
}
export default connectMongo;