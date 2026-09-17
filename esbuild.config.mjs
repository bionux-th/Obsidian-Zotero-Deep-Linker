import esbuild from "esbuild";

const production = process.argv[2] === "production";

await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "es2024",
  external: ["obsidian", "electron"],
  outfile: "main.js",
  sourcemap: production ? false : "inline",
  logLevel: "info",
});
