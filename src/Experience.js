import * as THREE from 'three';
import Camera from './Camera.js';
let instance = null

export default class Experience {

    constructor(canvas) {

        // Singleton.Allows to import the Experience wherever we need it in our code and then instantiate it to retrieve the first instance.
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        /** Setup */
        this.scene = new THREE.Scene()
        this.camera = new Camera()

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Time
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        // Basic seen. To be deleted later
        this.createCube();
        this.createFloor();

        // Call the tick method to animate and render
        this.tick();

    }

    createCube() {
        // Cube geometry and material
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        // Create the mesh with geometry and material
        this.cube = new THREE.Mesh(geometry, material);

        // Add the cube to the scene
        this.scene.add(this.cube);
    }

    createFloor() {
        // Plane geometry and material
        const geometry = new THREE.PlaneGeometry(6, 6, 1);
        const material = new THREE.MeshBasicMaterial({ color: 'red' });

        // Create the mesh with geometry and material
        this.plane = new THREE.Mesh(geometry, material);
        this.plane.rotation.x = - Math.PI * 0.5
        this.plane.position.y = -1

        // Add the cube to the scene
        this.scene.add(this.plane);
    }

    tick() {

        const currentTime = Date.now()

        // Calculate the time difference (delta) between this frame and the last frame
        this.delta = currentTime - this.current

        // Update the 'current' time to the current frame's time
        // This ensures that in the next frame, we can correctly calculate the delta time again
        this.current = currentTime

        // Update the cube (rotate it for fun)
        this.cube.rotation.y += this.delta * 0.001;

        // Update the camera (in case we add controls later)
        this.camera.update();

        // Render the scene with the camera
        this.renderer.render(this.scene, this.camera.instance);

        // Use requestAnimationFrame to render continuously
        window.requestAnimationFrame(() => this.tick());
    }

}