// @ts-ignore
import express from 'express'
import { routes } from './routes'

class App {
    express: express.Application

    constructor() {
        this.express = express()
        this.middleware()
        this.routes()
    }

    private middleware(): void {
        this.express.use(express.json())
    }

    private routes(): void {
        this.express.use(routes)
    }
}

export default new App().express