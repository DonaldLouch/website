


'use client'

import {
  Box,
  Link,
} from "@chakra-ui/react";

import Image from "next/image"

export default function PortfolioPhotographyContent() {
  // const fetcher = (url: RequestInfo | URL) =>
  //   fetch(url).then((res) => res.json());
  // const pageID = "pageL4UBHBV1wlb" as string;
  // useSWR(`/api/pages/viewUpdate/${pageID}`, fetcher);

  const media = [
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/cej5cop0qzrxcf2ujaxa.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/kq8yotmxl5xm3ib309qm.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/c7k4mp6t705pdt0dpjz1.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/l629dznzl8g8wfy5v5jc.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/g9m5sicwrjjri5plwnqf.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/uy7cyeuspc04jisgvkp9.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/xmlalyq2jevbdj6epwc9.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/uo6y1ite1h7q49sqbxzr.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/hlkhwxwuqix58fwdoaua.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/qirzhjztgzgxor1286bs.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/x214k98kltlthqktnfhz.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/whixvk2jboac6ekeuxaa.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/figxvkblxtqyf8cla5l7.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/ikn1aa5jzpd8jgg3ivpq.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/adb8xilsnrrevhmrwapk.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/kley3bouwow9kls6ifqh.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/jxfzkygywpauqabcw4hq.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/deatocrpl9wu3sobiiji.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/nponxuy6fon9ggrbirr7.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/qhbfqa31b3xshbp8o11w.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/epyr5dsz0xgaoti3qz1t.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/vldclrbv2vyxouyztzrt.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/iusk1uz6sebz7w0fhfka.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/fgp4wnfjgi1tu4ahh67w.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/wfsqkybfirjguomnwk22.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/m1hlmc8npn2htqouhd6c.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/daaye2kionl1vot9tasy.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/ayk9flslulxc8keq3thl.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/xrc2bipudfbpdd29pc8e.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/akkvhsptoquri9isqkvp.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/n3ef4m2p4edmber7i99l.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/ornb9qdydckvwicpf5yu.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/zazvu5dpriiothuwornz.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/ys0ce1oenwngg0nkmrpp.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/ynlbk7j4zcsfaruocoit.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/zvlncd3zgi4ifz4lj4zi.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/f3yr4jibmohceszcx7my.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/tls3zedpypbznwwdxujo.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/fvi5wusclld2xu38oozi.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/htms3wggxay6x3ksx77z.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/fv5f5cov84cduafltkmt.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/idtzofhpcwhp7iicw6gp.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/ibcaxhvsqf4avm7wanxc.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/xh3t1yeq57x32qocfajt.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/jjwpuvfn7yrdzfsbdsia.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/wzjbshfgfq2tnvfafwic.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/ttqcwzsjdvt489exc5k8.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/sxdxtnhmdmyjuwxtsni6.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/laifp6rnxwsyiy3hj5up.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/g1g6fflfouu9dkb0nlww.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/a5dm7mrkfxiyjigaf3as.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/kmdmiqztvooein5ixiej.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/ugcqpz3qckkhpfpha9ou.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/zebtiolnmbbdhacxasv9.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/cwicz8pozhucvyqxy5ty.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/hpqfin6z4olakfiso0pv.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/nojlmb68arglorz35dib.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/wvdiaqy8wvsehcxmtyrr.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/dwjxl6y3ammuvpdswlzk.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/peumog8z0kxrnlmpynxz.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/wflabco1f1qljoekiznv.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/dw6nobykntrkzn4vbh5l.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/beuw4oi6xntp7z4ct5ql.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/urggcahi26skrsvmakb1.jpg",
    "https://donaldlouch.s3.us-west-004.backblazeb2.com/portfolio/bxaghta9he81emmo4l1l.jpg",
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
          <Link key={image.index} href={image} isExternal _hover={{background: "blurredBackground", opacity: "0.6"}} transition="all 0.3s">
            <Image
              src={image}
              alt="portfolio image"
             width="3840" 
             height="2160"
              style={{display: "inherit"}}
            />
          </Link>
        ))}
      </Box>
  );
}
