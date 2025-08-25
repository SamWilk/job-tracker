import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "../../hooks/auth/useAuth";
import UrlConfig from "../../../environment/getURLConfig";
import "./settings.css";

export default function Settings({ logout }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthCheck();
  const navigate = useNavigate();
  const apiUrl = UrlConfig["getApiUrl"]();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/users/${user.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete account");
      }

      logout();
      navigate("/");
    } catch (err) {
      setError(err.message);
      setIsDeleting(false);
    }
  };

  return (
    <main className="settings-page">
      <div className="settings-container">
        <h1>Account Settings</h1>

        <section className="settings-section">
          <h2>Profile Information</h2>
          <div className="profile-info">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </section>

        <section className="settings-section danger-zone">
          <h2>Danger Zone</h2>
          <div className="danger-zone-content">
            <p>
              Delete your account and all associated data. This action cannot be
              undone.
            </p>
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>
          </div>
        </section>

        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Delete Account</h2>
              <p>
                Are you sure you want to delete your account? This action cannot
                be undone and will result in:
              </p>
              <ul>
                <li>Permanent deletion of your account</li>
                <li>Loss of all saved job applications</li>
                <li>Immediate logout</li>
              </ul>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-buttons">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
