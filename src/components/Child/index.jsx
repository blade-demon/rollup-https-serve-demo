import React from "react";
import style from "./index.module.css";

export default function Child() {
  return (
    <div className={style["child"]}>
      <h5 className={style["text"]}>child</h5>
    </div>
  );
}
