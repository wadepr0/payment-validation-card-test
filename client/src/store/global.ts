import {create} from "zustand";
import StatusEnum from "../shared/enum/status.enum";

interface IGlobalStore {
  status: StatusEnum;
  setStatus: (status: StatusEnum) => void;
}

const useGlobalStore = create<IGlobalStore>((set) => ({
  status: StatusEnum.process,
  setStatus: (status) => set({ status }),
}));

export default useGlobalStore;
