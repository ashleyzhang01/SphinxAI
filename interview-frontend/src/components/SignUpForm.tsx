import { Formik, Field, FieldArray } from "formik";
import { FC } from "react";
import TextField from "./TextField";
import Select from "./Select";
import Router, { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ColorButton } from "./Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import userService from "../userService";
const SignUpForm: FC = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email: "",
        passwordConfirm: "",
      }}
      onSubmit={(values: any, { setSubmitting }: any) => {
        userService
          .CreateUser(values)
          .then(() => {
            router.push("/login");
          })
          .catch(() => {
            alert("This username or email already exists!");
            router.refresh();
          });
      }}
      validate={(values: any) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password !== values.passwordConfirm) {
          errors.password = "Passwords must match";
        }
        if (!values.passwordConfirm) {
          errors.passwordConfirm = "Required";
        }
        if (!values.username) {
          errors.username = "Required";
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
      }: any) => (
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
            <div className="h-16">
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
            <div className="h-16">
              <Field
                errors={
                  errors.passwordConfirm &&
                  touched.passwordConfirm &&
                  errors.passwordConfirm
                }
                name="passwordConfirm"
                placeholder="Confirm Password"
                type="password"
                as={TextField}
              ></Field>
              <div className="text-xs m-px text-red-500">
                {errors.passwordConfirm &&
                  touched.passwordConfirm &&
                  errors.passwordConfirm}
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

export default SignUpForm;
