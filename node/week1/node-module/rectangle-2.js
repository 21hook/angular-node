/*
 Version 2.0.0 of the solve-*.js
*/
module.exports = function(x,y,callback) { // Export the function to modules
  try {
    if (x < 0 || y < 0) { // If errors occur, create an error instance and return the excution.
        throw new Error("Rectangle dimensions should be greater than zero: l = "
                            + x + ", and b = " + y);
    }
    else
         callback(null, { // Function is a variable to recall the function.
            perimeter: function () { // The innner function references to outer function's variable through a closure. 
        		   return (2*(x+y));
			},
            area:function () {
        		    return (x*y);
			}
    });
  }
  catch (error) { // 'catch' keyword will recive the error intance from the 'try'  statement and process it.
        callback(error,null);
  }
}