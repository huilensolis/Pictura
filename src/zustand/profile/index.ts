import { create } from "zustand";
import { IProfileStore } from "./profile.models";
import { persist } from "zustand/middleware";

export const ProfileStore = create(
  persist<IProfileStore>(
    (set, get) => ({
      data: {
        id: "",
        name: null,
        user_id: null,
        website: null,
        location: null,
        username: null,
        avatar_url: null,
        created_at: "",
        is_private: null,
        description: null,
      },
      updateStoreData: (data) => {
        set((storeData) => ({ data: { ...storeData.data, ...data } }));
      },
    }),
    { name: "profile" },
  ),
);
