'use client'

import HugeIcon from "@/app/(Components)/HugeIcon"
import { getVideoData } from "@/app/actions/video"
import { Box, Text } from "@mantine/core"
import { Suspense, useEffect, useState } from "react"

import Loading from "@/app/loading"
import CodeBlock from "@/app/(Components)/(MarkdownCode)/CodeBlock"
import InlineCode from "@/app/(Components)/(MarkdownCode)/InlineCode"
import { HugeIconsNames } from "@/lib/HugeIconsNames"
import ClipboardButton from "@/app/(Components)/(Buttons)/ClipboardButton"
import { HugeiconsIcon } from "@hugeicons/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import {
//   FrameworksIcon,
// } from '@hugeicons-pro/core-stroke-rounded';
// import {
//   AddInvoiceStrokeRounded,
// } from '@hugeicons-pro/core-stroke-rounded';


export default function page() {
    const iconNames = HugeIconsNames.icons
    const iconList = new Array()
    const iconCall = new Array()
    iconNames.forEach((icon: { name: string }) => {
        iconList.push(icon.name)
        iconCall.push(icon.name.split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('') + 
            'StrokeRounded'
        )
    })
    // const list = iconList.toString().replaceAll(",", 'StrokeRounded, ')
    const list = iconCall.toString().replaceAll(",", ", ")
    // iconList.name.split('-')
    //         .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    //         .join('') + 
    //         variant.charAt(0).toUpperCase() + 
    //         variant.slice(1) + 
    //         'Rounded'

    const [clicked, setClicked] = useState(false)

    const icons = [{ 
        name: 'add-invoice', 
        variant: 'duotone',
     },
     { 
        name: 'house', 
        variant: 'fadr',
     },
     { 
        name: 'tiktok', 
        variant: 'duotone',
     },
     { 
        name: 'tiktok', 
        variant: 'fab',
     },
    ]

    return <Box mt="2rem">
        {/* <HugeiconsIcon icon={AddInvoiceStrokeRounded} /> */}
        {/* <InlineCode code="console.log('Hello World')" />
        <ClipboardButton copyValue={list} /> */}
        {/* <HugeiconsIcon icon={FrameworksIcon} /> */}
        {/* {icons.map((icon: any, index: number) => (
           icon.variant.includes("fa") 
           ? <FontAwesomeIcon key={index} icon={[icon.variant, icon.name]} size="6x" />
           : <HugeIcon key={index} name={icon.name} variant={icon.variant} size="7rem" />
        ))}  */}
        <FontAwesomeIcon icon={['fas', 'house']} size="6x" />
        {/*<HugeIcon name="webflow-ellipse" variant="duotone" size="3rem" />*/}
        <Text>Bacon ipsum dolor amet dolore ea ham occaecat andouille ham hock fatback bresaola officia beef ribs short loin ad in. Officia sausage pork belly short ribs beef ribs. Minim fugiat hamburger andouille, culpa magna swine officia proident landjaeger commodo. Porchetta officia nisi, flank do hamburger labore minim et turkey deserunt in venison.

Anim short ribs ball tip short loin flank tail ut swine landjaeger incididunt ex. Eiusmod drumstick esse, fugiat laboris commodo buffalo duis leberkas irure flank in mollit. Laborum pork aliquip turkey adipisicing chuck jowl spare ribs. Pancetta consequat duis shankle. Leberkas pig ad meatloaf, tail beef non picanha meatball beef ribs pork belly jowl bresaola.

Meatball doner duis, andouille cupidatat tri-tip frankfurter excepteur shank incididunt labore strip steak. Laboris prosciutto sirloin capicola cillum drumstick dolore voluptate kielbasa quis. Leberkas turkey short ribs, swine adipisicing ea velit. Labore beef eiusmod picanha ground round tempor. Drumstick frankfurter chicken ut meatball, porchetta corned beef cillum exercitation pariatur incididunt jerky fugiat minim hamburger.

Aute proident cow, cupidatat occaecat mollit incididunt pork eu. Dolore anim buffalo tenderloin commodo. Turducken flank mollit t-bone. Ad chislic bacon commodo voluptate, pancetta magna ham hock buffalo veniam ut est tail. Cupidatat eiusmod corned beef hamburger. Aliquip chicken spare ribs eu consectetur landjaeger hamburger filet mignon leberkas beef cow proident.

Adipisicing landjaeger in strip steak mollit pork loin, chuck dolore chislic chicken veniam. Shoulder do jowl minim ut excepteur. Incididunt ut frankfurter, sed tongue turducken rump shoulder aliquip. In capicola et chuck, flank culpa laborum ut bacon anim venison pork chop t-bone. Ex strip steak cow laborum officia brisket chuck ham dolore eiusmod exercitation et voluptate ullamco pancetta.

Ea exercitation shoulder, flank pancetta leberkas biltong ribeye ullamco meatball capicola incididunt pork chop beef in. Chuck labore et velit nisi shankle magna commodo ipsum. Enim et meatball, ribeye ipsum buffalo kevin jerky t-bone prosciutto flank irure strip steak leberkas. Shoulder short ribs non flank commodo pastrami dolore tongue brisket kielbasa duis. Porchetta dolore sint andouille labore bacon brisket. Doner frankfurter in, sed salami enim quis ham hock pastrami venison short ribs meatball nulla. Dolore chicken short ribs veniam ullamco in.

Pastrami brisket ground round consequat bacon chislic bresaola sed pancetta sirloin flank ut turducken ea shoulder. Ullamco aliqua t-bone pork anim. Cupidatat nostrud chicken, beef chislic leberkas ham sunt in id. Consectetur in filet mignon in magna, aliqua brisket non tongue tenderloin pancetta picanha dolore. Jerky adipisicing esse ipsum cupim corned beef tail burgdoggen ut alcatra pariatur ad voluptate ut kevin. Chislic short loin meatball, t-bone non proident biltong ea incididunt commodo hamburger ham pariatur. Do pastrami biltong officia commodo, adipisicing capicola anim.

Minim ea voluptate pancetta irure tri-tip. Corned beef in laborum officia. Turkey porchetta in, mollit qui dolore dolor meatball spare ribs. Spare ribs porchetta brisket sed magna mollit. Exercitation pork belly qui ball tip.

Culpa commodo pork cupidatat, alcatra velit tenderloin shank do beef fatback sint. Chicken proident ex shankle. Ullamco in shankle short loin. Id tongue reprehenderit, andouille sint ground round ball tip filet mignon biltong frankfurter in.

Jowl cupim flank duis anim aliquip sunt. Aliquip incididunt kielbasa turducken ball tip. Est biltong frankfurter ex burgdoggen cupim lorem. Flank do turducken est frankfurter pork belly shank porchetta culpa eu short loin ut doner enim. Occaecat chuck dolore shoulder, commodo est kevin deserunt ea cillum.

Drumstick kielbasa spare ribs, dolore ea voluptate jowl in laborum dolor beef pancetta porchetta. Pancetta capicola incididunt, biltong ball tip frankfurter boudin tongue bresaola laboris cupim. Laboris pariatur ea deserunt, dolore pork chop short loin kielbasa hamburger ball tip. Commodo lorem corned beef ham hock ut ipsum.

Ea ham hock pariatur occaecat beef. Officia adipisicing nulla, cupidatat ribeye t-bone beef ribs velit filet mignon ad reprehenderit. Shankle sint chicken, deserunt ex laboris pork belly jerky fatback turducken. Cupim deserunt qui ullamco fatback. Anim reprehenderit ham porchetta ea swine eu meatloaf strip steak. Ea exercitation incididunt spare ribs, reprehenderit magna leberkas turkey rump nulla. Pancetta short ribs esse ad.

Cupim culpa boudin, shankle magna ea ut ullamco officia anim voluptate consectetur exercitation. Pork loin ribeye nulla cillum, nostrud picanha chuck dolor tenderloin tongue excepteur shank. Meatloaf venison adipisicing, id mollit picanha pork leberkas chislic tail cupidatat consequat in turducken. Dolore beef frankfurter minim doner elit duis.

Pork ex officia capicola. Cupim pancetta kevin ullamco, quis capicola do elit porchetta dolore cupidatat flank in commodo. Ad prosciutto flank, quis do turkey dolore. Aute culpa tenderloin elit ea ex fatback leberkas.

Leberkas incididunt jowl ut, irure filet mignon fatback cupidatat pastrami cow shoulder deserunt do doner. Velit pastrami quis officia eiusmod tail ullamco labore, magna rump meatball. Veniam chicken ball tip eiusmod, reprehenderit ex beef alcatra occaecat. Ut porchetta minim laborum, filet mignon hamburger ham hock ball tip irure strip steak deserunt. Eiusmod tri-tip aute turducken ham, sint quis corned beef pig ea chicken in prosciutto. Cupidatat kevin pariatur, commodo laborum cupim elit swine chuck short ribs nisi porchetta cow.

Ut do tempor jerky adipisicing. Pork belly fugiat reprehenderit ullamco, drumstick aliqua occaecat. Tenderloin kevin spare ribs doner pork chop, qui strip steak kielbasa. Est do chuck aliquip, officia ipsum cupidatat excepteur ut ground round sunt tempor adipisicing. Ham nostrud t-bone pastrami dolore.

Eu sed velit labore ribeye jerky aliqua. Officia doner aliquip, corned beef in sed proident. Cupim sirloin chicken in sint picanha. Esse sed nostrud venison short loin rump picanha burgdoggen deserunt culpa cupim labore. Picanha elit pork chop, frankfurter ham short loin esse kevin ad. Beef ribs hamburger landjaeger cupim ribeye shank, velit cow picanha kielbasa tri-tip ball tip nulla. Ball tip consequat venison, capicola leberkas dolore non.

Meatloaf venison alcatra cow shoulder strip steak pig shankle chicken buffalo quis esse. Brisket ad sirloin nostrud, ham doner aute et ribeye prosciutto ex qui. Enim tail kevin ut sint, elit frankfurter capicola laborum pork loin. Tri-tip kevin ad pork velit esse dolore do salami shank sint. Turkey meatloaf prosciutto aute, id buffalo fugiat ipsum. Ad in ut turducken, sunt labore irure exercitation fatback consequat commodo. Swine cillum meatloaf strip steak adipisicing burgdoggen sed ball tip doner fatback elit flank ribeye cupidatat.

Swine ex meatloaf chislic, doner pastrami beef sint shankle exercitation reprehenderit salami shoulder. In nostrud duis jerky ad minim eu chuck, strip steak bacon. Tempor ground round pork belly exercitation chicken tongue dolore adipisicing ullamco. Tongue lorem ex venison bresaola sirloin in qui bacon shank. Picanha voluptate id, boudin brisket commodo nulla cupim sausage. Shoulder turkey adipisicing, fugiat flank et pancetta proident prosciutto landjaeger. Short loin jowl pariatur, velit sirloin adipisicing veniam occaecat venison doner eiusmod pork loin shoulder.

Esse consequat nulla short ribs minim cow. Ex officia dolor shankle elit flank, mollit cow burgdoggen landjaeger shank ham hock. Dolor strip steak shank, jowl do tri-tip cupim ut cillum officia labore eiusmod anim. Consectetur veniam in, chislic duis prosciutto laborum. Incididunt turkey consequat, dolore alcatra magna adipisicing landjaeger short ribs dolor consectetur.

Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!</Text>
        {/* altStatus={clicked} altName="absolute" onClick={() => setClicked(!clicked ? true : false)} */}
    </Box>
}
