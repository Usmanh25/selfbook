import { DeleteOutlined, ImageOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [postText, setPostText] = useState("");
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const handlePost = async () => {
    if (!postText && !image) return;

    const formData = new FormData();
    formData.append("description", postText);
    if (image) formData.append("picture", image);

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create post");

      const newPost = await response.json();
      dispatch(setPost({ post: newPost }));

      setPostText("");
      setImage(null);
      setIsImage(false);

    } catch (err) {
      console.error("[MyPostWidget] Error creating post:", err);
    }
  };

  const userImagePath = user?.picturePath
    ? /^[a-f\d]{24}$/i.test(user.picturePath)
      ? `${BASE_URL}/files/${user.picturePath}`
      : `/assets/${user.picturePath}`
    : "/assets/default-image.jpg";


  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={userImagePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(files) => setImage(files[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? <p>Add Image</p> : <Typography>{image.name}</Typography>}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)} sx={{ ml: "10px" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: palette.neutral.mediumMain }} />
          <Typography sx={{ "&:hover": { cursor: "pointer" } }}>Image</Typography>
        </FlexBetween>

        {!isNonMobile && (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: palette.neutral.mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!postText && !image}
          onClick={handlePost}
          sx={{
            color: "#ffffff",
            backgroundColor: "#0866ff",
            borderRadius: "3rem",
            "&:hover": { backgroundColor: "#ffffff", color: "#0866ff" },
            "&.Mui-disabled": { backgroundColor: "#0866ff", color: "#ffffff", opacity: 0.6 },
          }}
        >
          POST
        </Button>
      </FlexBetween>

      {image && (
        <Box mt="1rem" textAlign="center">
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default MyPostWidget;
