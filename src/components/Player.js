import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';


const Player = ({songs, setSongs, currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef}) => {
  //EventHandlers
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song)=> {
      if(song.id === nextPrev.id){
        return{
          ...song,
          active: true,
        };
      }else {
        return{
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  const playSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime:current, duration:duration})
  };
  const getTime = (time) => {
    return(
      Math.floor(time/60) + ":" + ("0"+Math.floor(time%60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime :e.target.value})
  }
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === 'skip__forward'){
      await setCurrentSong(songs[(currentIndex+1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex+1) % songs.length]);
    };
    if(direction === 'skip__back'){
      if((currentIndex-1)%songs.length < 0){
        await setCurrentSong(songs[songs.length-1]);
        activeLibraryHandler(songs[songs.length-1]);
        if(isPlaying) audioRef.current.play();
        return;
      } await setCurrentSong(songs[(currentIndex-1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex-1) % songs.length]);
    }
    if(isPlaying) audioRef.current.play();
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex+1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  };
  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })

  
    return(
      <div className="player">
        <div className="time__control">
            <p>{getTime(songInfo.currentTime)}</p>
            <div className="track" style={{background:`linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
              <input
                  min={0}
                  max={songInfo.duration || 0}
                  value={songInfo.currentTime}
                  onChange={dragHandler}
                  type="range"
                  />
              <div className="animate__track" style={{transform: `translateX(${(songInfo.currentTime/songInfo.duration)*100}%)`,}}></div>
            </div>
            <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
        </div>
        
        <div className="play__control">
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip__back')} className='skip__back' size='2x' icon={faAngleLeft} />
            <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause:faPlay} />
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip__forward')} className='skip__forward' size='2x' icon={faAngleRight} />
        </div>

        <audio
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onLoadedMetadata={timeUpdateHandler} //when new song is loaded, currentTime, duration are updated.
          onEnded={songEndHandler}
        ></audio>

      </div>
    );
};

export default Player;