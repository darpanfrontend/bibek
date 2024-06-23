"use client"
import React, { FC, lazy, useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import { domAnimation, LazyMotion, m, useMotionValueEvent, useScroll } from "framer-motion";
import get_image_from_path from 'app/components/actions/image_path';
const MenuComponent = lazy(() => import('app/layouts/MenuComponent'));
const SiteHeader = ({siteInfo}) => {
    const [menu,setMenu] = useState(false);
    const [stick,setStick] = useState(true);
    const { scrollY } = useScroll()
    function openMenu(){
        setMenu(!menu);
    }
    useMotionValueEvent(scrollY, "change", (latest) => {
        setStick(latest > 50 ? false : true)
    })
    return (
        <LazyMotion features={domAnimation}>
            <m.header transition={{duration:0.25}} 
            animate={stick ? "visible" : "hidden"}
            variants={{
                visible: {top:"32px"},
                hidden: {top:"-200px"}
            }}
            initial="visible" className="fixed z-50 w-full lg:py-8 transition-[top] duration-300 ease-bouncy">
                <div className="px-8 mx-auto relative">
                    <div className="flex flex-wrap justify-between relative z-[1]">
                        <div className="items-center flex">
                            <Link href={"/"} className="w-full block h-[40px] sm:h-[50px] relative">
                                <Image
                                    src={get_image_from_path(siteInfo.images[0].source)}
                                    alt={siteInfo.images[0].alt}
                                    className='h-full w-auto'
                                    width={150}
                                    height={40}
                                    priority
                                />                    
                            </Link>
                        </div>
                        <button className={`flex items-center uppercase font-bold`} onClick={openMenu}>
                            Menu
                            <div className='ml-4 w-[40px] h-[35px] border border-gray-900 px-2 py-3 pointer-events-none'>
                                <div className='w-full h-full relative'>
                                    <span className='h-0.5 w-full bg-gray-900 absolute top-0 left-1/2 transform -translate-x-1/2' />
                                    <span className='h-0.5 w-full bg-gray-900 absolute bottom-0 left-1/2 transform -translate-x-1/2' />
                                </div>
                            </div>
                        </button>
                    </div>
                </div> 
                <m.div transition={{duration:0.25}} 
                    animate={stick ? "hidden" : "visible"}
                    variants={{
                        hidden: {bottom:"-200px"},
                        visible: {bottom:"32px"}
                    }}
                    initial="hidden" className='fixed left-0 w-full transition-[bottom] duration-300 ease-bouncy'>
                    <div className='xl:max-w-8xl lg:max-w-7xl md:max-w-4xl sm:max-w-2xl mx-auto relative flex justify-end'>
                        <div className='bg-white p-4 border border-gray-50'>
                            <button className={`flex items-center uppercase font-bold`} onClick={openMenu}>
                                Menu
                                <div className='ml-4 w-[40px] h-[35px] border border-gray-900 px-2 py-3 pointer-events-none'>
                                    <div className='w-full h-full relative'>
                                        <span className='h-0.5 w-full bg-gray-900 absolute top-0 left-1/2 transform -translate-x-1/2' />
                                        <span className='h-0.5 w-full bg-gray-900 absolute bottom-0 left-1/2 transform -translate-x-1/2' />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </m.div>
                <MenuComponent menu={menu} openMenu={openMenu} />
            </m.header>
        </LazyMotion>
    )
}

export default SiteHeader;