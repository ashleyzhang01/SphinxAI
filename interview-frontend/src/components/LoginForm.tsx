import { Formik, Field, FieldArray } from "formik";
import { FC } from "react";
import TextField from "./TextField";
import Select from "./Select";
import Router, { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import { ColorButton } from "./Button";
import Cookies from "js-cookie";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import userService from "../userService";
const LogInForm: FC = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        userService
          .LogInUser(values)
          .then((token: any) => {
            if (token.status == 200) {
              Cookies.set("token", token.data.token);
              router.push("/");
            } else {
              window.location.reload();
            }
          })
          .catch(() => window.location.reload());
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Please enter your password!";
        }
        if (!values.username) {
          errors.username = "Please enter your username!";
        } else if (values.username.length > 20) {
          errors.username = "Username must be less than 20 characters";
        }
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div className="h-16 col-span-2">
              <Field
                errors={errors.username && touched.username && errors.username}
                name="username"
                placeholder="Username"
                type="input"
                as={TextField}
              ></Field>
              <div className="text-xs m-px text-red-500">
                {errors.username && touched.username && errors.username}
              </div>
            </div>
            <div className="h-16 col-span-2">
              <Field
                errors={errors.email && touched.email && errors.email}
                name="email"
                placeholder="Email"
                type="email"
                as={TextField}
              ></Field>
              <div className="text-xs m-px text-red-500">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="h-16 col-span-2">
              <Field
                errors={errors.password && touched.password && errors.password}
                name="password"
                placeholder="Password"
                type="password"
                as={TextField}
              ></Field>
              <div className="text-xs m-px text-red-500">
                {errors.password && touched.password && errors.password}
              </div>
            </div>
          </div>

          <div className="w-full grid mt-5">
            <div className="flex justify-center">
              <ColorButton
                color="green-300"
                disabled={isSubmitting}
                type="submit"
              >
                <div className="flex items-center">
                  <FaArrowRight className="h-5 w-5"></FaArrowRight>
                </div>
              </ColorButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LogInForm;
