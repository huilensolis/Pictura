import { Heading } from "@/components/ui/typography/heading";
import { NewCollectionForm } from "./form";

export default async function NewCollection() {
  return (
    <>
      <Heading level={6}>New Collection</Heading>
      <NewCollectionForm />
    </>
  );
}
