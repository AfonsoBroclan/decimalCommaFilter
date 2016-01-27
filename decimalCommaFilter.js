angular.module('numberFilters', []) //inject 'numberFilters' to your app.js main module

.filter('decimalComma', [ ,
    function () { 
        return function (number, decimalCount) { // number - the number you want to convert, decimalCount - how many decimal places you wish
            if (angular.isUndefined(decimalCount) || decimalCount == null) { //if you only pass the number as parameter, the default is 2 decimal places
                decimalCount = 2; 
            }

            var newNumber = '';
			if (angular.isNumber(number)) { //converts to string if parameter is type number, as the following procedures only work in strings
				newNumber = number.toString();
			} else {
				newNumber = number;
			}

			var oldDotPosition = newNumber.indexOf('.'); //get the original position of the dot, in the case that there is no decimal places in the original number
			newNumber = newNumber.replace(/\B(?=(\d{3})+(?!\d))/g, "."); //inserts a dot in every 3 digits, if the number is 100000, the result is 100.000 (this is thanks to the \B in the regular expression)
			var dotPositon = newNumber.lastIndexOf('.'); //gets the new position of the decimal dot.

			if (oldDotPosition != -1) { //if there was an original dot, there was at least 1 decimal place
				newNumber = newNumber.slice(0, dotPositon) + (decimalCount > 0 ? ',' + newNumber.slice(dotPositon + 1, dotPositon + 1 + decimalCount) : ''); //places a comma instead of the decimal dot
				if (decimalCount > 0 && dotPositon > newNumber.length - (1 + decimalCount)) { //check if there should be more decimal houses
					var end = decimalCount - (newNumber.length - dotPositon - 1); //calculates the number of decimal places missing

					for (var i = 0; i < end; i++) { //adds the missing decimal places
						newNumber = newNumber + '0';
					}
				}
			} else { 
				newNumber = newNumber + (decimalCount > 0 ? ',' : ''); //places a comma instead of the decimal dot
				for (var i = 0; i < decimalCount; i++) { //adds the missing decimal places
					newNumber = newNumber + '0';
				}
			}

            return newNumber;
        };
    }
]);