import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import store from "../store/MasterStore";

const projectCollection = "projects";
const candidateCollection = "workforce";

const compareFunc = (a, b) => {
  const project_a = a.project_name.toLowerCase();
  const project_b = b.project_name.toLowerCase();
  if (project_a < project_b) {
    return -1;
  }
  if (project_a > project_b) {
    return 1;
  }
  return 0;
};

const fetchProjects = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection(projectCollection)
        .get();
      const projects = querySnapshot.docs
        .map((doc) => doc.data())
        .sort(compareFunc);
      console.log({ projects });
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
      console.log({ projects, candidates });
      resolve({ projects, candidates });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
