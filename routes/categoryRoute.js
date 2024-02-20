import express from "express";
import {categoryController,updateCategoryController,deleteCategoryController,allCategoryController, findOneCategoryController}   from "../controllers/categoryController.js";

import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create', requireSignIn ,isAdmin, categoryController);
router.put('/update/:id', requireSignIn ,isAdmin, updateCategoryController);
router.delete('/delete/:id', requireSignIn ,isAdmin,deleteCategoryController);
router.get('/all', allCategoryController);
router.get('/findone/:id',findOneCategoryController);

export default router;
