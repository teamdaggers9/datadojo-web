import create from "zustand";
import { devtools } from "zustand/middleware";

const userStore = (set) => ({
  projects: [],
  candidates: [],
  skillSet: [],
  designations: [],
  setProjects: (projects) => set(() => ({ projects })),
  setCandidates: (candidates) => set(() => ({ candidates })),
  setSkillSet: (skillSet) => set(() => ({ skillSet })),
  setDesignations: (designations) => set(() => ({ designations }))
});

export default create(devtools(userStore));
