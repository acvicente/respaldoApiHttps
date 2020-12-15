import { Router } from 'express';
import { getBotonesPago } from '../controllers/pasarela-pago.controller'

const router = Router();

router.route('/botones/:id')
    .get(getBotonesPago)

export default router;