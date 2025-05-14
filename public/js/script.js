// const CONSENT_EXPIRY_DAYS = 1;

// // Check consent with expiry
// function checkConsent() {
//     const consentData = JSON.parse(localStorage.getItem('consentData') || '{}');
//     const now = new Date().getTime();
//     const expiryTime = consentData.timestamp ? consentData.timestamp + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000) : 0;

//     if (!consentData.consentGiven || now > expiryTime) {
//         const consent = confirm('This app tracks your location. Do you agree? See our Privacy Policy for more details.');
//         if (consent) {
//             localStorage.setItem('consentData', JSON.stringify({
//                 consentGiven: true,
//                 timestamp: now
//             }));
//             return true;
//         } else {
//             localStorage.setItem('consentData', JSON.stringify({
//                 consentGiven: false,
//                 timestamp: now
//             }));
//             window.location.href = '/html/privacy.html';
//             return false;
//         }
//     }
//     return consentData.consentGiven;
// }

// // Initialize Socket.IO and make it globally accessible
// window.socket = io(); // Attach to window to make it accessible in map.js
// let watchId = null;

// // Debounce function to limit geolocation updates
// function debounce(func, wait) {
//     let timeout;
//     return function executedFunction(...args) {
//         const later = () => {
//             clearTimeout(timeout);
//             func(...args);
//         };
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//     };
// }

// // Watch user's position with error handling
// function startLocationTracking() {
//     if (!navigator.geolocation) {
//         console.error('Geolocation is not supported by this browser.');
//         alert('Geolocation is not supported by your browser.');
//         return;
//     }

//     const sendLocation = debounce((position) => {
//         const { latitude, longitude } = position.coords;
//         const now = new Date();
//         const currentDate = now.toDateString();
//         const currentTime = now.toTimeString();

//         socket.emit('send-location', {
//             latitude,
//             longitude,
//             date: currentDate,
//             time: currentTime
//         });
//         console.log('Sending location:', latitude, longitude, 'Date:', currentDate, 'Time:', currentTime);
//     }, 4000);

//     watchId = navigator.geolocation.watchPosition(
//     sendLocation,
//     (error) => {
//         let errorMessage = 'An error occurred while retrieving location.';
//         switch (error.code) {
//             case error.PERMISSION_DENIED:
//                 errorMessage = 'Location access was denied by the user.';
//                 break;
//             case error.POSITION_UNAVAILABLE:
//                 errorMessage = 'Location information is unavailable.';
//                 break;
//             case error.TIMEOUT:
//                 errorMessage = 'Location request timed out. Please check your internet/GPS connection.';
//                 break;
//             default:
//                 errorMessage = 'An unknown geolocation error occurred.';
//         }
//         console.error('Geolocation error:', errorMessage);
//         alert(errorMessage);
//     },
//     {
//         enableHighAccuracy: false,  // You can toggle this based on preference
//         maximumAge: 5000,
//         timeout: 10000  // More time to get location
//     }
// );
// }

// // Initialize Leaflet Map with default view
// const map = L.map('map').setView([0, 0], 2);
// let currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'OpenStreetMap'
// }).addTo(map);

// // Markers storage
// const markers = {};

// // Receive and display location updates
// socket.on('receive-location', (data) => {
//     const { id, longitude, latitude } = data;
//     console.log('Received location:', id, latitude, longitude);

//     map.setView([latitude, longitude], 15);

//     if (markers[id]) {
//         markers[id].setLatLng([latitude, longitude]);
//     } else {
//         markers[id] = L.marker([latitude, longitude])
//             .bindPopup(`<b>New Delhi</b><br>Location: [${latitude}, ${longitude}]`)
//             .addTo(map);
//     }
// });

// // Remove disconnected user marker
// socket.on('user-disconnect', (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });

// // Search for a location with input sanitization
// function searchLocation() {
//     const locationInputElement = document.getElementById('location-input');
//     if (!locationInputElement) {
//         console.error('Location input element not found.');
//         return;
//     }
//     const locationInput = locationInputElement.value.trim();
//     if (locationInput) {
//         const encodedInput = encodeURIComponent(locationInput);
//         fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedInput}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data && data.length > 0) {
//                     const lat = parseFloat(data[0].lat);
//                     const lon = parseFloat(data[0].lon);
//                     map.setView([lat, lon], 15);
//                     L.marker([lat, lon]).addTo(map)
//                         .bindPopup(`<b>${locationInput}</b><br>Location: [${lat}, ${lon}]`).openPopup();
//                 } else {
//                     alert('Location not found!');
//                 }
//             })
//             .catch(error => {
//                 console.error('Search error:', error);
//                 alert('Error searching for location.');
//             });
//     }
// }

