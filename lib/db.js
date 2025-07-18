import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("base des donner connectee avec successe")
    } catch (error) {
        console.log("error de la connexion avec base des donner")
        process.exit(1)
    }
}
