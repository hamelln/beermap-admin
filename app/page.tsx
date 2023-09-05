"use client";

import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import useFormData from "@/utils/useFormData";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import S from "./brewery_edit_form.module.scss";
import Image from "next/image";
import BreweriesApi from "@/services/BreweriesApi";
import ImageUploader from "@/services/image-uploader";
import Img from "@/types/Img";
import MouseClick from "@/types/MouseClick";
import Brewery from "@/types/Brewery";

interface Props {
  brewery: Partial<BreweryDetailsProps>;
}

const page = ({ brewery }: Props) => {
  const [updatedBrewery, setUpdatedBrewery] = useState<Brewery>({
    id: "",
    breweryName: "",
    breweryType: "",
    images: [
      {
        id: "ab",
        small: "/brewery-image.webp",
        medium: "/brewery-image.webp",
        large: "/brewery-image.webp",
      },
      {
        id: "bc",
        small: "/brewery-image.webp",
        medium: "/brewery-image.webp",
        large: "/brewery-image.webp",
      },
      {
        id: "dd",
        small: "/brewery-image.webp",
        medium: "/brewery-image.webp",
        large: "/brewery-image.webp",
      },
    ],
    stateProvince: "",
    city: "",
    address: "",
    postalCode: "",
    longitude: 0,
    latitude: 0,
    phone: "",
    websiteUrl: "",
    websiteType: "",
    breweryIntro: "",
    breweryDescription: "",
    signatureBeer: {
      beerName: "",
      beerDescription: "",
    },
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
  const [files, setFiles] = useState<File[]>([]);
  const [totalFiles, setTotalFiles] = useState<any[]>(
    updatedBrewery.images.map((_: any) => "url")
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const days: string[] = ["월", "화", "수", "목", "금", "토", "일"];
  const breweriesApi = new BreweriesApi();
  const imageUploader = new ImageUploader();

  const { handleFormData, selectedDay } = useFormData(
    setUpdatedBrewery,
    setFullAddress
  );

  const onButtonClick = (event: MouseClick) => {
    event.preventDefault();
    inputRef?.current?.click();
  };

  const onChange = async (event: any) => {
    const files = event.target.files;
    setTotalFiles([...totalFiles, ...files]);
    setFiles(files);
  };

  const deleteImage = (index: number) => {
    const updatedImages = updatedBrewery.images.filter(
      (_: any, i: number) => i !== index
    );
    const updatedTotalFiles = totalFiles.filter(
      (_: any, i: number) => i !== index
    );
    const newBrewery = { ...updatedBrewery, images: updatedImages };
    setTotalFiles(updatedTotalFiles);
    setUpdatedBrewery(newBrewery);
  };

  const uploadNewImages = async () => {
    const newFiles = totalFiles.filter((file) => file !== "url");
    const newCloudinaryImages: Img[] = await imageUploader.upload(newFiles);
    const filteredImages = updatedBrewery.images.filter(
      (image: Img) => !image.id.includes("temp")
    );
    const newImages = [...filteredImages, ...newCloudinaryImages];
    setUpdatedBrewery({ ...updatedBrewery, images: newImages });
  };

  const deleteBrewery = async () => {
    await breweriesApi.deleteBrewery(brewery.id);
  };

  const updateBrewery = async (e: FormEvent) => {
    e.preventDefault();
    await uploadNewImages();
    await breweriesApi.updateBrewery(updatedBrewery);
  };

  useEffect(() => {
    if (files) {
      const fileReader = new FileReader();
      const newImages = [...updatedBrewery.images];

      const loadImage = (fileIndex: number) => {
        if (fileIndex < files.length) {
          fileReader.onload = () => {
            const src = fileReader.result;
            const newImage = {
              id: `temp-${Math.random()}`,
              small: src,
              medium: src,
              large: src,
            };
            newImages.push(newImage);
            loadImage(fileIndex + 1);
          };
          fileReader.readAsDataURL(files[fileIndex]);
        } else {
          setUpdatedBrewery({ ...updatedBrewery, images: newImages });
        }
      };
      loadImage(0);
    }
  }, [files]);

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
            {updatedBrewery.images.map((image: Img, i: number) => {
              return (
                <li key={image.id as string} className={S.image}>
                  <Image
                    src={image.small}
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
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              name="file"
              onChange={onChange}
            />
            <button className={S.upload_button} onClick={onButtonClick}>
              업로드
            </button>
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
