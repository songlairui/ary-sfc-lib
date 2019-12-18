const process = {
  env: { NODE_ENV: "" }
};
window.process = process;
console.info(process.env.NODE_ENV, "process.env.NODE_ENV");
