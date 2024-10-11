import * as THREE from 'three'
import Experience from '../../Experience.js'
import firefliesVertexShader from './shaders/vertex.glsl'
import firefliesFragmentShader from './shaders/fragment.glsl'

export default class FireFlies { 

    constructor() {

        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.sizes = this.experience.sizes

        // Setup
        this.setGeometry()
        this.setMaterial()
        this.setPoints()

    }

    setGeometry() {

        // Create a new BufferGeometry object for the fireflies
        this.firefliesGeometry = new THREE.BufferGeometry();

        // Define the number of fireflies to generate
        this.firefliesCount = 40;

        // Create arrays to store position and scale data for each firefly
        // Position array holds x, y, z coordinates for each firefly
        this.positionArray = new Float32Array(this.firefliesCount * 3);
        // Scale array holds a scale value for each firefly
        this.scaleArray = new Float32Array(this.firefliesCount);

        // Loop through each firefly to assign random position and scale values
        for (let i = 0; i < this.firefliesCount; i++) {
            // Calculate the starting index for the current firefly in the position array
            let i3 = i * 3;

            // Assign a random x position between -2 and 2
            this.positionArray[i3    ] = (Math.random() - 0.5) * 4;

            // Assign a random y position between 0 and 1.5
            this.positionArray[i3 + 1] = Math.random() * 1.5;

            // Assign a random z position between -2 and 2
            this.positionArray[i3 + 2] = (Math.random() - 0.5) * 4;

            // Assign a random scale between 0 and 1 for the current firefly
            this.scaleArray[i] = Math.random();
        }

        // Set the 'position' attribute of the geometry using the position array
        // This defines where each firefly will be located in the scene
        this.firefliesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.positionArray, 3)
        );
        
    }

    setMaterial() {
        /* 
         * Material. Attenuation will make sure points farther from the camera 
         *  will appear smaller, and points closer will appear larger.
         */
        // this.firefliesMaterial = new THREE.PointsMaterial({ size: 0.1, sizeAttenuation: true })

        // Ensure `debugObject` exists and provide fallback values
        const fireFliesSize = this.debug?.debugObject?.fireFliesSize || 100 

        this.firefliesMaterial = new THREE.ShaderMaterial({
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            uniforms: {
                uPixelRatio: { value: this.sizes.pixelRatio }, // pixle ratio retrieved from Sizes class to fix the pixles size of the particles
                uSize: new THREE.Uniform(fireFliesSize)
            },
            transparent: true,
        })
    }

    setPoints() {
        // Points
        this.fireflies = new THREE.Points(this.firefliesGeometry, this.firefliesMaterial)
        this.scene.add(this.fireflies)
    }

    resize() {

        this.firefliesMaterial.uniforms.uPixelRatio.value = this.sizes.pixelRatio

    }
}