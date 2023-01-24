import "./style.scss";

import {
  Engine,
  IWebXRDepthSensingOptions,
  MeshBuilder,
  Scene,
  Space,
  StandardMaterial,
  Vector3,
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
  const plane = MeshBuilder.CreatePlane("plane", { size: 0.1 }, scene);
  plane.material = material;
  plane.rotate(new Vector3(0, 0, 1), -Math.PI / 2, Space.LOCAL);

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: "immersive-ar",
      referenceSpaceType: "unbounded",
    },
    optionalFeatures: true,
  });
  const featureManager = xr.baseExperience.featuresManager;

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

  xr.baseExperience.sessionManager.onXRFrameObservable.add(async () => {
    material.diffuseTexture = depthSensing.latestDepthImageTexture;
    const size = depthSensing.latestDepthImageTexture?.getSize();
    if (size) {
      plane.scaling = new Vector3(size.width / 100, size.height / 100, 1);
    }

    const cachedDepth = depthSensing.latestDepthBuffer;
    if (cachedDepth) {
      console.log("hi");
    }

    // const buffer = await depthSensing.latestDepthImageTexture?.readPixels();
    // if (buffer) {
    //   const depthBuffer = new Uint16Array(buffer.buffer);
    //   const size = depthSensing.latestDepthImageTexture?.getSize();
    // }
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
