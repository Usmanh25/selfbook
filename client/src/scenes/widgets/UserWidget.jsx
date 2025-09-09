import { Box, Typography, Divider, TextField, Button, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";
import { setLogin, setUser } from "state";
import { useNavigate } from "react-router-dom";


const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const UserWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loggedInUser = useSelector((state) => state.auth.user);
  const isOwnProfile = loggedInUser?._id === userId;
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [user, setUserLocal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [occupationInput, setOccupationInput] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUserLocal(data);
      setFirstNameInput(data.firstName || "");
      setLastNameInput(data.lastName || "");
      setLocationInput(data.location || "");
      setOccupationInput(data.occupation || "");
    } catch (err) {
      console.error("[UserWidget] Error fetching user:", err);
      setUserLocal({ firstName: "Guest", lastName: "", location: "", occupation: "", friends: [] });
    }
  };

  useEffect(() => { if (userId) getUser(); }, [userId, token]);

  // Auto-enable edit mode if essential fields are empty
  useEffect(() => {
    if (isOwnProfile && user && (!user.firstName || !user.lastName || !user.location || !user.occupation)) {
      setIsEditing(true);
    }
  }, [user, isOwnProfile]);

  const handleSave = async () => {
    try {
      // 1️⃣ Update user profile
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          firstName: firstNameInput,
          lastName: lastNameInput,
          location: locationInput,
          occupation: occupationInput,
        }),
      });
      if (!response.ok) throw new Error("Failed to update user");
      const updatedUser = await response.json();

      // 2️⃣ Fetch full friends objects
      const friendsRes = await fetch(`${BASE_URL}/users/${userId}/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fullFriends = friendsRes.ok ? await friendsRes.json() : [];

      // 3️⃣ Merge user with full friends
      const mergedUser = { ...updatedUser, friends: fullFriends };

      // 4️⃣ Update local state and Redux
      setUserLocal(mergedUser);
      dispatch(setUser({ user: mergedUser, token }));
      setIsEditing(false);
    } catch (err) {
      console.error("[UserWidget] handleSave error:", err);
    }
  };

  
  const handleImageChange = async (e) => {
    if (!isOwnProfile) return;
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("picture", file);

    try {
      // 1️⃣ Upload new profile picture
      const response = await fetch(`${BASE_URL}/users/${userId}/profile-image`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image");
      const updatedUser = await response.json();

      // 2️⃣ Fetch full friends objects
      const friendsRes = await fetch(`${BASE_URL}/users/${userId}/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fullFriends = friendsRes.ok ? await friendsRes.json() : [];

      // 3️⃣ Merge user with full friends
      const mergedUser = { ...updatedUser, friends: fullFriends };

      // 4️⃣ Update local state and Redux
      setUserLocal(mergedUser);
      dispatch(setUser({ user: mergedUser, token }));
    } catch (err) {
      console.error("[UserWidget] handleImageChange error:", err);
    }
  };


  if (!user) return null;

  const { firstName, lastName, friends = [] } = user;

  return (
    <WidgetWrapper>
      {/* Profile Image */}
      <input
        type="file"
        id="profile-image-upload"
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <Box display="flex" alignItems="center" gap="1rem" pb="1rem">
        <Box
          sx={{
            position: "relative",
            width: "60px",
            height: "60px",
            cursor: isOwnProfile ? "pointer" : "default",
            transition: "transform 0.3s",
            "&:hover": { transform: isOwnProfile ? "scale(1.05)" : "none" },
            "&:hover .overlay": { opacity: isOwnProfile ? 0.5 : 0 },
          }}
          onClick={() => isOwnProfile && document.getElementById("profile-image-upload").click()}
        >
          {/* <UserImage
            image={user?.picturePath ? `${BASE_URL}/assets/${user.picturePath}` : "/assets/default-image.jpg"}
            size="60px"
          /> */}
          <UserImage
            image={
              user?.picturePath
                ? user.picturePath.length === 24 // crude check for ObjectId
                  ? `${BASE_URL}/files/${user.picturePath}`
                  : `/assets/${user.picturePath}`
                : "/assets/default-image.jpg"
            }
            size="60px"
          />

          {isOwnProfile && (
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
          )}
        </Box>

        <Box 
          onClick={() => navigate(`/profile/${userId}`)}
          display="flex" 
          flexDirection="column" 
          justifyContent="center">
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

      {/* Editable Fields */}
      <Box p="1rem 0" color={main}>
        {isEditing && isOwnProfile ? (
          <>
            <TextField
              label="First Name"
              placeholder="Enter First Name"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              placeholder="Enter Last Name"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Location"
              placeholder="Enter Location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <span style={{ marginRight: 8 }}>📍</span>,
              }}
            />
            <TextField
              label="About Me"
              placeholder="Tell us about yourself"
              value={occupationInput}
              onChange={(e) => setOccupationInput(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <span style={{ marginRight: 8 }}>📝</span>,
              }}
            />
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </>
        ) : (
          <>
            <Typography color={main} sx={{ mb: 1 }}>📍 {user.location || "No location set"}</Typography>
            <Typography color={main} sx={{ mb: 2 }}>📝 {user.occupation || "No description set"}</Typography>
            {isOwnProfile && (
              <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </>
        )}
      </Box>

      <Divider />

      {/* Meet the Creator Section (centered, dark icons) */}
      <Box mt="1rem" textAlign="center">
        <Typography variant="h6" fontWeight="500" color={main} mb="0.5rem">
          Meet the Creator
        </Typography>
        <Box display="flex" justifyContent="center" gap="1rem">
          <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" style={{ color: main }}>
            <BsLinkedin size={24} />
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" style={{ color: main }}>
            <BsGithub size={24} />
          </a>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;


















