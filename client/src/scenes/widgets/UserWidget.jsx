import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FaAngellist } from "react-icons/fa";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HomeIcon from '@mui/icons-material/Home';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser({
        firstName: "Unknown",
        lastName: "",
        location: "Unknown",
        occupation: "Unknown",
        friends: [],
      });
    }
  };

  useEffect(() => {
    if (userId) getUser();
  }, [userId, token]);

  if (!user) return null;

  const { firstName, lastName, location, occupation, friends = [] } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={main}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      <Box p="1rem 0" color={main}>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <HomeIcon fontSize="large"/>
          <Typography color={main}>{location || "Unknown"}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <ChatBubbleOutlineIcon fontSize="large"/>
          <Typography color={main}>{occupation || "Unknown"}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          View the Creator
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <BsLinkedin size={25} color={main}/>
            <Box>
              <Typography color={main} fontWeight="500">
                <a className='linkTags' href="https://www.linkedin.com/in/usman-hameed-5486b11b0/" target="_blank" rel="noreferrer">Linkedin</a>
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <BsGithub size={25} color={main}/>
            <Box>
              <Typography color={main} fontWeight="500">
                <a className='linkTags' href="https://github.com/Usmanh25" target="_blank" rel="noreferrer">Github</a>
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <FaAngellist size={25} color={main}/>
            <Box>
              <Typography color={main} fontWeight="500">
                <a className='linkTags' href="https://angel.co/u/usman-hameed-2" target="_blank" rel="noreferrer">AngelList</a>
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
