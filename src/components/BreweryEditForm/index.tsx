"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import Img from "@/types/Img";
import MouseClick from "@/types/MouseClick";
import Brewery from "@/types/Brewery";
import useFormData from "@/hooks/useFormData";
import BreweryService from "@/services/BreweryService";
import ImageService from "@/services/ImageService";
import S from "./BreweryEditForm.module.scss";

interface Props {
  brewery: Omit<BreweryDetailsProps, "summarizedOfficeHours">;
}

const BreweryEditForm = ({ brewery }: Props) => {
  const [updatedBrewery, setUpdatedBrewery] = useState<Brewery>({
    ...brewery,
    images: brewery.images ?? [],
  });
  const [fullAddress, setFullAddress] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [totalFiles, setTotalFiles] = useState<any[]>(
    brewery.images ? brewery.images.map((_: any) => "url") : []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const beerDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const breweryDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const days: string[] = ["월", "화", "수", "목", "금", "토", "일"];
  const breweryService = new BreweryService();
  const imageService = new ImageService();

  const { handleFormData, selectedDay } = useFormData(
    setUpdatedBrewery,
    setFullAddress
  );

  const onButtonClick = (e: MouseClick) => {
    e.preventDefault();
    inputRef?.current?.click();
  };

  const onChange = async (e: any) => {
    const files = e.target.files;
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

  const uploadNewImagesAndFetchUrls = async (): Promise<Img[]> => {
    const newFiles = totalFiles.filter((file) => file !== "url");
    const newCloudinaryImages: Img[] = await imageService.upload(newFiles);
    const filteredImages = updatedBrewery.images.filter(
      (image: Img) => !image.id.includes("temp")
    );
    const newImages: Img[] = [...filteredImages, ...newCloudinaryImages];
    return newImages;
  };

  const deleteBrewery = async () => {
    await breweryService.deleteBrewery(brewery.id);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const images: Img[] = await uploadNewImagesAndFetchUrls();
    const updatedBreweryWithNewImages = { ...updatedBrewery, images };
    await breweryService.updateBrewery(updatedBreweryWithNewImages);
    setUpdatedBrewery(updatedBreweryWithNewImages);
  };

  useEffect(() => {
    if (files) {
      const fileReader = new FileReader();
      const newImages = [...updatedBrewery.images];

      const loadImage = (fileIndex: number) => {
        if (fileIndex < files.length) {
          fileReader.onload = () => {
            const src = fileReader.result as string;
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

  useEffect(() => {
    const beerDescription = beerDescriptionRef.current!;
    const breweryDescription = breweryDescriptionRef.current!;
    beerDescription.style.height = beerDescription.scrollHeight + "px";
    breweryDescription.style.height = breweryDescription.scrollHeight + "px";
  }, []);

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
            <p>사진</p>
          </div>
          <ul className={S.image_box}>
            {updatedBrewery.images?.length > 0 &&
              updatedBrewery.images.map((image: Img, i: number) => {
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
              className={S.image_input}
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
              ref={breweryDescriptionRef}
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
              ref={beerDescriptionRef}
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
                  <span>오픈 - 마감</span>
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
                  <span>브레이크 타임</span>
                  <input
                    type="text"
                    placeholder="00:00"
                    value={
                      updatedBrewery.officeHours[selectedDay].breakTime
                        ?.startTime
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
                      updatedBrewery.officeHours[selectedDay].breakTime?.endTime
                    }
                    onChange={handleFormData}
                  />
                </div>
                <div className={S.time_box}>
                  <span>라스트 오더</span>
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

export default BreweryEditForm;
