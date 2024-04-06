// import { WebContainer } from 'https://esm.sh/@webcontainer/api';
// const webcontainerInstance = await WebContainer.boot();
//Set up Monaco
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
require(["vs/editor/editor.main"], () => {
  let editor = monaco.editor.create(document.getElementById('monaco'), {
    value: `console.log("Hello World!")`,
    language: 'javascript',
    theme: 'vs-dark',
  })
  window.onresize = editor.layout
  setTimeout(() => {document.getElementById("splash").classList.add("hidden")}, 4500)
});
//When clicked on the create buttons
function createMaterial() {
    let name = prompt("Name your material", "myMaterial")
    if (name) {
            // webcontainerInstance.fs.writeFile("/src/materials/" + name, `
            // import * as BABYLON from "https://esm.sh/babylonjs"
            // const material = 
            
            // new BABYLON.StandardMaterial()
            // export default material;
            // `)
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
  });
  
  resizeObserver.observe(document.getElementById("scenes"));
  resizeObserver.observe(document.getElementById("assets"));
  









//CheerpX version, not being used
//let esbuildPath;
// const cx = await CheerpXApp.create({
//     devices: [
//       {
//         name: "block1",
//         type: "block",
//         url: "https://disks.webvm.io/debian_large_20230522_5044875331.ext2",
//       },
//     ],
//     mounts: [
//       { type: "ext2", dev: "block1", path: "/" },
//       { type: "cheerpOS", dev: "/app", path: "/app" },
//       { type: "cheerpOS", dev: "/str", path: "/data" },
//       { type: "devs", dev: "", path: "/dev" },
//     ],
//   });
// cx.setConsole(document.getElementById("console"));
// cx.run("curl", ["-O", "https://registry.npmjs.org/esbuild-linux-64/-/esbuild-linux-64-0.0.9.tgz"], {
//     env: [
//       "HOME=/home/user",
//       "USER=user",
//       "SHELL=/bin/bash",
//       "EDITOR=vim",
//       "LANG=en_US.UTF-8",
//       "LC_ALL=C",
//     ],
//     cwd: "/home/user",
//     uid: 1000,
//     gid: 1000,
// }).then(() => {
//     cx.run("tar", ["xf", "./esbuild-linux-64-0.0.9.tgz"], {
//         env: [
//             "HOME=/home/user",
//             "USER=user",
//             "SHELL=/bin/bash",
//             "EDITOR=vim",
//             "LANG=en_US.UTF-8",
//             "LC_ALL=C",
//           ],
//           cwd: "/home/user"
//     }).then(() => {
//         esbuildPath = "./package/bin/esbuild"
        
//     })
// })