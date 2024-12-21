"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type Props = {}

const Hero = (props: Props) => {

    const headingOne = useRef<HTMLSpanElement>(null);
    const headingTwo = useRef<HTMLSpanElement>(null);
    const headingThree = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (headingOne.current && headingTwo.current && headingThree.current) {
            gsap.fromTo(headingOne.current, 
                { y: 100, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
            );
            gsap.fromTo(headingTwo.current, 
                { y: 100, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, delay: 1, ease: 'power3.out' }
            );
            gsap.fromTo(headingThree.current, 
                { y: 100, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: 'power3.out' }
            );

            gsap.to(headingThree.current, {
                duration: 1,
                repeat: -1,
                delay: 5,
                repeatDelay: 1,
                yoyo: true,
                textStroke: '1px hsl(0, 0%, 100%)',
                color: 'transparent',
            });
        }
    }, []);

    return (
        <div className='flex justify-center py-32'>
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
            </div>
        </div>
    )
}

export default Hero;