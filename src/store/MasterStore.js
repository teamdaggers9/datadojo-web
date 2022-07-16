import create from "zustand";
import { devtools } from "zustand/middleware";

const userStore = (set) => ({
  projects: [],
  candidates: [],
  skillSets: [],
  designations: [],
  setProjects: (projects) => set(() => ({ projects })),
  setCandidates: (candidates) => set(() => ({ candidates })),
  setSkillSets: (skillSets) => set(() => ({ skillSets })),
  setDesignations: (designations) => set(() => ({ designations })),
});

export default create(devtools(userStore));
