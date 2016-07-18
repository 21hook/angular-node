// JS do not support a standard library as C++, C# or Java does.
// CommondJS fills the gap by defining a standard API,
// and node follow the module specifilization of CommonJS
// Here are Node.js module format.
exports.perimeter = function (x, y) { // Expose the function to the outside object property.
        return (2*(x+y));
}

exports.area = function (x, y) {
        return (x*y);
}