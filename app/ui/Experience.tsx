"use client"

import Image from "next/image"
import { useRef } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const Experience = () => {

  const aboutMeRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(aboutMeRef.current, {
      opacity: 0,
      y: 150
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: aboutMeRef.current,
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: 'play none none reverse'
      },
      ease: "power2.inOut",
    });
  }, [])

  return (
    <div ref={aboutMeRef} id="MoreAboutMe" className='flex justify-center py-32 px-5'>
      <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto'>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-32'>
          <div className='flex-1'>
            <h3 className='text-[2.5rem] leading-[3rem] sm:text-[4rem] max-w-[500px] font-[Heading] uppercase sm:leading-[77px]'>Redefining web experiences at
              <span className='text-linkTextColor' style={{
                background: '-webkit-linear-gradient(#610000, #FD511D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}> Cybergineer Solutions</span>.
            </h3>
          </div>
          <div className='flex-1'>
            <p className='mb-6 font-[outfit] text-lg leading-6 font-light'>Currently, I build custom e-commerce solutions at Cybergineer Solutions, collaborating with cross-functional teams to deliver scalable products for clients across the US, UK, and India.
            </p>
            <p className='mb-6 font-[outfit] text-lg leading-6 font-light'>
              Previously, I worked with freelance clients, helping them transform ideas into functional products through clean architecture and thoughtful UI.
            </p>
            <div>
              <span className="uppercase font-[outfit] text-[13px] font-light text-[#fefce899]">Companies i&apos;ve worked with</span>
              <div className="mt-2">
                <Image className="w-32 filter invert" alt="cybergineer solutions" height={50} width={100} src={'/main_images/web-logo-removebg-preview.png'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Experience
