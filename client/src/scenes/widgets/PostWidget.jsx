import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, CircularProgress } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPost } from "../../state";
const BASE_URL = process.env.REACT_APP_BASE_API_URL;
const PostWidget = ({
  postId,
  postUserId, // ⚡ this is now the full user object
  name,
  description,
  location,
  picturePath,
  likes = [],
  comments = [],
}) => {
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { palette } = useTheme();
  const main = palette.neutral.main;

  if (!user?._id) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
        <CircularProgress />
      </Box>
    );
  }

  const isLiked = likes.some((id) => id.toString() === user._id.toString());
  const likeCount = likes.length;

  const resolvedUserPicture =
    postUserId?.picturePath && postUserId.picturePath !== ""
      ? `${BASE_URL}/assets/${postUserId.picturePath}`
      : "/assets/default-image.jpg";

  const patchLike = async () => {
    try {
      const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      if (!res.ok) throw new Error("Failed to like post");
      const updatedPost = await res.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (err) {
      console.error("[patchLike] Error:", err);
    }
  };

  const deletePost = async () => {
    try {
      const res = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete post");
      dispatch(setPost({ action: "delete", postId }));
    } catch (err) {
      console.error("[deletePost] Error:", err);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      {/* Post header */}
      <Friend
        friendId={postUserId?._id}
        name={name}
        subtitle={location || ""}
        userPicturePath={resolvedUserPicture}
      />

      {/* Description */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {/* Post image (only show if exists) */}
      {picturePath && picturePath !== "" && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath ? `${BASE_URL}/assets/${picturePath}` : "/assets/default-image.jpg"}
          onError={(e) => {
            if (!e.currentTarget.dataset.defaultSet) {
              e.currentTarget.dataset.defaultSet = true;
              e.currentTarget.src = "/assets/default-image.jpg";
            }
          }}
        />
      )}

      {/* Actions */}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? <FavoriteOutlined sx={{ color: "#5493ff" }} /> : <FavoriteBorderOutlined sx={{ color: "#5493ff" }} />}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined sx={{ color: "#5493ff" }} />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {user._id === postUserId?._id && (
          <IconButton onClick={deletePost} sx={{ color: "#ff5959" }}>
            <DeleteOutline />
          </IconButton>
        )}
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${postId}-comment-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
