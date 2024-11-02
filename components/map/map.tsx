"use client";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RecyclingCenter {
  name: string;
  address: string;
  distance: string;
  rating: number;
  url: string;
}

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

  console.log("API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCM-VOGaEXV2zhi22m4aFqgtP3BbubQySs");
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCM-VOGaEXV2zhi22m4aFqgtP3BbubQySs",
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

  if (!window.google) {
    return (
      <div className="p-4 text-red-600">
        <p>Error: Google Maps JavaScript API not loaded.</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }

  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    return (
      <div className="p-4 text-red-600">
        <p>Error loading Google Maps. Please check your API key and try again.</p>
        <p>Error details: {loadError.message}</p>
      </div>
    );
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
            <h3 className="text-black font-bold text-lg mb-1">{selectedCenter.name}</h3>
            <p className="text-black text-sm mb-2">{selectedCenter.address}</p>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-black">{selectedCenter.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-black">{selectedCenter.rating}</span>
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

export default function RecyclingMapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [centers] = useState<RecyclingCenter[]>([
    {
      name: "EcoRecycle Center",
      address: "Strada Academiei 35-37, București 010013",
      distance: "1.2 km",
      rating: 4.5,
      url: "https://goo.gl/maps/example1",
    },
    {
      name: "Green Future Recycling",
      address: "Bulevardul Unirii 22, București 030833",
      distance: "2.5 km",
      rating: 4.2,
      url: "https://goo.gl/maps/example2",
    },
    {
      name: "Urban Eco Solutions",
      address: "Calea Victoriei 120, București 010093",
      distance: "1.8 km",
      rating: 4.7,
      url: "https://goo.gl/maps/example3",
    },
    {
      name: "CENTRU DE COLECTARE FIER VECHI",
      address: "Strada Cucuteni 29, București 052034, România",
      distance: "950 m",
      url: "https://maps.google.com/?cid=8138856769241618984",
      rating: 4.7,
    },
    {
      name: "Centru de Reciclare PET - Kaufland Ferentari",
      address: "Unnamed Road, București 052034, România",
      distance: "1 km",
      url: "https://maps.google.com/?cid=4279583010773547584",
      rating: 3.7,
    },
    {
      name: "Pet recycle - Punct de reciclare sticle Pet, doze aluminiu, sticle de sticla",
      address: "Rahova, București 052034, România",
      distance: "1,1 km",
      url: "https://www.kaufland.ro/utile/avantaje/automate-reciclare.html",
      rating: 2,
    },
    {
      name: "Centru de Colectare Fier Vechi - Reciclare",
      address: "Strada Clejani 17, București 061344, România",
      distance: "1,2 km",
      url: "https://maps.google.com/?cid=4853131111510663322",
      rating: 4.8,
    },
    {
      name: "Centru de reciclare nr. 7",
      address: "Bloc OD6, Bd. Timișoara 35, București 061344, România",
      distance: "3 km",
      url: "https://www.urbansa.ro/adresele-celor-12-puncte-de-preluare-a-deseurilor-reciclabile-colectate-separat/",
      rating: 5,
    },
    {
      name: "Green Recycling SRL",
      address: "Strada Prelungirea Ferentari 12, București 052034, România",
      distance: "1,5 km",
      url: "https://www.greenrecycling.ro/",
      rating: 4.2,
    },
    {
      name: "Eco-Point",
      address: "Calea Rahovei 266, București 050912, România",
      distance: "2 km",
      url: "https://www.ecopoint.ro/",
      rating: 4.5,
    },
    {
      name: "Centru de Colectare Deseuri Reciclabile Sector 5",
      address: "Strada Drumul Sării 143, București 050561, România",
      distance: "2,5 km",
      url: "https://www.primariasector5.ro/",
      rating: 3.9,
    },
    {
      name: "ReMat - Punct de Colectare",
      address: "Bulevardul Ghencea 126, București 061711, România",
      distance: "3,5 km",
      url: "https://www.remat.ro/",
      rating: 4.6,
    },
    {
      name: "Reciclare Hartie si Carton",
      address: "Strada Valea Oltului 2, București 061344, România",
      distance: "4 km",
      url: "https://www.reciclarehartiesicarton.ro/",
      rating: 4.1,
    },
    {
      name: "Centru de Reciclare Sticlă",
      address: "Șoseaua Alexandriei 208, București 040237, România",
      distance: "4,5 km",
      url: "https://www.reciclaresticla.ro/",
      rating: 4.3,
    },
    {
      name: "Colectare DEEE",
      address: "Strada Turnu Măgurele 1, București 040237, România",
      distance: "5 km",
      url: "https://www.colectaredeee.ro/",
      rating: 4.0,
    },
    {
      name: "Eco-Rom Ambalaje",
      address: "Calea 13 Septembrie 131, București 050711, România",
      distance: "5,5 km",
      url: "https://www.ecorom.ro/",
      rating: 4.7,
    },
    {
      name: "Reciclare Plastic",
      address: "Strada Progresului 10, București 021542, România",
      distance: "6 km",
      url: "https://www.reciclareplastic.ro/",
      rating: 4.9,
    },
    {
      name: "Centru de Colectare Baterii",
      address: "Bulevardul Unirii 1, București 030167, România",
      distance: "6,5 km",
      url: "https://www.colectarebaterii.ro/",
      rating: 4.4,
    },
    {
      name: "Eco-Sistem",
      address: "Strada Lipscani 53, București 030167, România",
      distance: "7 km",
      url: "https://www.ecosistem.ro/",
      rating: 4.2,
    },
    {
      name: "Centru de Reciclare Anvelope",
      address: "Șoseaua București-Ploiești 42-44, București 013686, România",
      distance: "7,5 km",
      url: "https://www.reciclareanvelope.ro/",
      rating: 4.8,
    },
    {
      name: "Recolamp",
      address: "Strada Fabrica de Glucoză 9, București 030202, România",
      distance: "8 km",
      url: "https://www.recolamp.ro/",
      rating: 4.6,
    },
    {
      name: "Green Group",
      address: "Calea Floreasca 169, București 014459, România",
      distance: "8,5 km",
      url: "https://www.greengroup.ro/",
      rating: 4.9,
    },
    {
      name: "Centru de Reciclare Textile",
      address: "Bulevardul Dacia 100, București 020602, România",
      distance: "9 km",
      url: "https://www.reciclaretextile.ro/",
      rating: 4.3,
    },
    {
      name: "Eco-Metal",
      address: "Strada Barbu Văcărescu 164, București 020286, România",
      distance: "9,5 km",
      url: "https://www.eco-metal.ro/",
      rating: 4,
    },
  ]);

  const filteredCenters = centers.filter((center) => center.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
        <h2 className="text-2xl font-semibold">Centre de reciclare în apropiere</h2>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="mb-4 flex gap-4">
          <Input
            type="text"
            placeholder="Cauta centre de reciclare..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={() => setSearchQuery("")}>Clear</Button>
        </div>
        <Map centers={filteredCenters} />
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Despre Harta</h2>
          <p className="">
            Această hartă afișează centrele de reciclare din București. Puteți da clic pe un marcaj pentru a vedea mai
            multe informații despre fiecare centru, inclusiv numele, adresa, distanța și ratingul acestuia. Folosiți
            bara de căutare de mai sus pentru a filtra centrele după nume.
          </p>
        </div>
      </div>
    </div>
  );
}
