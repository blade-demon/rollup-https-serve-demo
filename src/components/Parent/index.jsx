import React from "react";
import style from "./index.module.css";

export default function Parent() {
  return (
    <div className={style["parent"]}>
      <h5 className={style["text"]}>parent!!!</h5>
    </div>
  );
}
