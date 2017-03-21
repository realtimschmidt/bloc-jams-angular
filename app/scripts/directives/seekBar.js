(function() {
    function seekBar($document) {
        /*
        * @function calculatePercent
        * @desc Based on the seekBar and event that are passed, calculates number between 0 and 1
        * @param {Object} seekBar, {event} 
        * @return {Number} offsetXPercent
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
               
                /*
                * @desc Holds value of seek bar
                * @type {Number}
                */
                scope.value = 0;
                
                /*
                * @desc Holds max value of seek bar
                * @type {Number}
                */
                scope.max = 100;
                
                /*
                * @desc Holds the elemnt that matches the directive (<seek-bar>) as a jQuery object
                * @type {jQuery Object}
                */
                var seekBar = $(element);
                
                /*
                * @function percentageString
                * @desc Determines position of seek bar
                * @return {Number} + {String} 00%
                */
                var percentageString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                /*
                * @function scope.fillStyle
                * @desc Returns the width of the seek bar fill
                * @return {Number} width of seek fill
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /*
                * @function scope.onClickSeekBar
                * @desc Updates scope.value based on the seekBar and event passed in
                * @param {event}
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                /*
                * @function scope.trackThumb
                * @desc Constantly updates scope.value based on the seekBar and event passed in
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();