import { PrimaryButton } from "@/components/ui/buttons/primary";

export function ProfileConfigPictures() {
  return (
    <form className="w-full h-full flex flex-col gap-2 items-center justify-center relative">
      <div className="w-full h-40 relative rounded-2xl overflow-hidden mb-10">
        <div className="w-full h-full absolute top-0 left-0 bg-blue-400 pointer-events-none flex gap-2 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="text-neutral-200"
          >
            <path
              fill="currentColor"
              d="M18 0h2v4h4v2h-2v2h-2v2h-2V6h-4V4h2V2h2zM4 3h8v2H4v14h16v-7h2v9H2V3zm10 6h-2v2h-2v2H8v2H6v2h2v-2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2zM8 7H6v2h2z"
            ></path>
          </svg>
          <label htmlFor="profile-banner" className="text-neutral-200">
            Add banner
          </label>
        </div>
        {/* should i use label tag even if it is going to be hidden? <label></label> */}
        <input
          type="file"
          id="profile-banner"
          name="profile-picture"
          className="bg-neutral-200 border border-neutral-600 w-full h-full cursor-pointer"
        />
      </div>
      <div className="h-20 w-20 rounded-3xl border-2 border-neutral-40 overflow-hidden absolute left-5 top-28">
        <div className="relative w-full h-full">
          <div className="w-full h-full absolute top-0 left-0 bg-blue-400 pointer-events-none z-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-neutral-200"
            >
              <path
                fill="currentColor"
                d="M18 0h2v4h4v2h-2v2h-2v2h-2V6h-4V4h2V2h2zM4 3h8v2H4v14h16v-7h2v9H2V3zm10 6h-2v2h-2v2H8v2H6v2h2v-2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2zM8 7H6v2h2z"
              ></path>
            </svg>
          </div>
          {/* should i use label tag even if it is going to be hidden? <label></label> */}
          <input
            type="file"
            id="profile-picture"
            name="profile-picture"
            className="w-full h-full cursor-pointer"
          />
        </div>
      </div>
      <PrimaryButton>Save</PrimaryButton>
    </form>
  );
}
