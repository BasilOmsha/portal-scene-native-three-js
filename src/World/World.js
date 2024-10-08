import * as THREE from 'three'
import Experience from "../Experience.js"
import Model from './PortalScene/Model.js'

export default class World {

    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene

        this.model = new Model()

        // starter Mesh
        // Basic seen. To be deleted later
        //  this.createCube();
        //  this.createFloor();

    }

    createCube() {
        // Cube geometry and material
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

        // Create the mesh with geometry and material
        this.cube = new THREE.Mesh(geometry, material)

        // Add the cube to the scene
        this.scene.add(this.cube)
    }

    createFloor() {
        // Plane geometry and material
        const geometry = new THREE.PlaneGeometry(6, 6, 1)
        const material = new THREE.MeshBasicMaterial({ color: 'red' })

        // Create the mesh with geometry and material
        this.plane = new THREE.Mesh(geometry, material)
        this.plane.rotation.x = - Math.PI * 0.5
        this.plane.position.y = -1

        // Add the cube to the scene
        this.scene.add(this.plane)
    }

    update() {
        this.model.update()
    }

}