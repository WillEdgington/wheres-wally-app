import { useEffect, useRef } from "react";

export default function Scrollbar({ elemRef, elemName }) {
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  
  // sync thumb
  useEffect(() => {
    const element = elemRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;

    if (!element || !thumb || !track) return;

    function syncThumb() {
      const maxScroll = element.scrollWidth - element.clientWidth;
      const trackWidth = track.clientWidth;

      if (trackWidth === 0) return;

      if (maxScroll <= 0) {
        thumb.style.width = `${trackWidth}px`
        thumb.style.transform = `translate3d(0px, 0, 0)`;
        return;
      };

      const visibleRatio = element.clientWidth / element.scrollWidth;
      const thumbWidth = Math.max(visibleRatio * trackWidth, 40);
      thumb.style.width = `${thumbWidth}px`;

      const scrollRatio = element.scrollLeft / maxScroll;
      const maxThumbMove = trackWidth - thumbWidth;
      thumb.style.transform = `translate3d(${scrollRatio * maxThumbMove}px, 0, 0)`;
    }

    element.addEventListener("scroll", syncThumb);
    window.addEventListener("resize", syncThumb);
    
    const resizeObserver = new ResizeObserver(syncThumb);
    resizeObserver.observe(element);
    resizeObserver.observe(track);

    setTimeout(syncThumb, 0);

    return () => {
      element.removeEventListener("scroll", syncThumb);
      window.removeEventListener("resize", syncThumb);
      resizeObserver.disconnect();
    };
  }, [elemRef]);

  // handle click on scroll track
  useEffect(() => {
    const element = elemRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!element || !track || !thumb) return;

    function handleTrackClick(e) {
      if (e.target === thumb) return;

      const rect = track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      const thumbWidth = thumb.clientWidth;
      const maxScroll = element.scrollWidth - element.clientWidth;
      const maxThumbTravel = track.clientWidth - thumbWidth;

      const targetThumbX = clickX - thumbWidth / 2;
      const clampedThumbX = Math.max(
        0,
        Math.min(targetThumbX, maxThumbTravel)
      );

      const ratio = clampedThumbX / maxThumbTravel;
      element.scrollLeft = ratio * maxScroll;
    }

    track.addEventListener("click", handleTrackClick);
    return () => track.removeEventListener("click", handleTrackClick);
  }, [elemRef]);

  // handle thumb drag
  useEffect(() => {
    const element = elemRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;

    if (!element || !thumb || !track) return;

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    function onMouseDown(e) {
      isDragging = true;
      startX = e.clientX;
      startScroll = element.scrollLeft;
      document.body.style.userSelect = "none";
    }

    function onMouseMove(e) {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const maxScroll = element.scrollWidth - element.clientWidth;
      const maxThumbMove = track.clientWidth - thumb.clientWidth;

      if (maxThumbMove <= 0) return;

      const scrollRatio = maxScroll / maxThumbMove;

      element.scrollLeft = startScroll + deltaX * scrollRatio;
    }

    function onMouseUp() {
      isDragging = false;
      document.body.style.userSelect = "";
    }

    thumb.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      thumb.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [elemRef]);

  return (
    <div ref={trackRef} className={`${elemName}-scrollbar`}>
      <div ref={thumbRef} className={`${elemName}-thumb`} />
    </div>
  );
}