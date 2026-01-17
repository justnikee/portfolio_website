"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoading } from '../context/LoadingContext';

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const lettersRef = useRef<HTMLSpanElement[]>([]);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [counter, setCounter] = useState(0);
    const { setLoaded } = useLoading();

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial setup
        gsap.set(lettersRef.current, { y: 150, skewY: 10, opacity: 0 });

        // Counter animation (0-100) - Fast and punchy
        const counterAnimation = { value: 0 };
        gsap.to(counterAnimation, {
            value: 100,
            duration: 1.5,
            ease: 'power3.inOut',
            onUpdate: () => {
                setCounter(Math.floor(counterAnimation.value));
            },
        });

        // 1. Aggressive Text Entry usually seen in luxury brands
        tl.to(lettersRef.current, {
            y: 0,
            skewY: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: 'power4.out',
        });

        // 2. Text Wait/Hover state
        tl.to(lettersRef.current, {
            y: -10,
            duration: 1,
            stagger: 0.02,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1
        });

        // 3. The "Kick" Exit
        // Explode text outwards while curtain lifts
        tl.to(lettersRef.current, {
            y: -150,
            skewY: -10,
            opacity: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power3.in',
        }, 'exit');

        tl.to(counterRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power3.in'
        }, 'exit-=0.2');

        // Cinematic Shutter Lift
        tl.to(preloaderRef.current, {
            height: 0,
            duration: 1.2,
            ease: 'expo.inOut',
            onComplete: () => {
                setLoaded();
            },
        }, 'exit+=0.3');

        return () => {
            tl.kill();
        };
    }, [setLoaded]);

    const name = 'Nikhil';

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Massive Name Display */}
            <div className="overflow-hidden relative z-10 mix-blend-difference px-4">
                <h1 className="font-[Heading] text-[15vw] md:text-[12vw] leading-none capitalize tracking-wider italic flex items-center text-[#fffaf5]">
                    {name.split('').map((letter, index) => (
                        <span
                            key={index}
                            ref={(el) => {
                                if (el) lettersRef.current[index] = el;
                            }}
                            className="inline-block origin-bottom"
                        >
                            {letter}
                        </span>
                    ))}
                </h1>
            </div>

            {/* Stylish Large Counter - Bottom Right */}
            <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 overflow-hidden">
                <span
                    ref={counterRef}
                    className="font-[Heading] text-[4rem] md:text-[8rem] leading-none text-[#fff] select-none block"
                >
                    {counter}
                </span>
            </div>
        </div>
    );
};

export default Preloader;
