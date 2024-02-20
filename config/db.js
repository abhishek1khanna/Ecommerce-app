import mongoose from "mongoose";
import  Color from "colors";

const connectDB = async () =>{

    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI); 
         console.log(Color.green(`MongoDB Connected...${process.env.MONGODB_URI} `));
    }catch(err){
        console.log(`error in mongodb connection ${err} `);
    }

  
}

export default connectDB;

