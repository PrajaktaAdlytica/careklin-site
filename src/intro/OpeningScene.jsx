import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {FilmImage,Caption,Shade,clamp} from './FilmShared';
export function OpeningScene(){const f=useCurrentFrame();const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'#273326',overflow:'hidden'}}><FilmImage name="doorstep" style={{objectPosition:'62% center',scale:interpolate(f,[0,4*fps],[1.03,1.17],clamp),translate:interpolate(f,[0,4*fps],['-1% 0%','1% -1%'],clamp)}}/><Shade/><Caption end={3.85}>Every visit begins somewhere.</Caption></AbsoluteFill>;}
