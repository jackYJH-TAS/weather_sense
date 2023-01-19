import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import Panel from "./Panel";
import UseCityContext from "../hooks/UseCityContext";

const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();
    const {toF,toC } = UseCityContext();

  useEffect(() => {
    const handler = (e) => {
      if (!divEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    //include capture phase.
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  /*
  let content = "Celsius";
  if (value) {
    content = value.label;
  }
  */
  const handleOnClick = () => {
    setIsOpen((currentIsOpened) => !currentIsOpened);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
    if (option.label === "Celsius"){
      toC();
    } 
    if (option.label === "Fahrenheit") {
      toF();
    }
      //console.log(option.label);
  };

  const renderedOptions = options.map((item) => {
    if (item.label !== value) {
      return (
        <div
          className="hover:bg-sky-100 rounded cursor-pointer p-1"
          key={item.label}
          onClick={() => handleOptionClick(item)}
        >
          <a>{item.label}</a>
        </div>
      );
    }
  });
  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleOnClick}
      >
        {value?.label || value}
        <FiChevronDown className="text-lg" />
      </Panel>

      {isOpen && (
        <Panel className="absolute top-full ">{renderedOptions}</Panel>
      )}
    </div>
  );
};

export default Dropdown;
