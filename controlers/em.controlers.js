const express = require('express');
const router = express.Router();

const service = require('../services/emp.service');

router.get('/', async (req, res) => {
  const employes = await service.getAllEmployes();
  res.send(employes);
});

router.get('/:id', async (req, res) => {
  const employe = await service.getEmployeById(req.params.id);
  if (employe === undefined) {
    res.status(404).json(`Employe with id ${req.params.id} not found`);
  } else {
    res.send(employe);
  }
});

router.delete('/:id', async (req, res) => {
  const affectedRows = await service.deleteEmploye(req.params.id);
  if (affectedRows === 0) {
    res.status(404).json(`Employe with id ${req.params.id} not found`);
  } else {
    console.log(affectedRows);

    res.send(`Employe with id ${req.params.id} deleted successfully`);
  }
});

router.post('/', async (req, res) => {
  await service.addOrdEditEmployes(req.body);
  res.status(201).send('Employe added successfully');
});

router.put('/:id', async (req, res) => {
  const affectedRows = await service.addOrdEditEmployes(
    req.body,
    req.params.id
  );
  if (affectedRows === 0) {
    res.status(404).json(`Employe with id ${req.params.id} not found`);
  } else {
    res.send(`Employe with id ${req.params.id} updated successfully`);
  }
});

module.exports = router;
