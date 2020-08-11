module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["module-resolver", {
      "alias": {
        "@components": "./src/components",
        "@images": "./src/assets/images"
      }
    }]
  ]
}
