import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

type Avatar3DProps = {
  className?: string;
  /** Called once the model is on screen, so a fallback can be swapped out. */
  onReady?: () => void;
  onError?: () => void;
};

export default function Avatar3D({ className = '', onReady, onError }: Avatar3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    // --- lighting: cool key, crimson rim, warm fill (matches the site palette) ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const key = new THREE.DirectionalLight(0xfff2e8, 2.1);
    key.position.set(-3, 3.5, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xea0044, 3.4);
    rim.position.set(4.5, 1.5, -3.5);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0x88aaff, 0.9);
    fill.position.set(3, -2, 2.5);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);

    let frame = 0;
    let disposed = false;
    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const material = new THREE.MeshStandardMaterial({
      color: 0xdedee6,
      roughness: 0.42,
      metalness: 0.08,
      flatShading: false,
    });

    const loader = new OBJLoader();
    loader.load(
      `${import.meta.env.BASE_URL}model/avatar.obj`,
      (obj) => {
        if (disposed) return;

        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.deleteAttribute('normal');
            mesh.geometry.computeVertexNormals();
            mesh.material = material;
          }
        });

        // centre on origin and normalise to a predictable height
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const centre = box.getCenter(new THREE.Vector3());
        obj.position.sub(centre);

        const scale = 2.9 / Math.max(size.x, size.y, size.z);
        obj.scale.setScalar(scale);

        group.add(obj);
        onReady?.();
      },
      undefined,
      () => {
        if (disposed) return;
        setFailed(true);
        onError?.();
      },
    );

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduceMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    const tick = () => {
      frame = requestAnimationFrame(tick);
      current.x += (pointer.x - current.x) * 0.045;
      current.y += (pointer.y - current.y) * 0.045;
      group.rotation.y = current.x * 0.5;
      group.rotation.x = current.y * 0.26;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.geometry.dispose();
      });
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [onReady, onError]);

  if (failed) return null;

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
