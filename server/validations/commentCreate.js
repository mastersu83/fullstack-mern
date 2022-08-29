import { body } from "express-validator";

export const commentCreateValidation = [
  body("text", "Введите текст комментария")
    .isLength({
      min: 3,
    })
    .isString(),
];
