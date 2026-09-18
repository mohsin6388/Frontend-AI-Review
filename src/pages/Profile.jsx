// import React, { useEffect, useState } from "react";
// import api from "../api";
// import "./Profile.css";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//   });

//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [deleteError, setDeleteError] = useState("");

//   const getInitial = () => {
//     return (
//       profile.name?.trim()?.charAt(0)?.toUpperCase() ||
//       profile.email?.trim()?.charAt(0)?.toUpperCase() ||
//       "U"
//     );
//   };

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get("/profile");

//       const userData =
//         response?.data?.user || response?.data?.data || response?.data;

//       const updatedProfile = {
//         name: userData?.name || "",
//         email: userData?.email || "",
//       };

//       setProfile(updatedProfile);
//       setName(updatedProfile.name);
//     } catch (err) {
//       console.error("Profile Fetch Error:", err);

//       setError(
//         err?.response?.data?.message ||
//           "Profile load nahi ho payi. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       setError("Name cannot be empty.");
//       setSuccess("");
//       return;
//     }

//     try {
//       setSaving(true);
//       setError("");
//       setSuccess("");

//       const response = await api.put("/profile", {
//         name: name.trim(),
//       });

//       const updatedUser =
//         response?.data?.user || response?.data?.data || response?.data;

//       setProfile((previous) => ({
//         ...previous,
//         name: updatedUser?.name || name.trim(),
//       }));

//       setName(updatedUser?.name || name.trim());
//       setSuccess("Profile updated successfully.");
//     } catch (err) {
//       console.error("Profile Update Error:", err);

//       setError(
//         err?.response?.data?.message ||
//           "Profile update nahi ho payi. Please try again.",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       setIsDeleting(true);
//       setDeleteError("");

//       const response = await api.delete("/profile");

//       if (response.data?.success) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("user");

//         sessionStorage.clear();

//         window.location.href = "/login";
//       } else {
//         setDeleteError(response.data?.message || "Failed to delete account");
//       }
//     } catch (error) {
//       console.error("Delete Account Error:", error);

//       setDeleteError(
//         error.response?.data?.message ||
//           "Unable to delete account. Please try again.",
//       );
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <div className="profile-spinner"></div>
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-page">
//       {/* EXISTING PROFILE SECTION */}
//       <div className="profile-layout">
//         {/* PROFILE OVERVIEW */}
//         <div className="profile-overview-card">
//           <div className="profile-overview-content">
//             <div className="profile-avatar">{getInitial()}</div>

//             <h2>{profile.name || "User"}</h2>

//             <p>{profile.email || "No email available"}</p>

//             <span className="profile-status">
//               <span></span>
//               Active Account
//             </span>

//             <div className="profile-divider"></div>

//             <div className="profile-info-row">
//               <span>Account Type</span>
//               <strong>Business User</strong>
//             </div>

//             <div className="profile-info-row">
//               <span>Email Status</span>
//               <strong className="verified-text">Verified</strong>
//             </div>
//           </div>
//         </div>

//         {/* EDIT PROFILE */}
//         <div className="profile-edit-card">
//           <div className="profile-card-heading">
//             <div>
//               <span className="profile-heading-label">ACCOUNT SETTINGS</span>

//               <h2>Edit Profile</h2>

//               <p>Update your personal information below.</p>
//             </div>
//           </div>

//           {error && (
//             <div className="profile-message profile-error">{error}</div>
//           )}

//           {success && (
//             <div className="profile-message profile-success">{success}</div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="profile-form-group">
//               <label htmlFor="profile-name">Full Name</label>

//               <input
//                 id="profile-name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//                 disabled={saving}
//               />
//             </div>

//             <div className="profile-form-group">
//               <label htmlFor="profile-email">Email Address</label>

//               <input
//                 id="profile-email"
//                 type="email"
//                 value={profile.email}
//                 disabled
//                 readOnly
//               />

//               <small>Email address cannot be changed.</small>
//             </div>

//             <div className="profile-form-actions">
//               <button
//                 type="submit"
//                 className="profile-save-button"
//                 disabled={saving}
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* DELETE ACCOUNT SECTION */}
//       <div className="profile-danger-zone">
//         <div className="danger-zone-content">
//           <div className="danger-zone-icon">!</div>

//           <div className="danger-zone-text">
//             <span className="profile-heading-label">DANGER ZONE</span>

//             <h2>Delete Account</h2>

//             <p>
//               Permanently delete your businesses and disconnect your account.
//               This action cannot be undone.
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           className="delete-account-button"
//           onClick={() => {
//             setDeleteError("");
//             setShowDeleteModal(true);
//           }}
//         >
//           Delete Account
//         </button>
//       </div>

//       {/* DELETE CONFIRMATION MODAL */}
//       {showDeleteModal && (
//         <div
//           className="delete-modal-overlay"
//           onClick={() => {
//             if (!isDeleting) {
//               setShowDeleteModal(false);
//             }
//           }}
//         >
//           <div
//             className="delete-modal"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="delete-modal-title"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="delete-modal-icon">!</div>

//             <h2 id="delete-modal-title">Delete Your Account?</h2>

//             <p>
//               Are you sure you want to delete your account? Your businesses and
//               related review data will be permanently deleted.
//             </p>

//             <p className="delete-modal-warning">
//               This action cannot be undone.
//             </p>

//             {deleteError && (
//               <div className="profile-message profile-error">{deleteError}</div>
//             )}

