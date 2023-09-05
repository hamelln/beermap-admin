"use client";

import MouseClick from "@/types/MouseClick";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type Event =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | MouseClick;

const useFormData = (onChange: Dispatch<SetStateAction<Object>>) => {
  const [selectedDay, setSelectedDay] = useState<string>("월");

  const handleFormData = (e: Event) => {
    if ("name" in e.target && "value" in e.target) {
      const name = e.target.name;
      const input = e.target.value;
      if (typeof name === "string" && typeof input === "string") {
        switch (name) {
          case "phone":
            handlePhone(input, handleForm);
            break;
          case "address":
            handleFullAddress(input);
            break;
          case "websiteUrl":
            handleWebsiteUrl(input);
            break;
          case "breweryDescription":
            handleAutoResizeTextarea(e.target);
            handleForm(name, input);
            break;
          case "beerDescription":
            handleAutoResizeTextarea(e.target);
            handleForm(name, input);
            break;
          case "openTime":
            handleTime(name, input);
            break;
          case "closeTime":
            handleTime(name, input);
            break;
          case "lastOrder":
            handleTime(name, input);
            break;
          case "startTime":
            handleTime(name, input);
            break;
          case "endTime":
            handleTime(name, input);
            break;
          case "day":
            const day = e.target.textContent!;
            setSelectedDay(day);
            break;
          default:
            handleForm(name, input);
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

  const handleAutoResizeTextarea = (textarea: any) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleFullAddress = (input: string) => {
    const addressParts = input.split(" ");
    if (addressParts.length >= 2) {
      handleForm("stateProvince", addressParts[0]);
      handleForm("city", addressParts[1]);
    }
    handleForm("fullAddress", input);
  };

  const handlePhone = (input: string, onChange: any) => {
    const numericInput = input.replace(/\D/g, "");
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
    onChange("phone", formattedPhone);
  };

  const handleWebsiteUrl = (input: string) => {
    if (input.includes("instagram")) {
      handleForm("websiteType", "인스타그램");
    } else {
      handleForm("websiteType", "홈페이지");
    }
    handleForm("websiteUrl", input);
  };

  const handleTime = (name: string, input: string) => {
    const numericValue = input.replace(/\D/g, "");
    const formattedValue =
      numericValue.length <= 2
        ? numericValue
        : numericValue.slice(0, 2) + ":" + numericValue.slice(2, 4);
    if (numericValue.length <= 4) {
      handleOfficeHours(name, formattedValue);
    }
  };

  return { handleFormData, selectedDay };
};

export default useFormData;
