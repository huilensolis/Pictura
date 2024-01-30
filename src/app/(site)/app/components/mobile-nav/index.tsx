import Link from "next/link";
import { NAV_LINKS } from "../../models/nav-links";

export function MobileNavMenu() {
  return (
    <nav className="w-full py-5 px-2 bg-blue-200">
      <ul>
        {NAV_LINKS.map((navLink) => (
          <li key={navLink.href}>
            <Link href={navLink.href}></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
