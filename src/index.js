function calculate(expr) {
    let arr = expr.split(' ');

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "*") {
            arr[i] = Number(arr[i - 1]) * Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i -= 1;
        }
        if (arr[i] === "/") {
            if (arr[i + 1] === '0') throw new TypeError('TypeError: Division by zero.');
            arr[i] = Number(arr[i - 1]) / Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i -= 1;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "+") {
            arr[i] = Number(arr[i - 1]) + Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i -= 1;
        }
        if (arr[i] === "-") {
            arr[i] = Number(arr[i - 1]) - Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i -= 1;
        }
    }
    return Number(arr[0]);
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');
    let open__br = 0, close__br = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            open__br += 1;
        }
        if (expr[i] == ')') {
            close__br += 1;
        }
    }
    if (open__br !== close__br) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    let br__expression;

    while (open__br > 0) {
        if ((br__expression = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)) !== null) {
            for (let i = 0; i < br__expression.length; i++) {
                let str = br__expression[i].replace('(', '').replace(')', '');
                expr = expr.replace(br__expression[i], calculate(str));
            }
        }
        open__br -= 1;
    }
    return calculate(expr);
}

module.exports = {
    expressionCalculator
}