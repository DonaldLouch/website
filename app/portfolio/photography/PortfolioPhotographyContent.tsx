'use client'

import {
  Box,
  Link,
  // Image,
} from "@chakra-ui/react";
// import useSWR from "swr";

import Image from "next/image"

// import { Metadata } from "../../components/Metadata";

export default function PortfolioPhotographyContent() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBHBV1wlb" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  const media = [
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167775/portfolio/cej5cop0qzrxcf2ujaxa.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167777/portfolio/kq8yotmxl5xm3ib309qm.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167779/portfolio/c7k4mp6t705pdt0dpjz1.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167781/portfolio/l629dznzl8g8wfy5v5jc.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167784/portfolio/g9m5sicwrjjri5plwnqf.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167785/portfolio/uy7cyeuspc04jisgvkp9.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167788/portfolio/xmlalyq2jevbdj6epwc9.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167790/portfolio/uo6y1ite1h7q49sqbxzr.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167793/portfolio/hlkhwxwuqix58fwdoaua.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167796/portfolio/qirzhjztgzgxor1286bs.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167799/portfolio/x214k98kltlthqktnfhz.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167801/portfolio/whixvk2jboac6ekeuxaa.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167803/portfolio/figxvkblxtqyf8cla5l7.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167806/portfolio/ikn1aa5jzpd8jgg3ivpq.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167808/portfolio/adb8xilsnrrevhmrwapk.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167811/portfolio/kley3bouwow9kls6ifqh.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167814/portfolio/jxfzkygywpauqabcw4hq.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167816/portfolio/deatocrpl9wu3sobiiji.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167819/portfolio/nponxuy6fon9ggrbirr7.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167821/portfolio/qhbfqa31b3xshbp8o11w.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167824/portfolio/epyr5dsz0xgaoti3qz1t.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167827/portfolio/vldclrbv2vyxouyztzrt.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167831/portfolio/iusk1uz6sebz7w0fhfka.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167833/portfolio/fgp4wnfjgi1tu4ahh67w.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167836/portfolio/wfsqkybfirjguomnwk22.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167839/portfolio/m1hlmc8npn2htqouhd6c.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167842/portfolio/daaye2kionl1vot9tasy.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167845/portfolio/ayk9flslulxc8keq3thl.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167848/portfolio/xrc2bipudfbpdd29pc8e.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167851/portfolio/akkvhsptoquri9isqkvp.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167854/portfolio/n3ef4m2p4edmber7i99l.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167858/portfolio/ornb9qdydckvwicpf5yu.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167862/portfolio/zazvu5dpriiothuwornz.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167866/portfolio/ys0ce1oenwngg0nkmrpp.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167871/portfolio/ynlbk7j4zcsfaruocoit.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167875/portfolio/zvlncd3zgi4ifz4lj4zi.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167880/portfolio/f3yr4jibmohceszcx7my.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167883/portfolio/tls3zedpypbznwwdxujo.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167887/portfolio/fvi5wusclld2xu38oozi.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167892/portfolio/htms3wggxay6x3ksx77z.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167897/portfolio/fv5f5cov84cduafltkmt.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167901/portfolio/idtzofhpcwhp7iicw6gp.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167906/portfolio/ibcaxhvsqf4avm7wanxc.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167910/portfolio/xh3t1yeq57x32qocfajt.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167915/portfolio/jjwpuvfn7yrdzfsbdsia.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167920/portfolio/wzjbshfgfq2tnvfafwic.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167925/portfolio/ttqcwzsjdvt489exc5k8.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167929/portfolio/sxdxtnhmdmyjuwxtsni6.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167934/portfolio/laifp6rnxwsyiy3hj5up.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167939/portfolio/g1g6fflfouu9dkb0nlww.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167944/portfolio/a5dm7mrkfxiyjigaf3as.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167948/portfolio/kmdmiqztvooein5ixiej.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167952/portfolio/ugcqpz3qckkhpfpha9ou.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167956/portfolio/zebtiolnmbbdhacxasv9.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167961/portfolio/cwicz8pozhucvyqxy5ty.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167967/portfolio/hpqfin6z4olakfiso0pv.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167972/portfolio/nojlmb68arglorz35dib.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167977/portfolio/wvdiaqy8wvsehcxmtyrr.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167982/portfolio/dwjxl6y3ammuvpdswlzk.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167988/portfolio/peumog8z0kxrnlmpynxz.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167992/portfolio/wflabco1f1qljoekiznv.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645167998/portfolio/dw6nobykntrkzn4vbh5l.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645168003/portfolio/beuw4oi6xntp7z4ct5ql.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645168008/portfolio/urggcahi26skrsvmakb1.jpg",
    "https://res.cloudinary.com/donaldlouch/image/upload/v1645168013/portfolio/bxaghta9he81emmo4l1l.jpg",
  ];

  return (
      <Box
        as="section"
        id="photoShowcase"
       padding={{base: "6rem 4.4rem 1rem", lg: "6rem 0.4rem 1rem"}}
        w="calc(100% + 10rem)"
        m="-6rem -5rem"
        sx={{ columnCount: {base:"1", md: "2", lg: "4"}, gap: "0.4rem", columnWidth: {base: "100%", md: "50% 50%", lg: "33.3% 33.3% 33.3%"}}}
        bg="mainGradient"
      >
        {media?.map((image: any) => (
          <Link key={image.index} href={image} isExternal>
            <Image
              src={image}
              alt="portfolio image"
             width="3840" 
             height="2160"
              // _hover={{ background: "backgroundGradient", opacity: "0.6" }}
              style={{display: "inherit"}}
            ></Image>
          </Link>
        ))}
      </Box>
  );
}
