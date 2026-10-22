import React,{useEffect,useRef,useState} from 'react';
import {Player} from '@remotion/player';
import {CareKilnFilm,INTRO_FRAMES,INTRO_FPS} from './CareKilnFilm';
export default function FilmPlayer({paused,onEnd,onProgress,onError}){
 const ref=useRef(null);
 const [size,setSize]=useState(()=>({width:1440,height:Math.round(1440*window.innerHeight/window.innerWidth)}));
 useEffect(()=>{const resize=()=>setSize({width:1440,height:Math.round(1440*window.innerHeight/window.innerWidth)});window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)},[]);
 useEffect(()=>{const p=ref.current;if(!p)return;const frame=(e)=>{if(e.detail.frame%15===0)onProgress(e.detail.frame/INTRO_FRAMES)};p.addEventListener('ended',onEnd);p.addEventListener('frameupdate',frame);p.addEventListener('error',onError);return()=>{p.removeEventListener('ended',onEnd);p.removeEventListener('frameupdate',frame);p.removeEventListener('error',onError)}},[onEnd,onProgress,onError]);
 useEffect(()=>{const p=ref.current;if(!p)return;const sync=()=>paused||document.hidden?p.pause():p.play();sync();document.addEventListener('visibilitychange',sync);return()=>document.removeEventListener('visibilitychange',sync)},[paused]);
 return <Player ref={ref} component={CareKilnFilm} durationInFrames={INTRO_FRAMES} fps={INTRO_FPS} compositionWidth={size.width} compositionHeight={size.height} style={{width:'100%',height:'100%'}} controls={false} loop={false} initiallyMuted clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} moveToBeginningWhenEnded={false} errorFallback={()=>null}/>;
}
