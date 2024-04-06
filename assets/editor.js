import { WebContainer } from 'https://esm.sh/@webcontainer/api';
const webcontainerInstance = await WebContainer.boot();
import * as BABYLON from 'https://esm.sh/@babylonjs/core/Legacy/legacy';
//Set up Monaco
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
require(["vs/editor/editor.main"], () => {
  let editor = monaco.editor.create(document.getElementById('monaco-editor'), {
    value: `console.log("Hello World!")`,
    language: 'javascript',
    theme: 'vs-dark',
  })
  window.addEventListener("resize", () => editor.layout())
//   setTimeout(() => {document.getElementById("splash").remove()}, 4500)
});
//When clicked on the create buttons
function createMaterial() {
    let name = prompt("Name your material", "myMaterial")
    if (name) {
            webcontainerInstance.fs.writeFile("/src/materials/" + name, `
            import * as BABYLON from "https://esm.sh/babylonjs"
            const material = 
            
            new BABYLON.StandardMaterial()
            export default material;
            `)
    }}
//its esm, so i need to expose it as a global
Object.defineProperty(window, "createMaterial", {
    value: createMaterial,
    writable: false
})
function createScene() {
    let name = prompt("Name your scene", "myScene")
    if (name) {
    }}

Object.defineProperty(window, "createScene", {
    value: createScene,
    writable: false
})
function uploadFile() {
    let file
    let input = document.createElement("input")
    input.type = "file"
    input.multiple = false
    input.addEventListener("input", () => {
        if (input.files.length != 0) {
            file = input.files[0]
            console.log(file)
        }
        
    })
    input.click()
}

Object.defineProperty(window, "uploadFile", {
    value: uploadFile,
    writable: false
})

const resizeObserver = new ResizeObserver(() => {
    console.log("resized")
    let assetsRect = document.getElementById("assets").getBoundingClientRect()
    let scenesRect = document.getElementById("scenes").getBoundingClientRect()
    document.getElementById("materials").style.height = `calc(100% - ${scenesRect.height + assetsRect.height}px)`
  })
  
resizeObserver.observe(document.getElementById("scenes"))
resizeObserver.observe(document.getElementById("assets"))

//Material Editor
const canvas = document.getElementById("material-viewer")
const engine = new BABYLON.Engine(canvas, true)
const scene = new BABYLON.Scene(engine)
const mat = new BABYLON.StandardMaterial()
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
const box = BABYLON.MeshBuilder.CreateBox("box", {size: 3}, scene)
box.material = mat
const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene)
camera.setPosition(new BABYLON.Vector3(0, 0, 20))
camera.attachControl(canvas, false, false)
// const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");

// var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click Me");
// button1.width = "150px"
// button1.height = "40px";
// button1.color = "white";
// button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
// advancedTexture.addControl(button1);    
engine.runRenderLoop(() => scene.render())
window.addEventListener("resize", function () {
    engine.resize();
});

document.getElementById("material-properties").oninput = () => {
    if (document.getElementById("dif-ttr").value) mat.diffuseTexture = new BABYLON.Texture("https://corsproxy.io/?" + encodeURIComponent(document.getElementById("dif-ttr").value))
    let color = document.getElementById("dif-clr").value
    mat.diffuseColor = BABYLON.Color3.FromHexString(color)
}