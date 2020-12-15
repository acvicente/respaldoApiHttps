import { Router } from 'express';
import { correoSoporte } from '../controllers/correoSoporte.controller';

const router = Router();

router.route('/')
    .post(correoSoporte);

export default router;