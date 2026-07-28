import React, { useState, useEffect, useRef, useCallback } from "react";
import "./TicketDesk.css";
import api from "../api";

const STATUS_LABEL = {
  Open: "open",
  "In Progress": "in-progress",
  Resolved: "resolved",
  Closed: "closed",
};

const formatTime = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const TicketDesk = ({ onExit }) => {
  const [view, setView] = useState("list"); // "list" | "new" | "chat"
  const [tickets, setTickets] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [activeTicketId, setActiveTicketId] = useState(null);

  // new ticket form
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    category: "General",
    priority: "Medium",
  });
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketError, setTicketError] = useState("");

  const fetchTickets = useCallback(async () => {
    try {
      setListLoading(true);
      const { data } = await api.get("/business/contact/tickets/my");
      setTickets(data.tickets || []);
    } catch (err) {
      console.log("Fetch tickets error:", err);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (view === "list") fetchTickets();
  }, [view, fetchTickets]);

  const handleTicketChange = (e) => {
    setTicketData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setTicketError("");
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    try {
      setTicketError("");
      setTicketLoading(true);

      const { data } = await api.post("/business/contact/tickets/create", ticketData);

      if (!data.success) throw new Error(data.message || "Ticket create nahi ho paya");

      setTicketData({
        name: "",
        email: "",
        phone: "",
        message: "",
        category: "General",
        priority: "Medium",
      });

      setActiveTicketId(data.ticket.id);
      setView("chat");
    } catch (err) {
      setTicketError(err?.response?.data?.message || err.message);
    } finally {
      setTicketLoading(false);
    }
  };

  if (view === "new") {
    return (
      <div className="td-wrapper animate-fadeIn">
        <div className="td-topbar">
          <button className="td-back" onClick={() => setView("list")}>← Back to tickets</button>
        </div>

        <div className="td-form-card">
          <h2>Raise a ticket</h2>
          <p>Tell us what's going on, we'll get back to you here.</p>

          <form onSubmit={handleTicketSubmit} className="td-form">
            <div className="td-form-row">
              <div className="td-field">
                <label>Name</label>
                <input type="text" name="name" placeholder="John Doe" value={ticketData.name} onChange={handleTicketChange} required />
              </div>
              <div className="td-field">
                <label>Email</label>
                <input type="email" name="email" placeholder="you@example.com" value={ticketData.email} onChange={handleTicketChange} required />
              </div>
            </div>

            <div className="td-form-row">
              <div className="td-field">
                <label>Category</label>
                <select name="category" value={ticketData.category} onChange={handleTicketChange}>
                  <option value="General">General</option>
                  <option value="Billing">Billing</option>
                  <option value="Technical">Technical</option>
                  <option value="Account">Account</option>
                  <option value="Feature Request">Feature Request</option>
                </select>
              </div>
              <div className="td-field">
                <label>Priority</label>
                <select name="priority" value={ticketData.priority} onChange={handleTicketChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="td-field">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="+91 9XX543XXX" value={ticketData.phone} onChange={handleTicketChange} />
            </div>

            <div className="td-field">
              <label>Message</label>
              <textarea name="message" placeholder="Describe your issue in detail..." value={ticketData.message} onChange={handleTicketChange} required />
            </div>

            {ticketError && <div className="td-error">{ticketError}</div>}

            <button type="submit" className="td-submit-btn" disabled={ticketLoading}>
              {ticketLoading ? (
                <>
                  <span className="td-spinner" />
                  Creating…
                </>
              ) : (
                "Raise ticket"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === "chat" && activeTicketId) {
    return (
      <TicketChat
        ticketId={activeTicketId}
        onBack={() => setView("list")}
      />
    );
  }

  // ── Default: list ──────────────────────────────────
  return (
    <div className="td-wrapper animate-fadeIn">
      <div className="td-topbar">
        <button className="td-back" onClick={onExit}>← Back</button>
        <button className="td-new-btn" onClick={() => setView("new")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New ticket
        </button>
      </div>

      <div className="td-list-header">
        <h1>Your tickets</h1>
        <p>Tap a ticket to view the conversation and reply.</p>
      </div>

      {listLoading ? (
        <div className="td-loading">Loading tickets…</div>
      ) : tickets.length === 0 ? (
        <div className="td-empty">
          <h3>No tickets yet</h3>
          <p>When you raise a ticket, it'll show up here as a conversation.</p>
          <button className="td-new-btn" onClick={() => setView("new")}>Raise your first ticket</button>
        </div>
      ) : (
        <div className="td-list">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="td-ticket-card"
              onClick={() => {
                setActiveTicketId(t.id);
                setView("chat");
              }}
            >
              <div className="td-ticket-main">
                <div className="td-ticket-top-row">
                  <span className="td-ticket-subject">{t.category}</span>
                  <span className={`td-badge ${STATUS_LABEL[t.status] || "open"}`}>{t.status}</span>
                </div>
                <p className="td-ticket-preview">{t.last_message || "No messages yet"}</p>
              </div>
              <div className="td-ticket-meta">
                <span className="td-ticket-time">{formatTime(t.updated_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Chat thread sub-component ───────────────────────
const TicketChat = ({ ticketId, onBack }) => {
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  const fetchThread = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const { data } = await api.get(`/business/contact/tickets/${ticketId}`);
      setTicket(data.ticket);
      setMessages(data.messages || []);
    } catch (err) {
      console.log("Fetch ticket error:", err);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchThread();
    pollRef.current = setInterval(() => fetchThread(true), 10000);
    return () => clearInterval(pollRef.current);
  }, [fetchThread]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isClosed = ticket?.status === "Closed" || ticket?.status === "Resolved";

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);

    try {
      const { data } = await api.post(`/business/contact/tickets/${ticketId}/reply`, {
        message: text.trim(),
      });
      setMessages((prev) => [...prev, data.message]);
      setText("");
    } catch (err) {
      console.log("Reply error:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="td-wrapper animate-fadeIn">
      <div className="td-topbar">
        <button className="td-back" onClick={onBack}>← Back to tickets</button>
      </div>

      <div className="td-chat-card">
        <div className="td-chat-header">
          <div className="td-chat-header-left">
            <h2>{ticket ? ticket.category : "Ticket"}</h2>
            <div className="td-chat-header-sub">
              {ticket && <span className={`td-badge ${STATUS_LABEL[ticket.status] || "open"}`}>{ticket.status}</span>}
              {ticket && <span>Priority: {ticket.priority}</span>}
            </div>
          </div>
        </div>

        <div className="td-messages">
          {loading ? (
            <div className="td-loading">Loading conversation…</div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className={`td-msg-row ${m.sender_type === "agent" ? "agent" : "user"}`}>
                <span className="td-msg-sender">{m.sender_type === "agent" ? "Support" : "You"}</span>
                <div className="td-bubble">{m.message}</div>
                <span className="td-msg-time">{formatTime(m.created_at)}</span>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {isClosed ? (
          <div className="td-closed-banner">This ticket is {ticket.status.toLowerCase()}. Raise a new ticket if you need further help.</div>
        ) : (
          <div className="td-chat-input-row">
            <textarea
              rows={1}
              placeholder="Type a message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="td-send-btn" onClick={handleSend} disabled={sending || !text.trim()}>
              {sending ? (
                <span className="td-spinner" />
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDesk;