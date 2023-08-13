"use client";

import React, { useState } from "react";
import S from "./Contact.module.scss";
import useDebounce from "@/utils/useDebounce";
import MouseClick from "@/types/MouseClick";
import LocationIcon from "@/app/icons/LocationIcon";
import PhoneIcon from "@/app/icons/PhoneIcon";
import LinkIcon from "@/app/icons/LinkIcon";
import InstagramIcon from "@/app/icons/InstagramIcon";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import useModal from "@/utils/useModal";
import OfficeHours from "@/types/OfficeHours";
import ClockIcon from "@/app/icons/ClockIcon";
import ChevronIcon from "@/app/icons/ChevronIcon";

const Contact = ({
  stateProvince,
  city,
  address,
  phone,
  websiteType,
  websiteUrl,
  officeHours,
  summarizedOfficeHours,
}: Pick<
  BreweryDetailsProps,
  | "stateProvince"
  | "city"
  | "address"
  | "phone"
  | "websiteUrl"
  | "officeHours"
  | "websiteType"
  | "summarizedOfficeHours"
>) => {
  const [showNotification, setShowNotification] = useState(false);
  const debouncedSetShowNotification = useDebounce(() => {
    setShowNotification(false);
  });
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const phoneNumber = phone.replaceAll("-", "");
  const today = new Date().getDay();
  const day = ["일", "월", "화", "수", "목", "금", "토"][today];
  const operatingHours = officeHours[day as keyof OfficeHours];
  const { openTime, closeTime, breakTime, lastOrder } = operatingHours;
  const {
    modalRef,
    openModal,
    handleCloseModal,
    officeHourComponents,
    closeModalButton,
  } = useModal(summarizedOfficeHours);
  const handleClick = (e: MouseClick) => {
    navigator.clipboard.writeText(fullAddress);
    setShowNotification(true);
    debouncedSetShowNotification();
  };
  const WebsiteIcon =
    websiteType === "홈페이지" ? <LinkIcon /> : <InstagramIcon />;
  const BreakTime = breakTime ? (
    <div className={S.content}>
      <div>브레이크 타임</div>
      <time>
        {breakTime.startTime} - {breakTime.endTime}
      </time>
    </div>
  ) : (
    <></>
  );
  const LastOrder = lastOrder ? (
    <div className={S.content}>
      <div>라스트 오더</div>
      <time>{lastOrder}</time>
    </div>
  ) : (
    <></>
  );

  return (
    <section className={S.main}>
      <address className={S.address_box} onClick={handleClick}>
        <LocationIcon />
        <span>{fullAddress}</span>
        <div
          className={`${S.notification} ${
            showNotification && S.show_notification
          }`}
        >
          주소를 복사했습니다.
        </div>
      </address>
      <div className={S.office_hours_box}>
        <ClockIcon />
        <details className={S.details}>
          <summary className={S.summary}>
            <p className={S.today}>오늘({day})</p>
            <div className={S.office_hours_inner_box}>
              {openTime !== "closed" ? (
                <time>
                  {openTime} - {closeTime}
                </time>
              ) : (
                <span className={S.closed}>정기 휴무일</span>
              )}
              <div>
                <ChevronIcon />
              </div>
            </div>
          </summary>
          {BreakTime}
          {LastOrder}
          <div className={S.content}>
            <button className={S.modal_button} onClick={openModal}>
              다른 날 영업 시간 확인
            </button>
            <dialog
              className={S.modal}
              ref={modalRef}
              onClose={handleCloseModal}
            >
              <h3 className={S.summarize_title}>영업 시간 안내</h3>
              {officeHourComponents.openDayComponents}
              {officeHourComponents.closedComponent}
              {closeModalButton}
            </dialog>
          </div>
        </details>
      </div>
      <div className={S.phone_box}>
        <PhoneIcon />
        <a href={`tel:${phoneNumber}`} className={S.phone_number}>
          {phone}
        </a>
      </div>
      <div className={S.site_box}>
        {WebsiteIcon}
        <a href={websiteUrl} target="_blank" className={S.site_url}>
          {websiteType}
        </a>
      </div>
    </section>
  );
};

export default Contact;
