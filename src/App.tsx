import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlock } from "./store/basicActionsSlice.tsx";

import Block from "./Block.tsx";
import "./App.css";
import { RootState } from "./store/store.tsx";
import { AddInput } from "./AddInput.tsx";

function App() {
  const CardState = useSelector(
    (state: RootState): any => state.basicAction.values
  );

  const dispatch = useDispatch();

  const scrollContainer = useRef<HTMLDivElement>(null);

  const handleWheel = (e: SyntheticEvent) => {
    scrollContainer.current.scrollLeft += e.deltaY;
  };

  return (
    <>
      <div className="menu-container">
        <p className="text">INFO</p>
        <div className="count-TEMP">{CardState.length}</div>
        <div className="button" onClick={() => dispatch(deleteBlock())}>
          DELETE
        </div>
      </div>
      <div
        className="cards-container"
        ref={scrollContainer}
        onWheel={(e) => handleWheel(e)}
      >
        {CardState.map((card) => {
          return <Block key={card.id} id={card.id} header={card.header} />;
        })}
        <AddInput CardState={CardState} />
      </div>
    </>
  );
}

export default App;
