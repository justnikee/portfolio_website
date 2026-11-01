import React from "react";

type LinkItmes = {
  title: string;
  link: string;
};

type Props = {
  links: LinkItmes[];
};

const FooterLinks = ({ links }: Props) => {
  return (
    <div className="-my-1.5 flex flex-col">
      {links.map((link, index) => (
        <a
          className="footer-link block py-1.5 font-[outfit] text-[--muted] transition-colors duration-300 hover:text-[--foreground]"
          key={index}
          href={link.link}
          data-cursor="hover"
        >
          <span className="link-underline">{link.title}</span>
        </a>
      ))}
    </div>
  );
};

export default FooterLinks;
