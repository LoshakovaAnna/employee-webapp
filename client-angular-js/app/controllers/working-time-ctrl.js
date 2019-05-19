'use strict';

angular
    .module('appClient')
        .controller('workingTimeCtrl', 
            ['$scope', '$log', '$http', '$routeParams',
                function($scope,$log, $http, $routeParams) {

                    var idEmployee = $routeParams.id;
                    $scope.date   = new Date();
                    $scope.workingTime  = null;

                    $scope.getEmployeeInfo = function(){
                        $http.post('http://localhost:3010/api/employee/info', {idEmployee})
                            .then ( ( { data } ) =>  { 
                                $scope.emplInfo  = data
                                })    
                            .catch( error => { 
                                $log.error("error", error);
                            });
                        }

                    $scope.getEmployeeInfo();

                    $scope.clearWorkingData = function(){            
                        $scope.currentDayListTime = [];
                        $scope.workingTime        = null;
                    };

                    $scope.getTimeWork = function(){
                        var year = $scope.date.getFullYear();
                        var month = $scope.date.getMonth() + 1;
                        var day = $scope.date.getDate() ;
                        var date = year + '-' + month + '-' + day;
                        
                        var dateId = { date, idEmployee};
                        
                        $http.post('http://localhost:3010/api/date', dateId)
                            .then ( ( { data } ) =>  {
                                $scope.currentDayListTime = data.workingTimeList;
                                $scope.workingTime = data.workingHours;
                            })    
                            .catch( error => { 
                                $log.error("error", error);
                            });
                    }            
        }]);