import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";



export const categoryController = async (req,res) =>{

        try {
            const { name } = req.body;
            //validations
            if (!name) {
              return res.send({ message: "Name is Required" });
            }
           
            //check user
            const exisitingCategory = await categoryModel.findOne({ name });
            //exisiting user
            if (exisitingCategory) {
              return res.status(200).send({
                success: true,
                message: "Already exist category",
              });
            }

            //save
            const category = await new categoryModel({
              name,
              slug:slugify(name)
            }).save();
        
            res.status(201).send({
              success: true,
              message: "Category added Successfully",
              category,
            });


    }catch(err){
        res.status(500).send(
            { error:err.message,
              success:false,
              message:"Error in categoryController"      
            });
        return;
    }
}

export const updateCategoryController = async (req,res) => {
    try{
      const { name } = req.body;
      const { id } = req.params;
      //validations
      if (!name) {
        return res.send({ message: "Name is Required" });
      }
     
      //check user
      const exisitingCategory = await categoryModel.findByIdAndUpdate(id,{ name,slug:slugify(name)}, {new:true} );
      //exisiting user
      if (exisitingCategory) {
        return res.status(200).send({
          success: true,
          message: "category updated",
          category:exisitingCategory
        });
      }        
    }catch(err){
        res.status(500).send(
            { error:err.message,
              success:false,
              message:"Error in updateCategoryController"      
            });
        return;
    }
}


export const deleteCategoryController = async (req,res) => {
    try{
      const { id } = req.params;
     
      //check user
      const exisitingCategory = await categoryModel.findByIdAndDelete(id);
      //exisiting user
      if (exisitingCategory) {
        return res.status(200).send({
          success: true,
          message: "category deleted",
        });
      }        
    }catch(err){
        res.status(500).send(
            { error:err.message,
              success:false,
              message:"Error in deleteCategoryController"      
            });
        return;
    }
}

export const allCategoryController = async (req,res) => {
    try{
     
      const exisitingCategory = await categoryModel.find({});
      //exisiting user
      if (exisitingCategory) {
        return res.status(200).send({
          success: true,
          message: "category list",
          category:exisitingCategory
        });
      }        
    }catch(err){
        res.status(500).send(
            { error:err.message,
              success:false,
              message:"Error in Category list"      
            });
        return;
    }
}



export const findOneCategoryController = async (req,res) => {
    try{
        const { id } = req.params;
      const exisitingCategory = await categoryModel.find({_id:id});
      //exisiting user
      if (exisitingCategory) {
        return res.status(200).send({
          success: true,
          message: "category list",
          category:exisitingCategory
        });
      }        
    }catch(err){
        res.status(500).send(
            { error:err.message,
              success:false,
              message:"Error in find one Category list"      
            });
        return;
    }
}
