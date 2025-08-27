import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch user:", errorData);
        alert(errorData.message || "Failed to fetch user data");
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Network error fetching user:", err);
      alert("Error fetching user data");
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

// import { Box, useMediaQuery, Button, TextField } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Navbar from "scenes/navbar";
// import FriendListWidget from "scenes/widgets/FriendListWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";
// import UserWidget from "scenes/widgets/UserWidget";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});
//   const { userId } = useParams();
//   const token = useSelector((state) => state.auth.token);
//   const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

//   const getUser = async () => {
//     const response = await fetch(`http://localhost:3001/users/${userId}`, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     setUser(data);
//     setFormData({
//       firstName: data.firstName || "",
//       lastName: data.lastName || "",
//       location: data.location || "",
//       occupation: data.occupation || "",
//       picturePath: data.picturePath || "",
//     });
//   };

//   useEffect(() => {
//     getUser();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   if (!user) return null;

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/users/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       const updated = await response.json();
//       setUser(updated);
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error updating user:", err);
//     }
//   };

//   return (
//     <Box>
//       <Navbar />
//       <Box
//         width="100%"
//         padding="2rem 6%"
//         display={isNonMobileScreens ? "flex" : "block"}
//         gap="2rem"
//         justifyContent="center"
//       >
//         <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
//           <UserWidget userId={userId} picturePath={user.picturePath} />
//           <Box m="1rem 0" />
//           <FriendListWidget userId={userId} />
//         </Box>

//         <Box
//           flexBasis={isNonMobileScreens ? "42%" : undefined}
//           mt={isNonMobileScreens ? undefined : "2rem"}
//         >
//           {editMode ? (
//             <Box display="flex" flexDirection="column" gap="1rem" mb="2rem">
//               <TextField
//                 label="First Name"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 size="small"
//               />
//               <TextField
//                 label="Last Name"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 size="small"
//               />
//               <TextField
//                 label="Location"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 size="small"
//               />
//               <TextField
//                 label="Occupation"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleChange}
//                 size="small"
//               />
//               <Button variant="contained" onClick={handleSave}>
//                 Save Changes
//               </Button>
//               <Button variant="outlined" onClick={() => setEditMode(false)}>
//                 Cancel
//               </Button>
//             </Box>
//           ) : (
//             <Button variant="contained" onClick={() => setEditMode(true)} mb="2rem">
//               Edit Profile
//             </Button>
//           )}

//           <MyPostWidget picturePath={user.picturePath} />
//           <Box m="2rem 0" />
//           <PostsWidget userId={userId} isProfile />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ProfilePage;
