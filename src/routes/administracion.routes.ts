import { Router } from 'express';
import { getAdministracion, updateAdministracion} from '../controllers/administracion.controller';

const router = Router();

router.route('/:id')
    .get(getAdministracion)

router.route('/')
    .put(updateAdministracion);


export default router;