import * as yup from "yup";


export const signupSchema = yup.object().shape({
  firstname: yup
    .string()
    .trim()
    .required("Firt name is missing")
    .min(3, "First name must be longer than 3 characters")
    .max(20, "First name is too long,. Max 20 characters"),
  lastname: yup
    .string()
    .trim()
    .required("Last ame is missing")
    .min(3, "Last name must be longer than 3 characters")
    .max(20, "Last name is too long,. Max 20 characters"),
  email: yup.string().required("Email is missing").email("Invalid email id!"),
  password: yup
    .string()
    .trim()
    .required("Password is missing")
    .min(8, "Password is too short")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/, "Password is too simple")
    
});

// export const loginSchema = yup.object().shape({
//   email: yup.string().required("Email is missing").email("Invalid email id!"),
//   password: yup
//     .string()
//     .trim()
//     .required("Password is missing")
//     .min(8, "Password is too short")
//     .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/, "Password is too simple")
    
// });