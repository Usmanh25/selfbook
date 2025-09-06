import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px", onClick }) => {
  let srcPath;

  if (!image || image === "default-image.jpg") {
    srcPath = "/assets/default-image.jpg";
  } else if (image.startsWith("http") || image.startsWith("/assets/")) {
    srcPath = image;
  } else {
    srcPath = `/assets/${image}`;
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











// import { Box } from "@mui/material";

// const UserImage = ({ image, size = "60px", onClick }) => {
//   let srcPath;

//   if (!image || image === "default-image.jpg") {
//     srcPath = "/assets/default-image.jpg";
//   } else if (image.startsWith("http") || image.startsWith("/assets/")) {
//     srcPath = image;
//   } else {
//     // If it’s a GridFS filename, fetch from /files/:filename
//     srcPath = `${process.env.REACT_APP_BASE_API_URL}/files/${image}`;
//   }

//   return (
//     <Box
//       width={size}
//       height={size}
//       sx={{ cursor: onClick ? "pointer" : "default" }}
//       onClick={onClick}
//     >
//       <img
//         style={{ objectFit: "cover", borderRadius: "50%" }}
//         width={size}
//         height={size}
//         alt="user"
//         src={srcPath}
//         onError={(e) => {
//           if (!e.currentTarget.dataset.fallback) {
//             e.currentTarget.dataset.fallback = true;
//             e.currentTarget.src = "/assets/default-image.jpg";
//           }
//         }}
//       />
//     </Box>
//   );
// };

// export default UserImage;
