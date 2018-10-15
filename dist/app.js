angular.module('app', [])
  .controller('CountryController', function($scope, $http) {
    angular.extend(this, { setDeviceCount: setDeviceCount, setChannelCount: setChannelCount })
    $scope.initialize = function() {
      $http({
        method: 'GET',
        url: '../data.json'
      }).then(function successCallback(response) {
        $scope.countries = Object.keys(response.data).map(c =>({
          country: c,
          data: response.data[c]
        }))
        $scope.selectedCountry = $scope.countries
        $scope.devices = setDeviceCount(response.data)
        $scope.channels = setChannelCount(response.data)

      }), function errorCallback(response) {
        console.log('Error loading JSON from file. 😞')
      }
    }

    function setDeviceCount(data) {
      var devices = 0
      Object.values(data).map(function(d){
        devices += d.Devices
      })
      return devices
    }

    function setChannelCount(data) {
      var channels = 0
      Object.values(data).map(function(d){
        channels += d.Channels
      })
      return channels
    }

    $scope.updateCountry = function() {
      $scope.selectedCountry = []
      if($scope.countrySelected === null){
        $scope.selectedCountry = $scope.countries
      } else {
        $scope.selectedCountry.push($scope.countrySelected)
      }
    }
  })
