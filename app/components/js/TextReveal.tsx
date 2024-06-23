"use client"
import { useRef } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useTransform } from 'framer-motion';

const TextReveal = ({ children }) => {
  const textRef = useRef<HTMLDivElement>(null);

  const letterVariants = {
    hidden: { opacity: 0.2 },
    visible: { opacity: 1 },
  };
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], ["0.1", "1"]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div className='leading-tight' ref={textRef}>
        {children.split('').map((char, index) => (
          <m.span
            key={index}
            variants={letterVariants}
            initial="hidden"
            style={{opacity}}
            className='transition-opacity duration-300 ease-linear'
          >
          {char}
          </m.span>
        ))}
      </m.div>
    </LazyMotion>
  );
};


export default TextReveal;