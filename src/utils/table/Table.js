import React from "react";
import { formatThousandSeparator } from "../../utils/commonFunctions";
import moment from "moment";

const Table = ({ dataSet }) => {
  const columns = [
    {
      Header: "Project Name",
      accessor: "project_name",
      order_id: 1,
    },
    {
      Header: "Project Start Date",
      accessor: "start_date",
      order_id: 2,
    },
    {
      Header: "Estimated Completion Date",
      accessor: "estimated_completion_date",
      order_id: 3,
    },
    {
      Header: "Actual Completion Date",
      accessor: "actual_completion_date",
      order_id: 4,
    },
    {
      Header: "Status",
      accessor: "status",
      order_id: 5,
    },
    {
      Header: "Estimated Cost",
      accessor: "planned_cost",
      order_id: 6,
    },
    {
      Header: "Cost To Date",
      accessor: "actual_cost",
      order_id: 7,
    },
    {
      Header: "Team Strength",
      accessor: "team_strength",
      order_id: 8,
    },
    {
      Header: "Planned Effort (in hours)",
      accessor: "planned_effort",
      order_id: 9,
    },
    {
      Header: "Actual Effort (in hours)",
      accessor: "actual_effort",
      order_id: 10,
    },
    {
      Header: "Scrum Activity (in hours)",
      accessor: "scrum_activity",
      order_id: 11,
    },
    {
      Header: "Development Time (in hours)",
      accessor: "development_activity",
      order_id: 12,
    },
    {
      Header: "Debug Time (in hours)",
      accessor: "debug_time",
      order_id: 13,
    },
    {
      Header: "Bug Count",
      accessor: "bugs_reported",
      order_id: 14,
    },
  ];

  const setClassName = (field_name) => {
    const w_150_list = ["actual_duration"];
    // const w_100_list = ["team_strength"];
    const w_130_list = ["status"];
    const w_175_list = ["development_time"];
    // if (w_100_list.includes(field_name)) {
    //   return "w-100";
    // }
    if (w_175_list.includes(field_name)) {
      return "w-175";
    }
    if (w_150_list.includes(field_name)) {
      return "w-150";
    }
    if (w_130_list.includes(field_name)) {
      return "w-130";
    }
    if (field_name === "project_name") {
      return "w-200";
    }
    if (field_name === "estimated_duration") {
      return "w-150";
    }
    if (field_name === "planned_cost" || field_name === "actual_cost") {
      return "w-100 txtRight";
    }
    if (field_name === "bugs_count") {
      return "w-130 txtCenter";
    }
    if (field_name === "team_strength" || field_name === "bugs_reported" || field_name === "scrum_activity") {
      return "w-100 txtRight";
    }
    if (field_name === "actual_effort" || field_name === "development_activity" || field_name === "debug_time" || field_name === "planned_effort") {
      return "w-150 txtRight";
    }
    if (field_name === "development_time") {
      return "w-175";
    }
    return "w-150";
  };

  const compareFunc = (a, b) => {
    return a.order_id - b.order_id;
  };

  const setStatusClassName = (status) => {
    if (status === "Completed") {
      return "circle success";
    }
    if (status === "Maintenance") {
      return "circle maintenance";
    }
    return "circle warning";
  };

  return (
    <div className="dataTbl tblScroll-X tblScroll-Y">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.sort(compareFunc).map(({ Header, accessor }) => {
              return (
                <th key={Header} className={setClassName(accessor)}>
                  {Header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataSet.map((data, index) => {
            return (
              <tr key={index}>
                {columns.sort(compareFunc).map(({ accessor }, _index) => {
                  if (
                    accessor === "estimated_completion_date" ||
                    accessor === "actual_completion_date" ||
                    accessor === "start_date" 
                  ) {
                    if (data["status"] === "Ongoing" && accessor === "actual_completion_date") {
                      return <td key={_index}> NA </td>
                    }
                    return (
                      <td key={_index}>
                        {moment(data[accessor]).format("ll")}
                      </td>
                    );
                  }
                  if (accessor === "project_name") {
                    return (
                      <td key={_index} className={setClassName(accessor)}>
                        <div className="projectImage">
                          <img
                            src="https://aspaceforphotography.com/wp-content/uploads/2017/11/f2637562392edd24809a100a0211e6f8-symbols-design-logo-icon-design.jpg"
                            width="40px"
                          />
                          {data[accessor]}
                        </div>
                      </td>
                    );
                  }
                  if (accessor === "status") {
                    return (
                      <td key={_index}>
                        <div className="statusWrap">
                          <i className={setStatusClassName(data[accessor])}></i>{" "}
                          {data[accessor]}
                        </div>
                      </td>
                    );
                  }
                  if (accessor === "planned_cost" || accessor === "actual_cost") {
                    return (
                      <td key={_index} className="txtRight">
                        ${formatThousandSeparator(data[accessor])}
                      </td>
                    );
                  }
                  if (
                    accessor === "team_strength" ||
                    accessor === "planned_effort" ||
                    accessor === "actual_effort" ||
                    accessor === "scrum_activity" ||
                    accessor === "development_activity" ||
                    accessor === "debug_time" ||
                    accessor === "bugs_reported"
                  ) {
                    return (
                      <td key={_index} className="txtRight">
                        {data[accessor]}
                      </td>
                    );
                  }
                  return <td key={_index}>{data[accessor]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
