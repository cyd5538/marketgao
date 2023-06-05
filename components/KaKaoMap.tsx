"use client"
import { Map, MapMarker, CustomOverlayMap  } from 'react-kakao-maps-sdk';
import { Badge } from "@/components/ui/badge"
 
interface KaKaoMapProps {
  title : string
  address : string
  latitude : string
  longitude : string 
}

const KakaoMap:React.FC<KaKaoMapProps> = ({latitude, longitude, title, address}) => {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude); 
  return (
    <div className='mt-10 mb-10'>
      <Map center={{ lat, lng }} className='w-full h-96'>
        <MapMarker position={{ lat, lng }}>
          <div>{address}</div>
        </MapMarker>
        <CustomOverlayMap position={{ lat, lng }}>
          <Badge className=''>{title}</Badge>
			  </CustomOverlayMap>
      </Map>
    </div>
  );
};

export default KakaoMap;
