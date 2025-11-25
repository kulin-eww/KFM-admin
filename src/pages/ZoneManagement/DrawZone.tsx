import { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, DrawingManager, Polygon } from "@react-google-maps/api";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";
import useToast from "../../hooks/useToast";
import { useTranslation } from "react-i18next";

const libraries: ("drawing" | "geometry" | "places" | "visualization")[] = ["drawing"];

const DrawZone: React.FC<{
  zones: google.maps.LatLngLiteral[][];
  setZones: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral[][]>>;
  action: "add" | "edit" | "view";
}> = ({ zones, setZones, action }) => {
  const { t } = useTranslation();
  const polygonRefs = useRef<(google.maps.Polygon | null)[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const savedCenterRef = useRef<google.maps.LatLngLiteral>({ lat: 23.8859, lng: 45.0792 });
  const savedZoomRef = useRef<number>(6);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const handlePolygonComplete = useCallback(
    (polygon: google.maps.Polygon) => {
      if (zones.length > 0) {
        useToast(t("zoneManagement.youCanDrawOnlyOneZone"), "error");
        polygon.setMap(null);
        return;
      }
      
      // Save current center and zoom before polygon completion to prevent auto-adjustment
      if (mapRef.current) {
        const center = mapRef.current.getCenter();
        if (center) {
          savedCenterRef.current = center.toJSON();
        }
        savedZoomRef.current = mapRef.current.getZoom() || savedZoomRef.current;
      }
      
      const path = polygon
        .getPath()
        .getArray()
        .map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));
      console.log(path);
      setZones((prev) => [...prev, path]);
      polygon.setMap(null);
      
      // Restore the map center and zoom to prevent auto-adjustment
      // Use setTimeout to ensure restoration happens after any automatic map adjustments
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.setCenter(savedCenterRef.current);
          mapRef.current.setZoom(savedZoomRef.current);
        }
      }, 100);
    },
    [zones]
  );

  const handlePolygonDragEnd = useCallback(
    (index: number) => {
      const polygon = polygonRefs.current[index];
      if (!polygon) return;
      
      const path = polygon
        .getPath()
        .getArray()
        .map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));
      setZones((prev) => 
        prev.map((zone, i) => i === index ? path : zone)
      );
    },
    [setZones]
  );

  return (
    <div className="border border-gray-300 rounded-xl p-5">
      {!isLoaded && <Loader />}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "500px",
            borderRadius: "10px",
          }}
          center={savedCenterRef.current}
          zoom={savedZoomRef.current}
          onLoad={(map) => {
            mapRef.current = map;
            // Save initial center and zoom
            savedCenterRef.current = map.getCenter()?.toJSON() || savedCenterRef.current;
            savedZoomRef.current = map.getZoom() || savedZoomRef.current;
          }}
          onCenterChanged={() => {
            // Track center changes when user pans the map
            if (mapRef.current) {
              const center = mapRef.current.getCenter();
              if (center) {
                savedCenterRef.current = center.toJSON();
              }
            }
          }}
          onZoomChanged={() => {
            // Track zoom changes when user zooms the map
            if (mapRef.current) {
              savedZoomRef.current = mapRef.current.getZoom() || savedZoomRef.current;
            }
          }}
        >
          {zones.map((path, index) => (
            <Polygon
              key={index}
              paths={path}
              options={{
                fillColor: "#00FF00",
                fillOpacity: 0.2,
                strokeColor: "#007a47",
                strokeWeight: 2,
                editable: true,
                draggable: true,
              }}
              onClick={() => {
                setZones((prev) => prev.filter((_, i) => i !== index));
              }}
              onDragEnd={() => handlePolygonDragEnd(index)}
              onLoad={(polygon) => {
                polygonRefs.current[index] = polygon;
              }}
            />
          ))}

          <DrawingManager
            onPolygonComplete={handlePolygonComplete}
            options={{
              drawingControl: action !== "view",
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: zones.length === 0 ? [google.maps.drawing.OverlayType.POLYGON] : [],
              },
              polygonOptions: {
                fillColor: "#FF0000",
                fillOpacity: 0.2,
                strokeColor: "#007a47",
                strokeWeight: 2,
                clickable: true,
                editable: true,
                draggable: true,
              },
            }}
          />
        </GoogleMap>
      )}
      {loadError && <ErrorLottie />}
    </div>
  );
};

export default DrawZone;
