/*
    Hugeicons Icon Component v. 0.0.2
    By: [Donald Louch](https://donaldlouch.ca)

    Featuring: [Hugeicons: @hugeicons/react@1.0.0](https://hugeicons.com/icons)

    Here is an easy to use component that allows you to use the Hugeicons icon library in your React application. Currently I'm only importing the icons that I use for my personal website. More maybe added at a later time.

    To use this component, simply import it and pass in the name of the icon you want to use as a prop (type-safe). The name of the icon should be the same as the name of the icon in the [Hugeicons Library](https://hugeicons.com/icons).

    For example, if you want to use the "file-unknown"/"<FileUnknownIcon />" icon, you would pass in the name prop as "file-unknown". The component will then render the icon with the appropriate size and color.

    You can also pass in additional props to customize the appearance of the icon. For example:
        - color: The color of the icon. You can pass in any valid CSS color value or CSS variable.
        - size: The size of the icon. You can pass in any valid CSS size value.
        - variant: The variant of the icon. You can pass any variant style found on the [Hugeicons Library](https://hugeicons.com/icons).
        - weight: The thickness of the icon stroke. You can pass any thickness style found on the [Hugeicons Library](https://hugeicons.com/icons).

    Here is an example of how to use the component:

    import { HugeIcon } from "@/app/(Components)/HugeIcon"

    <HugeIcon name="file-unknown" color="red" size="2rem" />

    This will render the "file-unknown" icon with a red color and a size of 2rem.

    You can also use the component in a functional component or a class component. Here is an example of how to use it in a functional component:

    import { HugeIcon } from "@/app/(Components)/HugeIcon"

    const MyComponent = () => {
        return <HugeIcon name="file-unknown" color="red" size="2rem" />
    }
*/

import { HugeiconsIcon } from '@hugeicons/react'

// Stroke Variant
// @ts-ignore
import { FileAttachmentIcon, Logout01Icon, MoreHorizontalIcon, ArrowDownRight01Icon, CheckListIcon, MailEdit01Icon, LeftToRightBlockQuoteIcon, Add01Icon, Album01Icon, Album02Icon, Alert01Icon, Alert02Icon, AlertCircleIcon, AlertDiamondIcon, AppleIcon, Archive02Icon, ArrowAllDirectionIcon, ArrowDown01Icon, ArrowDown02Icon, ArrowExpand01Icon, ArrowExpandIcon, ArrowHorizontalIcon, ArrowLeft01Icon, ArrowLeft02Icon, ArrowLeft03Icon, ArrowRight01Icon, ArrowRight02Icon, ArrowRight03Icon, ArrowShrink01Icon, ArrowShrinkIcon, ArrowUp02Icon, ArrowUpRight01Icon, ArrowUpRight02Icon, BlueskyIcon, Book02Icon, Bookmark01Icon, Briefcase02Icon, Calendar03Icon, Camera01Icon, CameraVideoIcon, Cancel01Icon, CancelCircleIcon, Chatting01Icon, CheckmarkBadge01Icon, CheckmarkBadge03Icon, CheckmarkCircle02Icon, ClipboardIcon, CloudSavingDone01Icon, CloudUploadIcon, Cone01Icon, ContactIcon, Copy01Icon, DashboardBrowsingIcon, DashboardSpeed02Icon, DashboardSquare02Icon, Database01Icon, Database02Icon, Delete01Icon, Delete02Icon, Delete03Icon, Delete04Icon, DeskIcon, DocumentValidationIcon, DragDropIcon, Edit02Icon, Facebook02Icon, FavouriteIcon, FileEditIcon, Files01Icon, Files02Icon, FileUnknownIcon, FileUploadIcon, FilterIcon, Flag02Icon, Folder01Icon, GameController01Icon, Github01Icon, GithubIcon, Globe02Icon, GoBackward10SecIcon, GoForward10SecIcon, GridIcon, HandPointingRight01Icon, Home01Icon, IconjarIcon, Image02Icon, ImageUpload01Icon, ImageUploadIcon, InboxIcon, InformationCircleIcon, InstagramIcon, JobSearchIcon, LaptopCheckIcon, LaurelWreath02Icon, LibraryIcon, LicenseIcon, Link01Icon, Link04Icon, Linkedin02Icon, LinkSquare02Icon, LiverIcon, Loading02Icon, Loading03Icon, Location01Icon, Login01Icon, Mail01Icon, MailAtSign01Icon, MapsSearchIcon, MaximizeScreenIcon, Menu01Icon, MessageDownload01Icon, MinimizeScreenIcon, MusicNote01Icon, MusicNoteSquare02Icon, NewsIcon, NewTwitterIcon, Notification03Icon, Passport01Icon, PassportIcon, PauseIcon, PencilEdit01Icon, PencilEdit02Icon, PencilIcon, PinIcon, PinLocation03Icon, PlayIcon, PlusSignIcon, PropertyEditIcon, QuoteDownIcon, RefreshIcon, Remove01Icon, Remove02Icon, SaveMoneyDollarIcon, Search01Icon, SecurityCheckIcon, SentIcon, SeoIcon, Settings02Icon, Share05Icon, Shirt01Icon, SmartPhone01Icon, Sorting19Icon, Sorting91Icon, SoundcloudIcon, SpotifyIcon, StarIcon, Tag01Icon, TagsIcon, Task01Icon, TaskAdd01Icon, TaskDone01Icon, TaskEdit01Icon, TextFontIcon, ThreadsIcon, Tick01Icon, Ticket01Icon, TiktokIcon, Time02Icon, TrafficLightIcon, TwitterIcon, UnavailableIcon, UserIcon, UserMultiple02Icon, UserShield01Icon, Video01Icon, Video02Icon, ViewIcon, VimeoIcon, VolumeMute01Icon, VolumeOffIcon, WavingHand01Icon, WifiConnected02Icon, YoutubeIcon, ZapIcon } from"@hugeicons-pro/core-stroke-rounded"

// Solid Variant
// @ts-ignore
import { FileAttachmentSolidRounded, Logout01SolidRounded, MoreHorizontalSolidRounded, ArrowDownRight01SolidRounded, CheckListSolidRounded, MailEdit01SolidRounded, LeftToRightBlockQuoteSolidRounded, jarIconSolidRounded, Add01SolidRounded, Album01SolidRounded, Album02SolidRounded, Alert01SolidRounded, Alert02SolidRounded, AlertCircleSolidRounded, AlertDiamondSolidRounded, AppleSolidRounded, Archive02SolidRounded, ArrowAllDirectionSolidRounded, ArrowDown01SolidRounded, ArrowDown02SolidRounded, ArrowExpand01SolidRounded, ArrowExpandSolidRounded, ArrowHorizontalSolidRounded, ArrowLeft01SolidRounded, ArrowLeft02SolidRounded, ArrowLeft03SolidRounded, ArrowRight01SolidRounded, ArrowRight02SolidRounded, ArrowRight03SolidRounded, ArrowShrink01SolidRounded, ArrowShrinkSolidRounded, ArrowUp02SolidRounded, ArrowUpRight01SolidRounded, ArrowUpRight02SolidRounded, BlueskySolidRounded, Book02SolidRounded, Bookmark01SolidRounded, Briefcase02SolidRounded, Calendar03SolidRounded, Camera01SolidRounded, CameraVideoSolidRounded, Cancel01SolidRounded, CancelCircleSolidRounded, Chatting01SolidRounded, CheckmarkBadge01SolidRounded, CheckmarkBadge03SolidRounded, CheckmarkCircle02SolidRounded, ClipboardSolidRounded, CloudSavingDone01SolidRounded, CloudUploadSolidRounded, Cone01SolidRounded, ContactSolidRounded, Copy01SolidRounded, DashboardBrowsingSolidRounded, DashboardSpeed02SolidRounded, DashboardSquare02SolidRounded, Database01SolidRounded, Database02SolidRounded, Delete01SolidRounded, Delete02SolidRounded, Delete03SolidRounded, Delete04SolidRounded, DeskSolidRounded, DocumentValidationSolidRounded, DragDropSolidRounded, Edit02SolidRounded, Facebook02SolidRounded, FavouriteSolidRounded, FileEditSolidRounded, Files01SolidRounded, Files02SolidRounded, FileUnknownSolidRounded, FileUploadSolidRounded, FilterSolidRounded, Flag02SolidRounded, Folder01SolidRounded, GameController01SolidRounded, Github01SolidRounded, GithubSolidRounded, Globe02SolidRounded, GoBackward10SecSolidRounded, GoForward10SecSolidRounded, GridSolidRounded, HandPointingRight01SolidRounded, Home01SolidRounded, Image02SolidRounded, ImageUpload01SolidRounded, ImageUploadSolidRounded, InboxSolidRounded, InformationCircleSolidRounded, InstagramSolidRounded, JobSearchSolidRounded, LaptopCheckSolidRounded, LaurelWreath02SolidRounded, LibrarySolidRounded, LicenseSolidRounded, Link01SolidRounded, Link04SolidRounded, Linkedin02SolidRounded, LinkSquare02SolidRounded, LiverSolidRounded, Loading02SolidRounded, Loading03SolidRounded, Location01SolidRounded, Login01SolidRounded, Mail01SolidRounded, MailAtSign01SolidRounded, MapsSearchSolidRounded, MaximizeScreenSolidRounded, Menu01SolidRounded, MessageDownload01SolidRounded, MinimizeScreenSolidRounded, MusicNote01SolidRounded, MusicNoteSquare02SolidRounded, NewsSolidRounded, NewTwitterSolidRounded, Notification03SolidRounded, Passport01SolidRounded, PassportSolidRounded, PauseSolidRounded, PencilEdit01SolidRounded, PencilEdit02SolidRounded, PencilSolidRounded, PinSolidRounded, PinLocation03SolidRounded, PlaySolidRounded, PlusSignSolidRounded, PropertyEditSolidRounded, QuoteDownSolidRounded, RefreshSolidRounded, Remove01SolidRounded, Remove02SolidRounded, SaveMoneyDollarSolidRounded, Search01SolidRounded, SecurityCheckSolidRounded, SentSolidRounded, SeoSolidRounded, Settings02SolidRounded, Share05SolidRounded, Shirt01SolidRounded, SmartPhone01SolidRounded, Sorting19SolidRounded, Sorting91SolidRounded, SoundcloudSolidRounded, SpotifySolidRounded, StarSolidRounded, Tag01SolidRounded, TagsSolidRounded, Task01SolidRounded, TaskAdd01SolidRounded, TaskDone01SolidRounded, TaskEdit01SolidRounded, TextFontSolidRounded, ThreadsSolidRounded, Tick01SolidRounded, Ticket01SolidRounded, TiktokSolidRounded, Time02SolidRounded, TrafficLightSolidRounded, TwitterSolidRounded, UnavailableSolidRounded, UserSolidRounded, UserMultiple02SolidRounded, UserShield01SolidRounded, Video01SolidRounded, Video02SolidRounded, ViewSolidRounded, VimeoSolidRounded, VolumeMute01SolidRounded, VolumeOffSolidRounded, WavingHand01SolidRounded, WifiConnected02SolidRounded, YoutubeSolidRounded, ZapSolidRounded } from"@hugeicons-pro/core-solid-rounded"

