"use client"
import { ReactNode, useRef } from "react";
import { m, useScroll, useSpring, useTransform, useMotionValue, useVelocity,useAnimationFrame, LazyMotion, domAnimation } from "framer-motion";
import { wrap } from "@motionone/utils";
import { bebas_neue } from "app/fonts";

interface ParallaxProps {
  children: ReactNode;
  baseVelocity: number;
  textSize: string;
}

export default function ParallaxText({ textSize, children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);
  const isHovered = useRef(false);

  // Stop animation on mouseover and store current position
  const handleMouseEnter = () => {
    isHovered.current = true;
    baseX.stop();
  };

  // Restart animation on mouseout from the stored position
  const handleMouseLeave = () => {
    if (isHovered.current) {
      isHovered.current = false;
      baseX.set(baseX.get()); // Set baseX to the current position
    }
  };

  useAnimationFrame((t, delta) => {
    if (!isHovered.current) {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className={`overflow-hidden m-0 whitespace-nowrap flex flex-nowrap ${bebas_neue.className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <LazyMotion features={domAnimation}>
      <m.div className={`uppercase ${textSize} whitespace-nowrap flex flex-nowrap`} style={{ x }}>
        <div className="block -ml-8 font-black">{children}</div>
        <div className="block -ml-8 font-black">{children}</div>
        <div className="block -ml-8 font-black">{children}</div>
        <div className="block -ml-8 font-black">{children}</div>
      </m.div>
      </LazyMotion>
    </div>
  );
}
