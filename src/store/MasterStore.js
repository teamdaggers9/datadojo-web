import create from "zustand";
import { devtools } from "zustand/middleware";

const userStore = (set) => ({
  projects: [],
  candidates: [],
  setProjects: (projects) => set(() => ({ projects })),
  setCandidates: (candidates) => set(() => ({ candidates })),
});

export default create(devtools(userStore));
