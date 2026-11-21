import { defineConfig } from "vite-plus";
import vize from "@vizejs/vite-plugin";

export default defineConfig({
  plugins: [vize()],
  fmt: { ignorePatterns: ["src/vendor/**", "__gi_agent_work/**"] },
  lint: { ignorePatterns: ["src/vendor/**", "__gi_agent_work/**"] },
});
