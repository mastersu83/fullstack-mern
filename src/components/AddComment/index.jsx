import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/instanceAPI";
import { useParams } from "react-router-dom";
import { fetchPostComments } from "../../api/commentsAPI";

export const Index = ({
  isEditing,
  commentId,
  commentText,
  setIsEditing,
  setCommentText,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.auth);
  const onSubmit = async () => {
    try {
      if (isEditing) {
        await axios.patch(`comments/${commentId}`, { text: commentText });
        dispatch(fetchPostComments(id));
        setIsEditing(!isEditing);
      } else {
        await axios.post("/comments", { text: commentText, postId: id });
        dispatch(fetchPostComments(id));
      }
      setCommentText("");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании комментария");
    }
  };

  const cancelEdit = () => {
    setIsEditing(!isEditing);
    setCommentText("");
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={data ? data.avatarUrl : "/noavatar.png"}
        />
        <div className={styles.form}>
          <TextField
            onChange={(e) => setCommentText(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={commentText}
          />
          {isEditing ? (
            <div className={styles.buttons}>
              <Button onClick={onSubmit} variant="contained">
                Сохранить
              </Button>
              <Button onClick={cancelEdit} variant="contained" color="error">
                Отменить
              </Button>
            </div>
          ) : (
            <Button
              disabled={!Boolean(commentText)}
              onClick={onSubmit}
              variant="contained"
            >
              Отправить
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
