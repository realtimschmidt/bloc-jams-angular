(function() {
    function SongPlayer() {
        /*
        * @desc Empty object
        * @type {Object}
        */
        var SongPlayer = {};
        
        /*
        * @desc Current song selected
        * @type {Object}
        */
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
        
        /*
        * @function playSong
        * @desc When play button is clicked, plays song and sets song.playing to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /*
        * @method SongPlayer.play
        * @desc Conditional to change to different song or pause current song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song); //assignment function
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song); //assignment function
                }
            }
        };
        
        /*
        * @method SongPlayer.pause
        * @desc Pauses song that is playing
        * @param {Object} song
        * @returns {Object} SongPlayer
        */
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