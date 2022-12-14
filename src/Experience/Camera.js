import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('camera').close()
		}

		this.setInstance()
		this.setControls()
		this.setDebug()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height,
			0.1,
			500
		)
		this.instance.position.set(6, 4, 8)

		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enableDamping = true
		this.controls.dampingFactor = 0.005
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.controls, 'enablePan')
			this.debugFolder
				.add(this.controls, 'maxAzimuthAngle')
				.min(-5)
				.max(5)
				.step(0.1)
				.name('maxAzimuthAngle')
			this.debugFolder
				.add(this.controls, 'minAzimuthAngle')
				.min(-5)
				.max()
				.step(0.1)
				.name('minAzimuthAngle')
			this.debugFolder
				.add(this.controls, 'maxDistance')
				.min(4)
				.max(10)
				.step(0.1)
				.name('maxDistance')
		}
	}
	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		this.controls.update()
		// console.log(this.controls.object.position)
	}
}
