import { Heading } from "@/components/ui/typography/heading";
import { NewCollectionForm } from "./form";

export default function NewCollection() {
  return (
    <main className="w-full flex justify-center px-2 py-10">
      <div className="max-w-lg w-full flex flex-col gap-2">
        <Heading level={6}>New Collection</Heading>
        <NewCollectionForm />
      </div>
    </main>
  );
}
