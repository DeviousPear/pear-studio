import { WebContainer } from 'https://esm.sh/@webcontainer/api';
const webcontainerInstance = await WebContainer.boot();
webcontainerInstance.fs.mkdir("src").then(console.log).catch(console.error)
webcontainerInstance.fs.mkdir("src/scenes").then(console.log).catch(console.error)
webcontainerInstance.fs.mkdir("src/materials").then(console.log).catch(console.error)
webcontainerInstance.fs.mkdir("src/assets").then(console.log).catch(console.error)
Object.defineProperty(window, "_webContainerInstance", {
    value: webcontainerInstance
    //for debug
})
import * as BABYLON from 'https://esm.sh/@babylonjs/core';
//Set up Monaco
let editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' } });
require(["vs/editor/editor.main"], () => {
    editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        value: `console.log("Hello World!")`,
        language: 'javascript',
        theme: 'vs-dark',
    })
    Object.defineProperty(window, "_editor", {
        value: editor
    })
    window.addEventListener("resize", () => editor.layout())
    //   setTimeout(() => {document.getElementById("splash").remove()}, 4500)
});

function updateExplorer() {
    webcontainerInstance.fs.readdir("src/materials").then((mats) => {
        document.getElementById("materials-list").innerHTML = ""
        mats.forEach((i) => {
            let div = document.createElement("div")
            div.classList.add("text-white", "text-xs", "p-1", "bg-neutral-600", "hover:bg-gray-800")
            div.addEventListener("click", async () => {
                saveText()
                document.getElementById("filename").innerText = i
                editor.setValue(await webcontainerInstance.fs.readFile("src/materials/" + i, "utf-8"))
                editor.filename = "src/materials/" + i
            })
            let span = document.createElement("span")
            span.innerText = i
            div.appendChild(span)
            document.getElementById("materials-list").appendChild(div)
        })
    })
    webcontainerInstance.fs.readdir("src/assets").then((assets) => {
        assets.forEach((i) => {
            let div = document.createElement("div")
            div.classList.add("text-white", "text-xs", "p-1", "bg-neutral-600")
            div.addEventListener("click", async () => {
                webcontainerInstance.fs.readFile
            })
            let span = document.createElement("span")
            span.innerText = i
            div.appendChild(span)
            document.getElementById("assets").appendChild(div)
        })
    })
    webcontainerInstance.fs.readdir("src/scenes").then((scenes) => {
        document.getElementById("assets-list").innerHTML = ""
        scenes.forEach((i) => {
            let div = document.createElement("div")
            div.classList.add("text-white", "text-xs", "p-1", "bg-neutral-600", "hover:bg-gray-800")
            div.addEventListener("click", async () => {
                saveText()
                document.getElementById("filename").innerText = i
                editor.setValue(await webcontainerInstance.fs.readFile("src/scenes/" + i, "utf-8"))
                editor.filename = "src/scenes/" + i
            })
            let span = document.createElement("span")
            span.innerText = i
            div.appendChild(span)
            document.getElementById("scenes-list").appendChild(div)
        })
    })
}
//When clicked on the create buttons
window.createMaterial = () => {
    let name = prompt("Name your material", "myMaterial")
    if (name) {
        webcontainerInstance.fs.writeFile("src/materials/" + name,
            `import * as BABYLON from "@babylonjs/core"
const material = new BABYLON.StandardMaterial()
export default material;`)
        updateExplorer()
    }
}
window.createScene = () => {
    let name = prompt("Name your scene", "myScene")
    if (name) {
        webcontainerInstance.fs.writeFile("src/scenes/" + name,
            `import * as BABYLON from "@babylonjs/core"
export default function createScene(engine, canvas) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    sphere.position.y = 1;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    return scene;
}`)
        updateExplorer()
    }
}
window.uploadFile = () => {
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
    updateExplorer()
}
const resizeObserver = new ResizeObserver(() => {
    console.log("resized")
    let assetsRect = document.getElementById("assets").getBoundingClientRect()
    let scenesRect = document.getElementById("scenes").getBoundingClientRect()
    let matsRect = document.getElementById("materials").getBoundingClientRect()
    document.getElementById("scripts").style.height = `calc(100% - ${scenesRect.height + assetsRect.height}px)`
})

resizeObserver.observe(document.getElementById("scenes"))
resizeObserver.observe(document.getElementById("assets"))

//Material Editor
const canvas = document.getElementById("material-viewer")
const engine = new BABYLON.Engine(canvas, true)
const scene = new BABYLON.Scene(engine)
const mat = new BABYLON.StandardMaterial()
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
const box = BABYLON.MeshBuilder.CreateBox("box", { size: 3 }, scene)
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
function resolveTexture(url) {
    if (!url) {
        return null
    }
    return !url.startsWith("data:") ? new BABYLON.Texture("https://corsproxy.io/?" + encodeURIComponent(url)) : new BABYLON.Texture(url)
}
document.getElementById("material-properties").oninput = () => {
    mat.diffuseTexture = resolveTexture(document.getElementById("dif-ttr").value)
    let color = document.getElementById("dif-clr").value
    mat.diffuseColor = BABYLON.Color3.FromHexString(color)
}
document.getElementById("material-properties").onsubmit = (e) => {
    e.preventDefault()

}




function updateSettings() {
    document.getElementById("settings-modal").close()
    monaco.editor.setTheme(document.getElementById("vs-theme").value)
}
Object.defineProperty(window, "updateSettings", {
    value: updateSettings,
    writable: false
})

//hotkeys
function saveText() {
    webcontainerInstance.fs.writeFile(editor.filename, editor.getValue())
}
document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey && e.key == 's') {
        e.preventDefault();
        saveText()
    }
});