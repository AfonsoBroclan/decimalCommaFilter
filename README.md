# decimalCommaFilter
An AngularJS filter to convert numbers into the decimal comma format, as it is used in most european countries.

# How To Use

In the AngularJS files:
  $filter('decimalComma')(number, 2)
  
In HTML files:
  {{number | decimalComma:2}}
or:
  ng-bind="number | decimalComma:2"
  
