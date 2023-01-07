import "./style.scss";

const main = () => {
  const renderCanvas = document.getElementById(
    "renderCanvas"
  ) as HTMLCanvasElement;
  if (!renderCanvas) {
    return;
  }

  renderCanvas.width = document.documentElement.clientWidth;
  renderCanvas.height = document.documentElement.clientHeight;

  console.log("Hello");
};

main();
