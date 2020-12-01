import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setSongs, setCurrentSong, audioRef, isPlaying, libraryStatus}) => {
    return (
      <div className={`library ${libraryStatus ? 'active__library':''}`}>
          <h2>Library</h2>
          <div className="library__songs">
            {songs.map((song) => (
              <LibrarySong
                songs={songs}
                song={song}
                setSongs={setSongs}
                setCurrentSong={setCurrentSong}
                key={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
              />
            ) )}
          </div>
      </div>

    );
};

export default Library;