import { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { nextSong, prevSong, clearQueue, togglePlayback, toggleRepeat } from "../../store/queue";
import './MusicBar.css';

function convertTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  if(Number.isNaN(minutes) || Number.isNaN(seconds)) {
    return '00:00'
  }

  if(seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds
}

const MusicBar = () => {
  const dispatch = useDispatch()
  const queue = useSelector(state => state.queue);
  const audioElement = useRef(null);
  const song = queue.nodes[queue.current]?.song
  const [isPlaying, setIsPlaying] = useState(queue.isPlaying);
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (isPlaying) {
        audioElement.current.play();
    } else {
        audioElement.current.pause();
    }
}, [isPlaying, queue]);

useEffect(() => {
  if(isPlaying !== queue.isPlaying) {
    setIsPlaying(queue.isPlaying)
  }
}, [queue])

useEffect(() => {
  if(isPlaying !== queue.isPlaying) {
    dispatch(togglePlayback())
  }
}, [isPlaying])

  // useEffect(() => {

  //   if(isPlaying) {
  //     const interval = setInterval(() => setTime(audioElement.current.currentTime), 100)

  //     return () => clearInterval(interval)
  //   }
  // }, [isPlaying])

  useEffect(() => {

  }, [queue])
  return (
    <div className="music-bar">
      <div className="music-top">
        {convertTime(time)}<input className="time-bar" type="range" step={0.5} min={0} max={audioElement.current?.duration} value={time} onChange={e => {audioElement.current.currentTime = e.target.value; setTime(e.target.value)}} />{convertTime(audioElement.current?.duration)}
      </div>
      {/* <div className="music-mid">

      </div> */}
      <div className="music-bottom">
        <div className="music-bottom-item" id="music-bottom-left">
        <Link to={`/songs/${song.id}`}>
          <p>{song.title}</p>
        </Link>
        </div>
        <div className="music-bottom-item" id="music-bottom-mid">
        <button className="music-button" onClick={() => {dispatch(prevSong()); audioElement.current.currentTime = 0;}}><i className="fa-solid fa-backward fa-2x"></i></button>
        <audio
          onTimeUpdate={() => setTime(audioElement.current.currentTime)}
          onEnded={() => {dispatch(nextSong()); audioElement.current.currentTime = 0;}}
          // onPlay={() => !isPlaying && setIsPlaying(true)}
          // onPause={() => isPlaying && setIsPlaying(false)}
          src={song?.url}
          ref={audioElement}
          // controls={true}
          // loop={true}
        ></audio>
        <button className="music-button" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ?      <i className="fa-solid fa-pause fa-3x"></i> :      <i className="fa-solid fa-play fa-3x"></i>}</button>

        <button className="music-button" onClick={() => {dispatch(nextSong()); audioElement.current.currentTime = 0;}}><i className="fa-solid fa-forward fa-2x"></i></button>
        </div>
        <div className="music-bottom-item" id="music-bottom-right">
        <button disabled className="music-button" onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-shuffle fa-2x"></i></button>
        <button className={`music-button repeat-${queue.repeat}`} onClick={() => dispatch(toggleRepeat())}><i className="fa-solid fa-repeat fa-2x"></i></button>
        <button disabled className="music-button" onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-list-ul fa-2x"></i></button>
        </div>

        {/* <button onClick={() => dispatch(clearQueue())}>clearQueue</button> */}
      </div>


    </div>
  );
}

export default MusicBar;
