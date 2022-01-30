import React, { useEffect, useRef } from "react";
import { VideoPlayerContainer } from "./VideoPlayer.style";

interface IVideoPlayerProps {
  videoUrl: string;
  className: string;
}

const VIDEO_PLAY_EVENT = "playVideo";
const VIDEO_PAUSE_EVENT = "pauseVideo";

export const VideoPlayer: React.FC<IVideoPlayerProps> = function VideoPlayer({
  videoUrl,
  className,
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const observer = useRef<IntersectionObserver>();
  const previousRatio = useRef<number>(0);
  const player = useRef<any>(null);

  const handlePlayVideo = async (e: Event) => {
    const isPaused = await player.current.getPaused(); // 영상이 일시정지 상태인지 확인한다.
    if (isPaused) {
      // 일시 정지 상태이면 영상을 실행한다
      player.current.play();
    }
  };
  const handlePauseVideo = async (e: Event) => {
    const isPaused = await player.current.getPaused();
    if (!isPaused) {
      // 재생중이면 영상을 일시정지 한다.
      player.current.pause();
    }
  };

  const handleIntersection = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach(async (entry) => {
      const { intersectionRatio: currentRatio } = entry;
      if (currentRatio > previousRatio.current && currentRatio > 0.25) {
        // Viewport 진입하는 경우
        entry.target.dispatchEvent(new CustomEvent(VIDEO_PLAY_EVENT));
      } else if (currentRatio < previousRatio.current && currentRatio < 0.35) {
        // Viewport 벗어나는 경우
        entry.target.dispatchEvent(new CustomEvent(VIDEO_PAUSE_EVENT));
      }
      previousRatio.current = currentRatio;
    });
  };

  useEffect(() => {
    if (iframeRef.current) {
      player.current = new Vimeo.Player(iframeRef.current);
    }
  }, [iframeRef.current]);

  /**
   * iframeRef.current 를 observe 하도록 한다.
   * index.html에 viewport는 <div id="root"> 엘리먼트 이기 떄문에 root를 지정한다.
   */
  useEffect(() => {
    if (iframeRef.current) {
      if (!observer.current) {
        observer.current = new IntersectionObserver(handleIntersection, {
          threshold: [0.3, 0.7],
        });
        iframeRef.current && observer.current.observe(iframeRef.current);
      }
    }
  }, [iframeRef.current]);

  /**
   * iframe 엘리먼트에 비디오 시작, 일시 정지를 위한 커스텀 이벤트리스너 추가
   */
  useEffect(() => {
    const iframeEl = iframeRef.current;
    if (iframeEl) {
      iframeEl && iframeEl.addEventListener(VIDEO_PLAY_EVENT, handlePlayVideo);
      iframeEl &&
        iframeEl.addEventListener(VIDEO_PAUSE_EVENT, handlePauseVideo);
    }
    return () => {
      if (iframeEl) {
        iframeEl.removeEventListener(VIDEO_PLAY_EVENT, handlePlayVideo);
        iframeEl.removeEventListener(VIDEO_PAUSE_EVENT, handlePauseVideo);
      }
    };
  }, []);

  return (
    <VideoPlayerContainer className={className}>
      <iframe
        src={videoUrl}
        suppressContentEditableWarning={true}
        ref={iframeRef}
      />
    </VideoPlayerContainer>
  );
};
