// state/index.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,   // Will store logged-in user object
  token: null,  // JWT token
  posts: [],    // Optional: for feed posts
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Toggle dark/light mode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    // Set user login state
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Clear user state on logout
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    // Update friends of logged-in user
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("No user logged in to set friends");
      }
    },

    // Set feed posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    // Update a single post in state
    setPost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
