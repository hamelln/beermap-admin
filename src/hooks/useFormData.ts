"use client";

import Brewery from "@/types/Brewery";
import MouseClick from "@/types/MouseClick";
import { Day } from "@/types/OfficeHours";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type FormEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | MouseClick;

const useFormData = (
  onChange: Dispatch<SetStateAction<Brewery>>,
  setFullAddress: Dispatch<SetStateAction<string>>
) => {
  const [selectedDay, setSelectedDay] = useState<Day>("월");

  const handleFormData = (e: FormEvent) => {
    if ("name" in e.target && "value" in e.target) {
      const key = e.target.name;
      const value = e.target.value;
      if (typeof key === "string" && typeof value === "string") {
        switch (key) {
          case "phone":
            handlePhone(value, handleForm);
            break;
          case "address":
            handleFullAddress(value);
            break;
          case "websiteUrl":
            handleWebsiteUrl(value);
            break;
          case "breweryDescription":
            if (e.target instanceof HTMLTextAreaElement) {
              handleResizeTextarea(e.target);
              handleForm(key, value);
            }
            break;
          case "beerDescription":
            if (e.target instanceof HTMLTextAreaElement) {
              handleResizeTextarea(e.target);
              handleForm(key, value);
            }
            break;
          case "openTime":
            handleTime(key, value);
            break;
          case "closeTime":
            handleTime(key, value);
            break;
          case "lastOrder":
            handleTime(key, value);
            break;
          case "startTime":
            handleTime(key, value);
            break;
          case "endTime":
            handleTime(key, value);
            break;
          case "day":
            const day = <Day>e.target.textContent;
            setSelectedDay(day);
            break;
          default:
            handleForm(key, value);
            break;
        }
      }
    }
  };

  const handleForm = (key: string, value: string) => {
    onChange((updatedBrewery: any) => ({
      ...updatedBrewery,
      [key]: value,
    }));
  };

  const handleOfficeHours = (key: string, value: string) => {
    if (key !== "startTime" && key !== "endTime") {
      onChange((updatedBrewery: any) => ({
        ...updatedBrewery,
        officeHours: {
          ...updatedBrewery.officeHours,
          [selectedDay]: {
            ...updatedBrewery.officeHours[selectedDay],
            [key]: value,
          },
        },
      }));
    } else {
      onChange((updatedBrewery: any) => ({
        ...updatedBrewery,
        officeHours: {
          ...updatedBrewery.officeHours,
          [selectedDay]: {
            ...updatedBrewery.officeHours[selectedDay],
            breakTime: {
              ...updatedBrewery.officeHours[selectedDay].breakTime,
              [key]: value,
            },
          },
        },
      }));
    }
  };

  const handleResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleFullAddress = (value: string) => {
    const addressParts = value.split(" ");
    const [state, city, ...address] = addressParts;
    handleForm("stateProvince", state);
    handleForm("city", city);
    handleForm("address", address.join(" "));
    setFullAddress(value);
  };

  const handlePhone = (
    value: string,
    handleForm: (key: string, value: string) => void
  ) => {
    const numericInput = value.replace(/\D/g, "");
    const SEOUL_SHORT = /^(\d{2})(\d{1,3})(\d{0,4})$/;
    const SEOUL_MEDIUM = /^(\d{2})(\d{1,4})(\d{0,4})$/;
    const MEDIUM = /^(\d{3})(\d{1,3})(\d{0,4})$/;
    const PHONE = /^(\d{3})(\d{1,4})(\d{0,4})$/;
    const LONG = /^(\d{4})(\d{1,4})(\d{0,4})$/;

    const format = (regex: RegExp) => {
      return numericInput.replace(regex, (_, p1, p2, p3) => {
        return p3 ? `${p1}-${p2}-${p3}` : p2 ? `${p1}-${p2}` : p1;
      });
    };

    const trans = (numericInput: string) => {
      const len = numericInput.length;
      if (numericInput[0] + numericInput[1] === "02") {
        if (len <= 9) return format(SEOUL_SHORT);
        if (len <= 10) return format(SEOUL_MEDIUM);
      }
      if (len <= 10) return format(MEDIUM);
      if (len === 11) return format(PHONE);
      return format(LONG);
    };

    const formattedPhone = trans(numericInput);
    handleForm("phone", formattedPhone);
  };

  const handleWebsiteUrl = (value: string) => {
    if (value.includes("instagram")) {
      handleForm("websiteType", "인스타그램");
    } else {
      handleForm("websiteType", "홈페이지");
    }
    handleForm("websiteUrl", value);
  };

  const handleTime = (key: string, value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue =
      numericValue.length <= 2
        ? numericValue
        : numericValue.slice(0, 2) + ":" + numericValue.slice(2, 4);
    if (numericValue.length <= 4) {
      handleOfficeHours(key, formattedValue);
    }
  };

  return { handleFormData, selectedDay };
};

export default useFormData;
