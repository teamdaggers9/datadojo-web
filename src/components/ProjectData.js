import React, { useEffect } from "react";
import store from "../store/MasterStore";
import Table from "../utils/table/Table";
import config from "../config/config";

const ProjectData = () => {
  const { projects } = store((state) => state);
  const { hourly_rate } = config;

  useEffect(() => {
    console.log({ projects });
  }, [projects]);

  const dataSet = projects.map((data) => {
    const { development_activity, scrum_activity, planned_effort, debug_time } =
      data;
    const actual_effort = development_activity + scrum_activity + debug_time;
    const planned_cost = planned_effort * hourly_rate;
    const actual_cost = actual_effort * hourly_rate;
    return {
      ...data,
      actual_effort,
      planned_cost,
      actual_cost,
    };
  });

  return <Table dataSet={dataSet} />;
};

export default ProjectData;
