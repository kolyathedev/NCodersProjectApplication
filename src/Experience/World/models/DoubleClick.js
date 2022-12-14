import { Vector3 } from 'three'
import Experience from '../../Experience'

export default class Model {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.doubleClick
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('doubleClick').close()
		}

		// this.material = new MeshBasicMaterial({})

		this.setModel()
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene

		this.model.rotation.y = 7.4
		this.model.scale.x = 0.3
		this.model.scale.y = 0.3
		this.model.scale.z = 0.3
		this.model.position.set(-4.2, 2.9, 2.6)

		this.scene.add(this.model)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.model.rotation, 'y').min(-10).max(10).step(0.1)
			this.debugFolder.add(this.model.position, 'x').min(-10).max(10).step(0.1)
			this.debugFolder.add(this.model.position, 'y').min(-10).max(10).step(0.1)
			this.debugFolder.add(this.model.position, 'z').min(-10).max(10).step(0.1)
		}
	}
}
