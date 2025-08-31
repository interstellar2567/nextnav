"use client";
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { LineString, Point } from "ol/geom";
import { Stroke, Style, Circle, Fill } from "ol/style";

interface Coordinate {
  lat: number;
  lon: number;
}

type Route = Coordinate[];

interface TestRouteMapProps {
  start: Coordinate | null;
  end: Coordinate | null;
  routes: Route[];
  selectedRouteIndex: number | null;
}

const TestRouteMap: React.FC<TestRouteMapProps> = ({
  start,
  end,
  routes,
  selectedRouteIndex,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 4,
      }),
    });

    vectorLayerRef.current = new VectorLayer({
      source: new VectorSource(),
    });

    mapInstance.current.addLayer(vectorLayerRef.current);
  }, []);

  useEffect(() => {
    if (
      !mapInstance.current ||
      !vectorLayerRef.current ||
      !start ||
      !end ||
      routes.length === 0
    )
      return;

    const vectorSource = new VectorSource();

    const transformCoords = (coords: Coordinate[]) =>
      coords.map((p) => fromLonLat([p.lon, p.lat]));

    const startFeature = new Feature(
      new Point(fromLonLat([start.lon, start.lat]))
    );
    const endFeature = new Feature(new Point(fromLonLat([end.lon, end.lat])));

    startFeature.setStyle(
      new Style({
        image: new Circle({ radius: 6, fill: new Fill({ color: "green" }) }),
      })
    );

    endFeature.setStyle(
      new Style({
        image: new Circle({ radius: 6, fill: new Fill({ color: "red" }) }),
      })
    );

    vectorSource.addFeature(startFeature);
    vectorSource.addFeature(endFeature);

    const colors = ["blue", "purple", "orange", "green"];

    routes.forEach((route, index) => {
      if (route.length > 1) {
        const color = colors[index % colors.length];
        const lineWidth =
          selectedRouteIndex !== null
            ? selectedRouteIndex === index
              ? 5
              : 2
            : 3;

        const lineFeature = new Feature(new LineString(transformCoords(route)));

        lineFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: color,
              width: lineWidth,
              lineDash:
                selectedRouteIndex !== null && selectedRouteIndex !== index
                  ? [5, 5]
                  : undefined, // Dash effect for non-selected routes
            }),
          })
        );

        vectorSource.addFeature(lineFeature);
      }
    });

    vectorLayerRef.current.setSource(vectorSource);

    if (vectorSource.getFeatures().length > 0) {
      const extent = vectorSource.getExtent();
      mapInstance.current.getView().fit(extent, { padding: [50, 50, 50, 50] });
    }
  }, [start, end, routes, selectedRouteIndex]);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default TestRouteMap;