// // Toggle between Street and Satellite View
// function setStreetView() {
//     if (currentLayer) {
//         map.removeLayer(currentLayer);
//     }
//     currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: 'OpenStreetMap'
//     }).addTo(map);
// }

// function setSatelliteView() {
//     if (currentLayer) {
//         map.removeLayer(currentLayer);
//     }
//     currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution: 'Satellite'
//     }).addTo(map);
// }

// // Real-Time Tracking Toggle
// const realTimeToggle = document.getElementById('real-time-toggle');
// if (realTimeToggle) {
//     realTimeToggle.addEventListener('change', function () {
//         if (this.checked && checkConsent()) {
//             startLocationTracking();
//             console.log('Real-time tracking enabled');
//         } else {
//             if (watchId !== null) {
//                 navigator.geolocation.clearWatch(watchId);
//                 watchId = null;
//             }
//             console.log('Real-time tracking disabled');
//         }
//     });
// }

// // Redirect to contact page
// const contactLink = document.getElementById('contact-link');
// if (contactLink) {
//     contactLink.addEventListener('click', (event) => {
//         event.preventDefault();
//         window.location.href = '/html/contact.html';
//     });
// }

// // Redirect to register page
// const registerLink = document.getElementById('register-link');
// if (registerLink) {
//     registerLink.addEventListener('click', (event) => {
//         event.preventDefault();
//         window.location.href = '/html/register.html';
//     });
// }

// // Initialize tracking only if consent is given
// if (checkConsent()) {
//     startLocationTracking();
// }


// const socket = io();

// // Watch user's position
// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         const now = new Date();
//         const currentDate = now.toDateString();
//         const currentTime = now.toTimeString();

//         socket.emit("send-location", {
//             latitude,
//             longitude,
//             date: currentDate,
//             time: currentTime
//         });
//         console.log("Sending location:", latitude, longitude, "Date:", currentDate, "Time:", currentTime);
//     }, (error) => {
//         console.error(error);
//     }, {
//         enableHighAccuracy: false,
//         maximumAge: 0,
//         timeout: 2000
//     });
// }

// // Initialize Leaflet Map
// const map = L.map("map").setView([0, 0], 10);

// // Load OpenStreetMap tile layer
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "OpenStreetMap"
// }).addTo(map);

// // Markers storage
// const markers = {};

// // Receive and display location updates from the server
// socket.on("receive-location", (data) => {
//     const { id, longitude, latitude } = data;
//     console.log("Received location:", id, latitude, longitude);

//     // Set the map view to the updated location
//     map.setView([latitude, longitude], 15);

//     // Update existing marker or create a new one
//     if (markers[id]) {
//         markers[id].setLatLng([latitude, longitude]);
//     } else {
//         markers[id] = L.marker([latitude, longitude])
//             .bindPopup(`<b>KNIT Sultanpur </b><br>Location: [${latitude}, ${longitude}]`)
//             .addTo(map);
//     }
// });

// // Remove disconnected user marker
// socket.on("user-disconnect", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });


// // Function to search for a location
// function searchLocation() {
//     const locationInput = document.getElementById('location-input').value;
//     if (locationInput) {
//         fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data && data.length > 0) {
//                     const lat = data[0].lat;
//                     const lon = data[0].lon;
//                     map.setView([lat, lon], 15);
//                     L.marker([lat, lon]).addTo(map)
//                         .bindPopup(`<b>${locationInput}</b><br>Location: [${lat}, ${lon}]`).openPopup();
//                 } else {
//                     alert('Location not found!');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }
// }

// // Functions to toggle between Street View and Satellite View
// function setStreetView() {
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: 'OpenStreetMap'
//     }).addTo(map);
// }

// function setSatelliteView() {
//     L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution: 'Satellite'
//     }).addTo(map);
// }

