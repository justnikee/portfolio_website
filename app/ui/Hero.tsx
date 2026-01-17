"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLoading } from '../context/LoadingContext';

const Hero = () => {
    const { isLoading } = useLoading();

    const headingOne = useRef<HTMLSpanElement>(null);
    const headingTwo = useRef<HTMLSpanElement>(null);
    const headingThree = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Only start animations after preloader is complete
        if (isLoading) return;

        if (headingOne.current && headingTwo.current && headingThree.current) {
            // Initial Fade In Stagger
            const tlInit = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

            tlInit.fromTo(headingOne.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, delay: 0.2 }
            )
                .fromTo(headingTwo.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1 },
                    "-=0.7"
                )
                .fromTo(headingThree.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1 },
                    "-=0.7"
                );

            // Gentle "Wobble" for Heading Two ("Things") - Subtle keep-alive
            gsap.to(headingTwo.current, {
                rotation: 2,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2.2
            });

            // Smooth Loop Animation for Heading Three ("For Web")
            // Transitions cleanly between solid white and outline
            const tlLoop = gsap.timeline({ repeat: -1, repeatDelay: 1, delay: 2 });

            tlLoop.to(headingThree.current, {
                color: 'transparent',
                webkitTextStroke: '1px white',
                duration: 1.2,
                ease: "power2.inOut"
            })
                .to(headingThree.current, {
                    color: 'white',
                    webkitTextStroke: '0px transparent', // animate back to 0 width to fade it out cleanly
                    duration: 1.2,
                    ease: "power2.inOut",
                    delay: 1 // hold the outline state for a moment
                });
        }
    }, [isLoading]);

    return (
        <div className='flex justify-center py-32 mt-[72px]'>
            <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto'>
                <div className='flex justify-center'>
                    <h1 className='font-[MainFont] text-[100px] leading-[60px] uppercase font-bold text-center md:leading-[100px]' style={{
                        fontSize: 'clamp(4rem, 10vw, 7rem)',
                        textShadow: '0 5px 10px rgba(0, 87, 255, .1), 0 -5px 8px rgba(255, 90, 0, .15), 0 0 15px hsla(0, 0%, 100%, .15)'
                    }}>
                        <span ref={headingOne} className='block opacity-0'>Cooking</span>
                        <span ref={headingTwo} className='block opacity-0'>Things</span>
                        <span ref={headingThree} className='block opacity-0'>For Web</span>
                    </h1>
                </div>
                <div className='animation_object absolute top-0 left-1/2'>

                </div>
            </div>
        </div>
    )
}

export default Hero;