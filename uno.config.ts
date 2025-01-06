import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  content: {
    filesystem: [
      "**/*.{vue,md}" //
    ]
  },
  presets: [
    presetUno()
  ]
});
