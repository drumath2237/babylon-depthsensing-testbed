import "./style.scss";

import { Engine, MeshBuilder, Scene } from "@babylonjs/core";

const main = () => {
  const renderCanvas = document.getElementById(
    "renderCanvas"
  ) as HTMLCanvasElement;
  if (!renderCanvas) {
    return;
  }

  renderCanvas.width = document.documentElement.clientWidth;
  renderCanvas.height = document.documentElement.clientHeight;

  const engine = new Engine(renderCanvas, true);
  const scene = new Scene(engine);

  scene.createDefaultCameraOrLight(true, true, true);
  MeshBuilder.CreateBox("box", { size: 0.2 }, scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();
