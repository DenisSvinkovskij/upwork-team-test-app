// @ts-nocheck
// here need ts nocheck because libraries' types is wrong
import React, { FC } from 'react';
import { Popup } from 'react-mapbox-gl';
import { IMark } from '../../types/map';

interface CustomPopupProps {
  targetMarker: IMark | null;
  setTargetMarker: (mark: IMark | null) => void;
  onClickChangePosition: (id: string) => void;
  onChangeScore: (id: string) => void;
  onDeleteMarker: (id: string) => void;
}

export const CustomPopup: FC<CustomPopupProps> = ({
  targetMarker,
  setTargetMarker,
  onClickChangePosition,
  onChangeScore,
  onDeleteMarker,
}) => {
  return (
    <>
      {targetMarker ? (
        <Popup
          coordinates={[targetMarker.lng as number, targetMarker.lat as number]}
        >
          <div className="popup-container">
            <button
              type="button"
              className="popup-close"
              onClick={() => setTargetMarker(null)}
            >
              x
            </button>
            <div className="popup-score">Score: {targetMarker.score}</div>
            <div className="popup-action-btns">
              <button
                type="button"
                className="popup-action popup-move"
                onClick={() => onClickChangePosition(targetMarker.id)}
              >
                Change position
              </button>
              <button
                type="button"
                className="popup-action popup-change-score"
                onClick={() => onChangeScore(targetMarker.id)}
              >
                Change score
              </button>
              <button
                type="button"
                className="popup-action popup-delete"
                onClick={() => onDeleteMarker(targetMarker.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </Popup>
      ) : null}
    </>
  );
};
