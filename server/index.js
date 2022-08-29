import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  loginValidation,
  registerValidation,
  postCreateValidation,
  commentCreateValidation,
} from "./validations/index.js";

import {
  UserController,
  PostController,
  CommentController,
} from "./controllers/index.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://master:Derbent_5000@cluster0.0zoww.mongodb.net/dioraKids?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("server/uploads"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "server/uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAllPosts);

app.get("/tags", PostController.getLastTags);

app.get("/posts/:id", PostController.getOnePost);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.createPost
);

app.delete("/posts/:id", checkAuth, PostController.removePost);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.updatePost
);

app.get("/comments", CommentController.getAllComments);
app.get("/comments/:id", CommentController.getOneComment);

app.get("/comments/post/:id", CommentController.getCommentsOnePost);

app.post(
  "/comments",
  checkAuth,
  commentCreateValidation,
  handleValidationErrors,
  CommentController.createComment
);
app.patch(
  "/comments/:id",
  checkAuth,
  commentCreateValidation,
  handleValidationErrors,
  CommentController.updateComment
);

app.delete("/comments/:id", checkAuth, CommentController.removeComment);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server OK");
});
