"use client"
import { useRef } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useFollowPointer } from "app/components/js/useFollowPointer";

export default function CustomCursor() {
  const ref = useRef(null);
  const { x, y, isHovered, opacity } = useFollowPointer(ref);

  return (
    <LazyMotion features={domAnimation}>
    <m.div
      ref={ref}
      className={`${isHovered ? "w-32 h-32": "w-24 h-24"} bg-orange-900 bg-opacity-100 mix-blend-difference opacity-10 pointer-events-none rounded-full fixed z-[300] transition-[width,height] flex items-center justify-center duration-100 ease-linear`}
      animate={{ x, y,opacity }}
      transition={{
        type: "spring",
        stiffness: 100,
      }}
    >
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="w-[calc(100%-2rem)] h-[calc(100%-2rem)] bg-gray-900 rounded-full flex items-center justify-center transition-[width,height] duration-100 ease-linear mix-blend-exclusion">
          <span className={`${isHovered ? "w-4 h-4" : "w-2 h-2"} transition-[width,height] duration-100 ease-linear bg-orange-900 rounded-full`} />
        </div>
      </div>
    </m.div>
    </LazyMotion>
  );
}
