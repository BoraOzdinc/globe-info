import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import HEX_DATA from "../../datasets/countries.json";
import Globe from "react-globe.gl";

export default function CustomGlobe({setCountry,vw}) {
  const globeEl = useRef();
  const [hex, setHex] = useState({ features: [] });
  const [liftD, setLiftD] = useState();
  const [hoverD, setHoverD] = useState();
  useEffect(() => {
    setHex(HEX_DATA);
  }, []);

  useEffect(() => {
    const MAP_CENTER = { lat: 0, lng: 0, altitude: 1.5 };
    globeEl.current.pointOfView(MAP_CENTER, 0);
  }, [globeEl]);

  const onClick=(data)=>{
setLiftD(data)
setCountry(data.properties.SUBUNIT)
  }

  return (
    <Globe
        animateIn
        ref={globeEl}
        width={vw}
        backgroundColor="black"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        lineHoverPrecision={0}
        polygonsData={hex.features}
        polygonAltitude={d => d === liftD ? 0.05 : 0.01}
        polygonCapColor={d => d === hoverD ? 'rgba(255,255,255,0.3)' :"transparent"}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonStrokeColor={() => 'rgba(255,255,255,1)'}
        polygonLabel={({ properties: d }) => `<div class="bg-black p-2 rounded">
            <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
            GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
            Population: <i>${d.POP_EST}</i></div>
        `}
        onPolygonClick={onClick}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
    />
  );
}
