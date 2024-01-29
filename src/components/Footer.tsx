import { FOOTER_LINKS } from "@/constants";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function Footer({
  className,
  ...otherprops
}: {
  className?: string;
}) {
  return (
    <footer className={clsx(" mt-14 bg-[#0d0e0f]", className)} {...otherprops}>
      <div className="container mx-auto flex flex-wrap items-stretch justify-center gap-10 px-2  py-4 md:px-4 lg:px-8">
        {FOOTER_LINKS.map((link, key) => (
          <Link
            key={key}
            className="transition-color text-muted hover:text-white"
            to={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