//             <div className="delete-modal-actions">
//               <button
//                 type="button"
//                 className="cancel-delete-button"
//                 disabled={isDeleting}
//                 onClick={() => setShowDeleteModal(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 className="confirm-delete-button"
//                 disabled={isDeleting}
//                 onClick={handleDeleteAccount}
//               >
//                 {isDeleting ? "Deleting..." : "Yes, Delete Account"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import api from "../api";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // ==========================================
  // GET INITIAL
  // ==========================================

  const getInitial = () => {
    return (
      profile.name?.trim()?.charAt(0)?.toUpperCase() ||
      profile.email?.trim()?.charAt(0)?.toUpperCase() ||
      "U"
    );
  };

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/profile");

      const userData =
        response?.data?.user || response?.data?.data || response?.data;

      const updatedProfile = {
        name: userData?.name || "",
        email: userData?.email || "",
      };

      setProfile(updatedProfile);
      setName(updatedProfile.name);
    } catch (err) {
      console.error("Profile Fetch Error:", err);

      setError(
        err?.response?.data?.message ||
          "Profile load nahi ho payi. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name cannot be empty.");
      setSuccess("");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put("/profile", {
        name: name.trim(),
      });

      const updatedUser =
        response?.data?.user || response?.data?.data || response?.data;

      const updatedName = updatedUser?.name || name.trim();

      setProfile((previous) => ({
        ...previous,
        name: updatedName,
      }));

      setName(updatedName);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error("Profile Update Error:", err);

      setError(
        err?.response?.data?.message ||
          "Profile update nahi ho payi. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // OPEN DELETE MODAL
  // ==========================================

  const openDeleteModal = () => {
    setDeleteError("");
    setShowDeleteModal(true);
  };

  // ==========================================
  // CLOSE DELETE MODAL
  // ==========================================

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
      setDeleteError("");
    }
  };

  // ==========================================
  // DELETE ACCOUNT
  // ==========================================

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setDeleteError("");

      console.log("Delete account API calling...");

      const response = await api.delete("/profile");

      console.log("Delete account response:", response.data);

      if (response.data?.success === true) {
        // Clear all authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        sessionStorage.clear();

        // IMPORTANT: AuthContext state ko bhi clear karo
        logout();

        // Login page par redirect
        window.location.replace("/login");

        return;
      }

      setDeleteError(response.data?.message || "Failed to delete account");
    } catch (error) {
      console.error("Delete Account Error:", error);

      setDeleteError(
        error?.response?.data?.message ||
          "Unable to delete account. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="profile-page">
      {/* ======================================
          EXISTING PROFILE SECTION
      ====================================== */}

      <div className="profile-layout">
        {/* PROFILE OVERVIEW */}

        <div className="profile-overview-card">
          <div className="profile-overview-content">
            <div className="profile-avatar">{getInitial()}</div>

            <h2>{profile.name || "User"}</h2>

            <p>{profile.email || "No email available"}</p>

            <span className="profile-status">
              <span></span>
              Active Account
            </span>

            <div className="profile-divider"></div>

            <div className="profile-info-row">
              <span>Account Type</span>
              <strong>Business User</strong>
            </div>

            <div className="profile-info-row">
              <span>Email Status</span>
              <strong className="verified-text">Verified</strong>
            </div>
          </div>
        </div>

        {/* EDIT PROFILE */}

        <div className="profile-edit-card">
          <div className="profile-card-heading">
            <div>
              <span className="profile-heading-label">ACCOUNT SETTINGS</span>

              <h2>Edit Profile</h2>

              <p>Update your personal information below.</p>
            </div>
          </div>

          {error && (
            <div className="profile-message profile-error">{error}</div>
          )}

          {success && (
            <div className="profile-message profile-success">{success}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="profile-form-group">
              <label htmlFor="profile-name">Full Name</label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={saving}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="profile-email">Email Address</label>

              <input
                id="profile-email"
                type="email"
                value={profile.email}
                disabled
                readOnly
              />

              <small>Email address cannot be changed.</small>
            </div>

            <div className="profile-form-actions">
              <button
                type="submit"
                className="profile-save-button"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ======================================
          DELETE ACCOUNT DANGER ZONE
      ====================================== */}

      <div className="profile-danger-zone">
        <div className="danger-zone-content">
          <div className="danger-zone-icon">!</div>

          <div className="danger-zone-text">
            <span className="profile-heading-label">DANGER ZONE</span>

            <h2>Delete Account</h2>

            <p>
              Permanently delete your businesses and disconnect your account.
              This action cannot be undone.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="delete-account-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log("Delete Account button clicked");

            setDeleteError("");
            setShowDeleteModal(true);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          disabled={isDeleting}
        >
          Delete Account
        </button>
      </div>

      {/* ======================================
          DELETE CONFIRMATION MODAL
      ====================================== */}

      {showDeleteModal && (
        <div className="delete-modal-overlay" onClick={closeDeleteModal}>
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal-icon">!</div>

            <h2 id="delete-modal-title">Delete Your Account?</h2>

            <p>
              Are you sure you want to delete your account? Your businesses and
              related review data will be permanently deleted.
            </p>

            <p className="delete-modal-warning">
              This action cannot be undone.
            </p>

            {deleteError && (
              <div className="profile-message profile-error">{deleteError}</div>
            )}

            <div className="delete-modal-actions">
              <button
                type="button"
                className="cancel-delete-button"
                disabled={isDeleting}
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete-button"
                disabled={isDeleting}
                onClick={handleDeleteAccount}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
