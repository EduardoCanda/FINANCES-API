import express from 'express';
import { promises } from 'fs';
import { inserirLancamento, totalMes } from '../controllers/lancamentosController.js';

const { readFile } = promises;

const router = express.Router();

router.post('/receita', async (req, res, next) => {

    try {
        res.send(await inserirLancamento(req.body));
    } catch (error) {
        res.status(400).send(error.message);
    }

});

router.post('/despesa', async (req, res, next) => {

    try {
        res.send(await inserirLancamento(req.body, "D"));
    } catch (error) {
        res.status(400).send(error.message);
    }

});

router.get('/totalMes/:mes', async (req, res) => {
    try {
        res.send(await totalMes(parseInt(req.params.mes)));
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.get('/', async (req, res) => {
    const json = JSON.parse(await readFile(global.lancamentos));
    res.send(json);
});


export default router;