import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "./CustomModal";

function App() {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState();
  const [reminderList, setReminderList] = useState([]);

  const [modal, setModal] = useState({ show: false, type: "", id: null });

  useEffect(() => {
    axios
      .get("http://localhost:9000/getAllReminder")
      .then((res) => setReminderList(res.data))
      .catch(() => toast.error("Failed to fetch reminders!"));
  }, []);

  const addReminder = () => {
    if (!reminderMsg || !remindAt) {
      toast.warn("Please fill in both fields!");
      return;
    }

    // Show custom modal before adding
    setModal({ show: true, type: "add" });
  };

  const handleDelete = (id) => {
    // Show custom modal before deleting
    setModal({ show: true, type: "delete", id });
  };

  const handleModalConfirm = () => {
    if (modal.type === "add") {
      axios
        .post("http://localhost:9000/addReminder", { reminderMsg, remindAt })
        .then((res) => {
          setReminderList(res.data);
          toast.success("Reminder added successfully!");
          setReminderMsg("");
          setRemindAt();
        })
        .catch(() => toast.error("Failed to add reminder!"));
    } else if (modal.type === "delete") {
      axios
        .post("http://localhost:9000/deleteReminder", { id: modal.id })
        .then((res) => {
          setReminderList(res.data);
          toast.success("Reminder deleted!");
        })
        .catch(() => toast.error("Failed to delete reminder!"));
    }

    setModal({ show: false, type: "", id: null });
  };

  const handleModalCancel = () => {
    setModal({ show: false, type: "", id: null });
  };

  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_header">
          <h1>Remind Me 🙋‍♂️</h1>

          <input
            type="text"
            placeholder="Reminder notes here..."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
          />

          <DateTimePicker
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />

          <div className="button" onClick={addReminder}>
            Add Reminder
          </div>
        </div>

        <div className="homepage_body">
          {reminderList.map((reminder) => (
            <div className="reminder_card" key={reminder._id}>
              <h2>{reminder.reminderMsg}</h2>
              <h3>Remind Me at:</h3>
              <p>
                {String(
                  new Date(
                    reminder.remindAt
                  ).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                )}
              </p>
              <div
                className="button"
                onClick={() => handleDelete(reminder._id)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Modal */}
      {modal.show && (
        <CustomModal
          message={
            modal.type === "add"
              ? "Don't be so hard on yourself, you are doing great 💜"
              : "Are you sure you want to delete this reminder?"
          }
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
