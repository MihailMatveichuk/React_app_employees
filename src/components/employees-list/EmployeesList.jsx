import React from "react";
import EmployeesItem from "../employees-list-item/EmployeesItem";
import "./EmployeesList.css";

const EmployeesList = ({ data, onDelete, onToggleProp }) => {
  return (
    <div>
      <ul className="app-list list-group">
        {data.map((item) => {
          const { id, ...itemProps } = item;
          return (
            <EmployeesItem
              key={id}
              {...itemProps}
              onDelete={() => onDelete(id)}
              onToggleProp={(e) =>
                onToggleProp(id, e.currentTarget.getAttribute("data-toggle"))
              }
            />
          );
        })}
      </ul>
    </div>
  );
};

export default EmployeesList;
