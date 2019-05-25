const levenshtein = require('./stages/levenshtein');

const hi = 'HELLO MY NAME IS SOMETHING';
const peen = '8====>';
console.log('Length', hi.length, 'levenshtein distance', levenshtein(peen, hi));

