import React, { useState } from 'react';
import { LatLngTuple } from 'leaflet';

const LayerContext: any = React.createContext({});

const LayerContextProvider = ({ children }: any) => {
    const [point, setPoint] = useState<LatLngTuple>([0, 0]);
    const [address, setAddress] = useState('');

    const defaultValue = {
        point,
        setPoint,
        address,
        setAddress,
    }

    return (
        <LayerContext.Provider value={defaultValue}>
            {children}
        </LayerContext.Provider>
    )
}

export { LayerContext, LayerContextProvider };