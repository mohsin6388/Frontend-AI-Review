import React, { useState } from "react";
import './MyTickets.css';

// Dummy data — API lagne ke baad ye hata denge
const dummyTickets = [
  {
    id: 1,
    subject: "Payment nahi ho raha",
    category: "Billing",
    priority: "High",
    status: "Open",
    createdAt: "2026-07-25T10:30:00",
    messages: [
      { id: 1, sender_type: "user", message: "Card se payment fail ho raha hai baar baar.", created_at: "2026-07-25T10:30:00" },
      { id: 2, sender_type: "admin", message: "Hum check kar rahe hain, thoda time lagega.", created_at: "2026-07-25T11:00:00" },
    ],
  },
  {
    id: 2,
    subject: "Login issue",
    category: "Technical",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2026-07-24T09:15:00",
    messages: [
      { id: 1, sender_type: "user", message: "OTP nahi aa raha login karte waqt.", created_at: "2026-07-24T09:15:00" },
    ],
  },
];

const statusColors = {
  Open: { bg: "#fee2e2", color: "#dc2626" },
  "In Progress": { bg: "#fef3c7", color: "#d97706" },
  Resolved: { bg: "#dcfce7", color: "#16a34a" },
};

const priorityColors = {
  Low: "#6b7280",
  Medium: "#2563eb",
  High: "#d97706",
  Urgent: "#dc2626",
};

const MyTicket = () => {
  const [tickets] = useState(dummyTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMsg, setNewMsg] = useState("");

  // ── Ticket List View ─────────────────────────────────────
  if (!selectedTicket) {
    return (
      <div className="mt-wrapper animate-fadeIn">
        <div className="mt-header">
          <h2 className="mt-title">My Tickets</h2>
          <p className="mt-subtitle">Apne raised tickets aur unke replies yahan dekho</p>
        </div>

        {tickets.length === 0 ? (
          <div className="mt-empty">
            <span className="mt-empty-icon">🎫</span>
            <p>Koi ticket raise nahi kiya abhi tak</p>
          </div>
        ) : (
          <div className="mt-list">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="mt-ticket-card"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="mt-ticket-top">
                  <span className="mt-ticket-id">#{ticket.id}</span>
                  <span
                    className="mt-status-badge"
                    style={{
                      background: statusColors[ticket.status]?.bg,
                      color: statusColors[ticket.status]?.color,
                    }}
                  >
                    {ticket.status}
                  </span>
                </div>

                <h3 className="mt-ticket-subject">{ticket.subject}</h3>

                <div className="mt-ticket-meta">
                  <span className="mt-ticket-category">{ticket.category}</span>
                  <span
                    className="mt-ticket-priority"
                    style={{ color: priorityColors[ticket.priority] }}
                  >
                    ● {ticket.priority}
                  </span>
                </div>

                <div className="mt-ticket-footer">
                  <span className="mt-ticket-date">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                  <span className="mt-ticket-count">
                    {ticket.messages.length} message{ticket.messages.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Ticket Thread View ───────────────────────────────────
  return (
    <div className="mt-wrapper animate-fadeIn">
      <button className="mt-back" onClick={() => setSelectedTicket(null)}>
        ← Back to tickets
      </button>

      <div className="mt-thread-card">
        <div className="mt-thread-header">
          <div>
            <h2 className="mt-thread-title">{selectedTicket.subject}</h2>
            <div className="mt-thread-meta">
              <span>#{selectedTicket.id}</span>
              <span>•</span>
              <span>{selectedTicket.category}</span>
              <span>•</span>
              <span style={{ color: priorityColors[selectedTicket.priority] }}>
                {selectedTicket.priority} Priority
              </span>
            </div>
          </div>
          <span
            className="mt-status-badge"
            style={{
              background: statusColors[selectedTicket.status]?.bg,
              color: statusColors[selectedTicket.status]?.color,
            }}
          >
            {selectedTicket.status}
          </span>
        </div>

        <div className="mt-thread-messages">
          {selectedTicket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`mt-msg ${msg.sender_type === "admin" ? "mt-msg-admin" : "mt-msg-user"}`}
            >
              <div className="mt-msg-bubble">
                <span className="mt-msg-sender">
                  {msg.sender_type === "admin" ? "Support Team" : "You"}
                </span>
                <p className="mt-msg-text">{msg.message}</p>
                <span className="mt-msg-time">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form
          className="mt-thread-input"
          onSubmit={(e) => {
            e.preventDefault();
            // API baad mein lagega yahan
            setNewMsg("");
          }}
        >
          <input
            type="text"
            placeholder="Apna reply likho..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
          />
          <button type="submit" disabled={!newMsg.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyTicket;