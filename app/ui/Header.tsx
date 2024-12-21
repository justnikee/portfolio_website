"use client";

import Link from "next/link";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

type Props = {};

const links = ["About", "Uses", "Work", "Post", "Gallery"];

const Header = (props: Props) => {
    const header = useRef<HTMLHeadingElement>(null);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const contactRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        links.forEach((link) => {
            sectionRefs.current[link] = document.getElementById(link);
        });
        contactRef.current = document.getElementById("Contact");
    }, []);

    useEffect(() => {
        if (header.current) {
            gsap.fromTo(
                header.current,
                {
                    y: -100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 2,
                    ease: "power3.out",
                }
            );
        }
    }, []);

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        event.preventDefault();
        const targetRef = sectionRefs.current[link];
        if (targetRef) {
            const headerOffset = 100;
            const elementPosition = targetRef.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (contactRef.current) {
            const headerOffset = 100;
            const elementPosition = contactRef.current.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <header ref={header} className="w-full pt-5 sticky top-0 z-10 opacity-0">
            <div
                className="max-w-[800px] h-[52px] m-auto flex items-center justify-between w-full bg-[hsla(0,0%,5%,.6)] rounded-[100px] py-2 px-6 border border-[#212121]"
                style={{
                    boxShadow: "0 .6px .6px -1.25px rgba(0,0,0,.467),0 2.2px 2.2px -2.5px rgba(0,0,0,.41),0 10px 10px -3.75px rgba(0,0,0,.16)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <div>
                    <Link href={"/"}>
                        <Image width={90} height={40} alt="Nikhil Logo" src="/main_images/NIKHIL.png" />
                    </Link>
                </div>
                <div className="flex gap-4">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={`#${link}`}
                            className="font-[outfit] scroll-link"
                            onClick={(e) => handleLinkClick(e, link)}
                        >
                            <span>{link}</span>
                        </a>
                    ))}
                </div>
                <div>
                    <a
                        className="bg-white px-6 py-2 text-black rounded-full font-[outfit]"
                        href="#Contact"
                        onClick={handleContactClick}
                    >
                        Contact
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
