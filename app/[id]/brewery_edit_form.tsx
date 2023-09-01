"use client";

import React, { useState } from "react";
import styles from "./BreweryDetails.module.scss";
import BreweriesApi from "@/services/BreweriesApi";
import Brewery from "@/types/Brewery";
import ImageFileInput from "@/app/image_file_input/image_file_input";
import ImageUploader from "@/services/image-uploader";
import Img from "@/types/Img";
import Image from "next/image";

interface Props {
  breweryData: Brewery;
}

export default function BreweryEditForm({ breweryData }: any) {
  const [breweryName, setBreweryName] = useState(breweryData.breweryName);
  const [breweryIntro, setBreweryIntro] = useState(breweryData.breweryIntro);
  const [breweryDescription, setBreweryDescription] = useState(
    breweryData.breweryDescription
  );
  const [stateProvince, setStateProvince] = useState(breweryData.stateProvince);
  const [city, setCity] = useState(breweryData.city);
  const [address, setAddress] = useState(breweryData.address);
  const [phone, setPhone] = useState(breweryData.phone);
  const [websiteUrl, setWebsiteUrl] = useState(breweryData.websiteUrl);
  const [officeHours, setOfficeHours] = useState(breweryData.officeHours);
  const [signatureBeerName, setSignatureBeerName] = useState(
    breweryData.signatureBeer.beerName
  );
  const [signatureBeerDescription, setSignatureBeerDescription] = useState(
    breweryData.signatureBeer.beerDescription
  );
  const [breweryImages, setBreweryImages] = useState<Img[]>(
    breweryData.images ?? []
  );

  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const breweriesApi = new BreweriesApi();
  const imageUploader = new ImageUploader();

  const FileInput = (props: any) => (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  );

  const onFileChange = async (srcs: Img[]) => {
    const newBreweryImages = [...breweryImages, ...srcs];
    setBreweryImages(newBreweryImages);
    const updatedBrewery = {
      ...breweryData,
      images: newBreweryImages,
    };
    await breweriesApi.updateBrewery(updatedBrewery);
  };

  const handleClick = async () => {
    await breweriesApi.deleteBrewery(breweryData.id);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const updatedSignatureBeer = {
      signatureBeerName,
      signatureBeerDescription,
    };

    const updatedBrewery = {
      ...breweryData,
      breweryName,
      breweryDescription,
      stateProvince,
      city,
      address,
      phone,
      websiteUrl,
      images: breweryImages,
      officeHours,
      signatureBeer: updatedSignatureBeer,
    };

    await breweriesApi.updateBrewery(updatedBrewery);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.image_box}>
        {breweryImages.map((srcs: Img, i: number) => {
          return (
            <div key={i} className={styles.image}>
              <Image
                src={srcs.small}
                width={200}
                height={200}
                alt="브루어리 이미지"
              />
            </div>
          );
        })}
      </div>
      <div className={styles.info_box}>
        <FileInput onFileChange={onFileChange} />
      </div>
      <div className={styles.info_box}>
        <label
          htmlFor="breweryName"
          onClick={() => {
            console.log(breweryImages);
          }}
        >
          가게 이름
        </label>
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
        <label htmlFor="phone">전화 번호</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          {days.map((day, i) => (
            <div className={styles.info_box} key={i}>
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
        <label htmlFor="signatureBeerName">추천 맥주 이름</label>
        <input
          type="text"
          id="signatureBeerName"
          value={signatureBeerName}
          onChange={(e) => setSignatureBeerName(e.target.value)}
        />
      </div>
      <div className={styles.info_box}>
        <label htmlFor="signatureBeerDescription">맥주 설명</label>
        <textarea
          id="signatureBeerDescription"
          value={signatureBeerDescription}
          onChange={(e) => setSignatureBeerDescription(e.target.value)}
        />
      </div>

      <button type="submit" style={{ color: "var(--color-font-primary)" }}>
        정보 수정하기
      </button>
      <button
        type="button"
        onClick={handleClick}
        style={{ color: "var(--color-font-primary)" }}
      >
        가게 정보 삭제
      </button>
    </form>
  );
}
