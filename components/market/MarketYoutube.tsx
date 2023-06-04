import YouTube, { YouTubeProps } from 'react-youtube';

interface MarketYoubeProps {
  link : string
}

const MarketYoutube:React.FC<MarketYoubeProps> = ({link}) => {

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '400',
    width: '400',
    playerVars: {
      autoplay: 1,
    },
    rel: 0, 
    modestbranding: 1, 
  };

  return (
    <div className="m-auto w-full flex justify-center">
      <YouTube videoId={link} opts={opts} onReady={onPlayerReady} />;
    </div>
  )
}

export default MarketYoutube
