import express from 'express';
import { promises } from 'fs';
import lancamentosRouter from './router/lancamentosRouter.js';

const { writeFile } = promises;

const app = express();

global.lancamentos = 'lancamentos.json';

app.use(express.json());

app.use('/lancamentos', lancamentosRouter);

app.listen(8080, async () => {

    try {
        const initialJson = {
            nextId: 1
            , lancamentos: []
        };

        await writeFile(global.lancamentos, JSON.stringify(initialJson), { flag: 'wx' });

        console.log('API ON');

    } catch (error) {

    }

});