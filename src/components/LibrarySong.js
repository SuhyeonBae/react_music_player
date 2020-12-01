import React from 'react';

const LibrarySong = ({song, songs, setSongs, setCurrentSong, audioRef, isPlaying}) => {
  //EventHandlers
  const songSelectHandler = async () => {
    // const selectedSong = songs.filter((state) => state.id === song.id ); --> NO NEED!
    await setCurrentSong(song);
    // add Active State
    setSongs(
      songs.map((targetSong)=>{
        return{
          ...targetSong,
          active: targetSong.id === song.id
        }
      })
    );
    if(isPlaying) audioRef.current.play();
  };
  
  
    return (
      <div onClick={songSelectHandler} className={`library__song ${song.active ? 'selected' : ''}`}>
          <img alt={song.name} src={song.cover}></img>
          <div className="song__description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
          </div>
      </div>
    );


};

export default LibrarySong;