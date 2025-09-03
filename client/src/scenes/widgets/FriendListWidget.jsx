// import { Box, Typography, useTheme } from "@mui/material";
// import Friend from "components/Friend";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useSelector } from "react-redux";

// const FriendListWidget = () => {
//   const { palette } = useTheme();
//   const friends = useSelector((state) => Array.isArray(state.auth.user?.friends) ? state.auth.user.friends : []);

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
//         {friends.map((friend) => (
//           <Friend
//             key={friend._id}
//             friendId={friend._id}
//             name={`${friend.firstName} ${friend.lastName}`}
//             subtitle={friend.occupation || ""}
//             userPicturePath={friend.picturePath}
//           />
//         ))}
//       </Box>
//     </WidgetWrapper>
//   );
// };

// export default FriendListWidget;

import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_API_URL; // ⚡ add this

const FriendListWidget = () => {
  const { palette } = useTheme();
  const friends = useSelector((state) =>
    Array.isArray(state.auth.user?.friends) ? state.auth.user.friends : []
  );

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
          // ⚡ Resolve full picture URL or default
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
              userPicturePath={resolvedFriendPicture} // ⚡ full URL passed
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
