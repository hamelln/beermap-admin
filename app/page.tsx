"use client";

import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import useInput from "@/utils/useInput";
import React, { useState } from "react";
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
  const [formData, setFormData] = useState<any>({
    breweryName: "",
    breweryIntro: "",
    breweryDescription: "",
    websiteUrl: "",
    images: [
      "/brewery-image.webp",
      "/brewery-image.webp",
      "/brewery-image.webp",
      "/brewery-image.webp",
      "/brewery-image.webp",
    ],
    phone: "",
    fullAddress: "",
    beerName: "",
    beerDescription: "",
    stateProvince: "",
    city: "",
    websiteType: "",
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
  const [selectedDay, setSelectedDay] = useState<string>("월");
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [hasBreakTime, setHasBreakTime] = useState<boolean>(false);
  const [hasLastOrder, setHasLastOrder] = useState<boolean>(false);
  const days: string[] = ["월", "화", "수", "목", "금", "토", "일"];
  const breweriesApi = new BreweriesApi();
  const imageUploader = new ImageUploader();
  const fileReader = new FileReader();

  const FileInput = (props: any) => (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  );

  // const onFileChange = async (srcs: Img[]) => {
  //   const newBreweryImages = [...breweryImages, ...srcs];
  //   setBreweryImages(newBreweryImages);
  //   const updatedBrewery = {
  //     ...breweryData,
  //     images: newBreweryImages,
  //   };
  //   await breweriesApi.updateBrewery(updatedBrewery);
  // };

  const handleFormChange = (key: string, value: string | string[]) => {
    setFormData((formData: any) => ({ ...formData, [key]: value }));
  };

  const handleOfficeHoursChange = (key: string, value: string) => {
    if (key !== "startTime" && key !== "endTime") {
      setFormData((formData: any) => ({
        ...formData,
        officeHours: {
          ...formData.officeHours,
          [selectedDay]: {
            ...formData.officeHours[selectedDay],
            [key]: value,
          },
        },
      }));
    } else {
      setFormData((formData: any) => ({
        ...formData,
        officeHours: {
          ...formData.officeHours,
          [selectedDay]: {
            ...formData.officeHours[selectedDay],
            breakTime: {
              ...formData.officeHours[selectedDay].breakTime,
              [key]: value,
            },
          },
        },
      }));
    }
  };

  const handleInput = useInput(handleFormChange, handleOfficeHoursChange);

  const handleDayClick = (e: any) => {
    const day = e.target.textContent;
    setSelectedDay(day);
  };

  const handleDelete = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    handleFormChange("images", updatedImages);
  };

  const deleteBrewery = async () => {
    await breweriesApi.deleteBrewery(brewery.id);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await breweriesApi.updateBrewery(formData);
  };

  return (
    <section className={S.section}>
      <form className={S.form} onSubmit={handleSubmit}>
        <h1>가게 정보 수정</h1>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>이름</span>
          </div>
          <div className={S.input_box}>
            <input
              type="text"
              placeholder="이름"
              value={formData.breweryName}
              name="breweryName"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className={S.info_box}>
          <div className={S.name_box}>
            <span>사진</span>
          </div>
          <ul className={S.image_box}>
            {formData.images.map((image: string, i: number) => {
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
                      handleDelete(i);
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
              value={formData.fullAddress}
              onChange={handleInput}
            />
            <div>도, 특별시, 광역시: {formData.stateProvince}</div>
            <div>시군구: {formData.city}</div>
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
              value={formData.phone}
              maxLength={14}
              onChange={handleInput}
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
              value={formData.websiteUrl}
              name="websiteUrl"
              onChange={handleInput}
            />
            <div>사이트 타입: {formData.websiteType}</div>
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
              value={formData.breweryIntro}
              onChange={handleInput}
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
              value={formData.breweryDescription}
              onChange={handleInput}
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
              value={formData.beerName}
              onChange={handleInput}
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
              value={formData.beerDescription}
              onChange={handleInput}
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
                    onClick={handleDayClick}
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
                    value={formData.officeHours[selectedDay].openTime}
                    name="openTime"
                    onChange={handleInput}
                  />{" "}
                  ~
                  <input
                    type="text"
                    placeholder="00:00"
                    name="closeTime"
                    value={formData.officeHours[selectedDay].closeTime}
                    onChange={handleInput}
                  />
                </div>
                <div className={S.time_box}>
                  <input
                    type="text"
                    placeholder="00:00"
                    value={
                      formData.officeHours[selectedDay].breakTime.startTime
                    }
                    name="startTime"
                    onChange={handleInput}
                  />{" "}
                  ~
                  <input
                    type="text"
                    placeholder="00:00"
                    name="endTime"
                    value={formData.officeHours[selectedDay].breakTime.endTime}
                    onChange={handleInput}
                  />
                </div>
                <div className={S.time_box}>
                  <input
                    type="text"
                    placeholder="00:00"
                    value={formData.officeHours[selectedDay].lastOrder}
                    name="lastOrder"
                    onChange={handleInput}
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
