import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { CreateCompanyDTO } from '../dtos/company.dto';

const prisma = new PrismaClient();
const router = express.Router();

// POST /companies
router.post(
  '/',
  body('name').notEmpty().withMessage('name is required'),
  body('registrationNumber').notEmpty().withMessage('registrationNumber is required'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const payload = req.body as CreateCompanyDTO;
      const created = await prisma.company.create({ data: payload });
      return res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
);

// GET /companies (with services)
router.get('/', async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany({ include: { services: true } });
    res.json(companies);
  } catch (err) {
    next(err);
  }
});

export default router;
