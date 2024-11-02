import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { RecyclingCenter } from "@/types/recycledCenters";
import { MapPin, Star } from "lucide-react";

interface MapProps {
  centers: RecyclingCenter[];
}

interface Location {
  lat: number;
  lng: number;
}

const BUCHAREST_CENTER = {
  lat: 44.4268,
  lng: 26.1025,
};

const mapContainerStyle = {
  width: "100%",
  height: "70vh",
};

const Map = ({ centers }: MapProps) => {
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [locations, setLocations] = useState<(Location | null)[]>([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCM-VOGaEXV2zhi22m4aFqgtP3BbubQySs",
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();

      const geocodeAddresses = async () => {
        const promises = centers.map((center) => {
          return new Promise<Location | null>((resolve) => {
            geocoder.geocode({ address: center.address }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                const location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
              } else {
                resolve(null);
              }
            });
          });
        });

        const results = await Promise.all(promises);
        setLocations(results);
      };

      geocodeAddresses();
    }
  }, [isLoaded, centers]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);

      if (locations.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach((location) => {
          if (location) {
            bounds.extend(location);
          }
        });
        map.fitBounds(bounds);
      } else {
        map.setCenter(BUCHAREST_CENTER);
        map.setZoom(12);
      }
    },
    [locations]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div className="p-4 text-red-600">Error loading Google Maps. Please check your API key and try again.</div>;
  }

  if (!isLoaded) {
    return (
      <div className="p-4 flex items-center justify-center h-[70vh] bg-gray-50">
        <div className="animate-pulse text-gray-600">Loading Google Maps...</div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={BUCHAREST_CENTER}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      }}
    >
      {centers.map((center, index) => {
        const location = locations[index];
        if (!location) return null;

        return (
          <Marker
            key={index}
            position={location}
            onClick={() => setSelectedCenter(center)}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#10B981" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
              )}`,
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        );
      })}

      {selectedCenter && locations[centers.indexOf(selectedCenter)] && (
        <InfoWindow position={locations[centers.indexOf(selectedCenter)]!} onCloseClick={() => setSelectedCenter(null)}>
          <div className="p-2 max-w-xs">
            <h3 className="font-bold text-lg mb-1">{selectedCenter.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{selectedCenter.address}</p>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-600">{selectedCenter.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{selectedCenter.rating}</span>
            </div>
            <a
              href={selectedCenter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 block"
            >
              View on Google Maps
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
