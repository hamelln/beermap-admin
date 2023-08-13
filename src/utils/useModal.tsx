import { ReactElement, useEffect, useRef } from "react";

export default function useModal(summarizedOfficeHours: string[][]) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const summarizeHourBoxStyle = {
    padding: "0.6rem",
    lineHeight: "20px",
  };

  const summarizeCloseButtonStyle = {
    border: "2px solid var(--color-font-primary)",
    borderRadius: "var(--border-radius-primary)",
    padding: "10px",
  };

  const createHourBox = (
    days: string,
    officeHour: string,
    breakTime: string
  ) => {
    if (officeHour === "closed") {
      return (
        <div style={summarizeHourBoxStyle} key={days}>
          <p>매주 {days}요일은 쉽니다</p>
        </div>
      );
    }
    if (breakTime === "none") {
      return (
        <div style={summarizeHourBoxStyle} key={days}>
          <p>{days}</p>
          <time>{officeHour}</time>
        </div>
      );
    }
    return (
      <div style={summarizeHourBoxStyle} key={days}>
        <p>{days}</p>
        <time>{officeHour}</time>
        <p>브레이크 타임</p>
        <time>{breakTime}</time>
      </div>
    );
  };

  const temp: {
    openDayComponents: ReactElement[];
    closedComponent: ReactElement;
  } = {
    openDayComponents: [],
    closedComponent: <></>,
  };

  const officeHourComponents = summarizedOfficeHours.reduce(
    (acc, summarizedOfficeHour) => {
      const [days, officeHour, breakTime] = summarizedOfficeHour;
      if (officeHour === "closed") {
        acc.closedComponent = createHourBox(days, officeHour, breakTime);
      } else {
        acc.openDayComponents.push(createHourBox(days, officeHour, breakTime));
      }
      return acc;
    },
    temp
  );

  const openModal = () => {
    modalRef.current?.showModal();
    document.body.style.opacity = "0.7";
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    document.body.style.opacity = "1";
    document.body.style.overflow = "auto";
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const isClickOutsideModal = (e: any) => {
    const rect = modalRef.current?.getBoundingClientRect();
    const touch = e.changedTouches[0];
    if (
      rect &&
      (touch.clientX < rect.left ||
        touch.clientX > rect.right ||
        touch.clientY < rect.top ||
        touch.clientY > rect.bottom)
    ) {
      modalRef.current?.close();
    }
  };

  const closeModalButton = (
    <div style={summarizeHourBoxStyle} onClick={closeModal}>
      <p style={summarizeCloseButtonStyle}>닫기</p>
    </div>
  );

  useEffect(() => {
    document.body.addEventListener("touchend", isClickOutsideModal, {
      passive: true,
    });
    return () => {
      document.body.removeEventListener("touchend", isClickOutsideModal);
    };
  }, []);

  return {
    modalRef,
    openModal,
    handleCloseModal,
    officeHourComponents,
    closeModalButton,
  };
}
