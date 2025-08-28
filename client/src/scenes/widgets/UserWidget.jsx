import { Box, Typography, Divider, useTheme, TextField, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [occupationInput, setOccupationInput] = useState("");
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // Fetch user data
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data);
      setFirstNameInput(data.firstName || "");
      setLastNameInput(data.lastName || "");
      setLocationInput(data.location || "");
      setOccupationInput(data.occupation || "");
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

  // Handle profile image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("picture", file);

    const response = await fetch(
      `http://localhost:3001/users/${userId}/profile-image`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    if (!response.ok) return console.error("Failed to upload image");

    const updatedUser = await response.json();
    setUser(updatedUser); // immediately update image in UI
  };

  // Handle other profile info update
  const handleSave = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        location: locationInput,
        occupation: occupationInput,
      }),
    });
    const updatedUser = await response.json();
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) return null;
  const { firstName, lastName, friends = [] } = user;

  return (
    <WidgetWrapper>
      {/* Hidden file input */}
      <input
        type="file"
        id="profile-image-upload"
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />

      {/* Image + Name container */}
      <Box display="flex" alignItems="center" gap="1rem" pb="1rem">
        {/* Profile image with hover overlay */}
        <Box
          sx={{
            position: "relative",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
            "&:hover .overlay": { opacity: 0.5 },
          }}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById("profile-image-upload").click();
          }}
        >
          <UserImage image={user.picturePath || "/assets/default-image.jpg"} size="60px" />
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "black",
              opacity: 0,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              transition: "opacity 0.3s",
            }}
          >
            <FiCamera size={20} />
          </Box>
        </Box>

        {/* Name and friend count centered */}
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography
            variant="h4"
            color={main}
            fontWeight="500"
            sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer" } }}
          >
            {firstName} {lastName}
          </Typography>
          <Typography color={medium}>{friends.length} friends</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Edit profile info */}
      <Box p="1rem 0" color={main}>
        {isEditing ? (
          <>
            <TextField
              label="First Name"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Last Name"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Occupation"
              value={occupationInput}
              onChange={(e) => setOccupationInput(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            {/* <Typography variant="h5">
              {user.firstName} {user.lastName}
            </Typography> */}
            <Typography color={main}>{user.location || "Unknown"}</Typography>
            <Typography color={main}>{user.occupation || "Unknown"}</Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </>
        )}
      </Box>

      <Divider />

      {/* Social links */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          View the Creator
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <BsLinkedin size={25} color={main} />
            <Box>
              <Typography color={main} fontWeight="500">
                <a
                  className="linkTags"
                  href="https://www.linkedin.com/in/usman-hameed-5486b11b0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Linkedin
                </a>
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <BsGithub size={25} color={main} />
            <Box>
              <Typography color={main} fontWeight="500">
                <a
                  className="linkTags"
                  href="https://github.com/Usmanh25"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
