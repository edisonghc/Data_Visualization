function unique(array) {
    return array.filter(function (a) {
        return !this[a] ? this[a] = true : false;
    }, {});
}