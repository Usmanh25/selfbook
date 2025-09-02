import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px", onClick }) => {
  // determine image path
  let srcPath;
  if (!image) {
    srcPath = "/assets/default-image.jpg";
  } else if (image.startsWith("http") || image.startsWith("/assets/")) {
    srcPath = image; // already a path
  } else {
    srcPath = `/assets/${image}`; // just a filename, prepend /assets
  }


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
          if (!e.currentTarget.dataset.defaultSet) {
            e.currentTarget.dataset.defaultSet = true;
            e.currentTarget.src = "/assets/default-image.jpg";
          }
        }}
      />
    </Box>
  );
};

export default UserImage;
