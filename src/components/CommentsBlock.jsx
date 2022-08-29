import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Post/Post.module.scss";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { removeComment } from "../api/commentsAPI";

export const CommentsBlock = ({
  items,
  children,
  isLoading = true,
  userId,
  onEditing,
  isEditing,
}) => {
  const dispatch = useDispatch();

  const onClickRemove = (id) => {
    if (window.confirm("Вы дествительно хотите удалить комментарий")) {
      dispatch(removeComment(id));
    }
  };
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem className={styles.commentBlock} alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <>
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.text}
                  />
                  {userId === obj.user._id && (
                    <div className={styles.editButtons}>
                      <IconButton
                        disabled={isEditing}
                        onClick={() => onEditing(obj._id, index)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => onClickRemove(obj._id)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
