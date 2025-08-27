import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { Box, CircularProgress } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts) || [];
  const token = useSelector((state) => state.auth.token);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      dispatch(setPosts({ posts: Array.isArray(data) ? data : [] }));
    } catch (err) {
      console.error("Error fetching posts:", err);
      dispatch(setPosts({ posts: [] }));
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user posts");
      const data = await response.json();
      dispatch(setPosts({ posts: Array.isArray(data) ? data : [] }));
    } catch (err) {
      console.error("Error fetching user posts:", err);
      dispatch(setPosts({ posts: [] }));
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId, token]); // added dependencies for safe rerenders

  if (!posts.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="postsWidget">
      {posts.map(({
        _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }) => (
        <PostWidget
          key={_id}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
        />
      ))}
    </div>
  );
};

export default PostsWidget;
