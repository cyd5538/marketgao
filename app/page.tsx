
import Home from "@/components/main/Home";

export const metadata = {
  openGraph: {
    title: '님아 그 시장을 가오',
    description: '백종원 유투브의 님아 그 시장을 가오의 식당들을 소개하는 사이트입니다.',
    url: 'https://marketgao.vercel.app/',
    keywords: ["백종원","유투브","맛집","님아 그 시장을 가오","시장"],
    siteName: '님아 그 시장을 가오',
    locale: 'ko',
    type: 'website',
  },
};


export default function IndexPage() {

  return (
    <div>
      <Home />
    </div>
  )
}
