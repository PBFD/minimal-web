'use strict'

import { MetaData } from './metadata.js'

class App {
    #metadata = new MetaData()

    init() {
        this.#metadata.load()
    }
}

const app = new App()
app.init()
