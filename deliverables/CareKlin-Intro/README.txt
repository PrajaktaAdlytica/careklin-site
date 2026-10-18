CareKlin — Room for a Way Forward

15-second Remotion opening, 30 fps, responsive composition.
Implemented as a Remotion Player film inside the website (layered synthetic artwork, not live-action footage).
No navbar during intro. Approximately 0.85-second orange dissolve into the existing hero; navigation fades in with a short delay.
Plays once per browser tab session. The homepage has a Watch the opening replay button.
Pause, Skip, Escape, keyboard focus containment, reduced-motion bypass, image-failure bypass, and background-tab playback pause included.

Source: ../careklin-website/src/intro/
Assets: ../careklin-website/public/assets/intro/
Studio: run npm run intro:studio in ../careklin-website
Compositions: CareKlinIntro (1920×1080), CareKlinIntroMobile (1080×1920), individual scene timelines.

Original artwork made using built-in Image Gen. Direction: handcrafted miniature home on a terracotta stage; sections separate, a human considers the alignment, and a doorway closes the distance to an orange wall. No patient information, clinical claims, or operating-product claims.

Checks: successful production build; 3 existing model tests; desktop and portrait scene review; navbar hidden and page inert during film; natural completion at ~16.3 seconds including transition; skip completion; pause/replay; simulated reduced motion and missing image fallback. No live product integrations changed.
