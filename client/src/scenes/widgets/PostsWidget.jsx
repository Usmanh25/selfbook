

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { Box, CircularProgress } from "@mui/material";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts);
  const token = useSelector((state) => state.auth.token);

  const fetchPosts = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();

      // ⚡ Keep likes exactly as backend returns them
      const postsArray = Array.isArray(data) ? data : [];

      dispatch(setPosts({ posts: postsArray }));
    } catch (err) {
      console.error("Error fetching posts:", err);
      dispatch(setPosts({ posts: [] }));
    }
  };

  useEffect(() => {
    if (isProfile && userId) {
      fetchPosts(`${BASE_URL}/posts/${userId}/posts`);
    } else {
      fetchPosts(`${BASE_URL}/posts`);
    }
  }, [userId, isProfile, token]);

  if (!posts || posts.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {posts.map((post) => {
        const postUser = post.userId;

        // --- Resolve user picture URL ---
        const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

        const resolvedUserPicture = postUser?.picturePath
          ? isValidObjectId(postUser.picturePath)
            ? `${BASE_URL}/files/${postUser.picturePath}` // GridFS (backend)
            : `/assets/${postUser.picturePath}`           // static (frontend)
          : "/assets/default-image.jpg";                  // fallback

        return (
          <PostWidget
            key={post._id}
            postId={post._id}
            postUserId={postUser} // full user object
            name={`${postUser?.firstName || ""} ${postUser?.lastName || ""}`}
            description={post.description}
            location={postUser?.location || ""}
            picturePath={post.picturePath}
            likes={post.likes || []}   // keep original structure
            comments={post.comments || []}
            userPicturePath={resolvedUserPicture} // pass resolved picture
          />
        );
      })}
    </>
  );
};

export default PostsWidget;
