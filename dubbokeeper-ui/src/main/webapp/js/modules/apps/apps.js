var apps=angular.module("apps",['ngAnimate','ngRoute']);
apps.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"templates/apps/application-table.html",
        controller:"appTable"
    }).when("/:application/nodes",{
        templateUrl:"templates/apps/node-details.html",
        controller:"nodesDetail"
    }).when("/:application/consumes",{
        templateUrl:"templates/apps/consume-details.html",
        controller:"consumeDetail"
    }).when("/:application/consumers",{
        templateUrl:"templates/apps/consumer-details.html",
        controller:"consumerDetail"
    }).when("/:application/provides",{
        templateUrl:"templates/apps/provide-details.html",
        controller:"provideDetail"
    }).when("/:provider/:consumer/consumes",{
        templateUrl:"templates/apps/provide-details.html",
        controller:"consumeServiceDetails"
    }).when("/:service/service-consumers",{
        templateUrl:"templates/apps/application-table.html",
        controller:"consumerAppTable"
    }).otherwise("/");
});



apps.controller("consumeServiceDetails",function($scope,$http,$routeParams){
    $scope.details=[];
    $scope.isEmpty=false;
    $scope.provider=$routeParams.provider;
    $scope.consumer=$routeParams.consumer;
    $scope.isForOneConsumer=true;
    $http.post("app/"+$routeParams.provider+"/"+$routeParams.consumer+"/consumes.htm").success(function(data){
        $scope.details=data;
        if(!data||data.length<=0){
            $scope.isEmpty=true;
        }
    });
    $scope.currentParameters="";
    $scope.viewParameters=function(detail){
        $scope.currentParameters=detail.parameters;
        //$('.modal-dialog').modal('toggle');
    }
});

apps.controller("consumerDetail",function($scope,$http,$routeParams){
    $scope.details=[];
    $scope.isEmpty=false;
    $scope.application=$routeParams.application;
    $http.post("app/"+$routeParams.application+"/consumers.htm").success(function(data){
        $scope.details=data;
        if(!data||data.length<=0){
            $scope.isEmpty=true;
        }
    });
   /* $scope.currentParameters="";
    $scope.viewParameters=function(detail){
        $scope.currentParameters=detail.parameters;
        //$('.modal-dialog').modal('toggle');
    }*/
});


apps.controller("nodesDetail",function($scope,$http,$routeParams){
    $scope.details=[];
    $scope.isEmpty=false;
    $scope.application=$routeParams.application;
    $http.post("app/"+$routeParams.application+"/nodes.htm").success(function(data){
        $scope.details=data;
        if(!data||data.length<=0){
            $scope.isEmpty=true;
        }
    });
});
apps.controller("consumeDetail",function($scope,$http,$routeParams){
    $scope.details=[];
    $scope.isEmpty=false;
    $scope.application=$routeParams.application;
    $http.post("app/"+$routeParams.application+"/consumes.htm").success(function(data){
        $scope.details=data;
        if(!data||data.length<=0){
            $scope.isEmpty=true;
        }
    });
});
apps.controller("provideDetail",function($scope,$http,$routeParams){
    $scope.details=[];
    $scope.isEmpty=false;
    $scope.application=$routeParams.application;

    $http.post("app/"+$routeParams.application+"/provides.htm").success(function(data){
        $scope.details=data;
        if(!data||data.length<=0){
            $scope.isEmpty=true;
        }
    });
    $scope.currentParameters="";
    $scope.viewParameters=function(detail){
        $scope.currentParameters=detail.parameters;
        //$('.modal-dialog').modal('toggle');
    }
});
apps.controller("consumerAppTable",function($scope,$http,$routeParams){
    $scope.applications=[];
    $scope.isEmpty=false;
    $scope.isConsumer=true;
    $scope.service=$routeParams.service;
    $http.post("app/"+$routeParams.service+"/consumer-apps.htm").success(function(data){
        $scope.applications=data;
        if(!data||data.length<0){
            $scope.isEmpty=true;
        }
    });
});

apps.controller("appTable",function($scope,$http){
    $scope.applications=[];
    $scope.isEmpty=false;
    $http.post("app/list.htm").success(function(data){
        $scope.applications=data;
        if(!data||data.length<0){
            $scope.isEmpty=true;
        }
    });
});
