# 📍 SecureSync – Real-Time Location Tracking App
**SecureSync** is a real-time location tracking application built with privacy in mind. It uses geolocation APIs and WebSockets to track and share user locations in real-time on an interactive map.
![Screenshot 2025-05-14 170547](https://github.com/user-attachments/assets/7a5da380-b87d-423d-9407-689371177534)

---

## 🛠️ Tech Stack:

- **Frontend:** HTML, CSS, JavaScript
- **Mapping:** [Leaflet.js](https://leafletjs.com/) + OpenStreetMap Tiles
- **Backend:** Node.js, Express.js, Socket.io
- **Hosting:** Render (free tier)

---

## 🔐 Features:

- ✅ **User Consent-Based Tracking:** Prompts user for location access with expiration logic.
- 🛰️ **Real-Time GPS Tracking:** Share and receive live locations over WebSocket.
- 🗺️ **Interactive Map:** View your and other users’ positions on a Leaflet map.
- 🔍 **Location Search:** Use OpenStreetMap API to find any place worldwide.
- 🪄 **Responsive Design:** Mobile-friendly and fully responsive layout.
- 🌐 **Street & Satellite View Toggle:** Seamless switch between views.
- 📡 **Marker Updates:** Real-time updates for all active users.
- ⚠️ **Error Handling:** Graceful alerts for denied access, timeouts, and unavailable positions.

---

## 📝 Requirements:

- Stable Internet Connection  
- GPS/Location Services Enabled  
- A modern browser (Chrome, Firefox, etc.)

---

## 🌐 Live Demo:
> 🚀 [Click here to try SecureSync](https://secure-sync-by-saksham.onrender.com/)

---

## 🚦 Hosting Note:

- Hosted on **Render (Free Tier)** for easy backend deployment.
- Due to Render's **free tier sleep policy**, the server may take **2–3 minutes** to respond if idle.

---

## 🧑‍💻 Local Setup Instructions:

- ## Clone the repository 
```bash
git clone https://github.com/yourusername/securesync.git
cd Secure_Sync_By_Saksham
```

- ## Install dependencies 
```bash
npm install
```

-  ## Start the server
```bash
npx nodemon app.js
```
