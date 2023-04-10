import React, { useEffect } from "react";

import L from "leaflet";

const CustomMap = () => {
  useEffect(() => {
    const myMap = L.map("mapid").setView([50.7940939, 41.1352718], 3);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(myMap);

    L.marker([41.3240686, 69.2532404])
      .addTo(myMap)
      .bindPopup("Tashkent")
      .on("click", (e) => {
        e.target.openPopup();
        myMap.flyTo(e.target.getLatLng(), 18, { duration: 1 });
        myMap.on("popupopen", () => {});
      });

    L.marker([59.9668311, 30.3128765])
      .addTo(myMap)
      .bindPopup('Школа сомелье "WineJet"')
      .on("click", (e) => {
        // e.target.openPopup();
        myMap.flyTo(e.target.getLatLng(), 18, { duration: 1 });
        // myMap.on("popupopen", () => {

        // });
      });
  }, []);

  return (
    <div>
      <div id="mapid" style={{ height: "500px" }} />
    </div>
  );
};

export default CustomMap;
