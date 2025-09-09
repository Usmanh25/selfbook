
import { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes = [],
  comments = [],
}) => {
  const [isComments, setIsComments] = useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const posts = useSelector((state) => state.auth.posts);
  const currentUserId = useSelector((state) => state.auth.user?._id);

  // --- Extract correct post owner ID (object or string) ---
  const postOwnerId = typeof postUserId === "object" ? postUserId._id : postUserId;
  const isOwner = String(postOwnerId) === String(currentUserId);

  // --- Handle Like ---
  const handleLike = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: currentUserId }),
      });

      if (!response.ok) throw new Error("Failed to like post");

      const updatedPost = await response.json();

      // Update Redux posts array with updated post
      const updatedPosts = posts.map((p) => (p._id === postId ? updatedPost : p));
      dispatch(setPosts({ posts: updatedPosts }));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // --- Handle Delete ---
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete post");

      const updatedPosts = posts.filter((p) => p._id !== postId);
      dispatch(setPosts({ posts: updatedPosts }));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <WidgetWrapper m="2rem 0" sx={{ position: "relative" }}>
      {/* User info */}
      <Friend
        friendId={postOwnerId}
        name={name}
        subtitle={location || ""}
        userPicturePath={userPicturePath}
      />

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {/* Post image if exists */}
      {picturePath && (
        <Box mt="1rem">
          <img
            src={
              picturePath && picturePath.length === 24
                ? `${BASE_URL}/files/${picturePath}`
                : `/assets/${picturePath}`
            }
            alt="post"
            width="100%"
            height="auto"
            style={{ borderRadius: "0.75rem" }}
          />
        </Box>
      )}

      {/* Likes & Comments */}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleLike}>
              {likes.includes(currentUserId) ? (
                <FavoriteOutlined sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likes.length || 0}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length || 0}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>

      {/* Delete button (only for post owner) */}
      {isOwner && (
        <IconButton
          onClick={handleDelete}
          sx={{
            position: "absolute",
            bottom: "0.5rem",
            right: "0.5rem",
            color: "red",
          }}
        >
          <DeleteOutline />
        </IconButton>
      )}

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((c, i) => (
            <Box key={`${postId}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {c}
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