// Bulk Variant
// @ts-ignore
import { FileAttachmentBulkRounded, Logout01BulkRounded, MoreHorizontalBulkRounded, ArrowDownRight01BulkRounded, CheckListBulkRounded, MailEdit01BulkRounded, LeftToRightBlockQuoteBulkRounded, jarIconBulkRounded, Add01BulkRounded, Album01BulkRounded, Album02BulkRounded, Alert01BulkRounded, Alert02BulkRounded, AlertCircleBulkRounded, AlertDiamondBulkRounded, AppleBulkRounded, Archive02BulkRounded, ArrowAllDirectionBulkRounded, ArrowDown01BulkRounded, ArrowDown02BulkRounded, ArrowExpand01BulkRounded, ArrowExpandBulkRounded, ArrowHorizontalBulkRounded, ArrowLeft01BulkRounded, ArrowLeft02BulkRounded, ArrowLeft03BulkRounded, ArrowRight01BulkRounded, ArrowRight02BulkRounded, ArrowRight03BulkRounded, ArrowShrink01BulkRounded, ArrowShrinkBulkRounded, ArrowUp02BulkRounded, ArrowUpRight01BulkRounded, ArrowUpRight02BulkRounded, BlueskyBulkRounded, Book02BulkRounded, Bookmark01BulkRounded, Briefcase02BulkRounded, Calendar03BulkRounded, Camera01BulkRounded, CameraVideoBulkRounded, Cancel01BulkRounded, CancelCircleBulkRounded, Chatting01BulkRounded, CheckmarkBadge01BulkRounded, CheckmarkBadge03BulkRounded, CheckmarkCircle02BulkRounded, ClipboardBulkRounded, CloudSavingDone01BulkRounded, CloudUploadBulkRounded, Cone01BulkRounded, ContactBulkRounded, Copy01BulkRounded, DashboardBrowsingBulkRounded, DashboardSpeed02BulkRounded, DashboardSquare02BulkRounded, Database01BulkRounded, Database02BulkRounded, Delete01BulkRounded, Delete02BulkRounded, Delete03BulkRounded, Delete04BulkRounded, DeskBulkRounded, DocumentValidationBulkRounded, DragDropBulkRounded, Edit02BulkRounded, Facebook02BulkRounded, FavouriteBulkRounded, FileEditBulkRounded, Files01BulkRounded, Files02BulkRounded, FileUnknownBulkRounded, FileUploadBulkRounded, FilterBulkRounded, Flag02BulkRounded, Folder01BulkRounded, GameController01BulkRounded, Github01BulkRounded, GithubBulkRounded, Globe02BulkRounded, GoBackward10SecBulkRounded, GoForward10SecBulkRounded, GridBulkRounded, HandPointingRight01BulkRounded, Home01BulkRounded, Image02BulkRounded, ImageUpload01BulkRounded, ImageUploadBulkRounded, InboxBulkRounded, InformationCircleBulkRounded, InstagramBulkRounded, JobSearchBulkRounded, LaptopCheckBulkRounded, LaurelWreath02BulkRounded, LibraryBulkRounded, LicenseBulkRounded, Link01BulkRounded, Link04BulkRounded, Linkedin02BulkRounded, LinkSquare02BulkRounded, LiverBulkRounded, Loading02BulkRounded, Loading03BulkRounded, Location01BulkRounded, Login01BulkRounded, Mail01BulkRounded, MailAtSign01BulkRounded, MapsSearchBulkRounded, MaximizeScreenBulkRounded, Menu01BulkRounded, MessageDownload01BulkRounded, MinimizeScreenBulkRounded, MusicNote01BulkRounded, MusicNoteSquare02BulkRounded, NewsBulkRounded, NewTwitterBulkRounded, Notification03BulkRounded, Passport01BulkRounded, PassportBulkRounded, PauseBulkRounded, PencilEdit01BulkRounded, PencilEdit02BulkRounded, PencilBulkRounded, PinBulkRounded, PinLocation03BulkRounded, PlayBulkRounded, PlusSignBulkRounded, PropertyEditBulkRounded, QuoteDownBulkRounded, RefreshBulkRounded, Remove01BulkRounded, Remove02BulkRounded, SaveMoneyDollarBulkRounded, Search01BulkRounded, SecurityCheckBulkRounded, SentBulkRounded, SeoBulkRounded, Settings02BulkRounded, Share05BulkRounded, Shirt01BulkRounded, SmartPhone01BulkRounded, Sorting19BulkRounded, Sorting91BulkRounded, SoundcloudBulkRounded, SpotifyBulkRounded, StarBulkRounded, Tag01BulkRounded, TagsBulkRounded, Task01BulkRounded, TaskAdd01BulkRounded, TaskDone01BulkRounded, TaskEdit01BulkRounded, TextFontBulkRounded, ThreadsBulkRounded, Tick01BulkRounded, Ticket01BulkRounded, TiktokBulkRounded, Time02BulkRounded, TrafficLightBulkRounded, TwitterBulkRounded, UnavailableBulkRounded, UserBulkRounded, UserMultiple02BulkRounded, UserShield01BulkRounded, Video01BulkRounded, Video02BulkRounded, ViewBulkRounded, VimeoBulkRounded, VolumeMute01BulkRounded, VolumeOffBulkRounded, WavingHand01BulkRounded, WifiConnected02BulkRounded, YoutubeBulkRounded, ZapBulkRounded } from"@hugeicons-pro/core-bulk-rounded"

// Twotone Variant
// @ts-ignore
import { FileAttachmentTwotoneRounded, Logout01TwotoneRounded, MoreHorizontalTwotoneRounded, ArrowDownRight01TwotoneRounded, CheckListTwotoneRounded, MailEdit01TwotoneRounded, LeftToRightBlockQuoteTwotoneRounded, jarIconTwotoneRounded, Add01TwotoneRounded, Album01TwotoneRounded, Album02TwotoneRounded, Alert01TwotoneRounded, Alert02TwotoneRounded, AlertCircleTwotoneRounded, AlertDiamondTwotoneRounded, AppleTwotoneRounded, Archive02TwotoneRounded, ArrowAllDirectionTwotoneRounded, ArrowDown01TwotoneRounded, ArrowDown02TwotoneRounded, ArrowExpand01TwotoneRounded, ArrowExpandTwotoneRounded, ArrowHorizontalTwotoneRounded, ArrowLeft01TwotoneRounded, ArrowLeft02TwotoneRounded, ArrowLeft03TwotoneRounded, ArrowRight01TwotoneRounded, ArrowRight02TwotoneRounded, ArrowRight03TwotoneRounded, ArrowShrink01TwotoneRounded, ArrowShrinkTwotoneRounded, ArrowUp02TwotoneRounded, ArrowUpRight01TwotoneRounded, ArrowUpRight02TwotoneRounded, BlueskyTwotoneRounded, Book02TwotoneRounded, Bookmark01TwotoneRounded, Briefcase02TwotoneRounded, Calendar03TwotoneRounded, Camera01TwotoneRounded, CameraVideoTwotoneRounded, Cancel01TwotoneRounded, CancelCircleTwotoneRounded, Chatting01TwotoneRounded, CheckmarkBadge01TwotoneRounded, CheckmarkBadge03TwotoneRounded, CheckmarkCircle02TwotoneRounded, ClipboardTwotoneRounded, CloudSavingDone01TwotoneRounded, CloudUploadTwotoneRounded, Cone01TwotoneRounded, ContactTwotoneRounded, Copy01TwotoneRounded, DashboardBrowsingTwotoneRounded, DashboardSpeed02TwotoneRounded, DashboardSquare02TwotoneRounded, Database01TwotoneRounded, Database02TwotoneRounded, Delete01TwotoneRounded, Delete02TwotoneRounded, Delete03TwotoneRounded, Delete04TwotoneRounded, DeskTwotoneRounded, DocumentValidationTwotoneRounded, DragDropTwotoneRounded, Edit02TwotoneRounded, Facebook02TwotoneRounded, FavouriteTwotoneRounded, FileEditTwotoneRounded, Files01TwotoneRounded, Files02TwotoneRounded, FileUnknownTwotoneRounded, FileUploadTwotoneRounded, FilterTwotoneRounded, Flag02TwotoneRounded, Folder01TwotoneRounded, GameController01TwotoneRounded, Github01TwotoneRounded, GithubTwotoneRounded, Globe02TwotoneRounded, GoBackward10SecTwotoneRounded, GoForward10SecTwotoneRounded, GridTwotoneRounded, HandPointingRight01TwotoneRounded, Home01TwotoneRounded, Image02TwotoneRounded, ImageUpload01TwotoneRounded, ImageUploadTwotoneRounded, InboxTwotoneRounded, InformationCircleTwotoneRounded, InstagramTwotoneRounded, JobSearchTwotoneRounded, LaptopCheckTwotoneRounded, LaurelWreath02TwotoneRounded, LibraryTwotoneRounded, LicenseTwotoneRounded, Link01TwotoneRounded, Link04TwotoneRounded, Linkedin02TwotoneRounded, LinkSquare02TwotoneRounded, LiverTwotoneRounded, Loading02TwotoneRounded, Loading03TwotoneRounded, Location01TwotoneRounded, Login01TwotoneRounded, Mail01TwotoneRounded, MailAtSign01TwotoneRounded, MapsSearchTwotoneRounded, MaximizeScreenTwotoneRounded, Menu01TwotoneRounded, MessageDownload01TwotoneRounded, MinimizeScreenTwotoneRounded, MusicNote01TwotoneRounded, MusicNoteSquare02TwotoneRounded, NewsTwotoneRounded, NewTwitterTwotoneRounded, Notification03TwotoneRounded, Passport01TwotoneRounded, PassportTwotoneRounded, PauseTwotoneRounded, PencilEdit01TwotoneRounded, PencilEdit02TwotoneRounded, PencilTwotoneRounded, PinTwotoneRounded, PinLocation03TwotoneRounded, PlayTwotoneRounded, PlusSignTwotoneRounded, PropertyEditTwotoneRounded, QuoteDownTwotoneRounded, RefreshTwotoneRounded, Remove01TwotoneRounded, Remove02TwotoneRounded, SaveMoneyDollarTwotoneRounded, Search01TwotoneRounded, SecurityCheckTwotoneRounded, SentTwotoneRounded, SeoTwotoneRounded, Settings02TwotoneRounded, Share05TwotoneRounded, Shirt01TwotoneRounded, SmartPhone01TwotoneRounded, Sorting19TwotoneRounded, Sorting91TwotoneRounded, SoundcloudTwotoneRounded, SpotifyTwotoneRounded, StarTwotoneRounded, Tag01TwotoneRounded, TagsTwotoneRounded, Task01TwotoneRounded, TaskAdd01TwotoneRounded, TaskDone01TwotoneRounded, TaskEdit01TwotoneRounded, TextFontTwotoneRounded, ThreadsTwotoneRounded, Tick01TwotoneRounded, Ticket01TwotoneRounded, TiktokTwotoneRounded, Time02TwotoneRounded, TrafficLightTwotoneRounded, TwitterTwotoneRounded, UnavailableTwotoneRounded, UserTwotoneRounded, UserMultiple02TwotoneRounded, UserShield01TwotoneRounded, Video01TwotoneRounded, Video02TwotoneRounded, ViewTwotoneRounded, VimeoTwotoneRounded, VolumeMute01TwotoneRounded, VolumeOffTwotoneRounded, WavingHand01TwotoneRounded, WifiConnected02TwotoneRounded, YoutubeTwotoneRounded, ZapTwotoneRounded } from"@hugeicons-pro/core-twotone-rounded"

// Duotone Variant
// @ts-ignore
import { FileAttachmentDuotoneRounded, Logout01DuotoneRounded, MoreHorizontalDuotoneRounded, ArrowDownRight01DuotoneRounded, CheckListDuotoneRounded, MailEdit01DuotoneRounded, LeftToRightBlockQuoteDuotoneRounded, jarIconDuotoneRounded, Add01DuotoneRounded, Album01DuotoneRounded, Album02DuotoneRounded, Alert01DuotoneRounded, Alert02DuotoneRounded, AlertCircleDuotoneRounded, AlertDiamondDuotoneRounded, AppleDuotoneRounded, Archive02DuotoneRounded, ArrowAllDirectionDuotoneRounded, ArrowDown01DuotoneRounded, ArrowDown02DuotoneRounded, ArrowExpand01DuotoneRounded, ArrowExpandDuotoneRounded, ArrowHorizontalDuotoneRounded, ArrowLeft01DuotoneRounded, ArrowLeft02DuotoneRounded, ArrowLeft03DuotoneRounded, ArrowRight02DuotoneRounded, ArrowRight03DuotoneRounded, ArrowShrink01DuotoneRounded, ArrowShrinkDuotoneRounded, ArrowUp02DuotoneRounded, ArrowUpRight01DuotoneRounded, ArrowUpRight02DuotoneRounded, BlueskyDuotoneRounded, Book02DuotoneRounded, Bookmark01DuotoneRounded, Briefcase02DuotoneRounded, Calendar03DuotoneRounded, Camera01DuotoneRounded, CameraVideoDuotoneRounded, Cancel01DuotoneRounded, CancelCircleDuotoneRounded, Chatting01DuotoneRounded, CheckmarkBadge01DuotoneRounded, CheckmarkBadge03DuotoneRounded, CheckmarkCircle02DuotoneRounded, ClipboardDuotoneRounded, CloudSavingDone01DuotoneRounded, CloudUploadDuotoneRounded, Cone01DuotoneRounded, ContactDuotoneRounded, Copy01DuotoneRounded, DashboardBrowsingDuotoneRounded, DashboardSpeed02DuotoneRounded, DashboardSquare02DuotoneRounded, Database01DuotoneRounded, Database02DuotoneRounded, Delete01DuotoneRounded, Delete02DuotoneRounded, Delete03DuotoneRounded, Delete04DuotoneRounded, DeskDuotoneRounded, DocumentValidationDuotoneRounded, DragDropDuotoneRounded, Edit02DuotoneRounded, Facebook02DuotoneRounded, FavouriteDuotoneRounded, FileEditDuotoneRounded, Files01DuotoneRounded, Files02DuotoneRounded, FileUnknownDuotoneRounded, FileUploadDuotoneRounded, FilterDuotoneRounded, Flag02DuotoneRounded, Folder01DuotoneRounded, GameController01DuotoneRounded, Github01DuotoneRounded, GithubDuotoneRounded, Globe02DuotoneRounded, GoBackward10SecDuotoneRounded, GoForward10SecDuotoneRounded, GridDuotoneRounded, HandPointingRight01DuotoneRounded, Home01DuotoneRounded, Image02DuotoneRounded, ImageUpload01DuotoneRounded, ImageUploadDuotoneRounded, InboxDuotoneRounded, InformationCircleDuotoneRounded, InstagramDuotoneRounded, JobSearchDuotoneRounded, LaptopCheckDuotoneRounded, LaurelWreath02DuotoneRounded, LibraryDuotoneRounded, LicenseDuotoneRounded, Link01DuotoneRounded, Link04DuotoneRounded, Linkedin02DuotoneRounded, LinkSquare02DuotoneRounded, LiverDuotoneRounded, Loading02DuotoneRounded, Loading03DuotoneRounded, Location01DuotoneRounded, Login01DuotoneRounded, Mail01DuotoneRounded, MailAtSign01DuotoneRounded, MapsSearchDuotoneRounded, MaximizeScreenDuotoneRounded, Menu01DuotoneRounded, MessageDownload01DuotoneRounded, MinimizeScreenDuotoneRounded, MusicNote01DuotoneRounded, MusicNoteSquare02DuotoneRounded, NewsDuotoneRounded, NewTwitterDuotoneRounded, Notification03DuotoneRounded, Passport01DuotoneRounded, PassportDuotoneRounded, PauseDuotoneRounded, PencilEdit01DuotoneRounded, PencilEdit02DuotoneRounded, PencilDuotoneRounded, PinDuotoneRounded, PinLocation03DuotoneRounded, PlayDuotoneRounded, PlusSignDuotoneRounded, PropertyEditDuotoneRounded, QuoteDownDuotoneRounded, RefreshDuotoneRounded, Remove01DuotoneRounded, Remove02DuotoneRounded, SaveMoneyDollarDuotoneRounded, Search01DuotoneRounded, SecurityCheckDuotoneRounded, SentDuotoneRounded, SeoDuotoneRounded, Settings02DuotoneRounded, Share05DuotoneRounded, Shirt01DuotoneRounded, SmartPhone01DuotoneRounded, Sorting19DuotoneRounded, Sorting91DuotoneRounded, SoundcloudDuotoneRounded, SpotifyDuotoneRounded, StarDuotoneRounded, Tag01DuotoneRounded, TagsDuotoneRounded, Task01DuotoneRounded, TaskAdd01DuotoneRounded, TaskDone01DuotoneRounded, TaskEdit01DuotoneRounded, TextFontDuotoneRounded, ThreadsDuotoneRounded, Tick01DuotoneRounded, Ticket01DuotoneRounded, TiktokDuotoneRounded, Time02DuotoneRounded, TrafficLightDuotoneRounded, TwitterDuotoneRounded, UnavailableDuotoneRounded, UserDuotoneRounded, UserMultiple02DuotoneRounded, UserShield01DuotoneRounded, Video01DuotoneRounded, Video02DuotoneRounded, ViewDuotoneRounded, VimeoDuotoneRounded, VolumeMute01DuotoneRounded, VolumeOffDuotoneRounded, WavingHand01DuotoneRounded, WifiConnected02DuotoneRounded, YoutubeDuotoneRounded, ZapDuotoneRounded } from"@hugeicons-pro/core-duotone-rounded"

