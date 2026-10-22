import React,{Suspense,lazy,useCallback,useEffect,useRef,useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useMotion} from '../components';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './intro.css';
const FilmPlayer=lazy(()=>import('./FilmPlayer'));
const SEEN_KEY='carekiln-opening-v1';
const files=['doorstep.jpg','house.jpg','house-cutout.png','stage.jpg','doorway.jpg'];
function hasSeen(){try{return sessionStorage.getItem(SEEN_KEY)==='seen'}catch{return false}}
function markSeen(){try{sessionStorage.setItem(SEEN_KEY,'seen')}catch{}}
class FilmBoundary extends React.Component{
 state={error:false};
 static getDerivedStateFromError(){return {error:true}}
 componentDidCatch(){this.props.onError()}
 render(){return this.state.error?null:this.props.children}
}
export default function IntroExperience({children}){
 const {pathname,hash}=useLocation();const {reduced,paused:sitePaused}=useMotion();
 const [phase,setPhase]=useState(()=>pathname==='/'&&!hash&&!reduced&&!hasSeen()?'loading':'complete');
 const [paused,setPaused]=useState(false);const [progress,setProgress]=useState(0);const [run,setRun]=useState(0);
 const skipRef=useRef(null);const active=pathname==='/'&&phase!=='complete';
 const finish=useCallback(()=>{setPhase(p=>p==='complete'?p:'exiting');markSeen();},[]);
 const fail=useCallback(()=>{setPhase('complete');markSeen()},[]);
 useEffect(()=>{
  if(phase!=='loading'||pathname!=='/')return;
  let cancelled=false;
  const timeout=setTimeout(fail,8000);
  Promise.all(files.map(name=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve();image.onerror=reject;image.src=`/assets/intro/${name}`;}))).then(()=>{if(!cancelled)setPhase('playing')}).catch(()=>{if(!cancelled)fail()}).finally(()=>clearTimeout(timeout));
  return()=>{cancelled=true;clearTimeout(timeout)};
 },[phase,pathname,fail,run]);
 useEffect(()=>{if(!active)return;const overflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';skipRef.current?.focus({preventScroll:true});const escape=e=>{if(e.key==='Escape')finish();if(e.key==='Tab'){const buttons=[...document.querySelectorAll('.intro-actions button:not(:disabled)')];const first=buttons[0],last=buttons.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};window.addEventListener('keydown',escape);return()=>{document.documentElement.style.overflow=overflow;window.removeEventListener('keydown',escape);ScrollTrigger.refresh();};},[active,finish]);
 useEffect(()=>{if(phase!=='exiting')return;const timer=setTimeout(()=>{setPhase('complete');requestAnimationFrame(()=>{document.querySelector('.hero h1')?.focus({preventScroll:true});ScrollTrigger.refresh()})},reduced?0:950);return()=>clearTimeout(timer)},[phase,reduced]);
 useEffect(()=>{if(reduced&&active)fail()},[reduced,active,fail]);
 useEffect(()=>{if(pathname!=='/'||hash)setPhase('complete')},[pathname,hash]);
 useEffect(()=>{const replay=()=>{if(pathname!=='/'||reduced)return;window.scrollTo({top:0,behavior:'instant'});setProgress(0);setPaused(false);setRun(r=>r+1);setPhase('loading')};window.addEventListener('carekiln:replay-intro',replay);return()=>window.removeEventListener('carekiln:replay-intro',replay)},[pathname,reduced]);
 return <>
  <div className="site-experience" data-intro={active?phase:'complete'} inert={active}>{children}</div>
  {active&&<section className={`intro-film intro-${phase}`} role="dialog" aria-modal="true" aria-label="CareKiln opening film" data-intro-phase={phase}>
   <div className="intro-poster" style={{backgroundImage:'url(/assets/intro/doorstep.jpg)'}}/>
   <div className="intro-player" aria-hidden="true">
    {phase!=='loading'&&<FilmBoundary key={run} onError={fail}><Suspense fallback={null}><FilmPlayer paused={paused||sitePaused||phase==='exiting'} onEnd={finish} onProgress={setProgress} onError={fail}/></Suspense></FilmBoundary>}
   </div>
   <p className="sr-only">A miniature home separates into rooms. A human hand considers the alignment. The camera moves through the doorway into CareKiln’s homepage. Fictional concept imagery.</p>
   <div className="intro-signature" aria-hidden="true"><span>CareKiln</span><span>A home. A human. A way forward.</span></div>
   <div className="intro-controls">
    <span className="intro-disclosure">A CONCEPT FILM <span>·</span> SYNTHETIC IMAGERY</span>
    <div className="intro-actions">
     <button type="button" onClick={()=>setPaused(p=>!p)} disabled={phase==='loading'||phase==='exiting'} aria-label={paused?'Play opening film':'Pause opening film'} aria-pressed={paused}>{paused?'Play':'Pause'}</button>
     <button ref={skipRef} type="button" onClick={finish}>Skip intro <span aria-hidden="true">↗</span></button>
    </div>
   </div>
   <div className="intro-progress" aria-hidden="true"><span style={{scale:`${progress} 1`}}/></div>
  </section>}
 </>;
}
