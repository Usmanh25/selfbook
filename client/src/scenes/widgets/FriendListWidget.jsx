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
          const resolvedFriendPicture = friend.picturePath
            ? /^[a-f\d]{24}$/i.test(friend.picturePath)
              ? `${BASE_URL}/files/${friend.picturePath}` // GridFS
              : `${friend.picturePath}`                    // static filename
            : "/assets/default-image.jpg";

          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation || ""}
              userPicturePath={resolvedFriendPicture} // pass fully resolved
            />
          );
        })}

      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
