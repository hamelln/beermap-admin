"use client";

import React from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

interface Props {
  latitude: number;
  longitude: number;
  isMapOpen: boolean;
}

const GoogleMaps = ({ isMapOpen, latitude, longitude }: Props) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return <></>;
  if (!isMapOpen) return <></>;
  const center = { lat: latitude, lng: longitude };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{ disableDefaultUI: true, styles: myStyles }}
      >
        <MarkerF
          position={center}
          icon={
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          }
        ></MarkerF>
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(GoogleMaps);
