import { Box, Typography, Divider, useTheme, TextField, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";
import { setLogin, setUser } from "state";
const BASE_URL = process.env.REACT_APP_BASE_API_URL;
const UserWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const [user, setUserLocal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [occupationInput, setOccupationInput] = useState("");
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

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
      // console.log("[DEBUG][UserWidget] Fetched user:", data);
    } catch (err) {
      console.error("[UserWidget] Error fetching user:", err);
      setUserLocal({ firstName: "Unknown", lastName: "", location: "Unknown", occupation: "Unknown", friends: [] });
    }
  };

  useEffect(() => { if (userId) getUser(); }, [userId, token]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("picture", file);

    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/profile-image`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image");
      const updatedUser = await response.json();
      dispatch(setUser({ user: updatedUser, token })); // ✅ Update Redux
      setUserLocal(updatedUser); // ✅ Update local state
      // console.log("[DEBUG][UserWidget] Updated profile image:", updatedUser.picturePath);
    } catch (err) {
      console.error("[UserWidget] handleImageChange error:", err);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ firstName: firstNameInput, lastName: lastNameInput, location: locationInput, occupation: occupationInput }),
      });
      if (!response.ok) throw new Error("Failed to update user");
      const updatedUser = await response.json();
      setUserLocal(updatedUser);
      setIsEditing(false);
      dispatch(setLogin({ user: updatedUser, token }));
      // console.log("[DEBUG][UserWidget] Updated profile info:", updatedUser);
    } catch (err) {
      console.error("[UserWidget] handleSave error:", err);
    }
  };

  if (!user) return null;
  const { firstName, lastName, friends = [] } = user;

  return (
    <WidgetWrapper>
      <input type="file" id="profile-image-upload" style={{ display: "none" }} onChange={handleImageChange} accept="image/*" />

      <Box display="flex" alignItems="center" gap="1rem" pb="1rem">
        <Box
          sx={{ position: "relative", width: "60px", height: "60px", cursor: "pointer", transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" }, "&:hover .overlay": { opacity: 0.5 } }}
          onClick={(e) => { e.stopPropagation(); document.getElementById("profile-image-upload").click(); }}
        >
          <UserImage image={user?.picturePath ? `${BASE_URL}/assets/${user.picturePath}` : "/assets/default-image.jpg"} size="60px"/>
          <Box className="overlay" sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", bgcolor: "black", opacity: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "opacity 0.3s" }}>
            <FiCamera size={20} />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h4" color={main} fontWeight="500" sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer" } }}>
            {firstName} {lastName}
          </Typography>
          <Typography color={medium}>{friends.length} friends</Typography>
        </Box>
      </Box>

      <Divider />
      <Box p="1rem 0" color={main}>
        {isEditing ? (
          <>
            <TextField label="First Name" value={firstNameInput} onChange={(e) => setFirstNameInput(e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Last Name" value={lastNameInput} onChange={(e) => setLastNameInput(e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Location" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Occupation" value={occupationInput} onChange={(e) => setOccupationInput(e.target.value)} fullWidth sx={{ mb: 1 }} />
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </>
        ) : (
          <>
            <Typography color={main}>{user.location || "Unknown"}</Typography>
            <Typography color={main}>{user.occupation || "Unknown"}</Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setIsEditing(true)}>Edit</Button>
          </>
        )}
      </Box>

      <Divider />
      {/* Social links omitted for brevity */}
    </WidgetWrapper>
  );
};

export default UserWidget;
