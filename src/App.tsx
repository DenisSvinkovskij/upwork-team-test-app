import React from 'react';
import './App.css';
import ReactMapboxGl from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ScoreInfo } from './components/ScoreInfo/ScoreInfo';
import { CustomPopup } from './components/CustomPopup/CustomPopup';
import { useMapData } from './hooks/useMapData';
import { Button } from './components/Button/Button';
import { Markers } from './components/Markers/Markers';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZGVuaXNzdmlua292c2tpaiIsImEiOiJja2k4c3pzNW4wOTV0MnptbmhrMzRpbWtyIn0.NGGOUwAd9tMzdVeF7ofcpA',
});

function App() {
  const {
    onAddMarker,
    markers,
    onChangeScore,
    onClickChangePosition,
    onDeleteMarker,
    onMoveMarker,
    getColorForMarker,
    changePositionId,
    targetMarker,
    setTargetMarker,
    onDownloadMarkers,
  } = useMapData();

  return (
    <div className="App">
      <div className="App-wrapper">
        {changePositionId.current && (
          <div className="change-position-banner">Changing Position</div>
        )}
        {markers.length > 0 && (
          <Button
            title="Download Markers"
            onClick={onDownloadMarkers}
            extraClass="map-download-btn"
          />
        )}

        <ScoreInfo markers={markers} />
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100%',
            width: '100%',
          }}
          zoom={[7]}
          onClick={(m, e) => {
            if (changePositionId.current) {
              onMoveMarker(e);
            } else {
              onAddMarker(e);
            }
          }}
        >
          <>
            <Markers
              markers={markers}
              getColorForMarker={getColorForMarker}
              setTargetMarker={setTargetMarker}
            />

            <CustomPopup
              targetMarker={targetMarker}
              onChangeScore={onChangeScore}
              onClickChangePosition={onClickChangePosition}
              onDeleteMarker={onDeleteMarker}
              setTargetMarker={setTargetMarker}
            />
          </>
        </Map>
      </div>
    </div>
  );
}

export default App;
