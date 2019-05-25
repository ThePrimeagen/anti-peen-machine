const levenshtein = require('../levenshtein');

const prefix = ['8', '()()', 'B'];
const suffix = ['D', '|)'];
const middles = ['=', '-', '+'];
const startingSize = 1;

function createPeen(p, m, s, len) {
    return [p, new Array(len).fill(m).join(''), s].join('');
}

const peens = [];
for (let i = 0; i < prefix.length; ++i) {
    const p = prefix[i];
    for (let j = 0; j < suffix.length; ++j) {
        const s = suffix[i];
        for (let k = 0; k < middles.length; ++k) {
            const m = middles[i];
            for (let l = 0; l < 10; ++l) {
                peens.push(createPeen(p, m, s, l));
            }
        }
    }
}

module.exports = function equalPeen(line) {
    return peens.reduce((acc, peen) => {
        return acc || levenshtein(peen, line) < 2;
    }, false);
};
