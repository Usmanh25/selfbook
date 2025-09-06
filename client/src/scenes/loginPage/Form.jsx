import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

const demoValuesLogin = {
  email: "guest@example.com",
  password: "guest123",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";

  const login = async (values, onSubmitProps) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert(errorData.msg || "Login failed");
        return;
      }

      const data = await response.json();
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/home");
      onSubmitProps.resetForm();
    } catch (err) {
      console.error("Network error logging in:", err);
      alert("Error logging in");
    }
  };

  const register = async (values, onSubmitProps) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        alert(errorData.msg || "Registration failed");
        return;
      }

      const data = await response.json();
      await login({ email: values.email, password: values.password }, onSubmitProps);
    } catch (err) {
      console.error("Network error registering:", err);
      alert("Error registering user");
    }
  };

  const handleDemoSubmit = async (values, onSubmitProps) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/guest-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(demoValuesLogin),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Demo login failed:", errorData);
        alert(errorData.msg || "Demo login failed");
        return;
      }

      const data = await response.json();
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/home");
      onSubmitProps.resetForm();
    } catch (err) {
      console.error("Network error demo login:", err);
      alert("Error logging in demo user");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    else await register(values, onSubmitProps);
  };

  return (
    <div className="formik0">
      <div className="formik1">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, isSubmitting }) => (
            <form className="formClass" onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
              >
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  size="small"
                  sx={{ margin: "auto", width: "75%", display: "flex" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  size="small"
                  sx={{ margin: "auto", width: "75%", display: "flex" }}
                />
              </Box>

              <Box className="login-button">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  sx={{
                    fontSize: "14px",
                    p: "0.75rem",
                    m: "1rem 0",
                    width: "75%",
                    textAlign: "center",
                    backgroundColor: "#0866ff",
                    color: palette.background.alt,
                    "&:hover": { color: "#0866ff" },
                  }}
                >
                  {isSubmitting ? <CircularProgress size={20} sx={{ color: palette.background.alt }} /> : isLogin ? "LOG IN" : "REGISTER"}
                </Button>
                <Typography
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                  }}
                  sx={{
                    fontSize: "14px",
                    textAlign: "center",
                    textDecoration: "underline",
                    color: "#0866ff",
                    "&:hover": { cursor: "pointer", color: palette.primary.light },
                  }}
                >
                  {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </div>

      <div className="formik2">
        <Formik onSubmit={handleDemoSubmit} initialValues={demoValuesLogin} validationSchema={loginSchema}>
          {({ handleSubmit, resetForm, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="guestLogin">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  sx={{
                    m: "1rem 0",
                    p: "0.75rem",
                    width: "40%",
                    backgroundColor: "#2fce2f",
                    color: palette.background.alt,
                    "&:hover": { color: "#2fce2f" },
                  }}
                >
                  {isSubmitting ? <CircularProgress size={20} sx={{ color: palette.background.alt }} /> : "Demo Login"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Form;

