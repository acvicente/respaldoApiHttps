import { Router } from 'express';
import { getImgBanner, createImgBanner, deleteImgBanner } from '../controllers/imagenesBanner.controller';

const router = Router();

router.route('/:id')
    .get(getImgBanner)

router.route('/:id')
    .delete(deleteImgBanner);

router.route('/')
    .post(createImgBanner);


export default router;