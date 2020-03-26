import React from "react"
import { Player } from "video-react"
import Poster from '../../../../images/video_banner.jpg'
import "../../../../../node_modules/video-react/dist/video-react.css"; // import css
import Video from "../../../../videos/essay_review_sample.mp4"

export default ({ video }) => {
  return <Player playsInline poster={Poster} src={Video} />
}
