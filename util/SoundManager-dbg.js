"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.util
   */
  class SoundManagerClass {
    playCardSound() {
      this.playSound('playCard' + String(this.getRandom(1, 3)));
    }
    playSound(soundKey) {
      const audio = {
        'playCard1': new Audio('mp3/playCard1.mp3'),
        'playCard2': new Audio('mp3/playCard2.mp3'),
        'playCard3': new Audio('mp3/playCard3.mp3')
      }[soundKey];

      //audio.volume = 0.5;

      void audio.play();
    }
    playMusic(musicKey) {
      // If new music is already playing, return
      if (this._currentMusicKey === musicKey) return;
      const audio = {
        'intro': new Audio('mp3/intro.mp3'),
        'gameplay': new Audio('mp3/gameplay.mp3')
      }[musicKey];

      // Make the audio loop
      audio.loop = true;
      audio.volume = 0.6;

      // If any other music is playing, pause it
      this._currentMusicAudio?.pause();

      // Set new music key
      this._currentMusicKey = musicKey;

      // Set the new music audio
      this._currentMusicAudio = audio;

      // Play new music
      void audio.play();
    }
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  // App-wise singleton
  const SoundManager = new SoundManagerClass();
  SoundManagerClass.SoundManager = SoundManager;
  return SoundManagerClass;
});