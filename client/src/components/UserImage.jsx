import { Box } from "@mui/material";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const UserImage = ({ image, size = "60px", onClick }) => {
  
  const srcPath =
    image?.startsWith("http") || image?.startsWith("/")
      ? image
      : image
      ? /^[a-f\d]{24}$/i.test(image)
        ? `${BASE_URL}/files/${image}` // GridFS
        : `/assets/${image}`           // static
      : "/assets/default-image.jpg";   // fallback

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
        src={srcPath}
        onError={(e) => {
          if (!e.currentTarget.dataset.fallback) {
            e.currentTarget.dataset.fallback = true;
            e.currentTarget.src = "/assets/default-image.jpg";
          }
        }}
      />
    </Box>
  );
};

export default UserImage;
