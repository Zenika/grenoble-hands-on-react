import React from "react";
import L from "leaflet";
import "./LMap.css";

interface ILMapProps {
  lat: number;
  long: number;
}

class LMap extends React.Component<ILMapProps> {
  private map?: L.Map;

  componentDidMount() {
    this.map = L.map("mapId").setView([this.props.lat, this.props.long], 13);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(this.map);
    L.marker([this.props.lat, this.props.long]).addTo(this.map);
  }

  render() {
    return <div id="mapId" />;
  }
}

export default LMap;
