import * as THREE from 'three';
import Camera from './Camera.js';
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Renderer from './Renderer.js'

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
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()

        // Basic seen. To be deleted later
        this.createCube();
        this.createFloor();

        // Resize event
        this.sizes.on('resize', () =>{
            // console.log('A resize occurred')
            this.resize()
        })

         // Time tick event
         this.time.on('tick', () => {
            this.update()
        })  

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

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.cube.rotation.y += this.time.delta * 0.001;
        this.camera.update()
        this.renderer.update()   
    }

}