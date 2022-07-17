import React, { useRef, useEffect } from "react";

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
    <div className={showDropDownList ? "dropdown show" : "dropdown"}>
      <button
        type="button"
        className="btnPrimary flxCenter"
        ref={dropDownRef}
        onClick={() => setShowDropDownList(true)}
      >
        <span>{getTitle()}</span><i className="downArrow"></i>
      </button>
      <div className={showDropDownList ? "dropdownMenu dropdownRight show" : "dropdownMenu dropdownRight"}>
        <div className="dropdownInnerWrap">
        {dropdown_list.map((data, index) => (
          <a
            className="dropdownItem"
            href="#"
            onClick={() => {
              onChange(data[unique_field_name]);
            }}
            key={index}
          >
            {data[selected_field_name]}
          </a>
        ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
