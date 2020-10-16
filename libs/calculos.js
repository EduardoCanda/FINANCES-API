//libs -> onde há coisas úteis para o projeto inteiro
//libs -> OBS: deve ser o menos acoplado possível

function media(array) {
    const soma = soma(array);
    const media = soma / array.length;
    return media;
}

function soma(array) {
    const sum = array.reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    return sum;
}

export default { media, soma };