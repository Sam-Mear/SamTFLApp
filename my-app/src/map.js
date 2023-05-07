import { GoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 51.507602, lng: -0.127816 }}>
      { /* We will render our data here */ }
    </GoogleMap>
  );
}