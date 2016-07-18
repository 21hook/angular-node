var rect = require('./rectangle-2'); // Import the relative path or absolute physical path to access the module.

function solveRect(l,b) {
    console.log("Solving for rectangle with l = "
                + l + " and b = " + b);
    rect(l,b, function(err,rectangle) {
        if (err) { // If the error is null, exectue 'else' statement; if the error is not null, exectute 'if'  statement.
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

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);


/* 
----- The Whole Process of Node Module -------

node solve-2.js exectute the node module, then node module call the callback function,  the callback function send 
the (error) meessage for you at last.

*/