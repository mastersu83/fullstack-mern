import CommentsModel from "../models/Comment.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentsModel.find().populate("user").exec();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};
export const getCommentsOnePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await CommentsModel.find({ post: postId }).populate("user");
    if (result) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ error: "комментарий не найден" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Произошла серверная ошибка" });
  }
};

export const getOneComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    CommentsModel.findOne(
      {
        _id: commentId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Не удалось вернуть комментарий",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "комментарий не найден",
          });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарий",
    });
  }
};

export const removeComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    CommentsModel.findOneAndDelete(
      {
        _id: commentId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Не удалось удалить комментарий",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "комментарий не найден",
          });
        }
        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить комментарий",
    });
  }
};
export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    CommentsModel.updateOne(
      {
        _id: commentId,
      },
      {
        text: req.body.text,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Не удалось обновить комментарий",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "комментарий не найден",
          });
        }
        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить комментарий",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const doc = new CommentsModel({
      text: req.body.text,
      post: req.body.postId,
      user: req.userId,
    });
    const comments = await doc.save();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать комментарий",
    });
  }
};
