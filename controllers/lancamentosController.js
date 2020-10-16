//controllers -> onde a regra de negócio é manipulada

import { promises } from 'fs';
import moment from 'moment';
import calc from '../libs/calculos.js';

const { writeFile, readFile } = promises;

async function inserirLancamento(lancamento, tipo = '') {
    const json = JSON.parse(await readFile(global.lancamentos));

    lancamento = {
        id: json.nextId++
        , valor: lancamento.valor
        , categoria: lancamento.categoria
        , data: lancamento.data
    };

    if (tipo === 'D') {
        lancamento.valor = lancamento.valor * -1;
    }

    json.lancamentos.push(lancamento);

    await writeFile(global.lancamentos, JSON.stringify(json, null, 2));

    return lancamento;
}

async function totalMes(mes) {
    const json = JSON.parse(await readFile(global.lancamentos));

    let lancamentos = json.lancamentos.filter(lancamento => {
        //extraindo o mês da data passada
        const m = moment(lancamento.data, "DD/MM/YYYY").month() + 1;

        return m === mes;
    });

    lancamentos = lancamentos.map(lancamento => lancamento.valor);

    return { total: calc.soma(lancamentos) }
}


//exportação nomeada
export { inserirLancamento, totalMes };