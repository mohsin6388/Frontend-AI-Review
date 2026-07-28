import React, { useState } from "react";
import { Building2, QrCode, Store, Plus, Loader2 } from "lucide-react";
import "./BusinessState.css";
import BusinessDetails from "./BusinessDetails";
import QrPage from "./QrPage";

const BusinessState = ({ user, businesses, bizLoading, setActiveTab }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showQR, setShowQR] = useState(false);

  // QR PAGE FIRST
  if (selectedBusiness && showQR) {
    return (
      <QrPage
        selectedBusiness={selectedBusiness}
        setSelectedBusiness={setSelectedBusiness}
      />
    );
  }

  // FULL BUSINESS DETAIL VIEW
  if (selectedBusiness && !showQR) {
    return (
      <BusinessDetails
        business={selectedBusiness}
        setSelectedBusiness={setSelectedBusiness}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (
    <div className="business-page">
      {/* TOP STATS */}
      <div className="business-stats-grid">
        <div className="business-stat-card">
          <div className="stat-icon-wrap stat-icon-blue">
            <Building2 size={20} strokeWidth={2} />
          </div>
          <div>
            <p>Total Businesses</p>
            <h2>{businesses.length}</h2>
          </div>
        </div>

        <div className="business-stat-card">
          <div className="stat-icon-wrap stat-icon-violet">
            <QrCode size={20} strokeWidth={2} />
          </div>
          <div>
            <p>QR Generated</p>
            <h2>{businesses.length}</h2>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="business-header">
        <div>
          <h2>Businesses</h2>
          <p>Manage all your registered businesses</p>
        </div>

        {businesses.length > 0 && (
          <button
            className="add-business-btn-header"
            onClick={() => setActiveTab("create")}
          >
            <Plus size={16} strokeWidth={2.5} />
            Add Business
          </button>
        )}
      </div>

      {/* BUSINESS LIST */}
      <div className="business-list-wrapper">
        {bizLoading ? (
          <div className="business-empty-card">
            <Loader2 size={28} className="spin-icon" />
            <p>Loading businesses...</p>
          </div>
        ) : businesses.length === 0 ? (
          <div className="business-empty-card">
            <div className="empty-icon-wrap">
              <Store size={28} strokeWidth={1.75} />
            </div>

            <h3>No Businesses Yet</h3>
            <p>Add your first business and generate review QR codes.</p>

            <button
              className="add-business-btn"
              onClick={() => setActiveTab("create")}
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Business
            </button>
          </div>
        ) : (
          <div className="business-grid">
  {businesses.map((biz) => (
    <div key={biz.id} className="business-card">
      <div className="business-card-top">
        <div className="business-avatar">
          {biz.logo_url ? (
            <img
              src={biz.logo_url}
              alt={biz.name}
              className="business-avatar-img"
            />
          ) : (
            biz.name?.[0]?.toUpperCase()
          )}
        </div>

        <div>
          <h3>{biz.name}</h3>
          <p>{biz.type}</p>
        </div>
      </div>

      <div className="business-meta">
        <div className="meta-row">
          <span>Generated Reviews</span>
          <strong>{biz.total_reviews_generated}</strong>
        </div>

        <div className="meta-row">
          <span>Status</span>
          <strong className="active-status">
            <span className="status-dot" />
            Active
          </strong>
        </div>
      </div>

      <div className="business-actions">
        <button
          className="view-btn"
          onClick={() => {
            setSelectedBusiness(biz);
            setShowQR(false);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  ))}
</div>
         
        )}
      </div>
    </div>
  );
};

export default BusinessState;












// import React, { useState } from "react";
// import "./BusinessState.css";
// import BusinessDetails from "./BusinessDetails";
// import QrPage from "./QrPage";

// const BusinessState = ({ user, businesses, bizLoading, setActiveTab }) => {
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [showQR, setShowQR] = useState(false);


//   // QR PAGE FIRST

//   if (selectedBusiness && showQR) {
//     return (
//       <QrPage
//         selectedBusiness={selectedBusiness}
//         setSelectedBusiness={setSelectedBusiness}
//         // setShowQR={setShowQR}
//       />
//     );
//   }

//   // =========================
//   // FULL BUSINESS DETAIL VIEW
//   // =========================
//   if (selectedBusiness && !showQR) {
//     return (
//       <BusinessDetails
//         business={selectedBusiness}
//         setSelectedBusiness={setSelectedBusiness}
//         setActiveTab={setActiveTab}
//       />
//     );
//   }

//   return (

//     <div className="business-page">
//       {/* TOP STATS */}
//       <div className="business-stats-grid">
//         <div className="business-stat-card">
//           <div>
//             <p>Total Businesses</p>
//             <h2>{businesses.length}</h2>
//           </div>

//           <span>🏢</span>
//         </div>

//         <div className="business-stat-card">
//           <div>
//             <p>QR Generated</p>
//             <h2>{businesses.length}</h2>
//           </div>

//           <span>📲</span>
//         </div>
//       </div>

//       {/* HEADER */}
//       <div className="business-header">
//         <div>
//           <h2>Businesses</h2>

//           <p>Manage all your registered businesses</p>
//         </div>
//       </div>

//       {/* BUSINESS LIST */}
//       <div className="business-list-wrapper">
//         {bizLoading ? (
//           <div className="business-empty-card">Loading businesses...</div>
//         ) : businesses.length === 0 ? (
//           <div className="business-empty-card">
//             <div className="empty-icon">🏪</div>

//             <h3>No Businesses Yet</h3>

//             <p>Add your first business and generate review QR codes.</p>

//             <button
//               className="add-business-btn"
//               onClick={() => setActiveTab("create")}
//             >
//               Add Business
//             </button>
//           </div>
//         ) : (
//           <div className="business-grid">
//             {businesses.map((biz) => (
//               <div key={biz.id} className="business-card">
//                 <div className="business-card-top">
//                   <div className="business-avatar">
//                     {biz.name?.[0]?.toUpperCase()}
//                   </div>

//                   <div>
//                     <h3>{biz.name}</h3>

//                     <p>{biz.type}</p>
//                   </div>
//                 </div>

//                 <div className="business-meta">
//                   <div className="meta-row">
//                     <span>Generated Reviews</span>

//                     <strong style={{ color: "black" }}>{biz.total_reviews_generated}</strong>
//                   </div>

//                   <div className="meta-row">
//                     <span>Status</span>

//                     <strong className="active-status">Active</strong>
//                   </div>
//                 </div>

//                 <div className="business-actions">
//                   <button
//                     className="view-btn"
//                     onClick={() => {
//                       setSelectedBusiness(biz);
//                       setShowQR(false);
//                     }}
//                   >
//                     View
//                   </button>

//                   {/* <button
//                     className="qr-btn"
//                     onClick={() => {
//                       console.log("qr clicked...");
//                       // setSelectedBusiness(biz);
//                       // setShowQR(true);
//                     }}
//                   >
//                     QR
//                   </button> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };;

// export default BusinessState;
