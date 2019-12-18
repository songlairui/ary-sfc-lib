const fs = require("fs");
const path = require("path");
const deps = [
  "vue",
  "@vue/ui",
  "v-tooltip",
  "vue-resize",
  "focus-visible",
  "popper.js"
];

const modDir = path.resolve(__dirname, "..", "..", "..", "node_modules");

const targetDir = path.resolve(__dirname, "..", "serv");

async function main() {
  deps.map(async dep => {
    const depDir = path.join(modDir, dep);
    const pkg = path.join(depDir, "package.json");
    const info = JSON.parse(fs.readFileSync(pkg).toString());
    let sourceFile;
    if (info.module) {
      sourceFile = path.join(depDir, info.module);
    } else {
      console.error("no module export for", info.name);
      sourceFile = path.join(depDir, info.main);
    }
    const filename = path.basename(sourceFile);
    const targetFile = path.join(targetDir, filename);
    if (fs.existsSync(targetFile)) {
      console.info("skip", info.name);
    } else {
      console.info(info.module || info.main);
      fs.copyFileSync(sourceFile, targetFile);
    }
  });
}

main();
