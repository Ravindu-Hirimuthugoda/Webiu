import React from "react"

import SignIn from "."

import { action } from "@storybook/addon-actions"

export default {
  title: "E-Commerce/SignIn",
  component: SignIn,
  argTypes: {
    emailHelperText: { control: "text" },
    passwordHelperText: { control: "text" },
    signInHandler: { control: "function" },
    signupUrl: { control: "text" },
  },
}

export const searchbar = args => (
  <SignIn {...args} signInHandler={action("signIn function called")} />
)

searchbar.args = {
  emailHelperText: "Invalid Email",
  passwordHelperText: "Password is not strong enough",
  signupUrl: "/signup",
}
