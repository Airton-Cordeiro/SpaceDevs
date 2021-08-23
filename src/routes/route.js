import express from 'express';
import ControllerListar from '../controller/ControllerListar.js'

const routes = express.Router()

routes.get("/upcoming-launches", ControllerListar.listar)

export default routes;