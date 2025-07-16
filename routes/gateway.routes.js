import express from 'express';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';
import { createServiceProxy } from '../middleware/proxy.middleware.js';

const router = express.Router();


router.use('/api/auth', createServiceProxy('auth'));


router.use('/api/apprenants', 
  verifyToken,
  checkRole(['ADMIN', 'FORMATEUR', 'APPRENANT']),
  createServiceProxy('apprenants')
);

router.use('/api/briefs', 
  verifyToken,
  checkRole(['ADMIN', 'FORMATEUR', 'APPRENANT']),
  createServiceProxy('briefs')
);


router.use('/api/competences', 
  verifyToken,
  checkRole(['ADMIN', 'FORMATEUR']),
  createServiceProxy('competences')
);

export default router;