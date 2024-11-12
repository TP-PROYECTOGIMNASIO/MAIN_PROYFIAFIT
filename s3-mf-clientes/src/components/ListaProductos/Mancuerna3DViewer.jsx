import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import { Vector3, HemisphericLight, MeshBuilder, ArcRotateCamera } from "@babylonjs/core";

export default function Mancuerna3DViewer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    // Configuración de la cámara
    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 3, Vector3.Zero(), scene);
    camera.attachControl(canvasRef.current, true);

    // Configuración de la luz
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Creación de un cilindro simple para simular la mancuerna
    const mancuerna = MeshBuilder.CreateCylinder("mancuerna", { height: 1, diameterTop: 0.5, diameterBottom: 0.5 }, scene);
    mancuerna.position.y = 0;

    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}
