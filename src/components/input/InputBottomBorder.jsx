import React, { useEffect, useState } from "react";
import EditIcon from "../../icons/EditIcon";
import CheckmarkIcon from "../../icons/CheckmarkIcon";

const InputBottomBorder = ({ text, cb = () => {} }) => {
  const [value, setValue] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setValue(text);
  }, [text]);
  return (
    <div className="flex w-full">
      <div className={`w-full ${edit && "border-b-2 border-b-gray-500 pb-1"}`}>
        {edit ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="outline-none w-full "
          />
        ) : (
          <div>{value}</div>
        )}
      </div>
      <div className={`${edit && "border-b-2 border-b-gray-500 pb-1"}`}>
        {edit ? (
          <CheckmarkIcon
            onClick={() => {
              setEdit(false);
              cb();
            }}
          />
        ) : (
          <EditIcon onClick={() => setEdit(true)} />
        )}
      </div>
    </div>
  );
};

export default InputBottomBorder;
