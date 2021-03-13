import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { LayerContext } from '../context/LayerContext';

const LeafletMap: React.FC = () => {
    const { point, address } = useContext(LayerContext);
    const defaultLatLng: LatLngTuple = [48.8349, 2.24832]; //set on Paris by default
    const zoom: number = 6;

    return (
        <MapContainer id="mapId"
            center={defaultLatLng}
            zoom={zoom}>
            <Marker title={`Adress: ${address}`} position={point} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        </MapContainer>
    )
}

export default LeafletMap;