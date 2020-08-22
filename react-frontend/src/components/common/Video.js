import React from 'react';
import YouTube from 'react-youtube';
import './Video.scss';

const Video = ({ youtubeVideoId, start, end, onPlay, onPause }) => {
  const playerVars = { modestbranding: 1 };
  if (start) {
    playerVars.start = start;
  }
  if (end) {
    playerVars.end = end;
  }
  let opts = {
    playerVars
  };

  return (
    <div className='video-container'>
      <YouTube
        className='video text-center'
        videoId={youtubeVideoId}
        opts={opts}
        onPlay={onPlay}
        onPause={onPause}
      />
    </div>
  );
}

export default Video;
