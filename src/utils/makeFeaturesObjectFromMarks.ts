import { IMark } from '../types/map';

export const makeFeaturesObjectFromMarks = (marks: IMark[]) => {
  const result = {
    type: 'FeatureCollection',
    features: [
      ...marks.map((mark, idx) => {
        return {
          type: 'Feature',
          properties: {
            id: mark.id,
            score: mark.score,
            lat: `${mark.lat}`,
            lon: `${mark.lng}`,
          },
          geometry: {
            type: 'Point',
            coordinates: [mark.lng, mark.lat],
          },
        };
      }),
    ],
  };

  return result;
};
