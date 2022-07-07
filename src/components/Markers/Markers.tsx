import React, { FC } from 'react';
import { Marker } from 'react-mapbox-gl';
import { IMark } from '../../types/map';

interface MarkersProps {
  markers: IMark[];
  setTargetMarker: (mark: IMark) => void;
  getColorForMarker: (score: string) => string;
}

export const Markers: FC<MarkersProps> = ({
  markers,
  getColorForMarker,
  setTargetMarker,
}) => {
  return (
    <>
      {markers.map(mark => (
        <Marker
          coordinates={[mark.lng, mark.lat]}
          key={mark.id}
          anchor="bottom"
        >
          <div
            className={`marker ${getColorForMarker(mark.score)}`}
            onClick={() => {
              setTargetMarker(mark);
            }}
          ></div>
        </Marker>
      ))}
    </>
  );
};
