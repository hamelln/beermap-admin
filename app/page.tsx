"use client";

import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import useFormData from "@/utils/useFormData";
import React, { FormEvent, useState } from "react";
import S from "./brewery_edit_form.module.scss";
import Image from "next/image";
import BreweriesApi from "@/services/BreweriesApi";
import ImageUploader from "@/services/image-uploader";
import ImageFileInput from "./image_file_input/image_file_input";
import Img from "@/types/Img";

interface Props {
  brewery: BreweryDetailsProps;
}

const page = ({ brewery }: Props) => {
  const [updatedBrewery, setUpdatedBrewery] = useState<any>({
    id: "",
    breweryName: "",
    breweryType: "",
    images: [
      "/brewery-image.webp",
      "/brewery-image.webp",
      "/brewery-image.webp",
      "/brewery-image.webp",
      "/brewery-image.webp",
    ],
    stateProvince: "",
    city: "",
    address: "",
    postalCode: "",
    longitude: "",
    latitude: "",
    phone: "",
    websiteUrl: "",
    websiteType: "",
    breweryIntro: "",
    breweryDescription: "",
    beerName: "",
    beerDescription: "",
    officeHours: {
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
      일: {
        openTime: "",
        closeTime: "",
        breakTime: { startTime: "", endTime: "" },
        lastOrder: "",
      },
    },
  });
  const [fullAddress, setFullAddress] = useState<string>("");
  const days: string[] = ["월", "화", "수", "목", "금", "토", "일"];
  const breweriesApi = new BreweriesApi();
  const imageUploader = new ImageUploader();

  // const FileInput = (props: any) => (
  //   <ImageFileInput {...props} imageUploader={imageUploader} />
  // );

  // const onFileChange = async (srcs: Img[]) => {
  //   const newBreweryImages = [...breweryImages, ...srcs];
  //   setBreweryImages(newBreweryImages);
  //   const updatedBrewery = {
  //     ...breweryData,
  //     images: newBreweryImages,
  //   };
  //   await breweriesApi.updateBrewery(updatedBrewery);
  // };

  const { handleFormData, selectedDay } = useFormData(
    setUpdatedBrewery,
    setFullAddress
  );

  const deleteImage = (index: number) => {
    const updatedImages = updatedBrewery.images.filter(
      (_: any, i: number) => i !== index
    );
    const newBrewery = { ...updatedBrewery, images: updatedImages };
    setUpdatedBrewery(newBrewery);
  };

  const deleteBrewery = async () => {
    await breweriesApi.deleteBrewery(brewery.id);
  };

  const updateBrewery = async (e: FormEvent) => {
    e.preventDefault();
    await breweriesApi.updateBrewery(updatedBrewery);
  };

  return (
    <section className={S.section}>
      <form className={S.form} onSubmit={updateBrewery}>
        <h1>가게 정보 수정</h1>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>이름</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="이름"
              value={updatedBrewery.breweryName}
              name="breweryName"
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>브루어리 유형</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="브루어리 유형"
              value={updatedBrewery.breweryType}
              name="breweryType"
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>사진</span>
          </div>
          <ul className={S.image_box}>
            {updatedBrewery.images.map((image: string, i: number) => {
              return (
                <li key={i} className={S.image}>
                  <Image
                    src={image}
                    alt="image"
                    width={200}
                    height={200}
                  ></Image>
                  <button
                    className={S.delete_button}
                    onClick={() => {
                      deleteImage(i);
                    }}
                  >
                    X
                  </button>
                </li>
              );
            })}
            <button className={S.upload_button}>업로드</button>
          </ul>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>주소</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="주소"
              name="address"
              value={fullAddress}
              onChange={handleFormData}
            />
            <div>도, 특별시, 광역시: {updatedBrewery.stateProvince}</div>
            <div>시군구: {updatedBrewery.city}</div>
            <div>나머지 주소: {updatedBrewery.address}</div>
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>우편 번호</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="우편 번호"
              name="postalCode"
              value={updatedBrewery.postalCode}
              maxLength={5}
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>경도(longitude)</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="경도"
              name="longitude"
              value={updatedBrewery.longitude}
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>위도(latitude)</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="위도"
              name="latitude"
              value={updatedBrewery.latitude}
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>전화번호</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="전화번호"
              name="phone"
              value={updatedBrewery.phone}
              maxLength={14}
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>홈페이지, SNS</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="홈페이지, SNS"
              value={updatedBrewery.websiteUrl}
              name="websiteUrl"
              onChange={handleFormData}
            />
            <div>사이트 타입: {updatedBrewery.websiteType}</div>
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>가게 한 줄 소개</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="가게 한 줄 소개"
              name="breweryIntro"
              value={updatedBrewery.breweryIntro}
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>가게 전체 소개</span>
          </div>
          <div className={S.input_box}>
            <textarea
              placeholder="가게 설명"
              name="breweryDescription"
              value={updatedBrewery.breweryDescription}
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>추천 맥주 이름</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="추천 맥주 이름"
              name="beerName"
              value={updatedBrewery.beerName}
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>추천 맥주 설명</span>
          </div>
          <div className={S.input_box}>
            <textarea
              placeholder="추천 맥주 설명"
              name="beerDescription"
              value={updatedBrewery.beerDescription}
              onChange={handleFormData}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>영업 시간</span>
          </div>
          <div className={S.input_box}>
            <div>
              <div>
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    name="day"
                    onClick={handleFormData}
                    className={selectedDay === day ? S.selected : ""}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div>
                <div className={S.time_box}>
                  <input
                    type="text"
                    placeholder="00:00"
                    value={updatedBrewery.officeHours[selectedDay].openTime}
                    name="openTime"
                    onChange={handleFormData}
                  />{" "}
                  ~
                  <input
                    type="text"
                    placeholder="00:00"
                    name="closeTime"
                    value={updatedBrewery.officeHours[selectedDay].closeTime}
                    onChange={handleFormData}
                  />
                </div>
                <div className={S.time_box}>
                  <input
                    type="text"
                    placeholder="00:00"
                    value={
                      updatedBrewery.officeHours[selectedDay].breakTime
                        .startTime
                    }
                    name="startTime"
                    onChange={handleFormData}
                  />{" "}
                  ~
                  <input
                    type="text"
                    placeholder="00:00"
                    name="endTime"
                    value={
                      updatedBrewery.officeHours[selectedDay].breakTime.endTime
                    }
                    onChange={handleFormData}
                  />
                </div>
                <div className={S.time_box}>
                  <input
                    type="text"
                    placeholder="00:00"
                    value={updatedBrewery.officeHours[selectedDay].lastOrder}
                    name="lastOrder"
                    onChange={handleFormData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={S.submit_box}>
          <button type="submit" className={S.submit_button}>
            가게 수정
          </button>
          <button
            type="button"
            onClick={deleteBrewery}
            className={S.delete_brewery}
          >
            가게 삭제
          </button>
        </div>
      </form>
    </section>
  );
};

export default page;
