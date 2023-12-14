import { Database } from "@/supabase/types";

type IProfile = Database["public"]["Tables"]["profiles"]["Row"];

export interface IProfileStore {
  data: IProfile;
  updateStoreData: (newData: IProfile) => void;
}
