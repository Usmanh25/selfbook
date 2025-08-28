import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px", onClick }) => {
  // Use the full backend path for the image
  const srcPath = image.startsWith("/assets/") ? image : `/assets/${image}`;

  return (
    <Box
      width={size}
      height={size}
      sx={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001${srcPath}`}
      />
    </Box>
  );
};

export default UserImage;
