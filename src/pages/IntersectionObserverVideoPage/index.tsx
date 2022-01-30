import React from "react";
import { VideoPlayer } from "../../components/VideoPlayer";
import "./index.css";

interface IntersectionObserverVideoPageProps {}
const IntersectionObserverVideoPage: React.FC<IntersectionObserverVideoPageProps> =
  function IntersectionObserverVideoPage(props) {
    return (
      <div className="container">
        <div style={{ height: 600 }}></div>
        <VideoPlayer
          className="video-player"
          videoUrl={
            "https://player.vimeo.com/video/668469914?h=6613de5084&color=ffffff&portrait=0&muted=1"
          }
        />
        <div style={{ height: 600 }}></div>
      </div>
    );
  };

export default IntersectionObserverVideoPage;
