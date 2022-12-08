// *** BASIC CLASS Builder ***

function Builder(value) {
    this.value = value;
}

// take infinite number of integers and sum all with stored value / takes infinite number of strings and concat with stored string
Builder.prototype.plus = function(...n) {
    n.forEach(arg => this.value += arg);
    return this;
}

// returns stored value
Builder.prototype.get = function() {
    return this.value;
}

// sets new value
Builder.prototype.set = function(value) {
    this.value = value || 0;
    return this;
}

// *** DERIVED ES6 CLASS IntBuilder ***

class IntBuilder extends Builder {
    constructor(value) {
        super(value || 0);
    }

    // take infinite number of integers and subtract from stored value
    minus(...n) {
        n.forEach(arg => this.value -= arg);
        return this;
    }

    // multiply param n on stored value
    multiply(n) {
        this.value *= n;
        return this;
    }

    // leaves integer part of division stored value on n
    divide(n) {
        this.value = Math.trunc(this.value / n);
        return this;
    }

    // leaves remainder of the division stored value with on n
    mod(n) {
        this.value %= n;
        return this;
    }

    // static method; from, to: integer; values limits the range of random values
    static random(from, to) {
        from = Math.ceil(from);
        to = Math.floor(to);
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
}

// *** DERIVED ES5 CLASS StringBuilder ***

function StringBuilder(value) {
    Builder.call(this, value || '');
}

StringBuilder.prototype = Object.create(Builder.prototype);

// cut last n chars from stored string
StringBuilder.prototype.minus = function(n) {
    this.value = this.value.slice(0, n);
    return this;
}

// repeat stored strings n times
StringBuilder.prototype.multiply = function(int) {
    this.value = this.value.repeat(int);
    return this;
}

// leaves first k chars of stored string, where k = Math.floor(str.length / n)
StringBuilder.prototype.divide = function(n) {
    const k = Math.floor(this.value.length / n);
    this.minus(k);
    return this;
}

//remove taken string str from stored; Prohibited to use String.prototype.replace()
StringBuilder.prototype.remove = function(str) {
    const start = this.value.indexOf(str);
    const end = start + str.length;
    this.value = this.value.slice(0, start) + this.value.slice(end);
    return this;
}

// leaves substring starting from and with length n
StringBuilder.prototype.sub = function(from, n) {
    this.value = this.value.slice(from, from + n);
    return this;
}

// *** TESTS ***

// IntBuilder tests

let intBuilder = new IntBuilder(10);    // 10;
intBuilder
    .plus(2, 3, 2)                      // 17;
    .minus(1, 2)                        // 14;
    .multiply(2)                        // 28;
    .divide(4)                          // 7;
    .mod(3)                             // 1;
console.log(intBuilder.get());          // -> 1

intBuilder
    .set(13)                            // 13
    .mod(5)                             // 3
    .multiply(-4)                       // -12
    .minus(8)                           // -20
    .plus(1, 6)                         // -13
    .divide(3)                          // -4
    .divide(-3)                         // 1
console.log(intBuilder.get());          // -> 1

intBuilder = new IntBuilder();          // 0
intBuilder
    .plus(5, 5)                         // 10
    .divide(0)                          // Infinity
console.log(intBuilder.get());          // -> Infinity

intBuilder = new IntBuilder(5);         // 5
intBuilder
    .plus()                             // 5
    .multiply()                         // NaN
console.log(intBuilder.get());          // -> NaN

for(let i = 0; i < 10; i++) {
    console.log(IntBuilder.random(4, 10));
}

// StringBuilder tests
