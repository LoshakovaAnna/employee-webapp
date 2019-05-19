'use strict';

angular
  .module('appClient')
    .controller('emloyeeListCtrl', [ '$scope','$log', '$http', 
      function($scope,$log, $http) {
        
        $scope.listEmpl = [];
        
        $scope.getAllEmployees = function(){
            $http.get('http://localhost:3010/api/employees')
                .then ( ( { data } ) =>  {
                    $scope.listEmpl = data;              
                  })    
                .catch( error => { 
                  $log.error("error", error);
                });
              }
      
        $scope.getAllEmployees();  
        setTimeout(function run() {  
                $scope.getAllEmployees();              
                setTimeout(run, 60000);            
            }, 5000);         
      }]);
      