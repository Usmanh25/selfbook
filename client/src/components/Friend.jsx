// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setFriends } from "state";
// import FlexBetween from "./FlexBetween";
// import UserImage from "./UserImage";
// import { useState, useEffect } from "react";
// const BASE_URL = process.env.REACT_APP_BASE_API_URL;


// const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { _id, friends = [] } = useSelector((state) => state.auth.user || {});
//   const token = useSelector((state) => state.auth.token);
//   const isSelf = _id && friendId && _id.toString() === friendId.toString();
  
//   const { palette } = useTheme();
//   const main = palette.neutral.main;
//   const medium = palette.neutral.medium;
//   const mediumMain = palette.neutral.light;

//   const [isFriendLocal, setIsFriendLocal] = useState(friends.some(f => f._id === friendId));

//   useEffect(() => {
//     setIsFriendLocal(friends.some(f => f._id === friendId));
//   }, [friends, friendId]);

//   const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

//   const resolvedFriendPicture = userPicturePath
//     ? isValidObjectId(userPicturePath)
//       ? `${BASE_URL}/files/${userPicturePath}` // GridFS
//       : `/assets/${userPicturePath}`          // static
//     : "/assets/default-image.jpg";

//   const patchFriend = async () => {
//     try {
//       setIsFriendLocal(prev => !prev);

//       const response = await fetch(`${BASE_URL}/users/${_id}/${friendId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error("Failed to update friend");
//       const data = await response.json();

//       dispatch(setFriends({ friends: data.friends }));
//     } catch (err) {
//       console.error("Error patching friend:", err.message);
//       setIsFriendLocal(prev => !prev);
//     }
//   };

//   return (
//     <Box position="relative" width="100%">
//       <FlexBetween>
//         <FlexBetween gap="1rem">
//           <UserImage image={userPicturePath} size="55px" />
//           <Box
//             onClick={() => navigate(`/profile/${friendId}`)}
//           >
//             <Typography
//               color={main}
//               variant="h5"
//               fontWeight="500"
//               sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer" } }}
//             >
//               {name}
//             </Typography>
//             <Typography color={medium} fontSize="0.75rem">
//               {subtitle}
//             </Typography>
//           </Box>
//         </FlexBetween>

//         {!isSelf && (
//           <IconButton
//             onClick={patchFriend}
//             sx={{
//               backgroundColor: mediumMain,
//               p: "0.6rem",
//               position: "absolute",
//               top: 0,
//               right: 0,
//             }}
//           >
//             {isFriendLocal ? (
//               <PersonRemoveOutlined sx={{ color: "#0866ff" }} />
//             ) : (
//               <PersonAddOutlined sx={{ color: "#0866ff" }} />
//             )}
//           </IconButton>
//         )}
//       </FlexBetween>
//     </Box>
//   );
// };

// export default Friend;


// Friend.jsx
import React, { useState, useEffect } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const BASE_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:3001";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id, friends = [] } = useSelector((state) => state.auth.user || {});
  const token = useSelector((state) => state.auth.token);
  const isSelf = _id && friendId && _id.toString() === friendId.toString();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const mediumMain = palette.neutral.light;

  const [isFriendLocal, setIsFriendLocal] = useState(friends.some(f => f._id === friendId));
  useEffect(() => {
    setIsFriendLocal(friends.some(f => f._id === friendId));
  }, [friends, friendId]);

  const isValidObjectId = (id) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

  // --- NORMALIZE picture path: accept already-resolved ("/..." or "http..."),
  // --- ObjectId (GridFS), or simple filename
  const resolvedFriendPicture = (() => {
    if (!userPicturePath) return "/assets/default-image.jpg";

    // already a full path / URL -> use as-is
    if (typeof userPicturePath === "string" && (userPicturePath.startsWith("http") || userPicturePath.startsWith("/"))) {
      return userPicturePath;
    }

    // GridFS ObjectId
    if (isValidObjectId(userPicturePath)) {
      return `${BASE_URL}/files/${userPicturePath}`;
    }

    // simple filename from seed: serve from client public/assets
    return `/assets/${userPicturePath}`;
  })();

  const patchFriend = async () => {
    try {
      setIsFriendLocal(prev => !prev);

      const response = await fetch(`${BASE_URL}/users/${_id}/${friendId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to update friend");
      const data = await response.json();
      dispatch(setFriends({ friends: data.friends }));
    } catch (err) {
      console.error("Error patching friend:", err.message);
      setIsFriendLocal(prev => !prev);
    }
  };

  return (
    <Box position="relative" width="100%">
      <FlexBetween>
        <FlexBetween gap="1rem">
          {/* pass resolved path so UserImage will just render it */}
          <UserImage image={resolvedFriendPicture} size="55px" />
          <Box onClick={() => navigate(`/profile/${friendId}`)}>
            <Typography color={main} variant="h5" fontWeight="500" sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer" } }}>
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>

        {!isSelf && (
          <IconButton
            onClick={patchFriend}
            sx={{
              backgroundColor: mediumMain,
              p: "0.6rem",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            {isFriendLocal ? <PersonRemoveOutlined sx={{ color: "#0866ff" }} /> : <PersonAddOutlined sx={{ color: "#0866ff" }} />}
          </IconButton>
        )}
      </FlexBetween>
    </Box>
  );
};

export default Friend;
