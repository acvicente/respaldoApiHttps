import { Router } from 'express';
import { getConfiguracion, updateConfiguracion } from '../controllers/configuracion.controller'

const router = Router();

router.route('/:id')
    .get(getConfiguracion)

router.route('/:id')
    .put(updateConfiguracion);

export default router;