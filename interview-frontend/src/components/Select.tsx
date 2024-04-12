import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Select(props: any) {
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState();
  const choices = [
    {
      choice: "Male",
      value: "Male",
      color: "blue-600",
    },
    {
      choice: "Female",
      value: "Female",
      color: "red-300",
    },
  ];
  return (
    <div>
      <div
        onClick={() => {
          setOpen(!open);
          console.log(open);
          console.log(val);
        }}
        className={`h-10 w-full ${
          props.errors ? "ring-2 ring-red-500 ring-opacity-90" : ""
        } bg-gray-100 p-2 pl-3 ${open ? "rounded-t-lg" : "rounded-lg"}`}
      >
        <div className="flex justify-between">
          <input
            value={props.value}
            className={`focus:outline-none cursor-pointer bg-gray-100`}
            placeholder={props.placeholder}
            type={props.type}
            onChange={props.onChange}
            onBlur={props.onBlur}
            name={props.name}
            readOnly
          ></input>
          {open ? (
            <FaChevronUp className="h-6 w-6"></FaChevronUp>
          ) : (
            <FaChevronDown className="h-6 w-6"></FaChevronDown>
          )}
        </div>
      </div>
      {open && (
        <div className="z-40 relative w-full rounded-b-lg  bg-gray-50 w-64">
          {props.choices.map((choice: any, index: any) => (
            <div
              key={index}
              onClick={() => {
                props.changeValue(choice.value);
                setOpen(false);
              }}
              className={`text-${choice.color} cursor-pointer ${
                index == props.choices.length - 1 ? "rounded-b-lg" : ""
              } p-2 hover:bg-gray-200`}
            >
              {choice.choice}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
