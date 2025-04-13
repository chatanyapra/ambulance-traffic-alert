import { useEffect, useState, useRef } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useAuth } from '../../hooks/useAuth';
import { useSocket } from '../../hooks/useSocket';
import LoadingSpinner from './LoadingSpinner';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

const defaultCenter = {
  lat: 20.5937, // Default to India coordinates
  lng: 78.9629
};

const Map = ({ 
  showCurrentLocation = true,
  showControls = false,
  onMapClick,
  markers = [],
  directions = null,
  zoom = 12,
  style = {}
}) => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef(null);

  // Load current location
  useEffect(() => {
    if (showCurrentLocation && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(pos);
          
          // Update server with current location
          if (socket && user) {
            socket.emit('updateLocation', {
              userId: user._id,
              location: pos
            });
          }

          // Center map on current location
          if (mapRef.current) {
            mapRef.current.panTo(pos);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation(defaultCenter);
        },
        { enableHighAccuracy: true, maximumAge: 10000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [showCurrentLocation, socket, user]);

  // Handle map click
  const handleMapClick = (e) => {
    if (onMapClick) {
      onMapClick({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  // Fit bounds to show all markers and directions
  useEffect(() => {
    if (map && (markers.length > 0 || directions)) {
      const bounds = new window.google.maps.LatLngBounds();
      
      // Add current location to bounds
      if (currentLocation) {
        bounds.extend(currentLocation);
      }

      // Add markers to bounds
      markers.forEach(marker => {
        bounds.extend(marker.position);
      });

      // Add directions path to bounds
      if (directions) {
        directions.routes[0].legs.forEach(leg => {
          bounds.extend(leg.start_location);
          bounds.extend(leg.end_location);
        });
      }

      map.fitBounds(bounds);
    }
  }, [map, markers, directions, currentLocation]);

  return (
    <div className={`relative ${style?.className || 'w-full h-96'}`} style={style}>
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <LoadingSpinner size="lg" />
          <span className="ml-2">Loading map...</span>
        </div>
      )}

      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsMapLoaded(true)}
      >
        <GoogleMap
          mapContainerStyle={{ ...containerStyle, ...style }}
          center={currentLocation || defaultCenter}
          zoom={zoom}
          onClick={handleMapClick}
          onLoad={(map) => {
            setMap(map);
            mapRef.current = map;
          }}
          options={{
            streetViewControl: showControls,
            mapTypeControl: showControls,
            fullscreenControl: showControls,
            zoomControl: showControls,
            disableDefaultUI: !showControls
          }}
        >
          {/* Current location marker */}
          {showCurrentLocation && currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }}
              zIndex={100}
            />
          )}

          {/* Additional markers */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={marker.icon || null}
              label={marker.label || null}
              onClick={marker.onClick}
            />
          ))}

          {/* Directions */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#3B82F6',
                  strokeOpacity: 0.8,
                  strokeWeight: 5
                }
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {showControls && showCurrentLocation && (
        <button
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
          onClick={() => {
            if (currentLocation && mapRef.current) {
              mapRef.current.panTo(currentLocation);
              mapRef.current.setZoom(15);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Map;