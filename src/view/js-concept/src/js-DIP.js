/**
 * 依赖倒置原则
 * 1.高层模块不应该依赖于底层模块，二者应该依赖于抽象
 * 2.抽象不应该依赖于细节，细节应该依赖于抽象
 * 
 * 能够确保程序或者框架的主要组件从非重要的底层组件实现细节中解耦出来
 * 确保程序最重要的部分不会因为低层次组件的变化修改而受到影响
 */

 $.fn.trackMap = function(options) {
  var defaults = {
      /* defaults */
  };
  options = $.extend({}, defaults, options);

  var mapOptions = {
      center: new google.maps.LatLng(options.latitude,options.longitude),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  },
      map = new google.maps.Map(this[0], mapOptions),
      pos = new google.maps.LatLng(options.latitude,options.longitude);

  var marker = new google.maps.Marker({
      position: pos,
      title: options.title,
      icon: options.icon
  });

  marker.setMap(map);

  options.feed.update(function(latitude, longitude) {
      marker.setMap(null);
      var newLatLng = new google.maps.LatLng(latitude, longitude);
      marker.position = newLatLng;
      marker.setMap(map);
      map.setCenter(newLatLng);
  });

  return this;
};

var updater = (function() {
  // private properties

  return {
      update: function(callback) {
          updateMap = callback;
      }
  };
})();

$("#map_canvas").trackMap({
  latitude: 35.044640193770725,
  longitude: -89.98193264007568,
  icon: 'http://bit.ly/zjnGDe',
  title: 'Tracking Number: 12345',
  feed: updater
});

// 根据依赖倒置原则重构后
$.fn.trackMap = function(options) {
  var defaults = {
      /* defaults */
  };

  options = $.extend({}, defaults, options);

  options.provider.showMap(
      this[0],
      options.latitude,
      options.longitude,
      options.icon,
      options.title);

  options.feed.update(function(latitude, longitude) {
      options.provider.updateMap(latitude, longitude);
  });

  return this;
};

$("#map_canvas").trackMap({
  latitude: 35.044640193770725,
  longitude: -89.98193264007568,
  icon: 'http://bit.ly/zjnGDe',
  title: 'Tracking Number: 12345',
  feed: updater,
  provider: trackMap.googleMapsProvider
});

trackMap.googleMapsProvider = (function() {
  var marker, map;

  return {
      showMap: function(element, latitude, longitude, icon, title) {
          var mapOptions = {
              center: new google.maps.LatLng(latitude, longitude),
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          },
              pos = new google.maps.LatLng(latitude, longitude);

          map = new google.maps.Map(element, mapOptions);

          marker = new google.maps.Marker({
              position: pos,
              title: title,
              icon: icon
          });

          marker.setMap(map);
      },
      updateMap: function(latitude, longitude) {
          marker.setMap(null);
          var newLatLng = new google.maps.LatLng(latitude,longitude);
          marker.position = newLatLng;
          marker.setMap(map);
          map.setCenter(newLatLng);
      }
  };
})();
/**
 * 详细参见：
 * https://www.cnblogs.com/TomXu/archive/2012/02/15/2330143.html
 */