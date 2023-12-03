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
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/cej5cop0qzrxcf2ujaxa.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/kq8yotmxl5xm3ib309qm.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/c7k4mp6t705pdt0dpjz1.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/l629dznzl8g8wfy5v5jc.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/g9m5sicwrjjri5plwnqf.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/uy7cyeuspc04jisgvkp9.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/xmlalyq2jevbdj6epwc9.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/uo6y1ite1h7q49sqbxzr.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/hlkhwxwuqix58fwdoaua.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/qirzhjztgzgxor1286bs.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/x214k98kltlthqktnfhz.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/whixvk2jboac6ekeuxaa.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/figxvkblxtqyf8cla5l7.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/ikn1aa5jzpd8jgg3ivpq.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/adb8xilsnrrevhmrwapk.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/kley3bouwow9kls6ifqh.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/jxfzkygywpauqabcw4hq.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/deatocrpl9wu3sobiiji.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/nponxuy6fon9ggrbirr7.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/qhbfqa31b3xshbp8o11w.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/epyr5dsz0xgaoti3qz1t.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/vldclrbv2vyxouyztzrt.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/iusk1uz6sebz7w0fhfka.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/fgp4wnfjgi1tu4ahh67w.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/wfsqkybfirjguomnwk22.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/m1hlmc8npn2htqouhd6c.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/daaye2kionl1vot9tasy.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/ayk9flslulxc8keq3thl.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/xrc2bipudfbpdd29pc8e.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/akkvhsptoquri9isqkvp.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/n3ef4m2p4edmber7i99l.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/ornb9qdydckvwicpf5yu.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/zazvu5dpriiothuwornz.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/ys0ce1oenwngg0nkmrpp.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/ynlbk7j4zcsfaruocoit.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/zvlncd3zgi4ifz4lj4zi.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/f3yr4jibmohceszcx7my.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/tls3zedpypbznwwdxujo.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/fvi5wusclld2xu38oozi.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/htms3wggxay6x3ksx77z.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/fv5f5cov84cduafltkmt.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/idtzofhpcwhp7iicw6gp.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/ibcaxhvsqf4avm7wanxc.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/xh3t1yeq57x32qocfajt.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/jjwpuvfn7yrdzfsbdsia.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/wzjbshfgfq2tnvfafwic.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/ttqcwzsjdvt489exc5k8.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/sxdxtnhmdmyjuwxtsni6.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/laifp6rnxwsyiy3hj5up.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/g1g6fflfouu9dkb0nlww.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/a5dm7mrkfxiyjigaf3as.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/kmdmiqztvooein5ixiej.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/ugcqpz3qckkhpfpha9ou.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/zebtiolnmbbdhacxasv9.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/cwicz8pozhucvyqxy5ty.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/hpqfin6z4olakfiso0pv.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/nojlmb68arglorz35dib.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/wvdiaqy8wvsehcxmtyrr.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/dwjxl6y3ammuvpdswlzk.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/peumog8z0kxrnlmpynxz.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/wflabco1f1qljoekiznv.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/dw6nobykntrkzn4vbh5l.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/beuw4oi6xntp7z4ct5ql.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/urggcahi26skrsvmakb1.jpg",
    "https://sjc1.vultrobjects.com/donald-louch/portfolio/bxaghta9he81emmo4l1l.jpg",
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