export type IconVariant = "stroke" | "solid" | "bulk"  | "twotone" | "duotone"

export type IconName = "file-attachment" | "arrow-right-01" | "bluesky" | "youtube" | "video-01" | "video-02" | "mail-at-sign-01" | "arrow-all-direction" | "file-unknown" | "arrow-up-right-01" | "link-square-02" | "home-01" | "refresh" | "album-02" | "alert-diamond" | "camera-video" | "chatting-01" | "files-02" | "link-01" | "news" | "waving-hand-01" | "zap" | "cancel-01" | "cloud-upload" | "file-upload" | "calendar-03" | "delete-02" | "edit-02" | "image-02" | "image-upload-01" | "image-upload" | "information-circle" | "play" | "drag-drop" | "delete-03" | "delete-01" | "cloud-saving-done-01"| "plus-sign" | "pencil-edit-01" | "pencil-edit-02" | "grid" | "link-04" | "file-edit" | "alert-circle" | "checkmark-badge-03" | "cone-01" | "add-01" | "alert-01" | "alert-02" | "archive-02" | "bookmark-01" | "cancel-circle" | "checkmark-circle-02" | "dashboard-browsing" | "dashboard-speed-02" | "favourite" |"flag-02" | "folder-01" | "laurel-wreath" | "location-01" | "mail-01" | "notification-03" | "pencil" | "search-01" | "security-check" | "sent" | "settings-02" | "star" | "tag-01" | "save-money-dollar" | "seo" | "smart-phone-01" | "text-font" | "new-twitter" | "game-controller-01" | "wifi-connected-02" | "spotify" | "vimeo" | "music-note-square-02" | "shirt-01" | "soundcloud" | "icon-jar" | "facebook-02" | "github" | "instagram" | "laptop-check" | "linkedin-02" | "threads" | "tiktok" | "property-edit" | "view" | "arrow-left-02" | "arrow-left-03" |"arrow-right-02" | "arrow-right-03" | "go-backward-10-sec" | "go-forward-10-sec" | "pause" | "loading-03" | "arrow-down-01" | "briefcase-02" | "dashboard-square-02" | "job-search" | "passport-01" | "passport" | "hand-pointing-right-01" | "quote-down" | "login-01" | "twitter" | "files-01" | "tick-01" | "ticket-01" | "remove-01" |"book-02" | "contact" | "time-02" | "license" | "task-add-01" | "task-done-01" | "task-edit-01" | "arrow-down-02" | "checkmark-badge-01" | "menu-01" | "remove-02" | "unavailable" | "task-01" | "user" | "user-shield-01" | "album-01" | "desk" | "globe-02" | "pin-location-03" | "tags" | "database-02" | "library" | "user-multiple-02" | "arrow-expand-01" | "arrow-expand" | "arrow-horizontal" | "arrow-left-01" | "arrow-shrink-01" | "arrow-shrink" | "arrow-up-right-02" | "copy-01" | "database-01" | "liver" | "maximize-screen" | "minimize-screen" | "share-05" | "volume-mute-01" | "volume-off" | "maps-search" | "camera-01" | "filter" | "pin" | "sorting-19" | "sorting-91" | "music-note-01" | "delete-04" | "apple" | "github-01" | "message-download-01" | "clipboard" | "inbox" | "document-validation" | "loading-02" | "traffic-light" | "arrow-up-02" | "left-to-right-block-quote" | "mail-edit-01" | "check-list" | "arrow-down-right-01" | "more-horizontal" | "logout-01"

export type IconArray = {name: IconName, variant?: IconVariant}

