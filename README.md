# 📍 SecureSync – Real-Time Location Tracking App

**SecureSync** is a real-time location tracking application built with privacy in mind. It uses geolocation APIs and WebSockets to track and share user locations in real-time on an interactive map.

---

## 🌐 Live Demo
> 🚀 [Click here to try SecureSync](https://your-securesync-app-link.com)

⚠️ **Note:** Since the app is hosted on Render’s free tier, the server may take **2–3 minutes** to wake up if inactive for 15 minutes.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Mapping:** [Leaflet.js](https://leafletjs.com/) + OpenStreetMap Tiles
- **Backend:** Node.js, Express.js, Socket.io
- **Hosting:** Render (free tier)

---

## 🔐 Features

- ✅ **User Consent-Based Tracking:** Prompts user for location access with expiration logic.
- 🛰️ **Real-Time GPS Tracking:** Share and receive live locations over WebSocket.
- 🗺️ **Interactive Map:** View your and other users’ positions on a Leaflet map.
- 🔍 **Location Search:** Use OpenStreetMap API to find any place worldwide.
- 🪄 **Responsive Design:** Mobile-friendly and fully responsive layout.
- 🌐 **Street & Satellite View Toggle:** Seamless switch between views.
- 📡 **Marker Updates:** Real-time updates for all active users.
- ⚠️ **Error Handling:** Graceful alerts for denied access, timeouts, and unavailable positions.

---

## 📝 Requirements

- Stable Internet Connection  
- GPS/Location Services Enabled  
- A modern browser (Chrome, Firefox, etc.)

---

## 🚦 Hosting Note

- Hosted on **Render (Free Tier)** for easy backend deployment.
- Due to Render's **free tier sleep policy**, the server may take **2–3 minutes** to respond if idle.

---

## 🧑‍💻 Local Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/securesync.git
cd securesync

# Install dependencies
npm install

# Start the server
node index.js
