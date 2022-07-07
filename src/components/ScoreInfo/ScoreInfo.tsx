import React, { FC, useMemo } from 'react';
import { IMark } from '../../types/map';

interface ScoreInfoProps {
  markers: IMark[];
}

export const ScoreInfo: FC<ScoreInfoProps> = ({ markers }) => {
  const allInfo = useMemo(() => {
    const info = {
      total: 0,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
      zero: 0,
    };

    markers.forEach(el => {
      info.total += 1;
      switch (el.score) {
        case '0':
          info.zero += 1;
          break;
        case '1':
          info.one += 1;
          break;
        case '2':
          info.two += 1;
          break;
        case '3':
          info.three += 1;
          break;
        case '4':
          info.four += 1;
          break;
        case '5':
          info.five += 1;
          break;

        default:
          return;
      }
    });
    return info;
  }, [markers]);

  return (
    <div className="score-info-container">
      <div className="total">Total: {allInfo.total} </div>
      <div className="five">Five: {allInfo.five} </div>
      <div className="four">Four: {allInfo.four} </div>
      <div className="three">Three: {allInfo.three} </div>
      <div className="two">Two: {allInfo.two} </div>
      <div className="one">One: {allInfo.one} </div>
      <div className="zero">Zero: {allInfo.zero} </div>
    </div>
  );
};
