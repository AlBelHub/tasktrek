import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addBlock } from "./store/basicActionsSlice";
import { RootState } from "./store/store";
import { nanoid } from "nanoid";

interface Props {}

export const AddInput = (CardState: RootState) => {
  const [visible, setVisible] = useState(false);
  const [header, setHeader] = useState("");

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddButton = () => {
    if (header.length === 0) {
      inputRef.current.focus();
    } else {
      dispatch(addBlock({ id: nanoid(4), header: header }));
      inputRef.current.value = "";
      setHeader("");
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={"add-button " + (visible ? "show" : "")}
      onClick={() => setVisible(!visible)}
    >
      <span style={visible ? { display: "none" } : { display: "block" }}>
        ADD
      </span>
      {visible && (
        <div>
          <input
            className="input"
            type="text"
            ref={inputRef}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              e.key === "Enter" ? handleAddButton() : false;
            }}
            onChange={(e) => {
              setHeader(e.target.value);
            }}
            placeholder="Введите название блока"
          />
          <div className="button" onClick={() => handleAddButton()}>
            ADD
          </div>
        </div>
      )}
    </div>
  );
};
