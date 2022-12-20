// *** BASIC CLASS Builder ***

class Builder {
    constructor(value) {
        this.value = value;
    }

    // take infinite number of integers and sum all with stored value / takes infinite number of strings and concat with stored string
    plus(...n) {
        n.forEach(arg => this.value += arg);
        return this;
    }

    // returns stored value
    get() {
        return this.value;
    }

    // sets new value
    set(value) {
        this.value = value || 0;
        return this;
    }
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
    this.value = value || '';
}

StringBuilder.prototype = Object.create(Builder.prototype);

// cut last n chars from stored string
StringBuilder.prototype.minus = function(n) {
    this.value = this.value.slice(0, this.value.length - n);
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
    this.value = this.value.slice(0, k);
    return this;
}

//remove taken string str from stored; Prohibited to use String.prototype.replace()
StringBuilder.prototype.remove = function(str) {
    let index = this.value.indexOf(str);
    while(index >= 0) {
        const start = this.value.indexOf(str);
        const end = start + str.length;
        this.value = this.value.slice(0, start) + this.value.slice(end);
        index = this.value.indexOf(str);
    }
    return this;
}

// leaves substring starting from and with length n
StringBuilder.prototype.sub = function(from, n) {
    this.value = this.value.slice(from, from + n);
    return this;
}
