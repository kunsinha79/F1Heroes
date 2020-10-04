# F1Heroes
To use ergast API to generate list of F1 world champions and season winner from 2005 till 2015

# Prequisites
Nodejs
Angular-cli

# Instructions
1. Clone the repository
2. Change to the cloned folder
3. Execute npm i
4. Execute ng serve

# APIs used
1. http://ergast.com/api/f1/driverstandings/1.json?limit=11&offset=55
This API will fetch data for all F1 world champions from 2005 till 2015. The Offset param takes care of the year to start from and Limit param takes care of how many records to fetch. `driverStranding` when called with parameter `1` will always return first position holders season wise

2. http://ergast.com/api/f1/2015/qualifying/1.json
This API will fetch data of all winners for a particular season.

# Styles
Angular Material has been used to show the toolbar, icons, card, button, spinner. Toolbar has been customized to show home or back icon based on route
SASS has been used to decorate the components

# Exception in devices
Tablet viewport has not been considered

# Unit Test
Service and Components have been covered using Jasmine assertion library

