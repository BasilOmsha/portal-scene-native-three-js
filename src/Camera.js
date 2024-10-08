import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience.js";


export default class Camera {

    constructor() {

        // Experience instantiated here because we need access to its properties which are Sizes, scene and canvas classes
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()

    }

    setInstance() {
        // Setup Perspective Camera
        this.instance = new THREE.PerspectiveCamera(
            75, // Field of View
            this.sizes.width / this.sizes.height, // Aspect ratio
            0.1, // Near clipping plane
            100 // Far clipping plane
        );

        this.instance.position.set(3, 3, 3); // Position the camera 
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    // called from parent class (Experience)
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }

}