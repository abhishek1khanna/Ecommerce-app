import  Jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import userModel from "../models/userModel.js";
dotenv.config();

const secret = process.env.JWT_SECRET_KEY;
// console.log('aaaa',process.env.JWT_SECRET_KEY);

export const requireSignIn = (req, res, next) => {
   try{
   //  console.log('token',req.headers.authorization,'token');
    const token = req.headers.authorization.split(' ')[1];
    console.log('ttttt',token);
   const decoded = Jwt.verify(token, secret);
    req.user = decoded;
    next(); 
   }catch(err){
    res.status(401).json({message: 'Unauthorized'});
   }
} 

/* 

export const requireSignIn = async (req, res, next) => {
    try {
      const decode = Jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };
  */

export const isAdmin = async (req, res, next) => {
    try{
        
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            res.status(401).send({message: 'Unauthorized access',success:false});
        }else{
           next();     
        }

    }catch(err){
        res.status(401).json({message: 'erro in auth middleware',success:false,err:err});
    }
}