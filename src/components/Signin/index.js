import React, { useState } from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserCircle,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons"
import validate from "./validate"
import Styles from "./styles"

const SignIn = ({
  emailHelperText,
  passwordHelperText,
  signInHandler,
  signupUrl,
}) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const classes = Styles()

  const fields = {
    email: {
      helperText: `${emailHelperText}`,
      placeholder: "Email",
      type: "text",
      startAdornment: (
        <span className={classes.EmailAdornment}>
          <FontAwesomeIcon icon={faEnvelope} size="1x" color="#9e9e9e" />
        </span>
      ),
    },
    password: {
      helperText: `${passwordHelperText}`,
      placeholder: "Password",
      type: visible ? "text" : "password",
      startAdornment: (
        <span className={classes.EmailAdornment}>
          <FontAwesomeIcon icon={faLock} size="1x" color="#9e9e9e" />
        </span>
      ),
      endAdornment: (
        <span className={classes.PasswordAdornment}>
          <IconButton onClick={() => setVisible(!visible)}>
            {visible ? (
              <FontAwesomeIcon icon={faEye} size="1x" color="#9e9e9e" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} size="1x" color="#9e9e9e" />
            )}
          </IconButton>
        </span>
      ),
    },
  }
  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        item
        container
        direction="column"
        classes={{ root: classes.outerContainer }}
      >
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          classes={{ root: classes.innerContainer }}
        >
          <Grid item classes={{ root: classes.iconContainer }}>
            <FontAwesomeIcon icon={faUserCircle} size="5x" color="#47B3A3" />
          </Grid>
          {Object.keys(fields).map(field => {
            const validateHelper = event => {
              const valid = validate({ [field]: event.target.value })
              setErrors({ ...errors, [field]: !valid[field] })
            }
            return (
              <Grid item key={field}>
                <TextField
                  value={values[field]}
                  onChange={e => {
                    if (errors[field]) {
                      validateHelper(e)
                    }
                    setValues({ ...values, [field]: e.target.value })
                  }}
                  classes={{ root: classes.textField }}
                  onBlur={e => validateHelper(e)}
                  error={errors[field]}
                  helperText={errors[field] && fields[field].helperText}
                  placeholder={fields[field].placeholder}
                  type={fields[field].type}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {fields[field].startAdornment}
                      </InputAdornment>
                    ),
                    endAdornment: fields[field].endAdornment ? (
                      <InputAdornment position="end">
                        {fields[field].endAdornment}
                      </InputAdornment>
                    ) : (
                      undefined
                    ),
                    classes: { input: classes.input },
                  }}
                />
              </Grid>
            )
          })}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              classes={{ root: classes.btn }}
              onClick={signInHandler}
            >
              <Typography variant="h2" classes={{ root: classes.text }}>
                Sign In
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Grid container classes={{ root: classes.bottomText }}>
              <Typography variant="body1">
                Don't Have an account yet?
              </Typography>
              <Typography component={Link} to={signupUrl}>
                Signup Here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

SignIn.propTypes = {
  emailHelperText: PropTypes.string,
  passwordHelperText: PropTypes.string,
  signInHandler: PropTypes.func,
  signupUrl: PropTypes.string,
}

export default SignIn
