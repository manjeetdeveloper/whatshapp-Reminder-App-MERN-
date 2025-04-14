# 📅 WhatsApp Reminder App

A simple Node.js-based backend application to set reminders and automatically send WhatsApp messages at the scheduled time using **Twilio WhatsApp API**.

---

## 🚀 Features

- Add new reminders with message & scheduled time
- Automatically checks every second for reminders to trigger
- Sends WhatsApp message to the specified number using Twilio API
- View all reminders
- Delete a specific reminder

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Messaging API**: Twilio WhatsApp API
- **Tools**: nodemon, dotenv, cors

---

# 📁 Folder Structure

 ##  frontend
 
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── AddReminder.jsx
│   │   ├── ReminderList.jsx
│   │   └── ReminderCard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
└── tailwind.config.js

```
## Backend
```
Backend/
│|--- index.js
├── .env
├── package.json
└── tailwind.config.js
 
```

## ⚙️ Setup Instructions

### 1. Clone the project

```bash
git clone https://github.com/your-username/reminder-app.git
cd reminder-app/backend

npm install

Configure environment variables
Create a .env file inside backend/ with:

ACCOUNT_SID=your_twilio_account_sid
AUTH_TOKEN=your_twilio_auth_token
```

## ▶️ Run the App
```
nodemon index.js
```
-- The server will start on: http://localhost:9000
```
✅ Database Connected
🚀 Backend is running on port 9000
```

## 🧠 How It Works:- Our App 

- Every 1 second (setInterval), the app checks if any reminder is due.

- If a reminder is found that hasn't been sent (issReminded: false) and its time is up, a WhatsApp message is sent to the target number.

- The reminder is then marked as issReminded: true.

## 📦 API Endpoints
--. Returns all reminder documents from MongoDB.
```
http:-
GET /getAllReminder

```

## Add New Reminder
```
POST /addReminder

```

Request Body
json
Copy
Edit
{
  "reminderMsg": "This is a reminder",
  "remindAt": "2025-04-10T20:30"
}
Time format: ISO String (or any JS parsable date)

3. Delete Reminder
   
```
POST /deleteReminder

```
## Request Body

```
{
  "reminderMsg": "This is a reminder",
  "remindAt": "2025-04-10T20:30"
}

```

# 📲 Sending WhatsApp Message
# Uses Twilio's official Sandbox:

javascript
```
client.messages.create({
  from: 'whatsapp:+14155238886', // Twilio sandbox number
  to: 'whatsapp:+919XXXXXXXXX',  // Replace with target number
  body: reminder.reminderMsg
});

```
📸 Screenshot 
## FINAL PROJEC :- 
![final project](https://github.com/user-attachments/assets/603df5d7-2fdf-4a18-99f9-b3183389f1ed)

## BAckend se message ON SERVER:-
![Backend se message extract](https://github.com/user-attachments/assets/ee81fbfa-b5cd-44e8-bc5e-92aee9241ed1)

## addReminder:- 
![addReminder](https://github.com/user-attachments/assets/881cab92-10d5-44b7-9259-01cefe5db737)


## getAllReminder:-
![getAllReminder](https://github.com/user-attachments/assets/eb5aa3ba-552c-49c1-a49f-39f7633e50e9)


## deleteReminder:-
![deleteReminder](https://github.com/user-attachments/assets/6ed7a3fc-a1c0-4e58-8c26-9a42ec12bd5e)

## set contet on TWILIO
![6](https://github.com/user-attachments/assets/39fd197f-33af-4385-95e0-b8f65d0bd903)

 ##  Check message from whatshapp confiramtions :- 
 ![set whatshapp confirmation](https://github.com/user-attachments/assets/b3e04986-2093-4f0e-a6d2-bf0d09fe95d1)


## body message send 
![body message send](https://github.com/user-attachments/assets/0cb3dbc0-a01b-4acd-991a-375100d28253)


## every 3 sec send messsage on whatshapp :- 
![3 sec final](https://github.com/user-attachments/assets/78b94d43-68e3-4cb5-ab26-3e04476703bb)

## Database ( MongoDB Compass) :-
![Screenshot 2025-04-10 190704](https://github.com/user-attachments/assets/22deaaac-590c-454e-b400-ce3bee7bd999)



## 📌 Notes
- Ensure MongoDB is running locally on default port.

- In Twilio Sandbox mode, the recipient number must first send a message like:
  
```
join your-sandbox-code

```
to WhatsApp +14155238886.(tiwlio number)

## ✍️ Author
Made with ❤️ by [Manjeet Kumar](https://github.com/manjeetdeveloper)
🎓 BCA @ Lovely Professional University
💼 Full-stack Developer at Webyroot Pvt. Ltd


 
# 🔔 WhatsApp Reminder App

A full-stack application to schedule reminders that are automatically sent via **WhatsApp** using the **Twilio API**.

Built with 💚 **Node.js**, **MongoDB**, **Express**, and optionally **React or Angular frontend**.

---


## ✨ Live Demo

🚀 Try it here (replace with your deployed URL):

**Frontend**: [https://reminder-ui.vercel.app](https://reminder-ui.vercel.app)  
**Backend API**: [https://reminder-api.onrender.com](https://reminder-api.onrender.com)

---


## 📸 Screenshots

| 📅 Home Page UI | 📤 WhatsApp Message |
|----------------|---------------------|
| ![UI](https://github.com/user-attachments/assets/0e30bebd-7728-46cf-b621-0f561ff5b3df) | ![WA](https://github.com/user-attachments/assets/1089679e-e600-4129-ae22-317b0295fd6a) |


---

## 🧰 Tech Stack

| Layer     | Technology              |
|-----------|--------------------------|
| Backend   | Node.js, Express, Mongoose |
| Database  | MongoDB                  |
| Messaging | Twilio WhatsApp API     |
| Frontend  | React / Angular (optional) |
| Dev Tools | nodemon, dotenv, cors    |

---

## 📃 License
-- This project is open-source and free to use for learning purposes.
