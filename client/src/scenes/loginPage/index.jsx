import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const footerLinks1 = ["Sign Up", "Log In", "Messenger", "Selfbook Lite", 
    "Watch", "Places", "Games"]
  const footerLinks2 = ["Marketplace", "Oculus", "Portal", "Bulletin", 
    "Fundraisers", "Services", "Voting Information Center"]
  const footerLinks3 = ["Privacy Policy", "Center", "Groups", "About", 
  "Create Ad", "Create Page"]
  const footerLinks4 = ["Developers", "Careers", "Cookies", "Terms", "Help", "Contact"]
  const languageLinks = ["English", "Español", "Français", "中文", "العربية", "Português",
    "Italiano", "한국어", "Deutsch", "हिन्दी"]
  const isNonMobileScreens = useMediaQuery("(min-width: 876px)");
  return (
    <>

        {isNonMobileScreens ? 
          <>
            <Box display="flex" width="75%" height="75%" m="auto" mt={7}>
                <Box m="auto">
                  <Typography
                    className="pictagram"
                    fontWeight="bold"
                    fontSize="clamp(2rem, 4rem, 4.5rem)">selfbook</Typography>
                  <Typography
                    className="pictagram-login-subtitle"
                    fontSize="clamp(0.8rem, 1.8rem, 2.05rem)">Connect with friends and the world around you on selfbook.</Typography>
                </Box>
              <Form/>
            </Box>
            
          <Typography component={'li'} backgroundColor="white" mt={15}>
              <Typography component={'ul'} width="90%" m="auto" textAlign="left" display="flex" >
                {languageLinks.map(link => (<ul key={link} className="footer-link-item">{link}</ul>))}
              </Typography>                

              <Typography component={'ul'} width="90%" m="auto" textAlign="left" display="flex" >
                {footerLinks1.map(link => (<ul key={link} className="footer-link-item">{link}</ul>))}
              </Typography>
              <Typography component={'ul'} width="90%" m="auto" textAlign="left" display="flex" >
                {footerLinks2.map(link => (<ul key={link} className="footer-link-item">{link}</ul>))}
              </Typography>

              <Typography component={'ul'} width="90%" m="auto" textAlign="left" display="flex" >
                {footerLinks3.map(link => (<ul key={link} className="footer-link-item">{link}</ul>))}
              </Typography>
              <Typography component={'ul'} width="90%" m="auto" textAlign="left" display="flex" >
                {footerLinks4.map(link => (<ul key={link} className="footer-link-item">{link}</ul>))}
              </Typography>
              <Typography component={'ul'} width="90%" m="auto" mt={1} textAlign="left" display="flex" >
                <ul key='uniqueKey1' className="footer-link-item">SelfBook © 2025</ul>
              </Typography>

            </Typography>
          </>
          : <Box textAlign="center" display="flex" width="65%" m="auto" height="55%"
              sx={{ flexDirection: 'column'}}>

            <Box mt={2}>
                <Typography
                  mt={2}
                  className="pictagram"
                  fontWeight="bold"
                  fontSize="clamp(2rem, 4rem, 4.5rem)">selfbook</Typography>
                <Typography
                  mb={3}
                  className="pictagram-login-subtitle"
                  fontSize={22} >Connect with friends and the world around you on selfbook.</Typography>
              </Box>
            <Form/>
          </Box>
        }

    </>
  )
};

export default LoginPage;