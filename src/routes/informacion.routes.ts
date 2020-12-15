import { Router } from 'express';
import { getInformacion, updateInformacion} from '../controllers/informacion.controller';

const router = Router();

router.route('/:id')
    .get(getInformacion);

router.route('/:id')
    .put(updateInformacion);

export default router;