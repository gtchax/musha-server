import * as yup from "yup";
import { isValidObjectId } from "mongoose";
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
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple"
    ),
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

export const placeSchema = yup.object().shape({
  city: yup.string().trim().required("City is required"),
  description: yup.string().trim().required("Description is required"),
  name: yup.string().trim().required("Name is required"),
  province: yup.string().trim().required("Province is required"),
  type: yup.string().trim().required("Place type is required"),
  user: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      }
      return "";
    })
    .required("Invalid user ID!"),
  starRating: yup.number().min(1).max(5).required("Star rating is required"),
  facilities: yup.array().of(yup.string()).required("Facilities required"),
  imageUrls: yup.array().of(yup.string()).required("Images required"),
});
