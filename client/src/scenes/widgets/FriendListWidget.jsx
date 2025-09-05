

// import { Box, Typography, useTheme } from "@mui/material";
// import Friend from "components/Friend";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useSelector } from "react-redux";

// const BASE_URL = process.env.REACT_APP_BASE_API_URL; // ⚡ add this

// const FriendListWidget = () => {
//   const { palette } = useTheme();
//   const friends = useSelector((state) =>
//     Array.isArray(state.auth.user?.friends) ? state.auth.user.friends : []
//   );
//   console.log("[FriendListWidget] Friends prop/state:", friends);


//   return (
//     <WidgetWrapper>
//       <Typography
//         color={palette.neutral.dark}
//         variant="h5"
//         fontWeight="500"
//         sx={{ mb: "1.5rem" }}
//       >
//         Friends
//       </Typography>
//       <Box display="flex" flexDirection="column" gap="1.5rem">
//         {friends.map((friend) => {
//           // ⚡ Resolve full picture URL or default
//           const resolvedFriendPicture =
//             friend.picturePath && friend.picturePath !== ""
//               ? `${BASE_URL}/assets/${friend.picturePath}`
//               : "/assets/default-image.jpg";

//           return (
//             <Friend
//               key={friend._id}
//               friendId={friend._id}
//               name={`${friend.firstName} ${friend.lastName}`}
//               subtitle={friend.occupation || ""}
//               userPicturePath={resolvedFriendPicture} // ⚡ full URL passed
//             />
//           );
//         })}
//       </Box>
//     </WidgetWrapper>
//   );
// };

// export default FriendListWidget;  top edition works with user add flow, profile page shows wrong friends

// bottom fixed profile page wrong fri

import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const FriendListWidget = () => {
  const { palette } = useTheme();
  const { userId: profileUserId } = useParams(); // user whose profile is being visited
  const token = useSelector((state) => state.auth.token);

  // Logged-in user info from Redux
  const loggedInUser = useSelector((state) => state.auth.user);
  const loggedInUserId = loggedInUser?._id || null;
  const loggedInUserFriends = Array.isArray(loggedInUser?.friends)
    ? loggedInUser.friends
    : [];

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      // If visiting your own profile or no profileId in route, use logged-in user's friends
      if (!profileUserId || profileUserId === loggedInUserId) {
        setFriends(loggedInUserFriends);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/users/${profileUserId}/friends`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile friends");
        const data = await res.json();
        setFriends(data);
      } catch (err) {
        console.error("[FriendListWidget] Failed to fetch profile friends:", err);
        setFriends([]);
      }
    };

    fetchFriends();
  }, [profileUserId, token, loggedInUserFriends, loggedInUserId]);

  console.log("[FriendListWidget] Friends to display:", friends);

  if (!friends || friends.length === 0) return null;

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => {
          const resolvedFriendPicture =
            friend.picturePath && friend.picturePath !== ""
              ? `${BASE_URL}/assets/${friend.picturePath}`
              : "/assets/default-image.jpg";

          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation || ""}
              userPicturePath={resolvedFriendPicture}
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
