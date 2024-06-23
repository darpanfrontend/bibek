import { useState, RefObject, useEffect } from "react";

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, isHovered:false, opacity:0 });

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY, target }: MouseEvent) => {
      const element = ref.current!;
      const targetElement = target as HTMLElement;

      const x = clientX - element.offsetLeft - element.offsetWidth / 2;
      const y = clientY - element.offsetTop - element.offsetHeight / 2;
      const isHovered = targetElement.tagName.toLowerCase() === "a" || targetElement.tagName.toLowerCase() === "button";
      setMouse({ x, y, isHovered,opacity:1 });
    };

    const handleMouseOut = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY,isHovered:false, opacity: 0 });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mouseout", handleMouseOut);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref]);

  return mouse;
}
