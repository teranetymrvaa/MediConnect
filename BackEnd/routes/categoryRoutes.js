import express from "express";

import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

// Route to get all categories
router.get("/", getAllCategories);

// Route to create a new category
router.post("/", createCategory);
// Route to delete a category by ID
router.delete("/:id", deleteCategory);

export default router;
