import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Experience from '../Experience.js'

export default class Model {

    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene

        // Loaders
        const gltfLoader = new GLTFLoader()
        const textureLoader = new THREE.TextureLoader()

        // Textures
        const bakedTexture = textureLoader.load('./baked1.jpg')
        bakedTexture.flipY = false 
        bakedTexture.colorSpace = THREE.SRGBColorSpace

        // Materials
        const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

        // Pole light material
        const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

        // Portal light material
        const portalLightMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' })


        /**
         * Model
         */
        gltfLoader.load(
            './portal.glb',
            (gltf) => {
                // console.log(gltf)
                this.scene.add(gltf.scene)

                // Get each object
                const bakedMesh = gltf.scene.children.find((child) => child.name === 'baked')
                const portalLightMesh = gltf.scene.children.find((child) => child.name === 'portalLight')
                // const poleLightAMesh = gltf.scene.children.find((child) => child.name === 'poleLightA')
                const poleLightBMesh = gltf.scene.children.find((child) => child.name === 'poleLightB')

                // Apply materials
                bakedMesh.material = bakedMaterial
                portalLightMesh.material = portalLightMaterial
                // poleLightAMesh.material = poleLightMaterial
                poleLightBMesh.material = poleLightMaterial

            }
        )

    }

}
