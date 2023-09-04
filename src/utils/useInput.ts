const useInput = (handleFormChange: any, handleOfficeHoursChange: any) => {
  const handleInput = (e: any) => {
    const name = e.target.name;
    const input = e.target.value;
    switch (name) {
      case "phone":
        handlePhoneChange(input, handleFormChange);
        break;
      case "address":
        handleFullAddressChange(input);
        break;
      case "websiteUrl":
        handleWebsiteUrlChange(input);
        break;
      case "breweryDescription":
        handleAutoResizeTextarea(e.target);
        handleFormChange(name, input);
        break;
      case "beerDescription":
        handleAutoResizeTextarea(e.target);
        handleFormChange(name, input);
        break;
      case "openTime":
        handleTimeInputChange(name, input);
        break;
      case "closeTime":
        handleTimeInputChange(name, input);
        break;
      case "lastOrder":
        handleTimeInputChange(name, input);
        break;
      case "startTime":
        handleTimeInputChange(name, input);
        break;
      case "endTime":
        handleTimeInputChange(name, input);
        break;
      default:
        handleFormChange(name, input);
        break;
    }
  };

  const handleAutoResizeTextarea = (textarea: any) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleFullAddressChange = (input: string) => {
    const addressParts = input.split(" ");
    if (addressParts.length >= 2) {
      handleFormChange("stateProvince", addressParts[0]);
      handleFormChange("city", addressParts[1]);
    }
    handleFormChange("fullAddress", input);
  };

  const handlePhoneChange = (input: string, onChange: any) => {
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

  const handleWebsiteUrlChange = (input: string) => {
    if (input.includes("instagram")) {
      handleFormChange("websiteType", "인스타그램");
    } else {
      handleFormChange("websiteType", "홈페이지");
    }
    handleFormChange("websiteUrl", input);
  };

  const handleTimeInputChange = (name: string, input: string) => {
    const numericValue = input.replace(/\D/g, "");
    const formattedValue =
      numericValue.length <= 2
        ? numericValue
        : numericValue.slice(0, 2) + ":" + numericValue.slice(2, 4);
    if (numericValue.length <= 4) {
      handleOfficeHoursChange(name, formattedValue);
    }
  };

  return handleInput;
};

export default useInput;
