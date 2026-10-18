import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {FilmImage,Caption,Shade,clamp,ease} from './FilmShared';
export function HouseScene(){
 const f=useCurrentFrame();const {fps,width,height}=useVideoConfig();const portrait=height>width;
 const stageHeight=height;const stageWidth=Math.max(width,height*16/9);
 const gap=interpolate(f,[0,.9*fps,3.6*fps,6.5*fps],[0,25,25,0],{...clamp,easing:ease});
 const shift=interpolate(f,[0,1.3*fps,3.6*fps,6.5*fps],[0,-44,-44,0],{...clamp,easing:ease});
 return <AbsoluteFill style={{background:'#1c2b21',overflow:'hidden'}}>
  <FilmImage name="stage" style={{filter:portrait?'blur(28px) brightness(.5)':'brightness(.7)',scale:1.15}}/>
  <div style={{position:'absolute',width:stageWidth,height:stageHeight,left:(width-stageWidth)/2-(portrait?stageWidth*.025:0),top:0,scale:interpolate(f,[0,8*fps],[1,1.075],clamp),background:'#253023'}}>
   <FilmImage name="stage"/>
   <div style={{position:'absolute',inset:0,clipPath:'polygon(0 30%,40% 15%,43% 26%,43% 100%,0 100%)',translate:`${-gap}px 0px`}}><FilmImage name="house-cutout.png"/></div>
   <div style={{position:'absolute',inset:0,clipPath:'inset(0 0 0 63.2%)',translate:`${gap}px 0px`}}><FilmImage name="house-cutout.png"/></div>
   <div style={{position:'absolute',inset:0,clipPath:'polygon(40.5% 0,63% 0,63% 100%,43% 100%,43% 24%,43.5% 16%,42% 12%,41.5% 8%)',translate:`0px ${shift}px`}}><div style={{position:"absolute",inset:0,clipPath:"polygon(43.8% 16%,63.1% 25%,63.1% 73.8%,43.3% 73.8%,43.3% 18%)"}}><FilmImage name="house"/></div><FilmImage name="house-cutout.png" style={{opacity:interpolate(f,[2.5*fps,3.3*fps],[0,1],{...clamp,easing:ease})}}/></div>
  </div>
  <Shade/>
  <Caption start={.25} end={3.35}>A gap changes the plan.</Caption>
  <Caption start={3.65} end={7.9}>A person stays in control.</Caption>
 </AbsoluteFill>;
}
