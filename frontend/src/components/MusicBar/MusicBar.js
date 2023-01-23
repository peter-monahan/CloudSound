import { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { nextSong, prevSong } from "../../store/queue";
import './MusicBar.css';



const MusicBar = () => {
  const dispatch = useDispatch()
  const queue = useSelector(state => state.queue);
  const audioElement = useRef(null);
  const song = queue.nodes[queue.current]?.song

  useEffect(() => {
    console.log(song)
  }, [queue])
  return (
    <footer className="music-bar">
      <audio
        src={song?.url}
        ref={audioElement}
        controls={true}
      ></audio>
    </footer>
  );
}

export default MusicBar;
