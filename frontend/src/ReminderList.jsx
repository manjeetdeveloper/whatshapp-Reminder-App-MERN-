import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBell, FaEdit, FaTrash, FaClock, FaTags, FaExclamationCircle } from "react-icons/fa";
import "./ReminderList.css";

function ReminderList() {
  const navigate = useNavigate();
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [reminderList, setReminderList] = useState([]);
  const [category, setCategory] = useState("personal");
  const [priority, setPriority] = useState("medium");
  const [recurring, setRecurring] = useState("none");
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || !user) {
      navigate("/");
      return;
    }

    fetchReminders();
  }, [navigate]);

  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/reminder", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReminderList(response.data);
    } catch (err) {
      console.error("Error fetching reminders:", err);
      toast.error("Failed to fetch reminders");
    }
  };

  const addReminder = async () => {
    try {
      if (!reminderMsg || !remindAt) {
        toast.error('Please fill all required fields');
        return;
      }

      const scheduledTime = new Date(remindAt).getTime();
      const now = new Date().getTime();

      if (scheduledTime <= now) {
        toast.error('Please select a future time for the reminder');
        return;
      }

      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:9000/reminder",
        {
          reminderMsg,
          remindAt: new Date(remindAt).toISOString(), // Convert to ISO string for consistent timezone handling
          category,
          priority,
          recurring
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setReminderMsg("");
      setRemindAt("");
      setCategory("personal");
      setPriority("medium");
      setRecurring("none");
      
      toast.success("Reminder added successfully!");
      fetchReminders();
    } catch (err) {
      console.error("Error adding reminder:", err);
      toast.error("Failed to add reminder");
    }
  };

  const updateReminder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:9000/reminder/${id}`,
        {
          reminderMsg,
          remindAt,
          category,
          priority,
          recurring
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setEditMode(null);
      setReminderMsg("");
      setRemindAt("");
      setCategory("personal");
      setPriority("medium");
      setRecurring("none");
      
      toast.success("Reminder updated successfully!");
      fetchReminders();
    } catch (err) {
      console.error("Error updating reminder:", err);
      toast.error("Failed to update reminder");
    }
  };

  const deleteReminder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9000/reminder/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Reminder deleted successfully!");
      fetchReminders();
    } catch (err) {
      console.error("Error deleting reminder:", err);
      toast.error("Failed to delete reminder");
    }
  };

  const handleEdit = (reminder) => {
    setEditMode(reminder._id);
    setReminderMsg(reminder.reminderMsg);
    setRemindAt(reminder.remindAt);
    setCategory(reminder.category);
    setPriority(reminder.priority);
    setRecurring(reminder.recurring);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="reminder-app">
      <nav className="app-nav">
        <div className="nav-brand">
          <FaBell className="brand-icon" />
          <span>My Reminders</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="reminder-container">
        <div className="reminder-form">
          <h2>{editMode ? "Edit Reminder" : "Add Reminder"}</h2>
          <div className="form-group">
            <label>Message:</label>
            <input
              type="text"
              placeholder="Reminder message"
              value={reminderMsg}
              onChange={(e) => setReminderMsg(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Time:</label>
            <input
              type="datetime-local"
              value={remindAt}
              onChange={(e) => setRemindAt(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="health">Health</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Recurring:</label>
            <select value={recurring} onChange={(e) => setRecurring(e.target.value)}>
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {editMode ? (
            <div className="button-group">
              <button className="submit-btn" onClick={() => updateReminder(editMode)}>
                Update
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setEditMode(null);
                  setReminderMsg("");
                  setRemindAt("");
                  setCategory("personal");
                  setPriority("medium");
                  setRecurring("none");
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="submit-btn" onClick={addReminder}>
              Add
            </button>
          )}
        </div>

        <div className="reminder-list">
          <h2>Your Reminders</h2>
          {reminderList.length === 0 ? (
            <p className="no-reminders">No reminders yet. Add one above!</p>
          ) : (
            reminderList.map((reminder) => (
              <div
                key={reminder._id}
                className={`reminder-card ${reminder.issReminded ? "completed" : ""} priority-${reminder.priority}`}
              >
                <div className="reminder-content">
                  <div className="reminder-header">
                    <span className="category">
                      <FaTags /> {reminder.category}
                    </span>
                    <span className={`priority priority-${reminder.priority}`}>
                      <FaExclamationCircle /> {reminder.priority}
                    </span>
                  </div>
                  <p className="message">{reminder.reminderMsg}</p>
                  <div className="reminder-footer">
                    <span className="time">
                      <FaClock /> {new Date(reminder.remindAt).toLocaleString()}
                    </span>
                    {reminder.recurring !== "none" && (
                      <span className="recurring">Recurring: {reminder.recurring}</span>
                    )}
                  </div>
                </div>
                <div className="reminder-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(reminder)}
                    disabled={reminder.issReminded}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteReminder(reminder._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ReminderList;
