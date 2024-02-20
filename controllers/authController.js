import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";



export const registerController = async (req,res) =>{

        try {
            const { name, email, password, phone, address,question } = req.body;
            //validations
            if (!name) {
              return res.send({ message: "Name is Required" });
            }
            if (!email) {
              return res.send({ message: "Email is Required" });
            }
            if (!password) {
              return res.send({ message: "Password is Required" });
            }
            if (!phone) {
              return res.send({ message: "Phone no is Required" });
            }
            if (!address) {
              return res.send({ message: "Address is Required" });
            }
            if (!question) {
              return res.send({ message: "qusetion is Required" });
            }
            //check user
            const exisitingUser = await userModel.findOne({ email });
            //exisiting user
            if (exisitingUser) {
              return res.status(200).send({
                success: true,
                message: "Already Register please login",
              });
            }
            //register user
            const hashedPassword = await hashPassword(password);
            //save
            const user = await new userModel({
              name,
              email,
              phone,
              address,
              password: hashedPassword,
              question
            }).save();
        
            res.status(201).send({
              success: true,
              message: "User Register Successfully",
              user,
            });


    }catch(err){
        console.log(err);
        res.status(500).send(
            { error:err.message,
              success:false,
              message:"Error in registerController"      
            });
        return;
    }
}


export const loginController = async (req, res) => {
    try{
        const {email,password} = req.body;
        //validations
        if (!email) {
          return res.status(404).send({ error: "Email is Required", success:false });
        }
        if (!password) {
            return res.status(404).send({ error: "password is Required", success:false });
        }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (!exisitingUser) {
          return res.status(200).send({
            success: true,
            message: "User not found",
          });
        }
        //check password
        const isMatch = await comparePassword(password, exisitingUser.password);
        //check password
        if (!isMatch) {
          return res.status(200).send({
            success: false,
            message: "Password is not match",
          });
        }
        //create token
        const token = await JWT.sign({_id:exisitingUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token:token,
            user:{
                _id:exisitingUser._id,
                name:exisitingUser.name,
                email:exisitingUser.email,
                phone:exisitingUser.phone,
                address:exisitingUser.address,
                role:exisitingUser.role
            }    
        });
    }catch(error){
    res.status(500).send(
        { error:error.message,
          success:false,
          message:"Error in loginController"      
        });
    return;
}

}

export const testController = (req,res) =>{
   res.status(200).send({message: "test successful"});
   return;
} 



export const forgotPasswordController = async (req, res) =>{
  try{
      const {email,question,password} = req.body;
      if(!email){
        return res.status(404).send({ error: "Email is Required", success:false });
      }
      if(!question){
        return res.status(404).send({ error: "Question is Required", success:false });
      }
      if(!password){
        return res.status(404).send({ error: "Password is Required", success:false });
      }
      //check user
      const exisitingUser = await userModel.findOne({ email,question });
      //exisiting user
      if (!exisitingUser) {
        return res.status(200).send({
          success: true,
          message: "wrong email or answer",
        });
      }

      const hashedPassword = await hashPassword(password);
      await userModel.findByIdAndUpdate(exisitingUser._id,{password:hashedPassword});
      return res.status(200).send({
        success: true,
        message: "Password updated successfully",
      });

  }catch(error){
    res.status(500).send(
        { error:error.message,
          success:false,
          message:"Error in forgotPasswordController"      
        });
   
  }
}



//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const user = await userModel.findById(req.user._id);
    console.log(user);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};