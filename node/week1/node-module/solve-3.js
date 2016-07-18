var argv = require('yargs') // Refer to that module in node_modules whit a 'module_name' string.
    .usage('Usage: node $0 --l=[num] --b=[num]') // Print out message if the command-line arguments do not demand 
    // the -l , -b defined in the 'demand' method
    .demand(['l','b']) // Demand the command-line arguments to -l [required] -b [required]
    .argv; // Get the command-line arguments as a plain object to pass to 'argv' variable.
 
var rect = require('./rectangle-2');

function solveRect(l,b) {
    console.log("Solving for rectangle with l = "
                + l + " and b = " + b);
    rect(l,b, function(err,rectangle) {
	if (err) {
	    console.log(err);
	}
	else {
            console.log("The area of a rectangle of dimensions length = "
                  + l + " and breadth = " + b + " is " + rectangle.area());
	    console.log("The perimeter of a rectangle of dimensions length = "
                  + l + " and breadth = " + b + " is " + rectangle.perimeter());
	}
    });
};

solveRect(argv.l,argv.b); // Refer to the 'argv' variable's property by using 'argv.l', 'argv.b', 'argv.$0' or 'argv'.