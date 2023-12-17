import { Article } from "@/components/ui/article";
import Link from "next/link";

const LINKS: { title: string; icon: React.FunctionComponent; href: string }[] =
  [
    {
      title: "Edit Profile",
      icon: UserIcon,
      href: "settings/profile",
    },
    {
      title: "Reset Password",
      icon: LockIcon,
      href: "settings/reset-password",
    },
    {
      title: "Manage Subscription",
      icon: CreditCardIcon,
      href: "",
    },
  ];

export default function AccountSettings() {
  return (
    <main className="w-full h-max max-w-3xl">
      <Article
        title="Account configuration"
        subtitle="Manage your account settings"
      >
        <nav>
          <ul className="flex flex-col gap-4 justify-center items-center">
            {LINKS.map((linkItem) => (
              <li key={linkItem.href} className="w-full">
                <Link
                  href={linkItem.href}
                  className="p-2 w-full flex gap-4 justify-start items-center border-b border-neutral-200 group hover:bg-neutral-200 transition-colors delay-[25ms]"
                >
                  <linkItem.icon className="w-6 h-6 text-neutral-900 dark:text-neutral-50" />
                  <span className="text-blue-600 dark:text-neutral-300 font-medium group-hover:underline transition-all delay-75">
                    {linkItem.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Article>
    </main>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