export default function HugeIcon({ name, variant, size, color, weight, clickOption, ...rest }: { name: IconName, variant?: IconVariant, size?: any, color?: string, weight?: any, [key: string]: any, clickOption?: any }) {
    const options = { size: size ? size : undefined, color: color ? color : "currentColor", strokeWidth: weight ? weight : undefined}

    const getIcon =
        name === "file-unknown" && !variant ? FileUnknownIcon 
            : name === "file-unknown" && variant === "solid" ? FileUnknownSolidRounded 
            : name === "file-unknown" && variant === "bulk" ? FileUnknownBulkRounded 
            : name === "file-unknown" && variant === "twotone" ? FileUnknownTwotoneRounded
            : name === "file-unknown" && variant === "duotone" ? FileUnknownDuotoneRounded 
        : name === "bluesky" && !variant ? BlueskyIcon 
            : name === "bluesky" && variant === "solid" ? BlueskySolidRounded 
            : name === "bluesky" && variant === "bulk" ? BlueskyBulkRounded 
            : name === "bluesky" && variant === "twotone" ? BlueskyTwotoneRounded
            : name === "bluesky" && variant === "duotone" ? BlueskyDuotoneRounded
        : name === "file-attachment" && !variant ? FileAttachmentIcon 
            : name === "file-attachment" && variant === "solid" ? FileAttachmentSolidRounded 
            : name === "file-attachment" && variant === "bulk" ? FileAttachmentBulkRounded 
            : name === "file-attachment" && variant === "twotone" ? FileAttachmentTwotoneRounded
            : name === "file-attachment" && variant === "duotone" ? FileAttachmentDuotoneRounded
        : name === "logout-01" && !variant ? Logout01Icon 
            : name === "logout-01" && variant === "solid" ? Logout01SolidRounded 
            : name === "logout-01" && variant === "bulk" ? Logout01BulkRounded 
            : name === "logout-01" && variant === "twotone" ? Logout01TwotoneRounded
            : name === "logout-01" && variant === "duotone" ? Logout01DuotoneRounded
        : name === "more-horizontal" && !variant ? MoreHorizontalIcon 
            : name === "more-horizontal" && variant === "solid" ? MoreHorizontalSolidRounded 
            : name === "more-horizontal" && variant === "bulk" ? MoreHorizontalBulkRounded 
            : name === "more-horizontal" && variant === "twotone" ? MoreHorizontalTwotoneRounded
            : name === "more-horizontal" && variant === "duotone" ? MoreHorizontalDuotoneRounded
        : name === "check-list" && !variant ? CheckListIcon 
            : name === "check-list" && variant === "solid" ? CheckListSolidRounded 
            : name === "check-list" && variant === "bulk" ? CheckListBulkRounded 
            : name === "check-list" && variant === "twotone" ? CheckListTwotoneRounded
            : name === "check-list" && variant === "duotone" ? CheckListDuotoneRounded
        : name === "arrow-down-right-01" && !variant ? ArrowDownRight01Icon 
            : name === "arrow-down-right-01" && variant === "solid" ? ArrowDownRight01SolidRounded 
            : name === "arrow-down-right-01" && variant === "bulk" ? ArrowDownRight01BulkRounded 
            : name === "arrow-down-right-01" && variant === "twotone" ? ArrowDownRight01TwotoneRounded
            : name === "arrow-down-right-01" && variant === "duotone" ? ArrowDownRight01DuotoneRounded
        : name === "left-to-right-block-quote" && !variant ? LeftToRightBlockQuoteIcon 
            : name === "left-to-right-block-quote" && variant === "solid" ? LeftToRightBlockQuoteSolidRounded 
            : name === "left-to-right-block-quote" && variant === "bulk" ? LeftToRightBlockQuoteBulkRounded 
            : name === "left-to-right-block-quote" && variant === "twotone" ? LeftToRightBlockQuoteTwotoneRounded
            : name === "left-to-right-block-quote" && variant === "duotone" ? LeftToRightBlockQuoteDuotoneRounded
        : name === "youtube" && !variant ? YoutubeIcon 
            : name === "youtube" && variant === "solid" ? YoutubeSolidRounded 
            : name === "youtube" && variant === "bulk" ? YoutubeBulkRounded 
            : name === "youtube" && variant === "twotone" ? YoutubeTwotoneRounded
            : name === "youtube" && variant === "duotone" ? YoutubeDuotoneRounded 
        : name === "mail-edit-01" && !variant ? MailEdit01Icon 
            : name === "mail-edit-01" && variant === "solid" ? MailEdit01SolidRounded 
            : name === "mail-edit-01" && variant === "bulk" ? MailEdit01BulkRounded 
            : name === "mail-edit-01" && variant === "twotone" ? MailEdit01TwotoneRounded
            : name === "mail-edit-01" && variant === "duotone" ? MailEdit01DuotoneRounded 
        : name === "video-01" && !variant ? Video01Icon 
            : name === "video-01" && variant === "solid" ? Video01SolidRounded 
            : name === "video-01" && variant === "bulk" ? Video01BulkRounded 
            : name === "video-01" && variant === "twotone" ? Video01TwotoneRounded
            : name === "video-01" && variant === "duotone" ? Video01DuotoneRounded 
        : name === "video-02" && !variant ? Video02Icon 
            : name === "video-02" && variant === "solid" ? Video02SolidRounded 
            : name === "video-02" && variant === "bulk" ? Video02BulkRounded 
            : name === "video-02" && variant === "twotone" ? Video02TwotoneRounded                
            : name === "video-02" && variant === "duotone" ? Video02DuotoneRounded 
        : name === "mail-at-sign-01" && !variant ? MailAtSign01Icon 
            : name === "mail-at-sign-01" && variant === "solid" ? MailAtSign01SolidRounded 
            : name === "mail-at-sign-01" && variant === "bulk" ? MailAtSign01BulkRounded 
            : name === "mail-at-sign-01" && variant === "twotone" ? MailAtSign01TwotoneRounded                
            : name === "mail-at-sign-01" && variant === "duotone" ? MailAtSign01DuotoneRounded 
        : name === "arrow-all-direction" && !variant ? ArrowAllDirectionIcon 
            : name === "arrow-all-direction" && variant === "solid" ? ArrowAllDirectionSolidRounded 
            : name === "arrow-all-direction" && variant === "bulk" ? ArrowAllDirectionBulkRounded 
            : name === "arrow-all-direction" && variant === "twotone" ? ArrowAllDirectionTwotoneRounded                
            : name === "arrow-all-direction" && variant === "duotone" ? ArrowAllDirectionDuotoneRounded
        : name === "arrow-up-right-01" && !variant ? ArrowUpRight01Icon
            : name === "arrow-up-right-01" && variant === "solid" ? ArrowUpRight01SolidRounded
            : name === "arrow-up-right-01" && variant === "bulk" ? ArrowUpRight01BulkRounded
            : name === "arrow-up-right-01" && variant === "twotone" ? ArrowUpRight01TwotoneRounded
            : name === "arrow-up-right-01" && variant === "duotone" ? ArrowUpRight01DuotoneRounded
        : name === "link-square-02" && !variant ? LinkSquare02Icon
            : name === "link-square-02" && variant === "solid" ? LinkSquare02SolidRounded
            : name === "link-square-02" && variant === "bulk" ? LinkSquare02BulkRounded
            : name === "link-square-02" && variant === "twotone" ? LinkSquare02TwotoneRounded
            : name === "link-square-02" && variant === "duotone" ? LinkSquare02DuotoneRounded
        : name === "home-01" && !variant ? Home01Icon
            : name === "home-01" && variant === "solid" ? Home01SolidRounded
            : name === "home-01" && variant === "bulk" ? Home01BulkRounded
            : name === "home-01" && variant === "twotone" ? Home01TwotoneRounded
            : name === "home-01" && variant === "duotone" ? Home01DuotoneRounded
        : name === "refresh" && !variant ? RefreshIcon
            : name === "refresh" && variant === "solid" ? RefreshSolidRounded
            : name === "refresh" && variant === "bulk" ? RefreshBulkRounded
            : name === "refresh" && variant === "twotone" ? RefreshTwotoneRounded
            : name === "refresh" && variant === "duotone" ? RefreshDuotoneRounded
        : name === "album-02" && !variant ? Album02Icon
            : name === "album-02" && variant === "solid" ? Album02SolidRounded
            : name === "album-02" && variant === "bulk" ? Album02BulkRounded
            : name === "album-02" && variant === "twotone" ? Album02TwotoneRounded
            : name === "album-02" && variant === "duotone" ? Album02DuotoneRounded
        : name === "alert-diamond" && !variant ? AlertDiamondIcon
            : name === "alert-diamond" && variant === "solid" ? AlertDiamondSolidRounded
            : name === "alert-diamond" && variant === "bulk" ? AlertDiamondBulkRounded
            : name === "alert-diamond" && variant === "twotone" ? AlertDiamondTwotoneRounded
            : name === "alert-diamond" && variant === "duotone" ? AlertDiamondDuotoneRounded
        : name === "camera-video" && !variant ? CameraVideoIcon
            : name === "camera-video" && variant === "solid" ? CameraVideoSolidRounded
            : name === "camera-video" && variant === "bulk" ? CameraVideoBulkRounded
            : name === "camera-video" && variant === "twotone" ? CameraVideoTwotoneRounded
            : name === "camera-video" && variant === "duotone" ? CameraVideoDuotoneRounded
        : name === "chatting-01" && !variant ? Chatting01Icon
            : name === "chatting-01" && variant === "solid" ? Chatting01SolidRounded
            : name === "chatting-01" && variant === "bulk" ? Chatting01BulkRounded
            : name === "chatting-01" && variant === "twotone" ? Chatting01TwotoneRounded
            : name === "chatting-01" && variant === "duotone" ? Chatting01DuotoneRounded
        : name === "files-02" && !variant ? Files02Icon
            : name === "files-02" && variant === "solid" ? Files02SolidRounded
            : name === "files-02" && variant === "bulk" ? Files02BulkRounded
            : name === "files-02" && variant === "twotone" ? Files02TwotoneRounded
            : name === "files-02" && variant === "duotone" ? Files02DuotoneRounded
        : name === "link-01" && !variant ? Link01Icon
            : name === "link-01" && variant === "solid" ? Link01SolidRounded
            : name === "link-01" && variant === "bulk" ? Link01BulkRounded
            : name === "link-01" && variant === "twotone" ? Link01TwotoneRounded
            : name === "link-01" && variant === "duotone" ? Link01DuotoneRounded
        : name === "news" && !variant ? NewsIcon
            : name === "news" && variant === "solid" ? NewsSolidRounded
            : name === "news" && variant === "bulk" ? NewsBulkRounded
            : name === "news" && variant === "twotone" ? NewsTwotoneRounded
            : name === "news" && variant === "duotone" ? NewsDuotoneRounded
        : name === "waving-hand-01" && !variant ? WavingHand01Icon
            : name === "waving-hand-01" && variant === "solid" ? WavingHand01SolidRounded
            : name === "waving-hand-01" && variant === "bulk" ? WavingHand01BulkRounded
            : name === "waving-hand-01" && variant === "twotone" ? WavingHand01TwotoneRounded
            : name === "waving-hand-01" && variant === "duotone" ? WavingHand01DuotoneRounded
        : name === "zap" && !variant ? ZapIcon
            : name === "zap" && variant === "solid" ? ZapSolidRounded
            : name === "zap" && variant === "bulk" ? ZapBulkRounded
            : name === "zap" && variant === "twotone" ? ZapTwotoneRounded
            : name === "zap" && variant === "duotone" ? ZapDuotoneRounded
        : name === "cancel-01" && !variant ? Cancel01Icon
            : name === "cancel-01" && variant === "solid" ? Cancel01SolidRounded
            : name === "cancel-01" && variant === "bulk" ? Cancel01BulkRounded
            : name === "cancel-01" && variant === "twotone" ? Cancel01TwotoneRounded
            : name === "cancel-01" && variant === "duotone" ? Cancel01DuotoneRounded
        : name === "cloud-upload" && !variant ? CloudUploadIcon
            : name === "cloud-upload" && variant === "solid" ? CloudUploadSolidRounded
            : name === "cloud-upload" && variant === "bulk" ? CloudUploadBulkRounded
            : name === "cloud-upload" && variant === "twotone" ? CloudUploadTwotoneRounded
            : name === "cloud-upload" && variant === "duotone" ? CloudUploadDuotoneRounded
        : name === "file-upload" && !variant ? FileUploadIcon
            : name === "file-upload" && variant === "solid" ? FileUploadSolidRounded
            : name === "file-upload" && variant === "bulk" ? FileUploadBulkRounded
            : name === "file-upload" && variant === "twotone" ? FileUploadTwotoneRounded
            : name === "file-upload" && variant === "duotone" ? FileUploadDuotoneRounded
        : name === "calendar-03" && !variant ? Calendar03Icon
            : name === "calendar-03" && variant === "solid" ? Calendar03SolidRounded
            : name === "calendar-03" && variant === "bulk" ? Calendar03BulkRounded
            : name === "calendar-03" && variant === "twotone" ? Calendar03TwotoneRounded
            : name === "calendar-03" && variant === "duotone" ? Calendar03DuotoneRounded
        : name === "delete-02" && !variant ? Delete02Icon
            : name === "delete-02" && variant === "solid" ? Delete02SolidRounded
            : name === "delete-02" && variant === "bulk" ? Delete02BulkRounded
            : name === "delete-02" && variant === "twotone" ? Delete02TwotoneRounded
            : name === "delete-02" && variant === "duotone" ? Delete02DuotoneRounded
        : name === "edit-02" && !variant ? Edit02Icon
            : name === "edit-02" && variant === "solid" ? Edit02SolidRounded
            : name === "edit-02" && variant === "bulk" ? Edit02BulkRounded
            : name === "edit-02" && variant === "twotone" ? Edit02TwotoneRounded
            : name === "edit-02" && variant === "duotone" ? Edit02DuotoneRounded
        : name === "image-02" && !variant ? Image02Icon
            : name === "image-02" && variant === "solid" ? Image02SolidRounded
            : name === "image-02" && variant === "bulk" ? Image02BulkRounded
            : name === "image-02" && variant === "twotone" ? Image02TwotoneRounded
            : name === "image-02" && variant === "duotone" ? Image02DuotoneRounded
        : name === "image-upload-01" && !variant ? ImageUpload01Icon
            : name === "image-upload-01" && variant === "solid" ? ImageUpload01SolidRounded
            : name === "image-upload-01" && variant === "bulk" ? ImageUpload01BulkRounded
            : name === "image-upload-01" && variant === "twotone" ? ImageUpload01TwotoneRounded
            : name === "image-upload-01" && variant === "duotone" ? ImageUpload01DuotoneRounded
        : name === "image-upload" && !variant ? ImageUploadIcon
            : name === "image-upload" && variant === "solid" ? ImageUploadSolidRounded
            : name === "image-upload" && variant === "bulk" ? ImageUploadBulkRounded
            : name === "image-upload" && variant === "twotone" ? ImageUploadTwotoneRounded
            : name === "image-upload" && variant === "duotone" ? ImageUploadDuotoneRounded
        : name === "information-circle" && !variant ? InformationCircleIcon
            : name === "information-circle" && variant === "solid" ? InformationCircleSolidRounded
            : name === "information-circle" && variant === "bulk" ? InformationCircleBulkRounded
            : name === "information-circle" && variant === "twotone" ? InformationCircleTwotoneRounded
            : name === "information-circle" && variant === "duotone" ? InformationCircleDuotoneRounded
        : name === "play" && !variant ? PlayIcon
            : name === "play" && variant === "solid" ? PlaySolidRounded
            : name === "play" && variant === "bulk" ? PlayBulkRounded
            : name === "play" && variant === "twotone" ? PlayTwotoneRounded
            : name === "play" && variant === "duotone" ? PlayDuotoneRounded
        : name === "drag-drop" && !variant ? DragDropIcon
            : name === "drag-drop" && variant === "solid" ? DragDropSolidRounded
            : name === "drag-drop" && variant === "bulk" ? DragDropBulkRounded
            : name === "drag-drop" && variant === "twotone" ? DragDropTwotoneRounded
            : name === "drag-drop" && variant === "duotone" ? DragDropDuotoneRounded
        : name === "delete-03" && !variant ? Delete03Icon
            : name === "delete-03" && variant === "solid" ? Delete03SolidRounded
            : name === "delete-03" && variant === "bulk" ? Delete03BulkRounded
            : name === "delete-03" && variant === "twotone" ? Delete03TwotoneRounded
            : name === "delete-03" && variant === "duotone" ? Delete03DuotoneRounded
        : name === "delete-01" && !variant ? Delete01Icon
            : name === "delete-01" && variant === "solid" ? Delete01SolidRounded
            : name === "delete-01" && variant === "bulk" ? Delete01BulkRounded
            : name === "delete-01" && variant === "twotone" ? Delete01TwotoneRounded
            : name === "delete-01" && variant === "duotone" ? Delete01DuotoneRounded
        : name === "cloud-saving-done-01" && !variant ? CloudSavingDone01Icon
            : name === "cloud-saving-done-01" && variant === "solid" ? CloudSavingDone01SolidRounded
            : name === "cloud-saving-done-01" && variant === "bulk" ? CloudSavingDone01BulkRounded
            : name === "cloud-saving-done-01" && variant === "twotone" ? CloudSavingDone01TwotoneRounded
            : name === "cloud-saving-done-01" && variant === "duotone" ? CloudSavingDone01DuotoneRounded
        : name === "plus-sign" && !variant ? PlusSignIcon
            : name === "plus-sign" && variant === "solid" ? PlusSignSolidRounded
            : name === "plus-sign" && variant === "bulk" ? PlusSignBulkRounded
            : name === "plus-sign" && variant === "twotone" ? PlusSignTwotoneRounded
            : name === "plus-sign" && variant === "duotone" ? PlusSignDuotoneRounded
        : name === "pencil-edit-01" && !variant ? PencilEdit01Icon
            : name === "pencil-edit-01" && variant === "solid" ? PencilEdit01SolidRounded
            : name === "pencil-edit-01" && variant === "bulk" ? PencilEdit01BulkRounded
            : name === "pencil-edit-01" && variant === "twotone" ? PencilEdit01TwotoneRounded
            : name === "pencil-edit-01" && variant === "duotone" ? PencilEdit01DuotoneRounded
        : name === "pencil-edit-02" && !variant ? PencilEdit02Icon
            : name === "pencil-edit-02" && variant === "solid" ? PencilEdit02SolidRounded
            : name === "pencil-edit-02" && variant === "bulk" ? PencilEdit02BulkRounded
            : name === "pencil-edit-02" && variant === "twotone" ? PencilEdit02TwotoneRounded
            : name === "pencil-edit-02" && variant === "duotone" ? PencilEdit02DuotoneRounded
        : name === "grid" && !variant ? GridIcon
            : name === "grid" && variant === "solid" ? GridSolidRounded
            : name === "grid" && variant === "bulk" ? GridBulkRounded
            : name === "grid" && variant === "twotone" ? GridTwotoneRounded
            : name === "grid" && variant === "duotone" ? GridDuotoneRounded
        : name === "link-04" && !variant ? Link04Icon
            : name === "link-04" && variant === "solid" ? Link04SolidRounded
            : name === "link-04" && variant === "bulk" ? Link04BulkRounded
            : name === "link-04" && variant === "twotone" ? Link04TwotoneRounded
            : name === "link-04" && variant === "duotone" ? Link04DuotoneRounded
        : name === "file-edit" && !variant ? FileEditIcon
            : name === "file-edit" && variant === "solid" ? FileEditSolidRounded
            : name === "file-edit" && variant === "bulk" ? FileEditBulkRounded
            : name === "file-edit" && variant === "twotone" ? FileEditTwotoneRounded
            : name === "file-edit" && variant === "duotone" ? FileEditDuotoneRounded
        : name === "alert-circle" && !variant ? AlertCircleIcon
            : name === "alert-circle" && variant === "solid" ? AlertCircleSolidRounded
            : name === "alert-circle" && variant === "bulk" ? AlertCircleBulkRounded
            : name === "alert-circle" && variant === "twotone" ? AlertCircleTwotoneRounded
            : name === "alert-circle" && variant === "duotone" ? AlertCircleDuotoneRounded
        : name === "checkmark-badge-03" && !variant ? CheckmarkBadge03Icon
            : name === "checkmark-badge-03" && variant === "solid" ? CheckmarkBadge03SolidRounded
            : name === "checkmark-badge-03" && variant === "bulk" ? CheckmarkBadge03BulkRounded
            : name === "checkmark-badge-03" && variant === "twotone" ? CheckmarkBadge03TwotoneRounded
            : name === "checkmark-badge-03" && variant === "duotone" ? CheckmarkBadge03DuotoneRounded
        : name === "cone-01" && !variant ? Cone01Icon
            : name === "cone-01" && variant === "solid" ? Cone01SolidRounded
            : name === "cone-01" && variant === "bulk" ? Cone01BulkRounded
            : name === "cone-01" && variant === "twotone" ? Cone01TwotoneRounded
            : name === "cone-01" && variant === "duotone" ? Cone01DuotoneRounded
        : name === "add-01" && !variant ? Add01Icon
            : name === "add-01" && variant === "solid" ? Add01SolidRounded
            : name === "add-01" && variant === "bulk" ? Add01BulkRounded
            : name === "add-01" && variant === "twotone" ? Add01TwotoneRounded
            : name === "add-01" && variant === "duotone" ? Add01DuotoneRounded
        : name === "alert-01" && !variant ? Alert01Icon
            : name === "alert-01" && variant === "solid" ? Alert01SolidRounded
            : name === "alert-01" && variant === "bulk" ? Alert01BulkRounded
            : name === "alert-01" && variant === "twotone" ? Alert01TwotoneRounded
            : name === "alert-01" && variant === "duotone" ? Alert01DuotoneRounded
        : name === "alert-02" && !variant ? Alert02Icon
            : name === "alert-02" && variant === "solid" ? Alert02SolidRounded
            : name === "alert-02" && variant === "bulk" ? Alert02BulkRounded
            : name === "alert-02" && variant === "twotone" ? Alert02TwotoneRounded
            : name === "alert-02" && variant === "duotone" ? Alert02DuotoneRounded
        : name === "archive-02" && !variant ? Archive02Icon
            : name === "archive-02" && variant === "solid" ? Archive02SolidRounded
            : name === "archive-02" && variant === "bulk" ? Archive02BulkRounded
            : name === "archive-02" && variant === "twotone" ? Archive02TwotoneRounded
            : name === "archive-02" && variant === "duotone" ? Archive02DuotoneRounded
        : name === "bookmark-01" && !variant ? Bookmark01Icon
            : name === "bookmark-01" && variant === "solid" ? Bookmark01SolidRounded
            : name === "bookmark-01" && variant === "bulk" ? Bookmark01BulkRounded
            : name === "bookmark-01" && variant === "twotone" ? Bookmark01TwotoneRounded
            : name === "bookmark-01" && variant === "duotone" ? Bookmark01DuotoneRounded
        : name === "cancel-circle" && !variant ? CancelCircleIcon
            : name === "cancel-circle" && variant === "solid" ? CancelCircleSolidRounded
            : name === "cancel-circle" && variant === "bulk" ? CancelCircleBulkRounded
            : name === "cancel-circle" && variant === "twotone" ? CancelCircleTwotoneRounded
            : name === "cancel-circle" && variant === "duotone" ? CancelCircleDuotoneRounded
        : name === "checkmark-circle-02" && !variant ? CheckmarkCircle02Icon
            : name === "checkmark-circle-02" && variant === "solid" ? CheckmarkCircle02SolidRounded
            : name === "checkmark-circle-02" && variant === "bulk" ? CheckmarkCircle02BulkRounded
            : name === "checkmark-circle-02" && variant === "twotone" ? CheckmarkCircle02TwotoneRounded
            : name === "checkmark-circle-02" && variant === "duotone" ? CheckmarkCircle02DuotoneRounded
        : name === "dashboard-browsing" && !variant ? DashboardBrowsingIcon
            : name === "dashboard-browsing" && variant === "solid" ? DashboardBrowsingSolidRounded
            : name === "dashboard-browsing" && variant === "bulk" ? DashboardBrowsingBulkRounded
            : name === "dashboard-browsing" && variant === "twotone" ? DashboardBrowsingTwotoneRounded
            : name === "dashboard-browsing" && variant === "duotone" ? DashboardBrowsingDuotoneRounded
        : name === "dashboard-speed-02" && !variant ? DashboardSpeed02Icon
            : name === "dashboard-speed-02" && variant === "solid" ? DashboardSpeed02SolidRounded
            : name === "dashboard-speed-02" && variant === "bulk" ? DashboardSpeed02BulkRounded
            : name === "dashboard-speed-02" && variant === "twotone" ? DashboardSpeed02TwotoneRounded
            : name === "dashboard-speed-02" && variant === "duotone" ? DashboardSpeed02DuotoneRounded
        : name === "favourite" && !variant ? FavouriteIcon
            : name === "favourite" && variant === "solid" ? FavouriteSolidRounded
            : name === "favourite" && variant === "bulk" ? FavouriteBulkRounded
            : name === "favourite" && variant === "twotone" ? FavouriteTwotoneRounded
            : name === "favourite" && variant === "duotone" ? FavouriteDuotoneRounded            
        : name === "flag-02" && !variant ? Flag02Icon
            : name === "flag-02" && variant === "solid" ? Flag02SolidRounded
            : name === "flag-02" && variant === "bulk" ? Flag02BulkRounded
            : name === "flag-02" && variant === "twotone" ? Flag02TwotoneRounded
            : name === "flag-02" && variant === "duotone" ? Flag02DuotoneRounded
        : name === "folder-01" && !variant ? Folder01Icon
            : name === "folder-01" && variant === "solid" ? Folder01SolidRounded
            : name === "folder-01" && variant === "bulk" ? Folder01BulkRounded
            : name === "folder-01" && variant === "twotone" ? Folder01TwotoneRounded
            : name === "folder-01" && variant === "duotone" ? Folder01DuotoneRounded
        : name === "laurel-wreath" && !variant ? LaurelWreath02Icon
            : name === "laurel-wreath" && variant === "solid" ? LaurelWreath02SolidRounded
            : name === "laurel-wreath" && variant === "bulk" ? LaurelWreath02BulkRounded
            : name === "laurel-wreath" && variant === "twotone" ? LaurelWreath02TwotoneRounded
            : name === "laurel-wreath" && variant === "duotone" ? LaurelWreath02DuotoneRounded
        : name === "location-01" && !variant ? Location01Icon
            : name === "location-01" && variant === "solid" ? Location01SolidRounded
            : name === "location-01" && variant === "bulk" ? Location01BulkRounded
            : name === "location-01" && variant === "twotone" ? Location01TwotoneRounded
            : name === "location-01" && variant === "duotone" ? Location01DuotoneRounded
        : name === "mail-01" && !variant ? Mail01Icon
            : name === "mail-01" && variant === "solid" ? Mail01SolidRounded
            : name === "mail-01" && variant === "bulk" ? Mail01BulkRounded
            : name === "mail-01" && variant === "twotone" ? Mail01TwotoneRounded
            : name === "mail-01" && variant === "duotone" ? Mail01DuotoneRounded
        : name === "notification-03" && !variant ? Notification03Icon
            : name === "notification-03" && variant === "solid" ? Notification03SolidRounded
            : name === "notification-03" && variant === "bulk" ? Notification03BulkRounded
            : name === "notification-03" && variant === "twotone" ? Notification03TwotoneRounded
            : name === "notification-03" && variant === "duotone" ? Notification03DuotoneRounded
        : name === "pencil" && !variant ? PencilIcon
            : name === "pencil" && variant === "solid" ? PencilSolidRounded
            : name === "pencil" && variant === "bulk" ? PencilBulkRounded
            : name === "pencil" && variant === "twotone" ? PencilTwotoneRounded
            : name === "pencil" && variant === "duotone" ? PencilDuotoneRounded
        : name === "search-01" && !variant ? Search01Icon
            : name === "search-01" && variant === "solid" ? Search01SolidRounded
            : name === "search-01" && variant === "bulk" ? Search01BulkRounded
            : name === "search-01" && variant === "twotone" ? Search01TwotoneRounded
            : name === "search-01" && variant === "duotone" ? Search01DuotoneRounded
        : name === "security-check" && !variant ? SecurityCheckIcon
            : name === "security-check" && variant === "solid" ? SecurityCheckSolidRounded
            : name === "security-check" && variant === "bulk" ? SecurityCheckBulkRounded
            : name === "security-check" && variant === "twotone" ? SecurityCheckTwotoneRounded
            : name === "security-check" && variant === "duotone" ? SecurityCheckDuotoneRounded
        : name === "sent" && !variant ? SentIcon
            : name === "sent" && variant === "solid" ? SentSolidRounded
            : name === "sent" && variant === "bulk" ? SentBulkRounded
            : name === "sent" && variant === "twotone" ? SentTwotoneRounded
            : name === "sent" && variant === "duotone" ? SentDuotoneRounded
        : name === "settings-02" && !variant ? Settings02Icon
            : name === "settings-02" && variant === "solid" ? Settings02SolidRounded
            : name === "settings-02" && variant === "bulk" ? Settings02BulkRounded
            : name === "settings-02" && variant === "twotone" ? Settings02TwotoneRounded
            : name === "settings-02" && variant === "duotone" ? Settings02DuotoneRounded
        : name === "star" && !variant ? StarIcon
            : name === "star" && variant === "solid" ? StarSolidRounded
            : name === "star" && variant === "bulk" ? StarBulkRounded
            : name === "star" && variant === "twotone" ? StarTwotoneRounded
            : name === "star" && variant === "duotone" ? StarDuotoneRounded
        : name === "tag-01" && !variant ? Tag01Icon
            : name === "tag-01" && variant === "solid" ? Tag01SolidRounded
            : name === "tag-01" && variant === "bulk" ? Tag01BulkRounded
            : name === "tag-01" && variant === "twotone" ? Tag01TwotoneRounded
            : name === "tag-01" && variant === "duotone" ? Tag01DuotoneRounded
        : name === "save-money-dollar" && !variant ? SaveMoneyDollarIcon
            : name === "save-money-dollar" && variant === "solid" ? SaveMoneyDollarSolidRounded
            : name === "save-money-dollar" && variant === "bulk" ? SaveMoneyDollarBulkRounded
            : name === "save-money-dollar" && variant === "twotone" ? SaveMoneyDollarTwotoneRounded
            : name === "save-money-dollar" && variant === "duotone" ? SaveMoneyDollarDuotoneRounded
        : name === "seo" && !variant ? SeoIcon
            : name === "seo" && variant === "solid" ? SeoSolidRounded
            : name === "seo" && variant === "bulk" ? SeoBulkRounded
            : name === "seo" && variant === "twotone" ? SeoTwotoneRounded
            : name === "seo" && variant === "duotone" ? SeoDuotoneRounded
        : name === "smart-phone-01" && !variant ? SmartPhone01Icon
            : name === "smart-phone-01" && variant === "solid" ? SmartPhone01SolidRounded
            : name === "smart-phone-01" && variant === "bulk" ? SmartPhone01BulkRounded
            : name === "smart-phone-01" && variant === "twotone" ? SmartPhone01TwotoneRounded
            : name === "smart-phone-01" && variant === "duotone" ? SmartPhone01DuotoneRounded
        : name === "text-font" && !variant ? TextFontIcon
            : name === "text-font" && variant === "solid" ? TextFontSolidRounded
            : name === "text-font" && variant === "bulk" ? TextFontBulkRounded
            : name === "text-font" && variant === "twotone" ? TextFontTwotoneRounded
            : name === "text-font" && variant === "duotone" ? TextFontDuotoneRounded
        : name === "new-twitter" && !variant ? NewTwitterIcon
            : name === "new-twitter" && variant === "solid" ? NewTwitterSolidRounded
            : name === "new-twitter" && variant === "bulk" ? NewTwitterBulkRounded
            : name === "new-twitter" && variant === "twotone" ? NewTwitterTwotoneRounded
            : name === "new-twitter" && variant === "duotone" ? NewTwitterDuotoneRounded
        : name === "game-controller-01" && !variant ? GameController01Icon
            : name === "game-controller-01" && variant === "solid" ? GameController01SolidRounded
            : name === "game-controller-01" && variant === "bulk" ? GameController01BulkRounded
            : name === "game-controller-01" && variant === "twotone" ? GameController01TwotoneRounded
            : name === "game-controller-01" && variant === "duotone" ? GameController01DuotoneRounded
        : name === "wifi-connected-02" && !variant ? WifiConnected02Icon
            : name === "wifi-connected-02" && variant === "solid" ? WifiConnected02SolidRounded
            : name === "wifi-connected-02" && variant === "bulk" ? WifiConnected02BulkRounded
            : name === "wifi-connected-02" && variant === "twotone" ? WifiConnected02TwotoneRounded
            : name === "wifi-connected-02" && variant === "duotone" ? WifiConnected02DuotoneRounded
        : name === "spotify" && !variant ? SpotifyIcon
            : name === "spotify" && variant === "solid" ? SpotifySolidRounded
            : name === "spotify" && variant === "bulk" ? SpotifyBulkRounded
            : name === "spotify" && variant === "twotone" ? SpotifyTwotoneRounded
            : name === "spotify" && variant === "duotone" ? SpotifyDuotoneRounded
        : name === "vimeo" && !variant ? VimeoIcon
            : name === "vimeo" && variant === "solid" ? VimeoSolidRounded
            : name === "vimeo" && variant === "bulk" ? VimeoBulkRounded
            : name === "vimeo" && variant === "twotone" ? VimeoTwotoneRounded
            : name === "vimeo" && variant === "duotone" ? VimeoDuotoneRounded
        : name === "music-note-square-02" && !variant ? MusicNoteSquare02Icon
            : name === "music-note-square-02" && variant === "solid" ? MusicNoteSquare02SolidRounded
            : name === "music-note-square-02" && variant === "bulk" ? MusicNoteSquare02BulkRounded
            : name === "music-note-square-02" && variant === "twotone" ? MusicNoteSquare02TwotoneRounded
            : name === "music-note-square-02" && variant === "duotone" ? MusicNoteSquare02DuotoneRounded
        : name === "shirt-01" && !variant ? Shirt01Icon
            : name === "shirt-01" && variant === "solid" ? Shirt01SolidRounded
            : name === "shirt-01" && variant === "bulk" ? Shirt01BulkRounded
            : name === "shirt-01" && variant === "twotone" ? Shirt01TwotoneRounded
            : name === "shirt-01" && variant === "duotone" ? Shirt01DuotoneRounded
        : name === "soundcloud" && !variant ? SoundcloudIcon
            : name === "soundcloud" && variant === "solid" ? SoundcloudSolidRounded
            : name === "soundcloud" && variant === "bulk" ? SoundcloudBulkRounded
            : name === "soundcloud" && variant === "twotone" ? SoundcloudTwotoneRounded
            : name === "soundcloud" && variant === "duotone" ? SoundcloudDuotoneRounded
        : name === "icon-jar" && !variant ? IconjarIcon
            : name === "icon-jar" && variant === "solid" ? jarIconSolidRounded
            : name === "icon-jar" && variant === "bulk" ? jarIconBulkRounded
            : name === "icon-jar" && variant === "twotone" ? jarIconTwotoneRounded
            : name === "icon-jar" && variant === "duotone" ? jarIconDuotoneRounded
        : name === "facebook-02" && !variant ? Facebook02Icon
            : name === "facebook-02" && variant === "solid" ? Facebook02SolidRounded
            : name === "facebook-02" && variant === "bulk" ? Facebook02BulkRounded
            : name === "facebook-02" && variant === "twotone" ? Facebook02TwotoneRounded
            : name === "facebook-02" && variant === "duotone" ? Facebook02DuotoneRounded
        : name === "github" && !variant ? GithubIcon
            : name === "github" && variant === "solid" ? GithubSolidRounded
            : name === "github" && variant === "bulk" ? GithubBulkRounded
            : name === "github" && variant === "twotone" ? GithubTwotoneRounded
            : name === "github" && variant === "duotone" ? GithubDuotoneRounded
        : name === "instagram" && !variant ? InstagramIcon
            : name === "instagram" && variant === "solid" ? InstagramSolidRounded
            : name === "instagram" && variant === "bulk" ? InstagramBulkRounded
            : name === "instagram" && variant === "twotone" ? InstagramTwotoneRounded
            : name === "instagram" && variant === "duotone" ? InstagramDuotoneRounded
        : name === "laptop-check" && !variant ? LaptopCheckIcon
            : name === "laptop-check" && variant === "solid" ? LaptopCheckSolidRounded
            : name === "laptop-check" && variant === "bulk" ? LaptopCheckBulkRounded
            : name === "laptop-check" && variant === "twotone" ? LaptopCheckTwotoneRounded
            : name === "laptop-check" && variant === "duotone" ? LaptopCheckDuotoneRounded
        : name === "linkedin-02" && !variant ? Linkedin02Icon
            : name === "linkedin-02" && variant === "solid" ? Linkedin02SolidRounded
            : name === "linkedin-02" && variant === "bulk" ? Linkedin02BulkRounded
            : name === "linkedin-02" && variant === "twotone" ? Linkedin02TwotoneRounded
            : name === "linkedin-02" && variant === "duotone" ? Linkedin02DuotoneRounded
        : name === "threads" && !variant ? ThreadsIcon
            : name === "threads" && variant === "solid" ? ThreadsSolidRounded
            : name === "threads" && variant === "bulk" ? ThreadsBulkRounded
            : name === "threads" && variant === "twotone" ? ThreadsTwotoneRounded
            : name === "threads" && variant === "duotone" ? ThreadsDuotoneRounded
        : name === "tiktok" && !variant ? TiktokIcon
            : name === "tiktok" && variant === "solid" ? TiktokSolidRounded
            : name === "tiktok" && variant === "bulk" ? TiktokBulkRounded
            : name === "tiktok" && variant === "twotone" ? TiktokTwotoneRounded
            : name === "tiktok" && variant === "duotone" ? TiktokDuotoneRounded
        : name === "property-edit" && !variant ? PropertyEditIcon
            : name === "property-edit" && variant === "solid" ? PropertyEditSolidRounded
            : name === "property-edit" && variant === "bulk" ? PropertyEditBulkRounded
            : name === "property-edit" && variant === "twotone" ? PropertyEditTwotoneRounded
            : name === "property-edit" && variant === "duotone" ? PropertyEditDuotoneRounded
        : name === "view" && !variant ? ViewIcon
            : name === "view" && variant === "solid" ? ViewSolidRounded
            : name === "view" && variant === "bulk" ? ViewBulkRounded
            : name === "view" && variant === "twotone" ? ViewTwotoneRounded
            : name === "view" && variant === "duotone" ? ViewDuotoneRounded
        : name === "arrow-left-02" && !variant ? ArrowLeft02Icon
            : name === "arrow-left-02" && variant === "solid" ? ArrowLeft02SolidRounded
            : name === "arrow-left-02" && variant === "bulk" ? ArrowLeft02BulkRounded
            : name === "arrow-left-02" && variant === "twotone" ? ArrowLeft02TwotoneRounded
            : name === "arrow-left-02" && variant === "duotone" ? ArrowLeft02DuotoneRounded
        : name === "arrow-left-03" && !variant ? ArrowLeft03Icon
            : name === "arrow-left-03" && variant === "solid" ? ArrowLeft03SolidRounded
            : name === "arrow-left-03" && variant === "bulk" ? ArrowLeft03BulkRounded
            : name === "arrow-left-03" && variant === "twotone" ? ArrowLeft03TwotoneRounded
            : name === "arrow-left-03" && variant === "duotone" ? ArrowLeft03DuotoneRounded
        : name === "arrow-right-01" && !variant ? ArrowRight01Icon
            : name === "arrow-right-01" && variant === "solid" ? ArrowRight01SolidRounded
            : name === "arrow-right-01" && variant === "bulk" ? ArrowRight01BulkRounded
            : name === "arrow-right-01" && variant === "twotone" ? ArrowRight01TwotoneRounded
            : name === "arrow-right-01" && variant === "duotone" ? ArrowRight01DuotoneRounded
        : name === "arrow-right-02" && !variant ? ArrowRight02Icon
            : name === "arrow-right-02" && variant === "solid" ? ArrowRight02SolidRounded
            : name === "arrow-right-02" && variant === "bulk" ? ArrowRight02BulkRounded
            : name === "arrow-right-02" && variant === "twotone" ? ArrowRight02TwotoneRounded
            : name === "arrow-right-02" && variant === "duotone" ? ArrowRight02DuotoneRounded
        : name === "arrow-right-03" && !variant ? ArrowRight03Icon
            : name === "arrow-right-03" && variant === "solid" ? ArrowRight03SolidRounded
            : name === "arrow-right-03" && variant === "bulk" ? ArrowRight03BulkRounded
            : name === "arrow-right-03" && variant === "twotone" ? ArrowRight03TwotoneRounded
            : name === "arrow-right-03" && variant === "duotone" ? ArrowRight03DuotoneRounded
        : name === "go-backward-10-sec" && !variant ? GoBackward10SecIcon
            : name === "go-backward-10-sec" && variant === "solid" ? GoBackward10SecSolidRounded
            : name === "go-backward-10-sec" && variant === "bulk" ? GoBackward10SecBulkRounded
            : name === "go-backward-10-sec" && variant === "twotone" ? GoBackward10SecTwotoneRounded
            : name === "go-backward-10-sec" && variant === "duotone" ? GoBackward10SecDuotoneRounded
        : name === "go-forward-10-sec" && !variant ? GoForward10SecIcon
            : name === "go-forward-10-sec" && variant === "solid" ? GoForward10SecSolidRounded
            : name === "go-forward-10-sec" && variant === "bulk" ? GoForward10SecBulkRounded
            : name === "go-forward-10-sec" && variant === "twotone" ? GoForward10SecTwotoneRounded
            : name === "go-forward-10-sec" && variant === "duotone" ? GoForward10SecDuotoneRounded
        : name === "pause" && !variant ? PauseIcon
            : name === "pause" && variant === "solid" ? PauseSolidRounded
            : name === "pause" && variant === "bulk" ? PauseBulkRounded
            : name === "pause" && variant === "twotone" ? PauseTwotoneRounded
            : name === "pause" && variant === "duotone" ? PauseDuotoneRounded
        : name === "loading-03" && !variant ? Loading03Icon
            : name === "loading-03" && variant === "solid" ? Loading03SolidRounded
            : name === "loading-03" && variant === "bulk" ? Loading03BulkRounded
            : name === "loading-03" && variant === "twotone" ? Loading03TwotoneRounded
            : name === "loading-03" && variant === "duotone" ? Loading03DuotoneRounded
        : name === "arrow-down-01" && !variant ? ArrowDown01Icon
            : name === "arrow-down-01" && variant === "solid" ? ArrowDown01SolidRounded
            : name === "arrow-down-01" && variant === "bulk" ? ArrowDown01BulkRounded
            : name === "arrow-down-01" && variant === "twotone" ? ArrowDown01TwotoneRounded
            : name === "arrow-down-01" && variant === "duotone" ? ArrowDown01DuotoneRounded
        : name === "briefcase-02" && !variant ? Briefcase02Icon
            : name === "briefcase-02" && variant === "solid" ? Briefcase02SolidRounded
            : name === "briefcase-02" && variant === "bulk" ? Briefcase02BulkRounded
            : name === "briefcase-02" && variant === "twotone" ? Briefcase02TwotoneRounded
            : name === "briefcase-02" && variant === "duotone" ? Briefcase02DuotoneRounded
        : name === "dashboard-square-02" && !variant ? DashboardSquare02Icon
            : name === "dashboard-square-02" && variant === "solid" ? DashboardSquare02SolidRounded
            : name === "dashboard-square-02" && variant === "bulk" ? DashboardSquare02BulkRounded
            : name === "dashboard-square-02" && variant === "twotone" ? DashboardSquare02TwotoneRounded
            : name === "dashboard-square-02" && variant === "duotone" ? DashboardSquare02DuotoneRounded
        : name === "job-search" && !variant ? JobSearchIcon
            : name === "job-search" && variant === "solid" ? JobSearchSolidRounded
            : name === "job-search" && variant === "bulk" ? JobSearchBulkRounded
            : name === "job-search" && variant === "twotone" ? JobSearchTwotoneRounded
            : name === "job-search" && variant === "duotone" ? JobSearchDuotoneRounded
        : name === "passport-01" && !variant ? Passport01Icon
            : name === "passport-01" && variant === "solid" ? Passport01SolidRounded
            : name === "passport-01" && variant === "bulk" ? Passport01BulkRounded
            : name === "passport-01" && variant === "twotone" ? Passport01TwotoneRounded
            : name === "passport-01" && variant === "duotone" ? Passport01DuotoneRounded
        : name === "passport" && !variant ? PassportIcon
            : name === "passport" && variant === "solid" ? PassportSolidRounded
            : name === "passport" && variant === "bulk" ? PassportBulkRounded
            : name === "passport" && variant === "twotone" ? PassportTwotoneRounded
            : name === "passport" && variant === "duotone" ? PassportDuotoneRounded
        : name === "hand-pointing-right-01" && !variant ? HandPointingRight01Icon
            : name === "hand-pointing-right-01" && variant === "solid" ? HandPointingRight01SolidRounded
            : name === "hand-pointing-right-01" && variant === "bulk" ? HandPointingRight01BulkRounded
            : name === "hand-pointing-right-01" && variant === "twotone" ? HandPointingRight01TwotoneRounded
            : name === "hand-pointing-right-01" && variant === "duotone" ? HandPointingRight01DuotoneRounded
        : name === "quote-down" && !variant ? QuoteDownIcon 
            : name === "quote-down" && variant === "solid" ? QuoteDownSolidRounded 
            : name === "quote-down" && variant === "bulk" ? QuoteDownBulkRounded 
            : name === "quote-down" && variant === "twotone" ? QuoteDownTwotoneRounded                
            : name === "quote-down" && variant === "duotone" ? QuoteDownDuotoneRounded 
        : name === "login-01" && !variant ? Login01Icon
            : name === "login-01" && variant === "solid" ? Login01SolidRounded
            : name === "login-01" && variant === "bulk" ? Login01BulkRounded
            : name === "login-01" && variant === "twotone" ? Login01TwotoneRounded
            : name === "login-01" && variant === "duotone" ? Login01DuotoneRounded
        : name === "twitter" && !variant ? TwitterIcon
            : name === "twitter" && variant === "solid" ? TwitterSolidRounded
            : name === "twitter" && variant === "bulk" ? TwitterBulkRounded
            : name === "twitter" && variant === "twotone" ? TwitterTwotoneRounded
            : name === "twitter" && variant === "duotone" ? TwitterDuotoneRounded
        : name === "files-01" && !variant ? Files01Icon
            : name === "files-01" && variant === "solid" ? Files01SolidRounded
            : name === "files-01" && variant === "bulk" ? Files01BulkRounded
            : name === "files-01" && variant === "twotone" ? Files01TwotoneRounded
            : name === "files-01" && variant === "duotone" ? Files01DuotoneRounded
        : name === "tick-01" && !variant ? Tick01Icon
            : name === "tick-01" && variant === "solid" ? Tick01SolidRounded
            : name === "tick-01" && variant === "bulk" ? Tick01BulkRounded
            : name === "tick-01" && variant === "twotone" ? Tick01TwotoneRounded
            : name === "tick-01" && variant === "duotone" ? Tick01DuotoneRounded
        : name === "ticket-01" && !variant ? Ticket01Icon
            : name === "ticket-01" && variant === "solid" ? Ticket01SolidRounded
            : name === "ticket-01" && variant === "bulk" ? Ticket01BulkRounded
            : name === "ticket-01" && variant === "twotone" ? Ticket01TwotoneRounded
            : name === "ticket-01" && variant === "duotone" ? Ticket01DuotoneRounded
        : name === "remove-01" && !variant ? Remove01Icon
            : name === "remove-01" && variant === "solid" ? Remove01SolidRounded
            : name === "remove-01" && variant === "bulk" ? Remove01BulkRounded
            : name === "remove-01" && variant === "twotone" ? Remove01TwotoneRounded
            : name === "remove-01" && variant === "duotone" ? Remove01DuotoneRounded
        : name === "book-02" && !variant ? Book02Icon
            : name === "book-02" && variant === "solid" ? Book02SolidRounded
            : name === "book-02" && variant === "bulk" ? Book02BulkRounded
            : name === "book-02" && variant === "twotone" ? Book02TwotoneRounded
            : name === "book-02" && variant === "duotone" ? Book02DuotoneRounded
        : name === "contact" && !variant ? ContactIcon
            : name === "contact" && variant === "solid" ? ContactSolidRounded
            : name === "contact" && variant === "bulk" ? ContactBulkRounded
            : name === "contact" && variant === "twotone" ? ContactTwotoneRounded
            : name === "contact" && variant === "duotone" ? ContactDuotoneRounded
        : name === "time-02" && !variant ? Time02Icon
            : name === "time-02" && variant === "solid" ? Time02SolidRounded
            : name === "time-02" && variant === "bulk" ? Time02BulkRounded
            : name === "time-02" && variant === "twotone" ? Time02TwotoneRounded
            : name === "time-02" && variant === "duotone" ? Time02DuotoneRounded
        : name === "license" && !variant ? LicenseIcon
            : name === "license" && variant === "solid" ? LicenseSolidRounded
            : name === "license" && variant === "bulk" ? LicenseBulkRounded
            : name === "license" && variant === "twotone" ? LicenseTwotoneRounded
            : name === "license" && variant === "duotone" ? LicenseDuotoneRounded
        : name === "task-add-01" && !variant ? TaskAdd01Icon
            : name === "task-add-01" && variant === "solid" ? TaskAdd01SolidRounded
            : name === "task-add-01" && variant === "bulk" ? TaskAdd01BulkRounded
            : name === "task-add-01" && variant === "twotone" ? TaskAdd01TwotoneRounded
            : name === "task-add-01" && variant === "duotone" ? TaskAdd01DuotoneRounded
        : name === "task-done-01" && !variant ? TaskDone01Icon
            : name === "task-done-01" && variant === "solid" ? TaskDone01SolidRounded
            : name === "task-done-01" && variant === "bulk" ? TaskDone01BulkRounded
            : name === "task-done-01" && variant === "twotone" ? TaskDone01TwotoneRounded
            : name === "task-done-01" && variant === "duotone" ? TaskDone01DuotoneRounded
        : name === "task-edit-01" && !variant ? TaskEdit01Icon
            : name === "task-edit-01" && variant === "solid" ? TaskEdit01SolidRounded
            : name === "task-edit-01" && variant === "bulk" ? TaskEdit01BulkRounded
            : name === "task-edit-01" && variant === "twotone" ? TaskEdit01TwotoneRounded
            : name === "task-edit-01" && variant === "duotone" ? TaskEdit01DuotoneRounded            
        : name === "arrow-down-02" && !variant ? ArrowDown02Icon
            : name === "arrow-down-02" && variant === "solid" ? ArrowDown02SolidRounded
            : name === "arrow-down-02" && variant === "bulk" ? ArrowDown02BulkRounded
            : name === "arrow-down-02" && variant === "twotone" ? ArrowDown02TwotoneRounded
            : name === "arrow-down-02" && variant === "duotone" ? ArrowDown02DuotoneRounded
        : name === "checkmark-badge-01" && !variant ? CheckmarkBadge01Icon
            : name === "checkmark-badge-01" && variant === "solid" ? CheckmarkBadge01SolidRounded
            : name === "checkmark-badge-01" && variant === "bulk" ? CheckmarkBadge01BulkRounded
            : name === "checkmark-badge-01" && variant === "twotone" ? CheckmarkBadge01TwotoneRounded
            : name === "checkmark-badge-01" && variant === "duotone" ? CheckmarkBadge01DuotoneRounded
        : name === "menu-01" && !variant ? Menu01Icon
            : name === "menu-01" && variant === "solid" ? Menu01SolidRounded
            : name === "menu-01" && variant === "bulk" ? Menu01BulkRounded
            : name === "menu-01" && variant === "twotone" ? Menu01TwotoneRounded
            : name === "menu-01" && variant === "duotone" ? Menu01DuotoneRounded
        : name === "remove-02" && !variant ? Remove02Icon
            : name === "remove-02" && variant === "solid" ? Remove02SolidRounded
            : name === "remove-02" && variant === "bulk" ? Remove02BulkRounded
            : name === "remove-02" && variant === "twotone" ? Remove02TwotoneRounded
            : name === "remove-02" && variant === "duotone" ? Remove02DuotoneRounded
        : name === "unavailable" && !variant ? UnavailableIcon
            : name === "unavailable" && variant === "solid" ? UnavailableSolidRounded
            : name === "unavailable" && variant === "bulk" ? UnavailableBulkRounded
            : name === "unavailable" && variant === "twotone" ? UnavailableTwotoneRounded
            : name === "unavailable" && variant === "duotone" ? UnavailableDuotoneRounded
        : name === "task-01" && !variant ? Task01Icon
            : name === "task-01" && variant === "solid" ? Task01SolidRounded
            : name === "task-01" && variant === "bulk" ? Task01BulkRounded
            : name === "task-01" && variant === "twotone" ? Task01TwotoneRounded
            : name === "task-01" && variant === "duotone" ? Task01DuotoneRounded
        : name === "user" && !variant ? UserIcon
            : name === "user" && variant === "solid" ? UserSolidRounded
            : name === "user" && variant === "bulk" ? UserBulkRounded
            : name === "user" && variant === "twotone" ? UserTwotoneRounded
            : name === "user" && variant === "duotone" ? UserDuotoneRounded
        : name === "user-shield-01" && !variant ? UserShield01Icon
            : name === "user-shield-01" && variant === "solid" ? UserShield01SolidRounded
            : name === "user-shield-01" && variant === "bulk" ? UserShield01BulkRounded
            : name === "user-shield-01" && variant === "twotone" ? UserShield01TwotoneRounded
            : name === "user-shield-01" && variant === "duotone" ? UserShield01DuotoneRounded
        : name === "album-01" && !variant ? Album01Icon
            : name === "album-01" && variant === "solid" ? Album01SolidRounded
            : name === "album-01" && variant === "bulk" ? Album01BulkRounded
            : name === "album-01" && variant === "twotone" ? Album01TwotoneRounded
            : name === "album-01" && variant === "duotone" ? Album01DuotoneRounded
        : name === "desk" && !variant ? DeskIcon
            : name === "desk" && variant === "solid" ? DeskSolidRounded
            : name === "desk" && variant === "bulk" ? DeskBulkRounded
            : name === "desk" && variant === "twotone" ? DeskTwotoneRounded
            : name === "desk" && variant === "duotone" ? DeskDuotoneRounded
        : name === "globe-02" && !variant ? Globe02Icon
            : name === "globe-02" && variant === "solid" ? Globe02SolidRounded
            : name === "globe-02" && variant === "bulk" ? Globe02BulkRounded
            : name === "globe-02" && variant === "twotone" ? Globe02TwotoneRounded
            : name === "globe-02" && variant === "duotone" ? Globe02DuotoneRounded
        : name === "pin-location-03" && !variant ? PinLocation03Icon
            : name === "pin-location-03" && variant === "solid" ? PinLocation03SolidRounded
            : name === "pin-location-03" && variant === "bulk" ? PinLocation03BulkRounded
            : name === "pin-location-03" && variant === "twotone" ? PinLocation03TwotoneRounded
            : name === "pin-location-03" && variant === "duotone" ? PinLocation03DuotoneRounded
        : name === "tags" && !variant ? TagsIcon
            : name === "tags" && variant === "solid" ? TagsSolidRounded
            : name === "tags" && variant === "bulk" ? TagsBulkRounded
            : name === "tags" && variant === "twotone" ? TagsTwotoneRounded
            : name === "tags" && variant === "duotone" ? TagsDuotoneRounded
        : name === "database-02" && !variant ? Database02Icon
            : name === "database-02" && variant === "solid" ? Database02SolidRounded
            : name === "database-02" && variant === "bulk" ? Database02BulkRounded
            : name === "database-02" && variant === "twotone" ? Database02TwotoneRounded
            : name === "database-02" && variant === "duotone" ? Database02DuotoneRounded
        : name === "library" && !variant ? LibraryIcon
            : name === "library" && variant === "solid" ? LibrarySolidRounded
            : name === "library" && variant === "bulk" ? LibraryBulkRounded
            : name === "library" && variant === "twotone" ? LibraryTwotoneRounded
            : name === "library" && variant === "duotone" ? LibraryDuotoneRounded
        : name === "user-multiple-02" && !variant ? UserMultiple02Icon
            : name === "user-multiple-02" && variant === "solid" ? UserMultiple02SolidRounded
            : name === "user-multiple-02" && variant === "bulk" ? UserMultiple02BulkRounded
            : name === "user-multiple-02" && variant === "twotone" ? UserMultiple02TwotoneRounded
            : name === "user-multiple-02" && variant === "duotone" ? UserMultiple02DuotoneRounded
        : name === "arrow-expand-01" && !variant ? ArrowExpand01Icon
            : name === "arrow-expand-01" && variant === "solid" ? ArrowExpand01SolidRounded
            : name === "arrow-expand-01" && variant === "bulk" ? ArrowExpand01BulkRounded
            : name === "arrow-expand-01" && variant === "twotone" ? ArrowExpand01TwotoneRounded
            : name === "arrow-expand-01" && variant === "duotone" ? ArrowExpand01DuotoneRounded
        : name === "arrow-expand" && !variant ? ArrowExpandIcon
            : name === "arrow-expand" && variant === "solid" ? ArrowExpandSolidRounded
            : name === "arrow-expand" && variant === "bulk" ? ArrowExpandBulkRounded
            : name === "arrow-expand" && variant === "twotone" ? ArrowExpandTwotoneRounded
            : name === "arrow-expand" && variant === "duotone" ? ArrowExpandDuotoneRounded
        : name === "arrow-horizontal" && !variant ? ArrowHorizontalIcon
            : name === "arrow-horizontal" && variant === "solid" ? ArrowHorizontalSolidRounded
            : name === "arrow-horizontal" && variant === "bulk" ? ArrowHorizontalBulkRounded
            : name === "arrow-horizontal" && variant === "twotone" ? ArrowHorizontalTwotoneRounded
            : name === "arrow-horizontal" && variant === "duotone" ? ArrowHorizontalDuotoneRounded
        : name === "arrow-left-01" && !variant ? ArrowLeft01Icon
            : name === "arrow-left-01" && variant === "solid" ? ArrowLeft01SolidRounded
            : name === "arrow-left-01" && variant === "bulk" ? ArrowLeft01BulkRounded
            : name === "arrow-left-01" && variant === "twotone" ? ArrowLeft01TwotoneRounded
            : name === "arrow-left-01" && variant === "duotone" ? ArrowLeft01DuotoneRounded
        : name === "arrow-shrink-01" && !variant ? ArrowShrink01Icon
            : name === "arrow-shrink-01" && variant === "solid" ? ArrowShrink01SolidRounded
            : name === "arrow-shrink-01" && variant === "bulk" ? ArrowShrink01BulkRounded
            : name === "arrow-shrink-01" && variant === "twotone" ? ArrowShrink01TwotoneRounded
            : name === "arrow-shrink-01" && variant === "duotone" ? ArrowShrink01DuotoneRounded
        : name === "arrow-shrink" && !variant ? ArrowShrinkIcon
            : name === "arrow-shrink" && variant === "solid" ? ArrowShrinkSolidRounded
            : name === "arrow-shrink" && variant === "bulk" ? ArrowShrinkBulkRounded
            : name === "arrow-shrink" && variant === "twotone" ? ArrowShrinkTwotoneRounded
            : name === "arrow-shrink" && variant === "duotone" ? ArrowShrinkDuotoneRounded
        : name === "arrow-up-right-02" && !variant ? ArrowUpRight02Icon
            : name === "arrow-up-right-02" && variant === "solid" ? ArrowUpRight02SolidRounded
            : name === "arrow-up-right-02" && variant === "bulk" ? ArrowUpRight02BulkRounded
            : name === "arrow-up-right-02" && variant === "twotone" ? ArrowUpRight02TwotoneRounded
            : name === "arrow-up-right-02" && variant === "duotone" ? ArrowUpRight02DuotoneRounded
        : name === "copy-01" && !variant ? Copy01Icon
            : name === "copy-01" && variant === "solid" ? Copy01SolidRounded
            : name === "copy-01" && variant === "bulk" ? Copy01BulkRounded
            : name === "copy-01" && variant === "twotone" ? Copy01TwotoneRounded
            : name === "copy-01" && variant === "duotone" ? Copy01DuotoneRounded
        : name === "database-01" && !variant ? Database01Icon
            : name === "database-01" && variant === "solid" ? Database01SolidRounded
            : name === "database-01" && variant === "bulk" ? Database01BulkRounded
            : name === "database-01" && variant === "twotone" ? Database01TwotoneRounded
            : name === "database-01" && variant === "duotone" ? Database01DuotoneRounded
        : name === "liver" && !variant ? LiverIcon
            : name === "liver" && variant === "solid" ? LiverSolidRounded
            : name === "liver" && variant === "bulk" ? LiverBulkRounded
            : name === "liver" && variant === "twotone" ? LiverTwotoneRounded
            : name === "liver" && variant === "duotone" ? LiverDuotoneRounded
        : name === "maximize-screen" && !variant ? MaximizeScreenIcon
            : name === "maximize-screen" && variant === "solid" ? MaximizeScreenSolidRounded
            : name === "maximize-screen" && variant === "bulk" ? MaximizeScreenBulkRounded
            : name === "maximize-screen" && variant === "twotone" ? MaximizeScreenTwotoneRounded
            : name === "maximize-screen" && variant === "duotone" ? MaximizeScreenDuotoneRounded
        : name === "minimize-screen" && !variant ? MinimizeScreenIcon
            : name === "minimize-screen" && variant === "solid" ? MinimizeScreenSolidRounded
            : name === "minimize-screen" && variant === "bulk" ? MinimizeScreenBulkRounded
            : name === "minimize-screen" && variant === "twotone" ? MinimizeScreenTwotoneRounded
            : name === "minimize-screen" && variant === "duotone" ? MinimizeScreenDuotoneRounded            
        : name === "share-05" && !variant ? Share05Icon
            : name === "share-05" && variant === "solid" ? Share05SolidRounded
            : name === "share-05" && variant === "bulk" ? Share05BulkRounded
            : name === "share-05" && variant === "twotone" ? Share05TwotoneRounded
            : name === "share-05" && variant === "duotone" ? Share05DuotoneRounded
        : name === "volume-mute-01" && !variant ? VolumeMute01Icon
            : name === "volume-mute-01" && variant === "solid" ? VolumeMute01SolidRounded
            : name === "volume-mute-01" && variant === "bulk" ? VolumeMute01BulkRounded
            : name === "volume-mute-01" && variant === "twotone" ? VolumeMute01TwotoneRounded
            : name === "volume-mute-01" && variant === "duotone" ? VolumeMute01DuotoneRounded
        : name === "volume-off" && !variant ? VolumeOffIcon
            : name === "volume-off" && variant === "solid" ? VolumeOffSolidRounded
            : name === "volume-off" && variant === "bulk" ? VolumeOffBulkRounded
            : name === "volume-off" && variant === "twotone" ? VolumeOffTwotoneRounded
            : name === "volume-off" && variant === "duotone" ? VolumeOffDuotoneRounded
        : name === "maps-search" && !variant ? MapsSearchIcon
            : name === "maps-search" && variant === "solid" ? MapsSearchSolidRounded
            : name === "maps-search" && variant === "bulk" ? MapsSearchBulkRounded
            : name === "maps-search" && variant === "twotone" ? MapsSearchTwotoneRounded
            : name === "maps-search" && variant === "duotone" ? MapsSearchDuotoneRounded
        : name === "camera-01" && !variant ? Camera01Icon
            : name === "camera-01" && variant === "solid" ? Camera01SolidRounded
            : name === "camera-01" && variant === "bulk" ? Camera01BulkRounded
            : name === "camera-01" && variant === "twotone" ? Camera01TwotoneRounded
            : name === "camera-01" && variant === "duotone" ? Camera01DuotoneRounded
        : name === "filter" && !variant ? FilterIcon
            : name === "filter" && variant === "solid" ? FilterSolidRounded
            : name === "filter" && variant === "bulk" ? FilterBulkRounded
            : name === "filter" && variant === "twotone" ? FilterTwotoneRounded
            : name === "filter" && variant === "duotone" ? FilterDuotoneRounded
        : name === "pin" && !variant ? PinIcon
            : name === "pin" && variant === "solid" ? PinSolidRounded
            : name === "pin" && variant === "bulk" ? PinBulkRounded
            : name === "pin" && variant === "twotone" ? PinTwotoneRounded
            : name === "pin" && variant === "duotone" ? PinDuotoneRounded
        : name === "sorting-19" && !variant ? Sorting19Icon
            : name === "sorting-19" && variant === "solid" ? Sorting19SolidRounded
            : name === "sorting-19" && variant === "bulk" ? Sorting19BulkRounded
            : name === "sorting-19" && variant === "twotone" ? Sorting19TwotoneRounded
            : name === "sorting-19" && variant === "duotone" ? Sorting19DuotoneRounded
        : name === "sorting-91" && !variant ? Sorting91Icon
            : name === "sorting-91" && variant === "solid" ? Sorting91SolidRounded
            : name === "sorting-91" && variant === "bulk" ? Sorting91BulkRounded
            : name === "sorting-91" && variant === "twotone" ? Sorting91TwotoneRounded
            : name === "sorting-91" && variant === "duotone" ? Sorting91DuotoneRounded
        : name === "music-note-01" && !variant ? MusicNote01Icon
            : name === "music-note-01" && variant === "solid" ? MusicNote01SolidRounded
            : name === "music-note-01" && variant === "bulk" ? MusicNote01BulkRounded
            : name === "music-note-01" && variant === "twotone" ? MusicNote01TwotoneRounded
            : name === "music-note-01" && variant === "duotone" ? MusicNote01DuotoneRounded
        : name === "delete-04" && !variant ? Delete04Icon
            : name === "delete-04" && variant === "solid" ? Delete04SolidRounded
            : name === "delete-04" && variant === "bulk" ? Delete04BulkRounded
            : name === "delete-04" && variant === "twotone" ? Delete04TwotoneRounded
            : name === "delete-04" && variant === "duotone" ? Delete04DuotoneRounded
        : name === "apple" && !variant ? AppleIcon
            : name === "apple" && variant === "solid" ? AppleSolidRounded
            : name === "apple" && variant === "bulk" ? AppleBulkRounded
            : name === "apple" && variant === "twotone" ? AppleTwotoneRounded
            : name === "apple" && variant === "duotone" ? AppleDuotoneRounded
        : name === "github-01" && !variant ? Github01Icon
            : name === "github-01" && variant === "solid" ? Github01SolidRounded
            : name === "github-01" && variant === "bulk" ? Github01BulkRounded
            : name === "github-01" && variant === "twotone" ? Github01TwotoneRounded
            : name === "github-01" && variant === "duotone" ? Github01DuotoneRounded
        : name === "message-download-01" && !variant ? MessageDownload01Icon
            : name === "message-download-01" && variant === "solid" ? MessageDownload01SolidRounded
            : name === "message-download-01" && variant === "bulk" ? MessageDownload01BulkRounded
            : name === "message-download-01" && variant === "twotone" ? MessageDownload01TwotoneRounded
            : name === "message-download-01" && variant === "duotone" ? MessageDownload01DuotoneRounded
        : name === "clipboard" && !variant ? ClipboardIcon
            : name === "clipboard" && variant === "solid" ? ClipboardSolidRounded
            : name === "clipboard" && variant === "bulk" ? ClipboardBulkRounded
            : name === "clipboard" && variant === "twotone" ? ClipboardTwotoneRounded
            : name === "clipboard" && variant === "duotone" ? ClipboardDuotoneRounded
        : name === "inbox" && !variant ? InboxIcon
            : name === "inbox" && variant === "solid" ? InboxSolidRounded
            : name === "inbox" && variant === "bulk" ? InboxBulkRounded
            : name === "inbox" && variant === "twotone" ? InboxTwotoneRounded
            : name === "inbox" && variant === "duotone" ? InboxDuotoneRounded
        : name === "document-validation" && !variant ? DocumentValidationIcon
            : name === "document-validation" && variant === "solid" ? DocumentValidationSolidRounded
            : name === "document-validation" && variant === "bulk" ? DocumentValidationBulkRounded
            : name === "document-validation" && variant === "twotone" ? DocumentValidationTwotoneRounded
            : name === "document-validation" && variant === "duotone" ? DocumentValidationDuotoneRounded
        : name === "loading-02" && !variant ? Loading02Icon
            : name === "loading-02" && variant === "solid" ? Loading02SolidRounded
            : name === "loading-02" && variant === "bulk" ? Loading02BulkRounded
            : name === "loading-02" && variant === "twotone" ? Loading02TwotoneRounded
            : name === "loading-02" && variant === "duotone" ? Loading02DuotoneRounded
        : name === "traffic-light" && !variant ? TrafficLightIcon
            : name === "traffic-light" && variant === "solid" ? TrafficLightSolidRounded
            : name === "traffic-light" && variant === "bulk" ? TrafficLightBulkRounded
            : name === "traffic-light" && variant === "twotone" ? TrafficLightTwotoneRounded
            : name === "traffic-light" && variant === "duotone" ? TrafficLightDuotoneRounded
        : name === "arrow-up-02" && !variant ? ArrowUp02Icon
            : name === "arrow-up-02" && variant === "solid" ? ArrowUp02SolidRounded
            : name === "arrow-up-02" && variant === "bulk" ? ArrowUp02BulkRounded
            : name === "arrow-up-02" && variant === "twotone" ? ArrowUp02TwotoneRounded
            : name === "arrow-up-02" && variant === "duotone" ? ArrowUp02DuotoneRounded
        : FileUnknownIcon
    return <HugeiconsIcon icon={getIcon} {...options} onClick={clickOption ? clickOption : undefined} />
}
