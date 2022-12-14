import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.debug = this.experience.debug

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('environment').close()
		}

		this.setSunLight()
		// this.setAmbientLight()
		this.setEnvironmentMap()
	}

	// setAmbientLight() {
	// 	this.ambient = new THREE.AmbientLight('#ffffff', 5)
	// 	if (this.debug.active) {
	// 		this.debugFolder
	// 			.add(this.ambient, 'intensity')
	// 			.name('ambient')
	// 			.min(0)
	// 			.max(50)
	// 			.step(0.001)
	// 	}
	// }

	setSunLight() {
		this.sunLight = new THREE.DirectionalLight('#ffffff', 0.7)
		this.sunLight.castShadow = true
		this.sunLight.shadow.camera.far = 15
		this.sunLight.shadow.mapSize.set(1024, 1024)
		this.sunLight.shadow.normalBias = 0.05
		this.sunLight.position.set(0.548, -1.233, 5)

		this.scene.add(this.sunLight)

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(this.sunLight, 'intensity')
				.name('sunLightIntensity')
				.min(0)
				.max(10)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'x')
				.name('sunLightX')
				.min(-5)
				.max(5)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'y')
				.name('sunLightY')
				.min(-5)
				.max(5)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'z')
				.name('sunLightZ')
				.min(-5)
				.max(5)
				.step(0.001)
		}
	}

	setEnvironmentMap() {
		this.environmentMap = {}
		this.environmentMap.intensity = 5
		this.environmentMap.texture = this.resources.items.environmentMapTexture
		this.environmentMap.texture.encoding = THREE.sRGBEncoding

		this.scene.environment = this.environmentMap.texture

		this.environmentMap.updateMaterials = () => {
			this.scene.traverse((child) => {
				if (
					child instanceof THREE.Mesh &&
					child.material instanceof THREE.MeshStandardMaterial
				) {
					child.material.envMap = this.environmentMap.texture
					child.material.envMapIntensity = this.environmentMap.intensity
					child.material.needsUpdate = true
				}
			})
		}
		this.environmentMap.updateMaterials()

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(this.environmentMap, 'intensity')
				.name('envMapIntensity')
				.min(0)
				.max(4)
				.step(0.001)
				.onChange(this.environmentMap.updateMaterials)
		}
	}
}
