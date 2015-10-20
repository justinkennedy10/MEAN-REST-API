angular.module('restApp', [])
  .controller('indexController', function($http){
    var self = this;
    self.objects = [];
    self.http = $http;
    self.objectString = '';
    self.key = 'hello';
    self.value = 'world!';

    self.getObjects = function(){
      self.http.get('/api/objects/').then(
        function onSuccess(res){
          self.objects = [];
          res.data.forEach(function(obj){
            self.objects.push(obj.url.replace('/api/objects/', ''));
          });
        }, function onError(err){
          alert(err);
        }
      );
    };

    self.getObject = function(uid){
      self.http.get('/api/objects/' + uid).then(
        function onSuccess(res){
          var key;
          for(property in res.data){
            if(property != 'uid'){
              key = property;
            }
          }
          var value = res.data[key];
          self.objectString = key + ': ' + value;
        }, function onError(err){
          alert(err);
        }
      );
    };

    self.createObject = function(key, value){
      var pair = {};
      pair[key] = value;
      self.http.post('/api/objects/', pair).then(
        function onSuccess(res){
          self.getObjects();
        }, function onError(err){
          alert(err);
        }
      );
    };

    self.updateObject = function(uid, key, value){
      var pair = {};
      pair[key] = value;
      self.http.put('/api/objects/' + uid, pair).then(
        function onSuccess(res){
          self.getObjects();
        }, function onError(err){
          alert(err);
        }
      );
    };

    self.deleteObject = function(uid){
      self.http.delete('/api/objects/' + uid).then(
        function onSuccess(res){
          self.getObjects();
        }, function onError(err){
          self.getObjects();
        }
      );
    };
  });
