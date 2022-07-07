import { useState, useCallback, SyntheticEvent, useRef } from 'react';
import { IMark } from '../types/map';
import { downloadJsonFile } from '../utils/downloadJsonFile';
import { makeFeaturesObjectFromMarks } from '../utils/makeFeaturesObjectFromMarks';

// here need some ts-ignore because libraries' types is wrong
export function useMapData() {
  const [markers, setMarkers] = useState<IMark[]>([]);
  const [targetMarker, setTargetMarker] = useState<IMark | null>(null);
  const changePositionId = useRef<string | null>(null);

  const getColorForMarker = useCallback((score: string) => {
    switch (score) {
      case '0':
        return 'black';
      case '1':
        return 'gray';
      case '2':
        return 'red';
      case '3':
        return 'orange';
      case '4':
        return 'lime';
      case '5':
        return 'green';

      default:
        return 'black';
    }
  }, []);

  const onChangeScore = useCallback(
    (id: string) => {
      const newScore = requestScore();
      if (!newScore) {
        return;
      }

      setMarkers(prev => {
        return prev.map(marker => {
          if (marker.id === id) {
            const newMarker = { ...marker, score: newScore };
            if (targetMarker) {
              setTargetMarker(newMarker);
            }
            return newMarker;
          } else {
            return marker;
          }
        });
      });
      setTargetMarker(null);
    },
    [targetMarker],
  );

  const requestScore = () => {
    let score: number | string | null = window.prompt(
      'Chose the score from 0 to 5 for this mark.',
    );
    if (score === null) {
      return false;
    }

    while (
      Number.isNaN(Number(score)) ||
      Number(score) < 0 ||
      Number(score) > 5
    ) {
      score = window.prompt(
        'Something went wrong, please chose the score from 0 to 5 for this mark again.',
      );

      if (score === null) {
        return false;
      }
    }
    return score;
  };
  const onAddMarker = (e: SyntheticEvent<any, Event>) => {
    setMarkers(prev => {
      const score = requestScore();
      if (!score) {
        return prev;
      }

      const lngLat = {
        // @ts-ignore
        ...e.lngLat,
        score,
        // @ts-ignore
        id: `${e.lngLat.lng}-${Date.now()}`,
      };

      // @ts-ignore
      return [...prev, lngLat];
    });
  };

  const onMoveMarker = useCallback((e: SyntheticEvent<any, Event>) => {
    setMarkers(prev => {
      const next = prev.map(el => {
        // @ts-ignore
        return el.id === changePositionId.current ? { ...el, ...e.lngLat } : el;
      });
      changePositionId.current = null;
      return next;
    });
  }, []);

  const onClickChangePosition = (id: string) => {
    changePositionId.current = id;

    setTargetMarker(null);
  };

  const onDeleteMarker = (id: string) => {
    setMarkers(prev => prev.filter(mark => mark.id !== id));
    setTargetMarker(null);
  };

  const onDownloadMarkers = () => {
    const featuresCollection = makeFeaturesObjectFromMarks(markers);
    downloadJsonFile(featuresCollection);
  };

  return {
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
  };
}
