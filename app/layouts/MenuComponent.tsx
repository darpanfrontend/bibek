import React from 'react';
import { domAnimation, LazyMotion, m } from "framer-motion";
import Link from 'next/link';
const MenuComponent = ({menu,openMenu}) => {
    return (
        <LazyMotion features={domAnimation}>
            <m.div animate={menu ? "visible" : "hidden"}
                variants={{
                    visible: {opacity:1,pointerEvents:"initial", transition:{delay:0}},
                    hidden: {opacity:0,pointerEvents:"none", transition:{delay:0.5}}
                }}
                initial="hidden" transition={{duration:0.25}} className="h-screen overflow-hidden w-screen fixed top-0 left-0 flex justify-end z-[100] ease-out-quint text-white">
                <m.div 
                animate={menu ? "visible" : "hidden"}
                variants={{
                    visible: {opacity:1, transition:{delay:0.25}},
                    hidden: {opacity:0, transition:{delay:0.4}}
                }} transition={{duration:0.25}} className='absolute top-12 right-12 z-[2]'>
                    <span className="material-icons-outlined text-5xl" onClick={openMenu}>close</span>
                </m.div>
                <div className='w-full md:lg-10/12 lg:w-9/12 xl:8/12 h-full bg-gray-900 relative z-[1] flex items-center'>
                    <ul className='p-8 sm:p-20 md:p-28 lg:px-32 xl:px-36 2xl:px-40'>
                        <li className='overflow-hidden py-8'>
                            <Link href={"/about"} onClick={openMenu} className='w-full text-6xl md:text-7xl xl:text-8xl font-bold block overflow-hidden'>
                                <m.span 
                                    animate={menu ? "visible" : "hidden"} 
                                    variants={{
                                        visible: {bottom:0,transition:{delay:0.5}},
                                        hidden: {bottom:"-400px",transition:{delay:0.3}}
                                    }} 
                                    transition={{duration:0.25}} className='pointer-events-none relative'>
                                        About.
                                    </m.span>
                            </Link>
                        </li>
                        <li className='overflow-hidden py-8'>
                            <Link href={"/gallery"} onClick={openMenu} className='w-full text-6xl md:text-7xl xl:text-8xl font-bold block overflow-hidden'>
                                <m.span 
                                    animate={menu ? "visible" : "hidden"} 
                                    variants={{
                                        visible: {bottom:0,transition:{delay:0.5}},
                                        hidden: {bottom:"-400px",transition:{delay:0.3}}
                                    }}
                                    transition={{duration:0.25}} className='pointer-events-none relative'>
                                        My Works.
                                    </m.span>
                            </Link>
                        </li>
                        <li className='overflow-hidden py-8 pb-20'>
                            <Link href={"/contact"} onClick={openMenu} className='w-full text-6xl md:text-7xl xl:text-8xl font-bold block overflow-hidden'>
                                <m.span 
                                    animate={menu ? "visible" : "hidden"} 
                                    variants={{
                                        visible: {bottom:0,transition:{delay:0.5}},
                                        hidden: {bottom:"-400px",transition:{delay:0.3}}
                                    }}
                                    transition={{duration:0.25}} className='pointer-events-none relative'>
                                        Contact.
                                    </m.span>
                            </Link>
                        </li>
                        <li className='pt-20 border-t border-gray-800 flex flex-wrap items-center overflow-hidden'>
                            <m.span 
                            animate={menu ? "visible" : "hidden"}
                            variants={{
                                visible: {left:"0px", transition:{delay:0.75}},
                                hidden: {left:"-1000px", transition:{delay:0.2}}
                            }} transition={{duration:0.25}} className='block relative'>
                                <a href={'#'} className='inline-block text-2xl mr-2 last:mr-0 leading-tight'>Facebook | </a>
                                <a href={'#'} className='inline-block text-2xl mr-2 last:mr-0 leading-tight'>Instagram | </a>
                                <a href={'#'} className='inline-block text-2xl mr-2 last:mr-0 leading-tight'>Twitter | </a>
                                <a href={'#'} className='inline-block text-2xl mr-2 last:mr-0 leading-tight'>Linked In</a>
                            </m.span>
                        </li>
                    </ul>
                </div>
                <m.div 
                animate={menu ? "visible" : "hidden"}
                variants={{
                    visible: {height:"100%",transition:{delay:0}},
                    hidden: {height:"0%",transition:{delay:0.5}}
                }} transition={{duration:0.25}} className="absolute  w-full bg-white bg-opacity-75 filter blur-sm top-0 left-0 z-0"/>
            </m.div>
        </LazyMotion>
    )
}

export default MenuComponent;