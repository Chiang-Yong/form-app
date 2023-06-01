import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { Input } from "@mui/material";

const theme = createTheme();

//Server port
const port = 4000;

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles]=useState("user");
  const [termPolicy, setTermPolicy] = useState("undefined");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termPolicyError, setTermPolicyError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setTermPolicyError(false);
     

    if (firstName === "") {
      setFirstNameError(true);
      console.log("First Name Error: " + firstNameError);
    }
    if (lastName === "") {
      setLastNameError(true);
    }

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (termPolicy === null || termPolicy === undefined) {
      console.log("Term Policy is: " + termPolicy);
      setTermPolicyError(true);
      console.log("Term Policy Error: " + termPolicyError);
    }

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      (termPolicy !== null && termPolicy !== "undefined")
    ) {
            
      const data = new FormData(event.currentTarget);
      data.roles=setRoles("user")
      console.log(
        "Any Errors: Fristname: " +
          firstNameError +
          ", Lastname: " +
          lastNameError +
          ", TermPolicy: " +
          termPolicyError
      );
      console.log({
        FirstName: data.get("firstName"),
        LastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        roles: data.get("roles"),
        TermPolicy: data.get("termPolicy"),
      });

      await Axios.post(
        `http://localhost:${port}/register`,
        document.querySelector('#register-form'),{
          body: JSON.stringify({ firstName, lastName, email, password, roles, termPolicy }),  
        headers: {'Content-Type':'application/json'}
        }
      )
        .then((response) => {
          console.log("Server response:" + response.data); //response from server port 4000 register end-point
          alert("registration successful");
        })
        .catch((error) => {
          console.error(error);
          alert("registraion failed");
        });

      //can use fetch if one preferred
      /*      const response = await fetch(`http://localhost:4000/register`, {
       method: 'POST',
       // body: JSON.stringify({ data }),
        body: JSON.stringify({ firstName, lastName, email, password, roles, termPolicy }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        alert("registration successful");
        console.log("Registration is successful")
      } else {
        alert("registration failed");
      } */
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form id="register-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type="text"
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    error={firstNameError}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    error={lastNameError}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={emailError}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    error={passwordError}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    //required
                    //fullWidth
                    name="roles"
                    //label="roles"
                    type="hidden"
                    id="roles"
                    onChange={(e) => setRoles("user")}
                    value={roles}
                   // error={passwordError}
                   // autoComplete="user"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        required
                        name="termPolicy"
                        onChange={(e) => setTermPolicy("accepted")}
                        value={termPolicy}
                        error={termPolicyError}
                        color="primary"
                      />
                    }
                    label="I accept the Terms of Use and the Privacy Policy."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <small>
                    Already have an account? &nbsp;
                    <Link to="/login" variant="body2">
                      Sign in
                    </Link>
                  </small>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
