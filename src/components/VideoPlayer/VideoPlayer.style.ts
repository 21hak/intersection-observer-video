import styled from "@emotion/styled";

export const VideoPlayerContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-top: calc(9 / 16 * 100%);
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
