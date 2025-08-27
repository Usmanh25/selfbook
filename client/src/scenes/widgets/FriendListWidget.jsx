import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token); // safe access
  const [friends, setFriends] = useState([]); // local state with default empty array

  const getFriends = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch friends:", errorData);
        alert(errorData.message || "Failed to fetch friends");
        setFriends([]);
        return;
      }

      const data = await response.json();
      setFriends(Array.isArray(data) ? data : []); // ensure we have an array
    } catch (err) {
      console.error("Network error fetching friends:", err);
      alert("Error fetching friends");
      setFriends([]);
    }
  };

  useEffect(() => {
    if (userId) getFriends();
  }, [userId, token]);

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
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation || ""}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
