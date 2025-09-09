// import { Box } from "@mui/material";

// const UserImage = ({ image, size = "60px", onClick }) => {
//   let srcPath;

//   if (!image || image === "default-image.jpg") {
//     srcPath = "/assets/default-image.jpg";
//   } else if (image.startsWith("http") || image.startsWith("/assets/")) {
//     srcPath = image;
//   } else {
//     srcPath = `/assets/${image}`;
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


// import { Box } from "@mui/material";

// const BASE_URL = process.env.REACT_APP_BASE_API_URL;

// const UserImage = ({ image, size = "60px", onClick }) => {
  
//   const isObjectId = (str) => /^[a-f\d]{24}$/i.test(str);
  
//   // check if string is a Mongo ObjectId  
//   const srcPath = image
//     ? isObjectId(image)
//       ? `${BASE_URL}/files/${image}`   // GridFS image
//       : `/assets/${image}`             // old seeded/static image
//     : "/assets/default-image.jpg";           // fallback

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
import { Box } from "@mui/material";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const UserImage = ({ image, size = "60px", onClick }) => {
  // If image is already a URL, use it directly
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
