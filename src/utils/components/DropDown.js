import React, { useRef, useEffect } from "react";
import ReactTooltip from 'react-tooltip';

const DropDown = ({
  dropdown_list,
  selected_field_name,
  onChange,
  selected_option,
  unique_field_name,
}) => {
  const [showDropDownList, setShowDropDownList] = React.useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[0] !== dropDownRef.current) {
        setShowDropDownList(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.addEventListener("click", closeDropdown);
  }, []);

  const getTitle = () => {
    const _selected_option = dropdown_list.find(
      (list) => list[unique_field_name] === selected_option
    );
    return _selected_option[selected_field_name];
  };

  return (
    <div className="dropdown dropdownRight">
      <button
        type="button"
        className="btnPrimary"
        ref={dropDownRef}
        onClick={() => setShowDropDownList((prev)=>!prev)}
        data-tip={getTitle()}
      >
        {getTitle().slice(0,15)+'...'} <i className="downArrow"></i>
      </button>
      <div className={showDropDownList ? "dropdownMenu show" : "dropdownMenu"}>
        {dropdown_list.map((data, index) => (
          <a
            className="dropdownItem"
            href="javascript:void(0)"
            onClick={() => {
              onChange(data[unique_field_name]);
            }}
            key={index}
          >
            {data[selected_field_name]}
          </a>
        ))}
      </div>
      <ReactTooltip effect="solid"/>
    </div>
  );
};

export default DropDown;
