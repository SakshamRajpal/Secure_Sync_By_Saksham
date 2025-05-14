// // Initialize Heatmap Layer
// let heatmapLayer;
// if (typeof L.heatLayer === 'function') {
//   heatmapLayer = L.heatLayer([], {
//     radius: 25,
//     maxOpacity: 0.8,
//     scaleRadius: true,
//   }).addTo(map);
// } else {
//   console.error('Leaflet Heatmap plugin (leaflet-heat.js) is not loaded. Heatmap functionality will be disabled.');
//   window.heatmapLayer = null; // Fallback to avoid errors
// }

// // Function to Update Heatmap Data
// function updateHeatmap(data) {
//   const heatmapPoints = data.map(({ lat, lng, intensity }) => [lat, lng, intensity]);
//   window.heatmapLayer.setLatLngs(heatmapPoints);
// }

// // Slider Controls for Radius and Opacity
// document.getElementById("radius-slider").addEventListener("input", (event) => {
//   const newRadius = parseInt(event.target.value, 10);
//   window.heatmapLayer.setOptions({ radius: newRadius });
// });

// document.getElementById("opacity-slider").addEventListener("input", (event) => {
//   const newOpacity = parseFloat(event.target.value);
//   window.heatmapLayer.setOptions({ maxOpacity: newOpacity });
// });

// // Interactive Legend
// const legend = L.control({ position: "bottomright" });
// legend.onAdd = function () {
//   const div = L.DomUtil.create("div", "info legend");
//   div.innerHTML = "Heatmap Intensity Scale";
//   return div;
// };
// legend.addTo(map);

// // Adjust Radius Based on Zoom Level
// map.on("zoomend", () => {
//   const zoomLevel = map.getZoom();
//   heatmapLayer.setOptions({ radius: zoomLevel * 2 });
// });

// // WebSocket for Real-Time Data Updates
// const socket = new WebSocket("ws://localhost:8081");
// socket.onmessage = (event) => {
//   const data = JSON.parse(event.data);
//   updateHeatmap(data);
// };

// // Filtering Function for Heatmap
// function filterHeatmap(data, timeRange, category) {
//   const filteredData = data.filter(entry => {
//     return entry.time >= timeRange[0] && entry.time <= timeRange[1] && entry.category === category;
//   });
//   updateHeatmap(filteredData);
// }

// // Example call to the filterHeatmap function
// function applyFilter() {
//   const timeRange = [startTime, endTime];
//   const category = "desiredCategory";
//   filterHeatmap(data, timeRange, category);
// }

// Function to Update Heatmap Data (adjusted to match script.js data format)
function updateHeatmap(data) {
  if (!window.heatmapLayer) return; // Use the global heatmapLayer from script.js
  const heatmapPoints = data.map(({ latitude, longitude, intensity }) => [latitude, longitude, intensity || 0.5]);
  window.heatmapLayer.setLatLngs(heatmapPoints);
}

// Filtering Function for Heatmap
function filterHeatmap(data, timeRange, category) {
  const filteredData = data.filter(entry => {
    return entry.date >= timeRange[0] && entry.date <= timeRange[1] && entry.category === category;
  });
  updateHeatmap(filteredData);
}

// Example call to the filterHeatmap function
function applyFilter() {
  const startTime = "Tue May 13 2025"; // Example start time
  const endTime = "Wed May 14 2025";   // Example end time (matches current date)
  const timeRange = [startTime, endTime];
  const category = "desiredCategory";
  // Example data to filter (you may need to pass this dynamically)
  const data = [
    { latitude: 51.505, longitude: -0.09, date: "Wed May 14 2025", category: "desiredCategory" }
  ];
  filterHeatmap(data, timeRange, category);
}

// Listen for location updates using the global Socket.IO socket
window.socket.on('receive-location', (data) => {
  console.log('map.js received location:', data);
  updateHeatmap([data]);
});