import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {FilmImage,clamp,ease} from './FilmShared';
export function DoorwayScene(){const f=useCurrentFrame();const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'#f58b55',overflow:'hidden'}}><FilmImage name="doorway" style={{scale:interpolate(f,[0,3.6*fps],[1,2.25],{...clamp,easing:ease}),transformOrigin:'52% 37%',opacity:interpolate(f,[2.7*fps,3.8*fps],[1,0],clamp)}}/></AbsoluteFill>;}
