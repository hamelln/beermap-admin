"use client";

import React, { useState } from "react";
import styles from "./BreweryDetails.module.scss";
import BreweriesApi from "@/services/BreweriesApi";
import Brewery from "@/types/Brewery";

export default function BreweryAddForm() {
  const [breweryName, setBreweryName] = useState("");
  const [breweryIntro, setBreweryIntro] = useState("");
  const [breweryDescription, setBreweryDescription] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [officeHours, setOfficeHours] = useState<any>({
    일: {
      openTime: "",
      closeTime: "",
      breakTime: { startTime: "", endTime: "" },
      lastOrder: "",
    },
    월: {
      openTime: "",
      closeTime: "",
      breakTime: { startTime: "", endTime: "" },
      lastOrder: "",
    },
    화: {
      openTime: "",
      closeTime: "",
      breakTime: { startTime: "", endTime: "" },
      lastOrder: "",
    },
    수: {
      openTime: "",
      closeTime: "",
      breakTime: { startTime: "", endTime: "" },
      lastOrder: "",
    },
    목: {
      openTime: "",
      closeTime: "",
      breakTime: { startTime: "", endTime: "" },
      lastOrder: "",
    },
    금: {
      openTime: "",
      closeTime: "",
      breakTime: { startTime: "", endTime: "" },
      lastOrder: "",
    },
    토: {
      openTime: "",
      closeTime: "",
      breakTime: { startTime: "", endTime: "" },
      lastOrder: "",
    },
  });
  const [beerName, setBeerName] = useState("");
  const [beerDescription, setBeerDescription] = useState("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const breweriesApi = new BreweriesApi();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const signatureBeer = {
      beerName,
      beerDescription,
    };

    const newBrewery: Partial<Brewery> = {
      breweryName,
      breweryDescription,
      stateProvince,
      city,
      address,
      breweryIntro,
      postalCode,
      phone,
      websiteUrl,
      officeHours,
      signatureBeer,
      latitude,
      longitude,
    };

    await breweriesApi.createBrewery(newBrewery);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.info_box}>
        <label htmlFor="breweryName">가게 이름</label>
        <input
          type="text"
          id="breweryName"
          value={breweryName}
          onChange={(e) => setBreweryName(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="breweryIntro">가게 한 줄 소개</label>
        <textarea
          id="breweryIntro"
          value={breweryIntro}
          onChange={(e) => setBreweryIntro(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="breweryDescription">가게 소개</label>
        <textarea
          id="breweryDescription"
          value={breweryDescription}
          onChange={(e) => setBreweryDescription(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="stateProvince">도/특별/광역시</label>
        <input
          type="text"
          id="stateProvince"
          value={stateProvince}
          onChange={(e) => setStateProvince(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="city">시군구</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="address">나머지 주소</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="lat">lat</label>
        <input
          type="text"
          id="lat"
          value={latitude}
          onChange={(e) => setLatitude(Number(e.target.value))}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="lng">lng</label>
        <input
          type="text"
          id="lng"
          value={longitude}
          onChange={(e) => setLongitude(Number(e.target.value))}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="phone">전화 번호</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="postalCode">지번</label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="websiteUrl">사이트, 인스타 URL</label>
        <input
          type="text"
          id="websiteUrl"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="officeHours">운영 시간</label>
        <ul>
          {days.map((day) => (
            <div className={styles.info_box} key={day}>
              <p>{day}요일</p>
              영업 개시
              <input
                type="text"
                value={officeHours[day].openTime}
                onChange={(e) =>
                  setOfficeHours({
                    ...officeHours,
                    [day]: { ...officeHours[day], openTime: e.target.value },
                  })
                }
              />
              영업 마감
              <input
                type="text"
                value={officeHours[day].closeTime}
                onChange={(e) =>
                  setOfficeHours({
                    ...officeHours,
                    [day]: { ...officeHours[day], closeTime: e.target.value },
                  })
                }
              />
              브레이크 시작
              <input
                type="text"
                value={officeHours[day].breakTime?.startTime}
                onChange={(e) => {
                  const newBreakTime = { ...officeHours[day].breakTime };
                  newBreakTime.startTime = e.target.value;
                  setOfficeHours({
                    ...officeHours,
                    [day]: { ...officeHours[day], breakTime: newBreakTime },
                  });
                }}
              />
              브레이크 마감
              <input
                type="text"
                value={officeHours[day].breakTime?.endTime}
                onChange={(e) => {
                  const newBreakTime = { ...officeHours[day].breakTime };
                  newBreakTime.endTime = e.target.value;
                  setOfficeHours({
                    ...officeHours,
                    [day]: { ...officeHours[day], breakTime: newBreakTime },
                  });
                }}
              />
              라스트 오더
              <input
                type="text"
                value={officeHours[day].lastOrder}
                onChange={(e) =>
                  setOfficeHours({
                    ...officeHours,
                    [day]: { ...officeHours[day], lastOrder: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </ul>
      </div>

      <div className={styles.info_box}>
        <label htmlFor="beerName">추천 맥주 이름</label>
        <input
          type="text"
          id="beerName"
          value={beerName}
          onChange={(e) => setBeerName(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="beerDescription">맥주 설명</label>
        <textarea
          id="beerDescription"
          value={beerDescription}
          onChange={(e) => setBeerDescription(e.target.value)}
        />
      </div>

      <button type="submit" style={{ color: "var(--color-font-primary)" }}>
        가게 등록
      </button>
    </form>
  );
}
