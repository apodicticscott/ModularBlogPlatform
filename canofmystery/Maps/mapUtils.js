import React, { useEffect, useState, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const MapComponent = ({ locationData }) => {
    const [mapLongitude, setMapLongitude] = useState(0);
    const [mapLatitude, setMapLatitude] = useState(0);
    const [mapZoom, setMapZoom] = useState(2);
    const [map, setMap] = useState({});

    const mapElement = useRef();
    console.log(apiKey)

    useEffect(() => {
        const map = tt.map({
            key: apiKey,
            style: "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAWjI2SE5SSENsREFSWE1DQTs0MWZkNzkzYS0zMjYyLTQxZjctOWIwYS05ZWExMjc4NzBhNTA=/drafts/0.json",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });

        map.addControl(new tt.NavigationControl());

        console.log(locationData)
        if (Array.isArray(locationData)) {
            locationData.forEach(location => {
                console.log(location.lonLat)
                if(location.lonLat !== null){
                    const popup = new tt.Popup({ offset: 35 }).setText('Location information');
                    new tt.Marker().setLngLat(location.lonLat).setPopup(popup).addTo(map);
                }
                
            });
        }


        return () => map.remove(); // Cleanup on component unmount
    }, [apiKey, locationData]);

    return <div id="map" ref={mapElement} style={{ width: '100%', height: '548px' }} className='border-b-3  mapDiv' />;
};

const Map = ({ locationData }) => {
    return (
        <>
            <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.15.0/maps/maps.css'></link>
            <MapComponent apiKey={apiKey} locationData={locationData} className="z-0" />
        </>
    );
}

export default Map;
