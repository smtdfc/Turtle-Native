import {TurtleApp,TurtleComponent,createComponent,TurtleRenderHelper,TurtleRenderData} from '@smtdfcteam/turtle';
export * from "./index.js"


window.addEventListener("error",function(event){
  
})

if (!window.TurtleNativeBridge) {
  throw "[Turtle Native Error] Cannot connect with webview !"
}