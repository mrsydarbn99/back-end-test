import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { CreateServiceDTO } from '../dtos/service.dto';

const prisma = new PrismaClient();
const router = express.Router();

// POST /services
router.post(
  '/',
    body('name')
    .notEmpty().withMessage('Service name is required'),

    body('price')
    .isNumeric().withMessage('Price must be a valid number'),

    body('companyId')
    .isInt().withMessage('Company ID must be an integer'),

    body('description')
    .optional(),

    async (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const payload = req.body as CreateServiceDTO;

        // ensure company exists
        const company = await prisma.company.findUnique({ where: { id: payload.companyId } });
        if (!company) return res.status(404).json({ error: 'Company not found' });

        const created = await prisma.service.create({ data: payload });
        res.status(201).json(created);
        } catch (err) {
        next(err);
        }
    }
);

// GET /services/:id
router.get('/:id',
  param('id').isInt(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const id = Number((req.params?.id ?? ''));
      const service = await prisma.service.findUnique({
        where: { id },
        include: { company: true }
      });
      if (!service) return res.status(404).json({ error: 'Service not found' });
      res.json(service);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
