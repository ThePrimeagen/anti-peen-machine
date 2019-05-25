const checks = [
    require('./ascii-art'),
    require('./equal-peen')
];

module.exports = function checkers(line) {
    return checks.reduce((acc, check) => {
        return acc || check(line);
    }, false);
};

