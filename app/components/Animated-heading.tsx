"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function AnimatedHeading({heading}: {heading: string}){
    
    const animate_heading = useRef<HTMLHeadingElement>(null);
    
    useGSAP(() => {
         const split = new SplitText(animate_heading.current , {type: "chars,words"});
         
         gsap.fromTo(split.chars, {
             y: 30,
             opacity: 0
         }, {
           y: 0,
           opacity: 1,
           scrollTrigger: {
                trigger: animate_heading.current,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
                markers: true,
             },
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
         })

    }, [])

    return(
        <>
          <h2 ref={animate_heading} className="text-5xl leading-[3.5rem] sm:text-[5rem] font-[Heading] uppercase sm:leading-[5rem] text-center">{heading}</h2>
        </>
    )
}