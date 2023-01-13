import "./style.scss";

import {
  Engine,
  IWebXRDepthSensingOptions,
  MeshBuilder,
  Scene,
  StandardMaterial,
  WebXRDepthSensing,
  WebXRFeatureName,
} from "@babylonjs/core";

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
  });
  const featureManager = xr.baseExperience.featuresManager;

  const depthSensing = featureManager.enableFeature(
    WebXRFeatureName.DEPTH_SENSING,
    "latest",
    {
      dataFormatPreference: ["luminance-alpha"],
      usagePreference: ["cpu-optimized"],
    } as IWebXRDepthSensingOptions,
    true,
    true
  ) as WebXRDepthSensing;

  xr.baseExperience.sessionManager.runInXRFrame(() => {
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

main();
