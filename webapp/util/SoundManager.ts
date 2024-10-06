

/**
 * @namespace com.game.toep.util
 */
class SoundManagerClass {

    private _currentMusicKey: string;
    private _currentMusicAudio: HTMLAudioElement;

    public playMusic(musicKey: string): void {
        
        // If new music is already playing, return
        if (this._currentMusicKey === musicKey) return;

        const audio = {
            'intro': new Audio('mp3/intro.mp3')
        }[musicKey];

        // Make the audio loop
        audio.loop = true;

        // If any other music is playing, pause it
        this._currentMusicAudio?.pause();
        
        // Set new music key
        this._currentMusicKey = musicKey;

        // Set the new music audio
        this._currentMusicAudio = audio;
        
        // Play new music
		void audio.play();
    }

}

// App-wise singleton
export const SoundManager= new SoundManagerClass();