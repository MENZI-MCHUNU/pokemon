import React from "react";
import ReactDOM from "react-dom";
function Modal(props) {
  const { children, handleCloseModal } = props;
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] flex flex-col items-center justify-center z-[100] p-4">
      <button
        onClick={handleCloseModal}
        className="absolute bg-amber-100 opacity-80 z-[99] border-none w-full  hover:translate-0"
      />
      <div className="relative z-[101] max-w-[600px] w-full m-auto min-h-96 rounded-xl border border-solid border-b-blue-400 bg-amber-300 p-4 flex flex-col gap-4">
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
