import { Heading } from "@/components/ui/typography/heading";
import { DeleteAccountBtn } from "./components/delete-account";
import { CloseSession } from "./components/close-session";

export default async function AccountPage() {
  return (
    <article className="flex flex-col gap-6 w-full">
      <Heading level={6}>Account Options</Heading>
      <ul className="flex flex-col gap-2">
        <li>
          <CloseSession />
        </li>
        <li>
          <DeleteAccountBtn />
        </li>
      </ul>
    </article>
  );
}
