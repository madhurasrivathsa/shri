import mongoose from 'mongoose';
export default function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection =mongoose.connection;
        connection.on('connected',()=>{
            console.log("mongodb connected sussfully")
        })
        connection.on('err',(err)=>{
            console.log('MongoDB connection error'+err);
            process.exit();
        })
        
    } catch (error) {
        console.log("something goes wrong")
        console.log(error)
        
    }
}

