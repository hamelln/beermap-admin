"use client";

import React from "react";
import S from "./BottomSheet.module.scss";
import { useBottomSheet } from "@/utils/useBottomSheet";
import GoogleMap from "./bottom-sheet-content/GoogleMap";
import Brewery from "@/types/Brewery";

const BottomSheet = ({
  breweryName,
  latitude,
  longitude,
}: Pick<Brewery, "breweryName" | "latitude" | "longitude">) => {
  if (typeof window === "undefined") {
    return (
      <div className={S.main}>
        <header className={S.header}>
          <div className={S.handle}></div>
          <div>
            <span className={S.brewery_name}>{breweryName}</span>
          </div>
        </header>
        <div className={S.content}></div>
      </div>
    );
  }
  const MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
  const MAX_Y = (window.innerHeight * 96) / 100; // 바텀시트가 최소로 내려갔을 때의 y 값
  const { sheet, isMapOpen, content } = useBottomSheet(MIN_Y, MAX_Y);

  return (
    <div className={S.main} ref={sheet}>
      <header className={S.header}>
        <div className={S.handle}></div>
        <div>
          <span className={S.brewery_name}>{breweryName}</span>
        </div>
      </header>
      <div ref={content} className={S.content}>
        <GoogleMap
          latitude={latitude}
          longitude={longitude}
          isMapOpen={isMapOpen}
        />
      </div>
    </div>
  );
};

export default BottomSheet;
