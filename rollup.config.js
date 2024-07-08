import fs from "fs";
import babel from "rollup-plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";
import nested from "postcss-nested";
import cssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";

import livereload from "rollup-plugin-livereload";

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "src/index.jsx", // 你的入口文件
  output: {
    file: "public/bundle.js", // 打包输出文件
    // format: "iife", // 适合浏览器使用的格式
    sourcemap: !isProduction,
  },
  plugins: [
    postcss({
      plugins: [nested(), cssPresetEnv(), isProduction && cssnano()],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      preventAssignment: true,
    }),
    nodeResolve(),
    commonjs(),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      exclude: "node_modules/**",
    }),
    isProduction && terser(),

    !isProduction &&
      serve({
        contentBase: ["public"],
        host: "localhost",
        port: 10001,
        https: {
          key: fs.readFileSync("./certs/selfsigned.key"),
          cert: fs.readFileSync("./certs/selfsigned.crt"),
        },
      }),

    !isProduction &&
      livereload({
        watch: "public",
        https: {
          key: fs.readFileSync("./certs/selfsigned.key"),
          cert: fs.readFileSync("./certs/selfsigned.crt"),
        },
      }),
  ],
};
