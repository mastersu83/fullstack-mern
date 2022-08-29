import React from "react";
import ReactMarkdown from "react-markdown";

import { CommentsBlock, Index, Post } from "../components";
import { useParams } from "react-router-dom";
import axios from "../api/instanceAPI";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../api/commentsAPI";

export const FullPost = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { items } = useSelector((state) => state.comments.comments);
  const { data: userData } = useSelector((state) => state.auth);

  const [fullPost, setFullPost] = React.useState();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingCommentId, setEditingCommentId] = React.useState("");
  const [commentText, setCommentText] = React.useState("");

  const onEditing = async (commentId, index) => {
    setIsEditing(!isEditing);
    setEditingCommentId(commentId);
    setCommentText(items[index].text);
  };

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setFullPost(res.data);
    });
    dispatch(fetchPostComments(id));
  }, []);

  return (
    <>
      {fullPost ? (
        <Post
          _id={fullPost._id}
          title={fullPost.title}
          imageUrl={
            fullPost.imageUrl ? `http://localhost:4444${fullPost.imageUrl}` : ""
          }
          user={fullPost.user}
          createdAt={fullPost.createdAt}
          viewsCount={fullPost.viewsCount}
          commentsCount={items.length}
          tags={fullPost.tags}
          isFullPost
        >
          <ReactMarkdown children={fullPost.text} />
        </Post>
      ) : (
        <Post isLoading={true} />
      )}
      <CommentsBlock
        items={items ? items : []}
        isLoading={false}
        userId={userData?._id}
        onEditing={onEditing}
        isEditing={isEditing}
      >
        <Index
          isEditing={isEditing}
          commentId={editingCommentId}
          commentText={commentText}
          setIsEditing={setIsEditing}
          setCommentText={setCommentText}
        />
      </CommentsBlock>
    </>
  );
};
