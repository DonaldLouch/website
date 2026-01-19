import { library } from "@fortawesome/fontawesome-svg-core"
import { all, IconName, IconPrefix } from "@awesome.me/kit-c3986f6041/icons"

library.add(...all)

export type Icons = { name: IconName|any; pack?: IconPrefix }