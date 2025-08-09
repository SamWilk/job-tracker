import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./login.css";
import UrlConfig from "../../../environment/getURLConfig";

export default function LoginPage() {
  const apiUrl = UrlConfig.getApiUrl();
  const navigate = useNavigate();

  return (
    <main className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Log in to continue tracking your job applications.
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Must be at least 6 characters")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // Example login API call — replace with your real endpoint
              const response = await fetch(`${apiUrl}/api/hello`, {
                method: "GET",
                credentials: "include",
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              } else {
                navigate("/home");
              }
            } catch (err) {
              console.error("Login error", err);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging In..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
