import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -23.55052,
  lng: -46.633308,
};

export function MapView() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          disableDefaultUI: false,
          mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
