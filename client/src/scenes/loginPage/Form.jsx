import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};
const demoValuesLogin = {
  email: "jackiemofff@gmail.com",
  password: "password",
};


const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      // setPageType("login");
      login(values, onSubmitProps)
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };


  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const handleDemoSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };


  return (
    <>
      <div className='formik0'>
        <div className='formik1'>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form className='formClass' onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  textAlign="center"
                  gap="30px"
                  gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  {/* <img alt="logo" id="loginLogo" src="../assets/loginLogo.png"></img> */}

              
                  {isRegister && (
                    <>
                      <TextField
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        size="small"   
                        sx={{
                          margin: 'auto',
                          width: "75%",
                          display: 'flex',
                        }}
                        error={
                          Boolean(touched.firstName) && Boolean(errors.firstName)
                        }
                        helperText={touched.firstName && errors.firstName}
                      />
                      <TextField
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        size="small"   
                        sx={{
                          margin: 'auto',
                          width: "75%",
                          display: 'flex',
                        }}
                      />
                      <TextField
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        size="small"   
                        sx={{
                          margin: 'auto',
                          width: "75%",
                          display: 'flex',
                        }}
                        error={Boolean(touched.location) && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                      />
                      <TextField
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        size="small"   
                        sx={{
                          margin: 'auto',
                          width: "75%",
                          display: 'flex',
                        }}
                        error={
                          Boolean(touched.occupation) && Boolean(errors.occupation)
                        }
                        helperText={touched.occupation && errors.occupation}
                      />
                      {/* <Box
                        gridColumn="span 4"
                        border={`1px solid ${palette.neutral.medium}`}
                        borderRadius="5px"
                        p="1rem"
                      > */}
                        <div className='dzone'>
                          <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}

                            onDrop={(acceptedFiles) =>
                              setFieldValue("picture", acceptedFiles[0])
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <Box
                                {...getRootProps()}
                                border={`2px dashed ${palette.primary.main}`}
                                // p="1rem"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                              >
                                <input {...getInputProps()} />
                                {!values.picture ? (
                                  <p>Add Picture Here</p>
                                ) : (
                                  <FlexBetween>
                                    <Typography>{values.picture.name}</Typography>
                                    <EditOutlinedIcon />
                                  </FlexBetween>
                                )}
                              </Box>
                            )}
                          </Dropzone>
                        </div>
                      {/* </Box> */}
                    </>
                  )}

                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    // variant="filled"
                    size="small"  
                    sx={{
                      margin: 'auto',
                      width: "75%",
                      display: 'flex',
                    }}

                    />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    // variant="filled"
                    size="small"   
                    sx={{
                      margin: 'auto',
                      width: "75%",
                      display: 'flex',
                    }}
                  />
                </Box>

                {/* BUTTONS */}
                <Box>
                  <Button
                    type="submit"
                    size="sm"
                    textAlign="center"
                    sx={{
                      fontSize: "14px",
                      p: "0.75rem",
                      m: "1rem 0",
                      width: "75%",
                      // height: "50%",
                      backgroundColor: '#5493ff',
                      color: palette.background.alt,
                      "&:hover": { color: '#5493ff' },
                    }}
                  >
                    {isLogin ? "LOG IN" : "REGISTER"}
                  </Button>
                  <Typography
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                    sx={{
                      fontSize: "14px",
                      textDecoration: "underline",
                      color: '#5493ff',
                      "&:hover": {
                        cursor: "pointer",
                        color: palette.primary.light,
                      },
                    }}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up here."
                      : "Already have an account? Login here."}
                  </Typography>
                </Box>
              </form>
            )}
          </Formik>
        </div>

        <div className='formik2'>
          <Formik
            onSubmit={handleDemoSubmit}
            initialValues={demoValuesLogin}
            validationSchema={loginSchema}
          >{({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
            }) => (
              <form 
                onSubmit={handleSubmit} 
              >
                <div className="guestLogin">
                  <Button
                    type="submit"
                    size="sm"
                    // onClick={login}
                    sx={{
                      // display: "flex",
                      m: "1rem 0",
                      p: "0.75rem",
                      width: "40%",
                      backgroundColor: '#2fce2f',
                      color: palette.background.alt,
                      "&:hover": { color: '#2fce2f' },
                    }}
                  >
                    {"Demo Login"}
                  </Button>
                </div>
              </form>)}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Form;