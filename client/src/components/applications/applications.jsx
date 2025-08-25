import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthCheck } from "../../hooks/auth/useAuth";
import UrlConfig from "../../../environment/getURLConfig";
import "./applications.css";
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d)) return dateString;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

export default function ApplicationsPage() {
  const { loading, authenticated, user } = useAuthCheck();
  const [applications, setApplications] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id: null,
    company_name: "",
    position_title: "",
    application_date: "",
    status: "Pending",
    notes: "",
    url: "",
  });
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const apiUrl = UrlConfig["getApiUrl"]();
  const navigate = useNavigate();

  // Formik/Yup schema
  const validationSchema = Yup.object({
    company_name: Yup.string().required("Company name is required"),
    position_title: Yup.string().required("Position title is required"),
    application_date: Yup.date().nullable(),
    status: Yup.string().oneOf(["Pending", "Interview", "Rejected", "Offer"]),
    notes: Yup.string(),
    url: Yup.string().url("Enter a valid URL").nullable(),
  });

  // Handle form submit for add or update
  async function handleFormSubmit(values, { setSubmitting, resetForm }) {
    setFormError(null);
    setFormLoading(true);
    try {
      if (!user?.id || !values.company_name || !values.position_title) {
        setFormError("Company and Position are required.");
        setFormLoading(false);
        setSubmitting(false);
        return;
      }
      const payload = {
        user_id: user.id,
        company_name: values.company_name,
        position_title: values.position_title,
        application_date: values.application_date || undefined,
        status: values.status,
        notes: values.notes,
        url: values.url,
      };
      let res;
      if (formMode === "add") {
        res = await fetch(apiUrl + "/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      } else {
        console.log(form.id, payload);
        res = await fetch(apiUrl + "/applications/" + form.id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) throw new Error("Failed to submit application");
      // Refresh list
      const refreshed = await fetch(
        apiUrl + "/applications?user_id=" + user.id,
        { credentials: "include" }
      );
      setApplications(await refreshed.json());
      // Reset form
      setForm({
        id: null,
        company_name: "",
        position_title: "",
        application_date: "",
        status: "Pending",
        notes: "",
        url: "",
      });
      setFormMode("add");
      resetForm();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
      setSubmitting(false);
    }
  }

  // Handle edit button
  function handleEdit(app) {
    setForm({
      id: app.id,
      company_name: app.company_name,
      position_title: app.position_title,
      application_date: app.application_date
        ? app.application_date.slice(0, 10)
        : "",
      status: app.status,
      notes: app.notes || "",
      url: app.url || "",
    });
    setFormMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const fetchApplications = async () => {
      if (!loading && authenticated && user?.id) {
        setFetching(true);
        try {
          const res = await fetch(apiUrl + "/applications?user_id=" + user.id, {
            credentials: "include",
          });
          if (!res.ok) throw new Error("Failed to fetch applications");
          const data = await res.json();
          setApplications(data);
          setError(null);
        } catch (err) {
          setError(err.message);
        } finally {
          setFetching(false);
        }
      }
    };
    fetchApplications();
  }, [loading, authenticated, user, apiUrl]);

  if (!authenticated) navigate("/login");

  return (
    <main className="applications-page">
      <div className="applications-container">
        <h1 className="applications-title">Your Applications</h1>
        <p className="applications-subtitle">
          Here you can view and manage all your job applications.
        </p>
        {/* Application Form */}
        <Formik
          enableReinitialize
          initialValues={form}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="application-form">
              <h2>
                {formMode === "add" ? "Add Application" : "Edit Application"}
              </h2>
              <div className="form-row">
                <Field
                  type="text"
                  name="company_name"
                  placeholder="Company Name"
                  required
                />
                <ErrorMessage
                  name="company_name"
                  component="div"
                  className="error"
                />
                <Field
                  type="text"
                  name="position_title"
                  placeholder="Position Title"
                  required
                />
                <ErrorMessage
                  name="position_title"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-row">
                <Field type="date" name="application_date" />
                <ErrorMessage
                  name="application_date"
                  component="div"
                  className="error"
                />
                <Field as="select" name="status">
                  <option value="Pending">Pending</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Offer">Offer</option>
                </Field>
                <ErrorMessage name="status" component="div" className="error" />
              </div>
              <div className="form-row">
                <Field
                  as="textarea"
                  name="notes"
                  placeholder="Notes (optional)"
                  rows={2}
                />
                <ErrorMessage name="notes" component="div" className="error" />
              </div>
              <div className="form-row">
                <Field
                  type="url"
                  name="url"
                  placeholder="Application URL (optional)"
                />
                <ErrorMessage name="url" component="div" className="error" />
              </div>
              {formError && <div className="form-error">{formError}</div>}
              <div className="form-buttons-row">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={formLoading || isSubmitting}
                >
                  {formLoading || isSubmitting
                    ? formMode === "add"
                      ? "Adding..."
                      : "Updating..."
                    : formMode === "add"
                    ? "Add Application"
                    : "Update Application"}
                </button>
                {formMode === "edit" && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setForm({
                        id: null,
                        company_name: "",
                        position_title: "",
                        application_date: "",
                        status: "Pending",
                        notes: "",
                      });
                      setFormMode("add");
                      setFormError(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>

        {/* Application List */}
        {fetching ? (
          <p>Loading applications...</p>
        ) : error ? (
          <div className="applications-list-empty">
            <p>Error: {error}</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="applications-list-empty">
            <p>No applications to display yet.</p>
          </div>
        ) : (
          <ul className="applications-list">
            {applications.map((app) => (
              <li key={app.id} className="application-card">
                <h3>
                  {app.position_title} @ {app.company_name}
                </h3>
                <p>Status: {app.status}</p>
                <p>Applied: {formatDate(app.application_date)}</p>
                {app.url && (
                  <p>
                    URL:{" "}
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      {app.url}
                    </a>
                  </p>
                )}
                {app.notes && <p>Notes: {app.notes}</p>}
                <div className="application-card-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(app)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          apiUrl + "/applications/" + app.id,
                          {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify({ user_id: user.id }),
                          }
                        );
                        if (!res.ok)
                          throw new Error("Failed to delete application");
                        setApplications(
                          applications.filter((a) => a.id !== app.id)
                        );
                      } catch (err) {
                        alert("Error deleting application: " + err.message);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
