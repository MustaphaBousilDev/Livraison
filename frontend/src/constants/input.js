const inputs 
    =[
        {
          uuid:1,
          id: 'username',
          name: "username",
          type: "text",
          placeholder: "Username",
          errorMessage:"Username should be 3-16 ",
          label: "Username",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          uuid:2,
          id: 'email',
          name: "email",
          type: "email",
          placeholder: "Email",
          errorMessage: "It should ",
          label: "Email",
          required: true,
        },
        {
          uuid:3,
          id: 'password',
          name: "password",
          type: "password",
          placeholder: "Password",
          errorMessage:
            "Password, 1 number and 1 special character!",
          label: "Password",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },
        {
          uuid:4,
          id: 'confirmPassword',
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          errorMessage: "Passwords don't match!",
          label: "Confirm Password",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },
      ];


export default inputs;