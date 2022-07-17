import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import store from "../store/MasterStore";

const projectCollection = "projects";
const candidateCollection = "workforce";
const skillSetCollection = "skill_master";
const designationCollection = "designation_master";

const fetchProjects = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection(projectCollection)
        .get();
      const projects = querySnapshot.docs.map((doc) => doc.data());
      store.getState().setProjects(projects);
      resolve(projects);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const fetchCandidates = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection(candidateCollection)
        .get();
      const candidates = querySnapshot.docs.map((doc) => doc.data());
      store.getState().setCandidates(candidates);
      resolve(candidates);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const fetchSkillSet = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection(skillSetCollection)
        .get();
      const skillSet = querySnapshot.docs.map((doc) => doc.data());
      console.log(skillSet);
      store.getState().setSkillSet(skillSet);
      resolve(skillSet);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const fetchDesignations = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection(designationCollection)
        .get();
      const designations = querySnapshot.docs.map((doc) => doc.data());

      store.getState().setDesignations(designations);
      resolve(designations);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const createNewCollection = (collectionName, dataSet) => {
  console.log("createNewCollection");
  for (const data of Object.values(dataSet)) {
    firebase.firestore().collection(collectionName).add(data);
  }
};

export const fetchCollections = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const projects = await fetchProjects();
      const candidates = await fetchCandidates();
      const skillSet = await fetchSkillSet();
      const designations = await fetchDesignations();

      resolve({ projects, candidates, skillSet, designations });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
