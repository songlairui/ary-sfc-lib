// rollup.config.js
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import buble from "@rollup/plugin-buble";
import graphql from "rollup-plugin-graphql-tag";
import commonjs from "rollup-plugin-commonjs";
import replace from "@rollup/plugin-replace";
import minimist from "minimist";
// import auto from "@rollup/plugin-auto-install";
import resolve from "@rollup/plugin-node-resolve";
// import multi from "@rollup/plugin-multi-entry";

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, "..");

const baseConfig = {
  input: "src/entry.js",
  plugins: {
    preVue: [
      // multi(),
      // auto(),
      resolve(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      commonjs(),
      graphql(),
      alias({
        resolve: [".jsx", ".js", ".vue"],
        entries: {
          "@": path.resolve(projectRoot, "src")
        }
      })
    ],
    vue: {
      css: true,
      template: {
        isProduction: true
      }
    },
    postVue: [
      buble({ transforms: { asyncAwait: false, templateString: false } })
    ]
  }
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      dir: "dist",
      // file: "dist/login.esm.js",
      format: "esm",
      exports: "named"
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue
    ]
  };
  buildFormats.push(esConfig);
}

// Export config
export default buildFormats;
