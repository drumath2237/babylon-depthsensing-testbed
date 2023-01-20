import "./style.scss";

import {
  Engine,
  IWebXRDepthSensingOptions,
  MeshBuilder,
  Scene,
  StandardMaterial,
  WebXRDepthSensing,
} from "@babylonjs/core";
// import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";

const main = async () => {
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

  const material = new StandardMaterial("mat", scene);
  const box = MeshBuilder.CreateBox("box", { size: 0.2 }, scene);
  box.material = material;

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: "immersive-ar",
      referenceSpaceType: "unbounded",
    },
    optionalFeatures: true,
  });
  const featureManager = xr.baseExperience.featuresManager;

  const d = new WebXRDepthSensing(1 as any, 1 as any);
  console.log(d);

  const depthSensing = featureManager.enableFeature(
    "xr-depth-sensing",
    1,
    {
      dataFormatPreference: ["luminance-alpha"],
      usagePreference: ["cpu-optimized"],
    } as IWebXRDepthSensingOptions,
    true,
    true
  ) as WebXRDepthSensing;

  xr.baseExperience.sessionManager.onXRFrameObservable.add((_frame) => {
    console.log(
      "width: ",
      depthSensing.width,
      "\nheight: ",
      depthSensing.height,
      "\ncenter depth: ",
      depthSensing.getDepthInMeters(0.5, 0.5)
    );

    material.diffuseTexture = depthSensing.latestDepthImageTexture;
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

// const useGUI = () => {
//   const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
//     "fullscreen",
//     true
//   );

//   const textBlock = new TextBlock("text block");
//   textBlock.fontSize = 24;
//   textBlock.color = "white";

//   advancedTexture.addControl(textBlock);

//   return {
//     textBlock,
//   };
// };

main();
