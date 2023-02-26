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
  const plane = MeshBuilder.CreatePlane("plane", { size: 0.1 }, scene);
  plane.material = material;
  plane.rotate(new Vector3(0, 0, 1), -Math.PI / 2, Space.LOCAL);
  plane.scaling = new Vector3(1.6, 0.9, 1);

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: "immersive-ar",
      referenceSpaceType: "unbounded",
    },
    optionalFeatures: true,
  });
  const featureManager = xr.baseExperience.featuresManager;
  const sessionManager = xr.baseExperience.sessionManager;

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

  depthSensing.onGetDepthInMetersAvailable.add((getDepthInMeters) => {
    console.log(getDepthInMeters(0.5, 0.5));
  });

  sessionManager.onXRFrameObservable.add(() => {
    // obtain depth image texture
    material.diffuseTexture = depthSensing.latestDepthImageTexture;
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();
