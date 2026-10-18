import React from 'react';
import {AbsoluteFill,useVideoConfig,staticFile} from 'remotion';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {OpeningScene} from './OpeningScene';
import {HouseScene} from './HouseScene';
import {DoorwayScene} from './DoorwayScene';

export const INTRO_FRAMES=450;
export const INTRO_FPS=30;
export function CareKlinFilm(){const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'#f58b55'}}><style>{`@font-face{font-family:Manrope;src:url("${staticFile("assets/fonts/Manrope.ttf")}") format("truetype");font-weight:200 800;font-display:swap}`}</style><TransitionSeries>
 <TransitionSeries.Sequence name="A home" durationInFrames={120} premountFor={fps}><OpeningScene/></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:15})}/>
 <TransitionSeries.Sequence name="A gap. A human decision." durationInFrames={240} premountFor={fps}><HouseScene/></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:15})}/>
 <TransitionSeries.Sequence name="Through the doorway" durationInFrames={120} premountFor={fps}><DoorwayScene/></TransitionSeries.Sequence>
 </TransitionSeries></AbsoluteFill>;}
