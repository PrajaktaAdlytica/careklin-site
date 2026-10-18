import React from 'react';
import {AbsoluteFill,CanvasImage,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing} from 'remotion';
export const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
export const ease=Easing.bezier(.22,.61,.36,1);
export const asset=(name)=>staticFile(`assets/intro/${name.includes(".")?name:name+".jpg"}`);
export function FilmImage({name,style={}}){return <CanvasImage src={asset(name)} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',...style}}/>;}
export function Caption({children,start=.35,end=3.6}){
 const f=useCurrentFrame();const {fps,width,height}=useVideoConfig();const portrait=height>width;
 return <AbsoluteFill style={{justifyContent:'flex-end',padding:`0 ${width*.065}px ${height*(portrait?.19:.12)}px`,pointerEvents:'none'}}><div style={{maxWidth:width*(portrait?.87:.72),color:'#fff4df',fontFamily:'Manrope, sans-serif',fontSize:width*(portrait?.055:.031),fontWeight:500,letterSpacing:'-.035em',lineHeight:1.23,textShadow:'0 2px 24px #0008',opacity:interpolate(f,[start*fps,(start+.5)*fps,(end-.35)*fps,end*fps],[0,1,1,0],clamp),translate:interpolate(f,[start*fps,(start+.65)*fps],['0px 16px','0px 0px'],{...clamp,easing:ease})}}>{children}</div></AbsoluteFill>;
}
export function Shade(){return <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(12,24,17,.2),transparent 35%,transparent 55%,rgba(12,24,17,.5))',pointerEvents:'none'}}/>;}