// // Real-Time Tracking Toggle
// const realTimeToggle = document.getElementById('real-time-toggle');
// realTimeToggle.addEventListener('change', function () {
//     if (this.checked) {
//         // Enable real-time tracking logic (re-integrate your existing real-time tracking code here)
//         console.log('Real-time tracking enabled');
//     } else {
//         // Disable real-time tracking
//         console.log('Real-time tracking disabled');
//     }
// });


// //redirecting to the contact us page from the index page
// document.getElementById('contact-link')?.addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default link behavior
//     window.location.href = '/html/contact.html'; // Redirect to the contact page
// });

// document.getElementById('register-link')?.addEventListener('click', function (event) {
//     event.preventDefault();
//     window.location.href = '/html/register.html';
// });

// At the top of script.js
const originalWarn = console.warn;
console.warn = function (...args) {
  if (args[0] && args[0].includes('Canvas2D: Multiple readback operations')) {
    return; // Suppress the warning
  }
  originalWarn.apply(console, args);
};

const CONSENT_EXPIRY_DAYS = 1;

// Cache for reverse geocoding results to avoid repeated API calls
const locationCache = new Map();

// Reverse Geocoding Function to get place name from coordinates
async function reverseGeocode(latitude, longitude) {
  const cacheKey = `${latitude},${longitude}`;
  
  // Check cache first
  if (locationCache.has(cacheKey)) {
    console.log('Using cached location for:', cacheKey);
    return locationCache.get(cacheKey);
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
    const data = await response.json();
    
    if (data && data.display_name) {
      const placeName = data.display_name.split(',')[0]; // Get the most specific part (e.g., city or landmark)
      locationCache.set(cacheKey, placeName);
      console.log(`Reverse geocoded [${latitude}, ${longitude}] to: ${placeName}`);
      return placeName;
    } else {
      console.log(`No place name found for [${latitude}, ${longitude}]`);
      return 'Unknown Location';
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return 'Unknown Location';
  }
}

// Check consent with expiry
function checkConsent() {
  const consentData = JSON.parse(localStorage.getItem('consentData') || '{}');
  const now = new Date().getTime();
  const expiryTime = consentData.timestamp ? consentData.timestamp + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000) : 0;

  if (!consentData.consentGiven || now > expiryTime) {
    const consent = confirm('This app tracks your location. Do you agree? See our Privacy Policy for more details.');
    if (consent) {
      localStorage.setItem('consentData', JSON.stringify({
        consentGiven: true,
        timestamp: now
      }));
      return true;
    } else {
      localStorage.setItem('consentData', JSON.stringify({
        consentGiven: false,
        timestamp: now
      }));
      window.location.href = 'html/privacy.html';
      return false;
    }
  }
  return consentData.consentGiven;
}

// Initialize Socket.IO and make it globally accessible
window.socket = io(); // Attach to window to make it accessible in map.js

// Initialize Leaflet Map
const map = L.map('map').setView([0, 0], 2);
let currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'OpenStreetMap'
}).addTo(map);

// Initialize Heatmap Layer
let heatmapLayer;
if (typeof L.heatLayer === 'function') {
  heatmapLayer = L.heatLayer([], {
    radius: 25,
    maxOpacity: 0.8,
    scaleRadius: true,
  }).addTo(map);
  window.heatmapLayer = heatmapLayer; // Make it globally accessible for map.js
} else {
  console.error('Leaflet Heatmap plugin (leaflet-heat.js) is not loaded. Heatmap functionality will be disabled.');
  heatmapLayer = null; // Fallback to avoid errors
  window.heatmapLayer = null;
}

// Function to Update Heatmap Data
function updateHeatmap(data) {
  if (!heatmapLayer) return; // Skip if heatmapLayer is not initialized
  // Standardize data format for compatibility with map.js
  const heatmapPoints = data.map(({ latitude, longitude, intensity }) => [latitude, longitude, intensity || 0.5]);
  heatmapLayer.setLatLngs(heatmapPoints);
}

// Slider Controls for Radius and Opacity
document.getElementById("radius-slider").addEventListener("input", (event) => {
  if (!heatmapLayer) return;
  const newRadius = parseInt(event.target.value, 10);
  heatmapLayer.setOptions({ radius: newRadius });
});

