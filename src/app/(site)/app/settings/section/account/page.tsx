import { Heading } from "@/components/ui/typography/heading";
import { DeleteAccountBtn } from "./components/delete-account";

export default async function AccountPage() {
  return (
    <article className="flex flex-col gap-6 w-full">
      <Heading level={6}>Account Options</Heading>
      <ul className="flex flex-col gap-2">
        <li>
          <button className="w-full px-4 py-2 bg-neutral-700 text-center font-medium text-neutral-50 rounded-sm">
            Log Out
          </button>
        </li>
        <li>
          <DeleteAccountBtn />
        </li>
      </ul>
    </article>
  );
}
