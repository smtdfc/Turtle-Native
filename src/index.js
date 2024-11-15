export * from "./modules/router/components.js"
export * from "./modules/router/index.js"


if(!window.TurtleNativeBridge){
  throw "[Turtle Native Error] Cannot connect with webview !"
}