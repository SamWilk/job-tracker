import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./signup.css";
import UrlConfig from "../../../environment/getURLConfig";

export default function SignupPage() {
  const apiUrl = UrlConfig.getApiUrl();
  const Navigate = useNavigate();

  return (
    <main className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">
          Sign up to start tracking your job applications today.
        </p>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(50, "Must be 50 characters or less")
              .matches(/^\S+$/, "Name cannot contain spaces")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Must be at least 6 characters")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            const name = values.name;
            const email = values.email;
            try {
              const response = await fetch(`${apiUrl}/users`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name,
                  email: email,
                }),
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              } else {
                var body;
                try {
                  body = await response.json();
                } catch (err) {
                  console.error("Error parsing response from api", err);
                }
                alert(`Account created successfully for ${name}`);
                Navigate(
                  `/Home?name=${encodeURIComponent(name)}&id=${body.id}`
                );
              }
            } catch (err) {
              console.error("Error hitting api", err);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              <label htmlFor="name">User Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" className="error" />

              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              <button
                type="button"
                className="back-home-button"
                onClick={() => Navigate("/")}
                style={{ marginTop: "1rem" }}
              >
                Back to Home
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
