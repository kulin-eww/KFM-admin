import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { MarkerIcon } from "../../../components/common/icons";
import { socket } from "../../../utils/socket";
import { useTranslation } from "react-i18next";
    
const Map: React.FC<{ driverId: string; bookingDetailData: any }> = ({ driverId, bookingDetailData }) => {
  const { t } = useTranslation();
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [driverPosition, setDriverPosition] = useState({ lat: 0, lng: 0 });
  // const [vendorLocation, setVendorLocation] = useState({ lat: 24.649614, lng: 46.689309 });
  // const [userLocation, setUserLocation] = useState({ lat: 24.646728, lng: 46.697634 });
  // const [dumpYardLocation, setDumpYardLocation] = useState({ lat: 24.655426, lng: 46.688064 });
  const [vendorLocation, setVendorLocation] = useState({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [dumpYardLocation, setDumpYardLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    setVendorLocation({
      lat: Number(bookingDetailData?.bookingAddress?.[0]?.vendor_address_lat),
      lng: Number(bookingDetailData?.bookingAddress?.[0]?.vendor_address_lng),
    });
    setUserLocation({
      lat: Number(bookingDetailData?.bookingAddress?.[0]?.user_address_lat),
      lng: Number(bookingDetailData?.bookingAddress?.[0]?.user_address_lng),
    });
    setDumpYardLocation({
      lat: Number(bookingDetailData?.bookingAddress?.[0]?.dump_yard_address_lat),
      lng: Number(bookingDetailData?.bookingAddress?.[0]?.dump_yard_address_lng),
    });
  }, [bookingDetailData]);

  useEffect(() => {
    console.log("driverId", driverId);
    setDriverPosition({ lat: 0, lng: 0 });
    console.log("driverPosition", driverPosition);
    socket.on("live-tracking", (data) => {
      const { driver_id, ...rest } = data;
      if (Number(driver_id) === Number(driverId)) {
        console.log("driverPosition", rest);
        setDriverPosition(rest);
      }
    });
    return () => {
      socket.off("live-tracking");
    };
  }, [driverId]);

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    const bounds = new google.maps.LatLngBounds();
    [vendorLocation, userLocation, dumpYardLocation].forEach((loc) => bounds.extend(loc));
    map.fitBounds(bounds);
  };

  return (
    <>
      {!isLoaded && <Loader />}
      {isLoaded && vendorLocation && userLocation && dumpYardLocation && (
        <GoogleMap
          onLoad={handleMapLoad}
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={vendorLocation}
          zoom={15}
          options={{
            styles: [
              {
                featureType: "all",
                elementType: "labels",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ visibility: "simplified" }],
              },
            ],
          }}
        >
          <Marker
            position={vendorLocation}
            icon={{
              url: "/location-marker.png",
              scaledSize: new google.maps.Size(25, 40),
            }}
            // onMouseOver={() => setActiveMarker("vendor")}
            // onMouseOut={() => setActiveMarker(null)}
            onClick={() => setActiveMarker("vendor")}
          />

          {activeMarker === "vendor" && (
            <InfoWindow position={vendorLocation} onCloseClick={() => setActiveMarker(null)}>
              <div className="text-left pt-0 pr-2">
                <div className="text-lg font-medium">{t("bookingDetails.vendor")}</div>
                {/* <p>Name: {bookingDetailData?.vendorName}</p>
                <p>Address: {bookingDetailData?.vendorAddress}</p> */}
              </div>
            </InfoWindow>
          )}

          <Marker
            position={userLocation}
            icon={{
              url: "/location-marker.png",
              scaledSize: new google.maps.Size(25, 40),
            }}
            // onMouseOver={() => setActiveMarker("user")}
            // onMouseOut={() => setActiveMarker(null)}
            onClick={() => setActiveMarker("user")}
          />

          {activeMarker === "user" && (
            <InfoWindow position={userLocation}>
              <div className="text-left pt-0 pr-2">
                <div className="text-lg font-medium">{t("bookingDetails.customer")}</div>
                {/* <p>Name: {bookingDetailData?.vendorName}</p>
                <p>Address: {bookingDetailData?.vendorAddress}</p> */}
              </div>
            </InfoWindow>
          )}

          <Marker
            position={dumpYardLocation}
            icon={{
              url: "/location-marker.png",
              scaledSize: new google.maps.Size(25, 40),
            }}
            // onMouseOver={() => setActiveMarker("dumpYard")}
            // onMouseOut={() => setActiveMarker(null)}
            onClick={() => setActiveMarker("dumpYard")}
          />

          {activeMarker === "dumpYard" && (
            <InfoWindow position={dumpYardLocation}>
              <div className="text-left pt-0 pr-2">
                <div className="text-md font-medium">{t("bookingDetails.dumpYard")}</div>
                {/* <p>Name: {bookingDetailData?.vendorName}</p>
                <p>Address: {bookingDetailData?.vendorAddress}</p> */}
              </div>
            </InfoWindow>
          )}

          {driverPosition && !(driverPosition.lat === 0 && driverPosition.lng === 0) && (
            <Marker
              position={driverPosition}
              icon={{
                url: "/driver-marker.png",
                scaledSize: new google.maps.Size(30, 40),
              }}
            />
          )}

          {/* Request directions */}
          {!directionsResponse && (
            <DirectionsService
              options={{
                origin: vendorLocation,
                destination: vendorLocation, // return to vendor
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: [
                  { location: userLocation, stopover: true },
                  { location: dumpYardLocation, stopover: true },
                ],
                optimizeWaypoints: false, // keep order as given
              }}
              callback={(result, status) => {
                if (status === "OK") {
                  setDirectionsResponse(result);
                } else {
                  console.error("Error fetching directions:", status);
                }
              }}
            />
          )}

          {/* Render route */}
          {directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse,
                suppressMarkers: true,
                preserveViewport: true,
                polylineOptions: {
                  strokeColor: "green", // line color
                  strokeOpacity: 0.8, // transparency
                  strokeWeight: 5, // thickness
                },
              }}
            />
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
