import * as THREE from 'three';
import Camera from './Camera.js';
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Renderer from './Renderer.js'
import World from './World/World.js';
import Debug from './Utils/Debug.js';

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
        this.world = new World()
        this.debug = new Debug()
        
        

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

    resize() {
        this.camera.resize()
        this.renderer.resize()
        this.world.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()   
        this.world.update()
    }

}