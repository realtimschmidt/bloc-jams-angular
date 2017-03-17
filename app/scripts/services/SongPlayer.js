(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        //two private attributes
        var currentSong = null;
        /*
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing son and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        //one private function
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
                
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
                
            currentSong = song;
        };
        
        //public method
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                currentBuzzObject.play();
                song.playing = true;
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        
        //public method
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();