import React from 'react';
import {Composition,Folder,registerRoot} from 'remotion';
import {CareKlinFilm} from './CareKlinFilm';
import {OpeningScene} from './OpeningScene';
import {HouseScene} from './HouseScene';
import {DoorwayScene} from './DoorwayScene';
const Root=()=> <>
 <Composition id="CareKlinIntro" component={CareKlinFilm} durationInFrames={450} fps={30} width={1920} height={1080}/>
 <Composition id="CareKlinIntroMobile" component={CareKlinFilm} durationInFrames={450} fps={30} width={1080} height={1920}/>
 <Folder name="Scenes">
 <Composition id="Opening" component={OpeningScene} durationInFrames={120} fps={30} width={1920} height={1080}/>
 <Composition id="House" component={HouseScene} durationInFrames={240} fps={30} width={1920} height={1080}/>
 <Composition id="Doorway" component={DoorwayScene} durationInFrames={120} fps={30} width={1920} height={1080}/>
 </Folder>
 </>;
registerRoot(Root);
