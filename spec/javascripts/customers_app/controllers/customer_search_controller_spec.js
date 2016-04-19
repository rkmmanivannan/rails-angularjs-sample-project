describe("CustomerSearchController",function(){


  // Checks Empty Customer List

  describe("Initialization",function(){
    var scope   = null;
    controller  = null;

    beforeEach(module("customers"));

    beforeEach(inject(function ($controller,$rootScope){
      scope      = $rootScope.$new();
      controller = $controller("CustomerSearchController",{
        $scope: scope
      });
    }));

    it("defaults to an empty customer list",function(){
      expect(scope.customers).toEqualData([]);
    });
  });




  // Fetch search results based on input
  describe("Fetching Search Results",function(){
    var scope         = null;
        controller    = null;
        httpBackend   = null;
        serverResults = [
          {
            id: 123,
            first_name: "Bob",
            last_name: "Jones",
            email: "bjones@foo.net",
            username: "jonesy"
          },
          {
            id: 456,
            first_name: "Bob",
            last_name: "Johnsons",
            email: "johnboy@bar.info",
            username: "bobbyj"
          }
        ];

    beforeEach(module("customers"));

    beforeEach(inject(function($controller,$rootScope,$httpBackend){
      scope         =  $rootScope.$new();
      httpBackend   =  $httpBackend;
      controller    =  $controller("CustomerSearchController",{
        $scope: scope
      });
    }));

    beforeEach(function(){
      httpBackend.when('GET','/customers.json?keywords=bob&page=0').
                  respond(serverResults);
    });

    // previous setup code
    it("populates the customer list with the results", function(){
      scope.search("bob");
      httpBackend.flush();
      expect(scope.customers).toEqualData(serverResults);
    });
  });


  // Error Handling

  describe("Error Handling", function() {

    // same setup as previous test...

    var scope       = null,
        controller  = null,
        httpBackend = null;

    beforeEach(module("customers"));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope       = $rootScope.$new();
        httpBackend = $httpBackend;
        controller  = $controller("CustomerSearchController", {
          $scope: scope
        });
      }
    ));

    beforeEach(function() {
      httpBackend.when('GET','/customers.json?keywords=bob&page=0').
                  respond(500,'Internal Server Error');
      spyOn(window, "alert");
    });

    it("alerts the user on an error", function() {
      scope.search("bob");
      httpBackend.flush();
      expect(scope.customers).toEqualData([]);
      expect(window.alert).toHaveBeenCalledWith(
        "There was a problem:500");
    });
  });



});
