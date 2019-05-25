module.exports = function levenshtein(peen, peenInQuestion) {
    if (!peenInQuestion.length || !peen.length) {
        return 100000;
    }

    const m = peen.length;
    const n = peenInQuestion.length;
    let v0 = new Array(n + 1);
    let v1 = new Array(n + 1);

    for (let i = 0; i <= n; ++i) {
        v0[i] = i;
    }

    for (let i = 0; i < m; ++i) {

        v1[0] = i + 1;

        for (let j = 0; j < n; ++j) {
            const deleteCost = v0[j + 1] + 1;
            const insertCost = v1[j] + 1;
            const subCost = v0[j] + (peen[i] !== peenInQuestion[j] ? 1 : 0);

            v1[j + 1] = Math.min(deleteCost, insertCost, subCost);
        }

        v0 = v1.slice(0);
    }

    return v0[n];
};

