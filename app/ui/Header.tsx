"use client";

import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const links = ["About", "Uses", "Work", "Post", "Gallery"];

const Header = () => {

const [scrollDown, setScrollDown] = useState(false);
const lastScrollY = useRef(0);

  useEffect(() => {
    function checkScrollDown() {
      const scrollY = window.scrollY;

      if(scrollY > lastScrollY.current){
          setScrollDown(true);
      }else{
          setScrollDown(false);
      }
      lastScrollY.current = scrollY;
      
    }

    window.addEventListener("scroll", checkScrollDown);

    return () => {
      window.removeEventListener("scroll", checkScrollDown);
    };
  }, []);


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

    const hamtopLine = useRef<HTMLDivElement>(null);
    const hambottomLine = useRef<HTMLDivElement>(null);
    const drawer = useRef<HTMLDivElement>(null);
    const navLinks = useRef<(HTMLAnchorElement | null)[]>([]);

    const handleClick = () => {
        if (hamtopLine.current && hambottomLine.current && drawer.current) {
            const top = hamtopLine.current;
            const bottom = hambottomLine.current;
            const mobDrawer = drawer.current;
            top.classList.toggle('rotate-45');
            top.classList.toggle('translate-x-[1px]');
            top.classList.toggle('translate-y-[5px]');

            bottom.classList.toggle('-rotate-45');
            bottom.classList.toggle('w-5');
            bottom.classList.toggle('translate-x-[1px]');
            bottom.classList.toggle('translate-y-[-3px]');
            mobDrawer.classList.toggle('left-[0px]');
        }

        gsap.fromTo(
            navLinks.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
        );
    };

    return (
        <header ref={header} className={`w-full pt-5 fixed z-10 opacity-0 transition-all`}
        style={{ top: scrollDown ? "-72px" : "0px", opacity: 1 }}
        >
            <div
                className="hidden max-w-[800px] h-[52px] m-auto sm:flex items-center justify-between w-full bg-[hsla(0,0%,5%,.6)] rounded-[100px] py-2 px-6 border border-[#212121]"
                style={{
                    boxShadow: "0 .6px .6px -1.25px rgba(0,0,0,.467),0 2.2px 2.2px -2.5px rgba(0,0,0,.41),0 10px 10px -3.75px rgba(0,0,0,.16)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <div>
                    <Link href={"/"} legacyBehavior>
                        <a>
                            <Image width={90} height={40} alt="Nikhil Logo" src="/main_images/NIKHIL.png" />
                        </a>
                    </Link>
                </div>
                <div className="flex gap-4">
                    {links.map((link, index) => (
                        <Link key={index} href={link === "Post" ? "/posts" : `/#${link}`} legacyBehavior>
                            <a
                                className="font-[outfit] scroll-link"
                                onClick={(e) => link !== "Post" && handleLinkClick(e, link)}
                            >
                                <span>{link}</span>
                            </a>
                        </Link>
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
            <div className="sm:hidden relative">
                <div className="flex justify-between items-center px-4 z-30 relative">
                    <Link href={"/"} legacyBehavior>
                        <a>
                            <Image width={90} height={40} alt="Nikhil Logo" src="/main_images/NIKHIL.png" />
                        </a>
                    </Link>
                    <div className="">
                        <button onClick={handleClick} className="bg-[hsla(0,0%,5%,.6)] border border-[#212121] p-2 rounded-full flex flex-col gap-1.5 px-3 py-3 backdrop-blur-3xl">
                            <div ref={hamtopLine} className="block h-[2px] rounded-full w-5 bg-white transition-all">
                            </div>
                            <div ref={hambottomLine} className="block h-[2px] rounded-full w-3 bg-white transition-all">
                            </div>
                        </button>
                    </div>
                </div>
                <div ref={drawer} className="-left-[100%] transition-all h-screen fixed top-0 w-full bg-[hsla(0,0%,5%,.6)] backdrop-blur-3xl z-20">
                    <div className="px-5 py-5 h-full">
                        <div className="flex flex-col gap-4 items-start justify-end h-full">
                            {links.map((link, index) => (
                                <Link key={index} href={link === "Post" ? "/posts" : `/#${link}`} legacyBehavior>
                                    <a
                                        ref={(el) => { navLinks.current[index] = el; }}
                                        onClick={(e) => link !== "Post" && handleLinkClick(e, link)}
                                        className="font-[Heading] text-5xl text-white"
                                    >
                                        <span>{link}</span>
                                    </a>
                                </Link>
                            ))}
                            <Link href="#Contact" legacyBehavior>
                                <a
                                    ref={(el) => { navLinks.current[links.length] = el; }}
                                    onClick={handleContactClick}
                                    className="font-[Heading] text-5xl text-white"
                                >
                                    Contact
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;