document.getElementById("opacity-slider").addEventListener("input", (event) => {
  if (!heatmapLayer) return;
  const newOpacity = parseFloat(event.target.value);
  heatmapLayer.setOptions({ maxOpacity: newOpacity });
});

// Interactive Legend
const legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
  const div = L.DomUtil.create("div", "info legend");
  div.innerHTML = "Heatmap Intensity Scale";
  return div;
};
legend.addTo(map);

// Adjust Radius Based on Zoom Level
map.on("zoomend", () => {
  if (!heatmapLayer) return;
  const zoomLevel = map.getZoom();
  heatmapLayer.setOptions({ radius: zoomLevel * 2 });
});

// Markers storage
const markers = {};
let watchId = null;

// Debounce function to limit geolocation updates
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Watch user's position with error handling
function startLocationTracking() {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by this browser.');
    alert('Geolocation is not supported by your browser.');
    return;
  }

  const sendLocation = debounce((position) => {
    const { latitude, longitude } = position.coords;
    const now = new Date();
    const currentDate = now.toDateString();
    const currentTime = now.toTimeString();

    const locationData = {
      latitude,
      longitude,
      date: currentDate,
      time: currentTime
    };

    window.socket.emit('send-location', locationData);
    console.log('Sending location:', latitude, longitude, 'Date:', currentDate, 'Time:', currentTime);

    // Update heatmap with the new location (assuming intensity for heatmap)
    updateHeatmap([locationData]);
  }, 4000);

  watchId = navigator.geolocation.watchPosition(
    sendLocation,
    (error) => {
      let errorMessage = 'An error occurred while retrieving location.';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access was denied by the user.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out. Please check your internet/GPS connection.';
          break;
        default:
          errorMessage = 'An unknown geolocation error occurred.';
      }
      console.error('Geolocation error:', errorMessage);
      alert(errorMessage);
    },
    {
      enableHighAccuracy: false,
      maximumAge: 5000,
      timeout: 10000
    }
  );
}

// Receive and display location updates
window.socket.on('receive-location', (data) => {
  const { id, longitude, latitude } = data;
  console.log('Received location:', id, latitude, longitude);

  map.setView([latitude, longitude], 15);

  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude])
      .bindPopup(`<b>New Delhi</b><br>Location: [${latitude}, ${longitude}]`)
      .addTo(map);
  }

  // Update heatmap with received data
  updateHeatmap([data]);
});

// Remove disconnected user marker
window.socket.on('user-disconnect', (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});

// Search for a location with input sanitization
function searchLocation() {
  const locationInputElement = document.getElementById('location-input');
  if (!locationInputElement) {
    console.error('Location input element not found.');
    return;
  }
  const locationInput = locationInputElement.value.trim();
  if (locationInput) {
    const encodedInput = encodeURIComponent(locationInput);
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedInput}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          map.setView([lat, lon], 15);
          L.marker([lat, lon]).addTo(map)
            .bindPopup(`<b>${locationInput}</b><br>Location: [${lat}, ${lon}]`).openPopup();
        } else {
          alert('Location not found!');
        }
      })
      .catch(error => {
        console.error('Search error:', error);
        alert('Error searching for location.');
      });
  }
}

// Toggle between Street and Satellite View
function setStreetView() {
  if (currentLayer) {
    map.removeLayer(currentLayer);
  }
  currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
  }).addTo(map);
}

function setSatelliteView() {
  if (currentLayer) {
    map.removeLayer(currentLayer);
  }
  currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: 'Satellite'
  }).addTo(map);
}

// Real-Time Tracking Toggle
const realTimeToggle = document.getElementById('real-time-toggle');
if (realTimeToggle) {
  realTimeToggle.addEventListener('change', function () {
    if (this.checked && checkConsent()) {
      startLocationTracking();
      console.log('Real-time tracking enabled');
    } else {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
      console.log('Real-time tracking disabled');
    }
  });
}

// Redirect to contact page
const contactLink = document.getElementById('contact-link');
if (contactLink) {
  contactLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'html/contact.html';
  });
}

// Redirect to register page
const registerLink = document.getElementById('register-link');
if (registerLink) {
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'html/contact.html';
  });
}

// Initialize tracking only if consent is given
if (checkConsent()) {
  startLocationTracking();
}