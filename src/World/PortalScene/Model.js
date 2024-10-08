import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Experience from '../../Experience.js'
import portalVertexShader from './shaders/vertex.glsl'
import portalFragmentShader from './shaders/fragment.glsl'

export default class Model {

    constructor() {

        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene

        // Initialize loaders
        this.gltfLoader = new GLTFLoader()
        this.textureLoader = new THREE.TextureLoader()

        // paths
        this.modelPath = './portal.glb'
        this.texturePath = './baked1.jpg'

        // Load textures and models
        this.loadTextures()
        this.loadModel()

    }

    // Load textures
    loadTextures() {
        // Load baked texture
        this.bakedTexture = this.textureLoader.load(this.texturePath, (texture) => {
            texture.flipY = false;
            texture.colorSpace = THREE.SRGBColorSpace;
        });

        // Define materials
        this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture });
        this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
        this.portalLightMaterial = new THREE.ShaderMaterial({
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color('#000000') },
                uColorEnd: { value: new THREE.Color('#ffffff') }
            },
        })
    }

    // Load model
    loadModel() {
        this.gltfLoader.load(
            this.modelPath,
            (gltf) => {
                // console.log(gltf)
                this.processModel(gltf.scene);
            },
            undefined,
            (error) => {
                console.error(`Error loading model: ${this.modelPath}`, error);
            }
        );
    }

    // Process and apply materials to model
    processModel(scene) {
        // Add model to scene
        this.scene.add(scene);

        // Get each object
        const meshes = {
            baked: scene.children.find((child) => child.name === 'baked'),
            portalLight: scene.children.find((child) => child.name === 'portalLight'),
            poleLightA: scene.children.find((child) => child.name === 'poleLightA'),
            poleLightB: scene.children.find((child) => child.name === 'poleLightB'),
        };

        // Apply materials
        if (meshes.baked) {
            meshes.baked.material = this.bakedMaterial;
        }
        if (meshes.portalLight) {
            meshes.portalLight.material = this.portalLightMaterial;
        }
        if (meshes.poleLightA) {
            meshes.poleLightA.material = this.poleLightMaterial;
        }
        if (meshes.poleLightB) {
            meshes.poleLightB.material = this.poleLightMaterial;
        }
    }

    update() {

        this.portalLightMaterial.uniforms.uTime.value = this.time.elapsed * 0.001

    }

}
