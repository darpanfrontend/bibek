"use client"
import { FC, ReactNode } from 'react';
import { bebas_neue } from 'app/fonts';

interface HeadingTextProps {
  level: number;
  classList: string;
  children: ReactNode;
}

const HeadingText: FC<HeadingTextProps> = ({ level, classList, children, ...rest }) => {
  return (
    <>
    {
      level == 1 &&
      <h1 {...rest} className={`leading-none heading-text ${classList} ${bebas_neue.className} transition-colors duration-300 ease-out-quint`}>
        {children}
      </h1>
    }
    {
      level == 2 &&
      <h2 {...rest} className={`leading-none heading-text ${classList} ${bebas_neue.className} transition-colors duration-300 ease-out-quint`}>
        {children}
      </h2>
    }
    {
      level == 3 &&
      <h3 {...rest} className={`leading-none heading-text ${classList} ${bebas_neue.className} transition-colors duration-300 ease-out-quint`}>
        {children}
      </h3>
    }
    {
      level == 4 &&
      <h4 {...rest} className={`leading-none heading-text ${classList} ${bebas_neue.className} transition-colors duration-300 ease-out-quint`}>
        {children}
      </h4>
    }
    {
      level == 5 &&
      <h5 {...rest} className={`leading-none heading-text ${classList} ${bebas_neue.className} transition-colors duration-300 ease-out-quint`}>
        {children}
      </h5>
    }
    {
      level == 6 &&
      <h6 {...rest} className={`leading-none heading-text ${classList} ${bebas_neue.className} transition-colors duration-300 ease-out-quint`}>
        {children}
      </h6>
    }
    </>
  );
}

export default HeadingText;