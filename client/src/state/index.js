// state/index.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const initialState = {
  mode: "light",
  user: null,   // logged-in user
  token: null,  // JWT token
  posts: [],    // feed posts
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = {
        ...action.payload.user,
        friends: Array.isArray(action.payload.user.friends)
          ? action.payload.user.friends
          : [],
      };
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = Array.isArray(action.payload.friends)
          ? action.payload.friends
          : [];
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const { post, postId, action: act } = action.payload;

      if (act === "delete" && postId) {
        state.posts = state.posts.filter((p) => p._id !== postId);
      } else if (post) {
        const index = state.posts.findIndex((p) => p._id === post._id);
        if (index !== -1) state.posts[index] = post;
        else state.posts.unshift(post); // ✅ new post always on top
      }
    },
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = { ...user };
      if (token) state.token = token;

      // ✅ Update posts authored by this user (works whether post.userId is string or object)
      state.posts = state.posts.map((post) => {
        const postUserId =
          typeof post.userId === "object" ? post.userId._id : post.userId;
        if (postUserId === user._id) {
          return {
            ...post,
            userId: {
              ...(typeof post.userId === "object" ? post.userId : {}),
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              location: user.location,
              picturePath: user.picturePath, // ✅ force sync picture
            },
          };
        }
        console.log("[authSlice] Updating picturePath to:", user.picturePath);
        return post;
      });
    },
  },
});

// Thunk to update profile picture
export const uploadProfilePicture = createAsyncThunk(
  "auth/uploadProfilePicture",
  async ({ userId, file }, { dispatch, getState, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("picture", file);

      const token = getState().auth.token;

      const response = await axios.patch(
        `${BASE_URL}/users/${userId}/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Dispatch setUser to update Redux state
      dispatch(authSlice.actions.setUser({ user: response.data }));

      return response.data;
    } catch (err) {
      console.error("Upload failed", err);
      return rejectWithValue(err.response?.data || "Upload failed");
    }
  }
);

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
