

/**
 * @namespace com.game.toep.util
 */
export default class SoundManagerClass {

    private _currentMusicKey: string;
    private _currentMusicAudio: HTMLAudioElement;

    playCardSound() {
        this.playSound('playCard' + String(this.getRandom(1, 3)));
    }

    public playSound(soundKey: string): void {
        const audio = {
            'playCard1': new Audio('mp3/playCard1.mp3'),
            'playCard2': new Audio('mp3/playCard2.mp3'),
            'playCard3': new Audio('mp3/playCard3.mp3')
        }[soundKey];

        //audio.volume = 0.5;

        void audio.play();
    }

    public playMusic(musicKey: string): void {
        
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

    private getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

// App-wise singleton
export const SoundManager= new SoundManagerClass();