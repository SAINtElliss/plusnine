import * as THREE from 'three';

// 65 high-precision normalized vector vertices traced directly from PlusNine authentic emblem (logo_oliseh)
export const PLUS9_CONTOUR_POINTS: [number, number][] = [
  [
    1.7582,
    3.1868
  ],
  [
    2.3736,
    3.1429
  ],
  [
    2.6044,
    3.044
  ],
  [
    2.8022,
    2.8791
  ],
  [
    2.9011,
    2.6703
  ],
  [
    2.8022,
    1.956
  ],
  [
    0.7802,
    1.9341
  ],
  [
    0.8901,
    2.3407
  ],
  [
    0.8462,
    2.4066
  ],
  [
    0.7473,
    2.4286
  ],
  [
    0.5385,
    2.3187
  ],
  [
    0.3846,
    1.7253
  ],
  [
    5.0,
    1.7582
  ],
  [
    0.1538,
    1.044
  ],
  [
    -0.0769,
    0.2857
  ],
  [
    -0.044,
    0.1868
  ],
  [
    0.0879,
    0.1758
  ],
  [
    0.1978,
    0.2308
  ],
  [
    0.3187,
    0.3846
  ],
  [
    0.4725,
    0.8791
  ],
  [
    2.6703,
    1.1868
  ],
  [
    2.0989,
    -1.967
  ],
  [
    1.967,
    -2.2747
  ],
  [
    1.8022,
    -2.5055
  ],
  [
    1.3077,
    -2.9121
  ],
  [
    0.7363,
    -3.1429
  ],
  [
    0.1209,
    -3.1868
  ],
  [
    -2.022,
    -3.0659
  ],
  [
    -2.2637,
    -3.011
  ],
  [
    -2.5714,
    -2.8462
  ],
  [
    -2.7912,
    -2.5824
  ],
  [
    -2.8901,
    -2.2527
  ],
  [
    -2.8681,
    -1.9341
  ],
  [
    -2.6374,
    -1.3297
  ],
  [
    -0.5714,
    -1.3407
  ],
  [
    -0.7143,
    -1.8901
  ],
  [
    -0.6264,
    -1.989
  ],
  [
    -0.4286,
    -1.978
  ],
  [
    -0.2967,
    -1.8462
  ],
  [
    0.1319,
    -0.3077
  ],
  [
    -0.3187,
    -0.5934
  ],
  [
    -0.7253,
    -0.7253
  ],
  [
    -1.3956,
    -0.7473
  ],
  [
    -1.8791,
    -0.6484
  ],
  [
    -2.0549,
    -0.4945
  ],
  [
    -2.1099,
    -0.2747
  ],
  [
    -2.044,
    0.1429
  ],
  [
    -1.8242,
    0.7363
  ],
  [
    -1.8901,
    0.7582
  ],
  [
    -2.6044,
    0.6374
  ],
  [
    -3.1429,
    -0.5934
  ],
  [
    -4.5495,
    -0.5934
  ],
  [
    -3.967,
    0.5714
  ],
  [
    -5.0,
    0.5604
  ],
  [
    -4.4615,
    1.5604
  ],
  [
    -3.4505,
    1.6264
  ],
  [
    -2.9451,
    2.6044
  ],
  [
    -1.7033,
    2.7143
  ],
  [
    -2.1319,
    1.7253
  ],
  [
    -1.4505,
    1.7143
  ],
  [
    -1.1319,
    2.3846
  ],
  [
    -0.8571,
    2.6374
  ],
  [
    -0.4505,
    2.8681
  ],
  [
    0.044,
    3.011
  ],
  [
    1.7582,
    3.1868
  ]
];

export function createPlusNineShape(): THREE.Shape {
  const shape = new THREE.Shape();
  if (PLUS9_CONTOUR_POINTS.length === 0) return shape;

  const [startX, startY] = PLUS9_CONTOUR_POINTS[0];
  shape.moveTo(startX, startY);

  for (let i = 1; i < PLUS9_CONTOUR_POINTS.length; i++) {
    const [x, y] = PLUS9_CONTOUR_POINTS[i];
    shape.lineTo(x, y);
  }

  shape.closePath();
  return shape;
}

export function createPlusNineGeometry(): THREE.ExtrudeGeometry {
  const shape = createPlusNineShape();
  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 2,
    depth: 0.85,
    bevelEnabled: true,
    bevelThickness: 0.14,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 8,
    curveSegments: 24,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center(); // Center around origin for balanced rotation
  geometry.computeVertexNormals();
  return geometry;
}
