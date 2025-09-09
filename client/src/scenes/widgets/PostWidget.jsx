

// import { useState } from "react";
// import {
//   ChatBubbleOutlineOutlined,
//   FavoriteBorderOutlined,
//   FavoriteOutlined,
//   ShareOutlined,
// } from "@mui/icons-material";
// import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
// import WidgetWrapper from "components/WidgetWrapper";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// const PostWidget = ({
//   postId,
//   postUserId,
//   name,
//   description,
//   location,
//   picturePath,
//   userPicturePath,   // ✅ consistent now
//   likes = [],
//   comments = [],
// }) => {
//   const [isComments, setIsComments] = useState(false);
//   const { palette } = useTheme();
//   const main = palette.neutral.main;

//   return (
//     <WidgetWrapper m="2rem 0">
//       {/* ✅ User info */}
//       <Friend
//         friendId={postUserId?._id}
//         name={name}
//         subtitle={location || ""}
//         userPicturePath={userPicturePath}
//       />

//       <Typography color={main} sx={{ mt: "1rem" }}>
//         {description}
//       </Typography>

//       {/* ✅ Post image if exists */}
//       {picturePath && (
//         <Box mt="1rem">
//           <img
//             src={
//               picturePath && picturePath.length === 24
//                 ? `${BASE_URL}/files/${picturePath}`
//                 : `/assets/${picturePath}`
//             }
//             alt="post"
//             width="100%"
//             height="auto"
//             style={{ borderRadius: "0.75rem" }}
//           />
//         </Box>
//       )}

//       <FlexBetween mt="0.25rem">
//         <FlexBetween gap="1rem">
//           <FlexBetween gap="0.3rem">
//             <IconButton>
//               {likes?.includes(postUserId?._id) ? (
//                 <FavoriteOutlined sx={{ color: "red" }} />
//               ) : (
//                 <FavoriteBorderOutlined />
//               )}
//             </IconButton>
//             <Typography>{likes?.length || 0}</Typography>
//           </FlexBetween>

//           <FlexBetween gap="0.3rem">
//             <IconButton onClick={() => setIsComments(!isComments)}>
//               <ChatBubbleOutlineOutlined />
//             </IconButton>
//             <Typography>{comments?.length || 0}</Typography>
//           </FlexBetween>
//         </FlexBetween>

//         {/* <IconButton>
//           <ShareOutlined />
//         </IconButton> */}
//       </FlexBetween>

//       {isComments && (
//         <Box mt="0.5rem">
//           {comments.map((c, i) => (
//             <Box key={`${postId}-${i}`}>
//               <Divider />
//               <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
//                 {c}
//               </Typography>
//             </Box>
//           ))}
//           <Divider />
//         </Box>
//       )}
//     </WidgetWrapper>
//   );
// };

// export default PostWidget;













// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "../../state";
// import Friend from "components/Friend"; 
// import { Box, Button } from "@mui/material";

// const BASE_URL = process.env.REACT_APP_BASE_API_URL;

// const PostWidget = ({
//   postId,
//   postUserId,
//   name,
//   description,
//   location,
//   picturePath,
//   likes = [],
//   comments = [],
//   userPicturePath,
// }) => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const posts = useSelector((state) => state.auth.posts);
//   const currentUserId = useSelector((state) => state.auth.user?._id);

//   // --- Handle Like Function ---
//   const handleLike = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ userId: currentUserId }),
//       });

//       if (!response.ok) throw new Error("Failed to like post");

//       const updatedPost = await response.json();

//       // Update Redux posts array with updated post
//       const updatedPosts = posts.map((p) => (p._id === postId ? updatedPost : p));
//       dispatch(setPosts({ posts: updatedPosts }));
//     } catch (err) {
//       console.error("Error liking post:", err);
//     }
//   };

//   return (
//     <Box
//       border="1px solid #ddd"
//       borderRadius="8px"
//       p={2}
//       mb={2}
//       display="flex"
//       flexDirection="column"
//       gap={1}
//     >
//       {/* User info */}
//       <Friend
//         friendId={postUserId?._id}
//         name={name}
//         subtitle={location || ""}
//         userPicturePath={userPicturePath}
//       />

//       {/* Post content */}
//       <Box mt={1}>{description}</Box>
//       {picturePath && (
//         <img
//           src={picturePath.startsWith("http") ? picturePath : `/assets/${picturePath}`}
//           alt="post"
//           style={{ width: "100%", borderRadius: "8px", marginTop: "8px" }}
//         />
//       )}

//       {/* Likes & Comments */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
//         <Button onClick={handleLike} variant="outlined" size="small">
//           Like ({likes.length})
//         </Button>
//         <Box>{comments.length} comments</Box>
//       </Box>
//     </Box>
//   );
// };

// export default PostWidget;






import { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

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

  return (
    <WidgetWrapper m="2rem 0">
      {/* User info */}
      <Friend
        friendId={postUserId?._id}
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
