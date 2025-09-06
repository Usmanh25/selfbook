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

      // Normalize likes: convert object/Map into array of userIds
      const normalizedPosts = data.map((post) => ({
        ...post,
        likes: Array.isArray(post.likes)
          ? post.likes
          : post.likes
          ? Object.keys(post.likes)
          : [],
      }));

      dispatch(setPosts({ posts: normalizedPosts }));
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
      {posts.map((post) => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId} // ⚡ passes full user object
          name={`${post.userId?.firstName || ""} ${post.userId?.lastName || ""}`}
          description={post.description}
          location={post.userId?.location || ""}
          picturePath={post.picturePath}
          likes={post.likes || []} // normalized
          comments={post.comments || []}
        />
      ))}
    </>
  );
};

export default PostsWidget;
