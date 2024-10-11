import GUI from 'lil-gui'
import Experience from '../Experience.js';

export default class Debug {
    constructor() {

        this.experience = new Experience()
        this.portalModel = this.experience.world.portalModel
        this.fireFliesModel = this.experience.world.fireFliesModel
        this.renderer = this.experience.renderer
        
        // this.active = window.location.hash === '#debug'
        this.active = true;

        this.debugObject = {}
        // Portal light material
        this.debugObject.portalColorStart = '#000000'
        this.debugObject.portalColorEnd = '#ffffff'

        this.debugObject.clearColor = '#201919'

        this.debugObject.fireFliesSize = 100

        this.debugObject.fireFliesCount = 40
        
        if (this.active) {
            this.ui = new GUI()

            this.setupDebugUI()
        }
    
    }

    setupDebugUI() {

            this.ui.addColor(this.debugObject, 'clearColor').onChange(() => {
                this.renderer.setColor(this.debugObject.clearColor)
            }).name('Background color')

            const folder = this.ui.addFolder('Portal');

            folder.addColor(this.debugObject,'portalColorStart').onChange(() => {
                this.portalModel.portalLightMaterial.uniforms.uColorStart.value.set(this.debugObject.portalColorStart)
            }).name('Portal centeral color')

            folder.addColor(this.debugObject,'portalColorEnd').onChange(() => {
                this.portalModel.portalLightMaterial.uniforms.uColorEnd.value.set(this.debugObject.portalColorEnd)
            }).name('Portal outer glow')

            folder.add(this.debugObject, 'fireFliesSize').min(0).max(500).step(1).onChange(() => {
                this.fireFliesModel.firefliesMaterial.uniforms.uSize.value = this.debugObject.fireFliesSize
            }).name('Fireflies size')

            folder.add(this.debugObject, 'fireFliesCount').min(10).max(200).step(1).onFinishChange(() => {
                this.fireFliesModel.updateFirefliesCount(this.debugObject.fireFliesCount)
            }).name('Fireflies count')

    }
}