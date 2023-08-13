import { useRef, useEffect, useState } from "react";

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향
  };
  isContentAreaTouched: boolean;
}

export function useBottomSheet(MIN_Y: number, MAX_Y: number) {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
  });

  // Touch Event 핸들러들을 등록한다.
  useEffect(() => {
    const sheetCurrent = sheet.current!;

    const canUserMoveBottomSheet = () => {
      const { isContentAreaTouched } = metrics.current;
      return !isContentAreaTouched;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = "down";
      } else if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = "up";
      }

      if (canUserMoveBottomSheet()) {
        e.preventDefault();
        // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
        const touchDistance = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchDistance;

        // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }

        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        // sheet 위치 갱신.
        sheet.current!.style.setProperty(
          "transform",
          `translateY(${nextSheetY - MAX_Y}px)`
        );
      } else {
        // 컨텐츠를 스크롤하는 동안에는 body가 스크롤되는 것을 막습니다
        document.body.style.overflowY = "hidden";
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = "auto";
      const { touchStart } = metrics.current;

      // Snap Animation
      const currentSheetY = sheet.current!.getBoundingClientRect().y;
      const distance = currentSheetY - touchStart.touchY;

      if (distance <= -100 || (distance < 100 && distance > 0)) {
        sheet.current!.style.setProperty(
          "transform",
          `translateY(${-MAX_Y}px)`
        );
        if (!isMapOpen) setIsMapOpen(true);
      }
      if (distance >= 100 || (distance > -100 && distance < 0)) {
        sheet.current!.style.setProperty("transform", `translateY(${0}px`);
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: "none",
        },
        isContentAreaTouched: false,
      };
    };

    sheetCurrent.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    sheetCurrent.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    sheetCurrent.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      sheetCurrent.removeEventListener("touchstart", handleTouchStart);
      sheetCurrent.removeEventListener("touchmove", handleTouchMove);
      sheetCurrent.removeEventListener("touchend", handleTouchEnd);
    };
  }, [sheet.current]);

  useEffect(() => {
    const contentCurrent = content.current!;
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };

    contentCurrent.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    return () =>
      contentCurrent.removeEventListener("touchstart", handleTouchStart);
  }, []);

  return { sheet, isMapOpen, content };
}
