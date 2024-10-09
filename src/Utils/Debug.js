import GUI from 'lil-gui'
import Experience from '../Experience.js';

export default class Debug {
    constructor() {

        this.experience = new Experience()
        this.model = this.experience.world.model
        this.renderer = this.experience.renderer
        
        // this.active = window.location.hash === '#debug'
        this.active = true;

        this.debugObject = {}
        // Portal light material
        this.debugObject.portalColorStart = '#000000'
        this.debugObject.portalColorEnd = '#ffffff'
        
        this.debugObject.clearColor = '#201919'
        
        if (this.active) {
            this.ui = new GUI()

            this.setupDebugUI()
        }
    
    }

    setupDebugUI() {

            this.ui.addColor(this.debugObject, 'clearColor').onChange(() => {
                this.renderer.setColor(this.debugObject.clearColor)
            }).name('Background color')

            const folder = this.ui.addFolder('Portal Colors');

            folder.addColor(this.debugObject,'portalColorStart').onChange(() => {
                this.model.portalLightMaterial.uniforms.uColorStart.value.set(this.debugObject.portalColorStart)
            }).name('Portal centeral color')

            folder.addColor(this.debugObject,'portalColorEnd').onChange(() => {
                this.model.portalLightMaterial.uniforms.uColorEnd.value.set(this.debugObject.portalColorEnd)
            }).name('Portal outer glow')

    }
}