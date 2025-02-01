/*
    Hugeicons Icon Component v. 0.0.3
    By: [Donald Louch](https://donaldlouch.ca)

    Featuring: [Hugeicons: @hugeicons/react@1.0.8](https://hugeicons.com/icons)

    Here is an easy to use component that allows you to use the Hugeicons icon library in your React application. Currently I'm only importing the icons that I use for my personal website. More maybe added at a later time.

    To use this component, simply import it and pass in the name of the icon you want to use as a prop (type-safe). The name of the icon should be the same as the name of the icon in the [Hugeicons Library](https://hugeicons.com/icons).

    For example, if you want to use the "file-unknown"/"<FileUnknownIcon />" icons, you would pass in the name prop as "file-unknown". The component will then render the icon with the appropriate size and color.

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
import { Mouse01StrokeRounded, FileAttachmentStrokeRounded, Logout01StrokeRounded, MoreHorizontalStrokeRounded, ArrowDownRight01StrokeRounded, CheckListStrokeRounded, MailEdit01StrokeRounded, LeftToRightBlockQuoteStrokeRounded, Add01StrokeRounded, Album01StrokeRounded, Album02StrokeRounded, Alert01StrokeRounded, Alert02StrokeRounded, AlertCircleStrokeRounded, AlertDiamondStrokeRounded, AppleStrokeRounded, Archive02StrokeRounded, ArrowAllDirectionStrokeRounded, ArrowDown01StrokeRounded, ArrowDown02StrokeRounded, ArrowExpand01StrokeRounded, ArrowExpandStrokeRounded, ArrowHorizontalStrokeRounded, ArrowLeft01StrokeRounded, ArrowLeft02StrokeRounded, ArrowLeft03StrokeRounded, ArrowRight01StrokeRounded, ArrowRight02StrokeRounded, ArrowRight03StrokeRounded, ArrowShrink01StrokeRounded, ArrowShrinkStrokeRounded, ArrowUp02StrokeRounded, ArrowUpRight01StrokeRounded, ArrowUpRight02StrokeRounded, BlueskyStrokeRounded, Book02StrokeRounded, Bookmark01StrokeRounded, Briefcase02StrokeRounded, Calendar03StrokeRounded, Camera01StrokeRounded, CameraVideoStrokeRounded, Cancel01StrokeRounded, CancelCircleStrokeRounded, Chatting01StrokeRounded, CheckmarkBadge01StrokeRounded, CheckmarkBadge03StrokeRounded, CheckmarkCircle02StrokeRounded, ClipboardStrokeRounded, CloudSavingDone01StrokeRounded, CloudUploadStrokeRounded, Cone01StrokeRounded, ContactStrokeRounded, Copy01StrokeRounded, DashboardBrowsingStrokeRounded, DashboardSpeed02StrokeRounded, DashboardSquare02StrokeRounded, Database01StrokeRounded, Database02StrokeRounded, Delete01StrokeRounded, Delete02StrokeRounded, Delete03StrokeRounded, Delete04StrokeRounded, DeskStrokeRounded, DocumentValidationStrokeRounded, DragDropStrokeRounded, Edit02StrokeRounded, Facebook02StrokeRounded, FavouriteStrokeRounded, FileEditStrokeRounded, Files01StrokeRounded, Files02StrokeRounded, FileUnknownStrokeRounded, FileUploadStrokeRounded, FilterStrokeRounded, Flag02StrokeRounded, Folder01StrokeRounded, GameController01StrokeRounded, Github01StrokeRounded, GithubStrokeRounded, Globe02StrokeRounded, GoBackward10SecStrokeRounded, GoForward10SecStrokeRounded, GridStrokeRounded, HandPointingRight01StrokeRounded, Home01StrokeRounded, jarIconStrokeRounded, Image02StrokeRounded, ImageUpload01StrokeRounded, ImageUploadStrokeRounded, InboxStrokeRounded, InformationCircleStrokeRounded, InstagramStrokeRounded, JobSearchStrokeRounded, LaptopCheckStrokeRounded, LaurelWreath02StrokeRounded, LibraryStrokeRounded, LicenseStrokeRounded, Link01StrokeRounded, Link04StrokeRounded, Linkedin02StrokeRounded, LinkSquare02StrokeRounded, LiverStrokeRounded, Loading02StrokeRounded, Loading03StrokeRounded, Location01StrokeRounded, Login01StrokeRounded, Mail01StrokeRounded, MailAtSign01StrokeRounded, MapsSearchStrokeRounded, MaximizeScreenStrokeRounded, Menu01StrokeRounded, MessageDownload01StrokeRounded, MinimizeScreenStrokeRounded, MusicNote01StrokeRounded, MusicNoteSquare02StrokeRounded, NewsStrokeRounded, NewTwitterStrokeRounded, Notification03StrokeRounded, Passport01StrokeRounded, PassportStrokeRounded, PauseStrokeRounded, PencilEdit01StrokeRounded, PencilEdit02StrokeRounded, PencilStrokeRounded, PinStrokeRounded, PinLocation03StrokeRounded, PlayStrokeRounded, PlusSignStrokeRounded, PropertyEditStrokeRounded, QuoteDownStrokeRounded, RefreshStrokeRounded, Remove01StrokeRounded, Remove02StrokeRounded, SaveMoneyDollarStrokeRounded, Search01StrokeRounded, SecurityCheckStrokeRounded, SentStrokeRounded, SeoStrokeRounded, Settings02StrokeRounded, Share05StrokeRounded, Shirt01StrokeRounded, SmartPhone01StrokeRounded, Sorting19StrokeRounded, Sorting91StrokeRounded, SoundcloudStrokeRounded, SpotifyStrokeRounded, StarStrokeRounded, Tag01StrokeRounded, TagsStrokeRounded, Task01StrokeRounded, TaskAdd01StrokeRounded, TaskDone01StrokeRounded, TaskEdit01StrokeRounded, TextFontStrokeRounded, ThreadsStrokeRounded, Tick01StrokeRounded, Ticket01StrokeRounded, TiktokStrokeRounded, Time02StrokeRounded, TrafficLightStrokeRounded, TwitterStrokeRounded, UnavailableStrokeRounded, UserStrokeRounded, UserMultiple02StrokeRounded, UserShield01StrokeRounded, Video01StrokeRounded, Video02StrokeRounded, ViewStrokeRounded, VimeoStrokeRounded, VolumeMute01StrokeRounded, VolumeOffStrokeRounded, WavingHand01StrokeRounded, WifiConnected02StrokeRounded, YoutubeStrokeRounded, ZapStrokeRounded } from"@hugeicons-pro/core-stroke-rounded"

// Solid Variant
import { Mouse01SolidRounded, FileAttachmentSolidRounded, Logout01SolidRounded, MoreHorizontalSolidRounded, ArrowDownRight01SolidRounded, CheckListSolidRounded, MailEdit01SolidRounded, LeftToRightBlockQuoteSolidRounded, jarIconSolidRounded, Add01SolidRounded, Album01SolidRounded, Album02SolidRounded, Alert01SolidRounded, Alert02SolidRounded, AlertCircleSolidRounded, AlertDiamondSolidRounded, AppleSolidRounded, Archive02SolidRounded, ArrowAllDirectionSolidRounded, ArrowDown01SolidRounded, ArrowDown02SolidRounded, ArrowExpand01SolidRounded, ArrowExpandSolidRounded, ArrowHorizontalSolidRounded, ArrowLeft01SolidRounded, ArrowLeft02SolidRounded, ArrowLeft03SolidRounded, ArrowRight01SolidRounded, ArrowRight02SolidRounded, ArrowRight03SolidRounded, ArrowShrink01SolidRounded, ArrowShrinkSolidRounded, ArrowUp02SolidRounded, ArrowUpRight01SolidRounded, ArrowUpRight02SolidRounded, BlueskySolidRounded, Book02SolidRounded, Bookmark01SolidRounded, Briefcase02SolidRounded, Calendar03SolidRounded, Camera01SolidRounded, CameraVideoSolidRounded, Cancel01SolidRounded, CancelCircleSolidRounded, Chatting01SolidRounded, CheckmarkBadge01SolidRounded, CheckmarkBadge03SolidRounded, CheckmarkCircle02SolidRounded, ClipboardSolidRounded, CloudSavingDone01SolidRounded, CloudUploadSolidRounded, Cone01SolidRounded, ContactSolidRounded, Copy01SolidRounded, DashboardBrowsingSolidRounded, DashboardSpeed02SolidRounded, DashboardSquare02SolidRounded, Database01SolidRounded, Database02SolidRounded, Delete01SolidRounded, Delete02SolidRounded, Delete03SolidRounded, Delete04SolidRounded, DeskSolidRounded, DocumentValidationSolidRounded, DragDropSolidRounded, Edit02SolidRounded, Facebook02SolidRounded, FavouriteSolidRounded, FileEditSolidRounded, Files01SolidRounded, Files02SolidRounded, FileUnknownSolidRounded, FileUploadSolidRounded, FilterSolidRounded, Flag02SolidRounded, Folder01SolidRounded, GameController01SolidRounded, Github01SolidRounded, GithubSolidRounded, Globe02SolidRounded, GoBackward10SecSolidRounded, GoForward10SecSolidRounded, GridSolidRounded, HandPointingRight01SolidRounded, Home01SolidRounded, Image02SolidRounded, ImageUpload01SolidRounded, ImageUploadSolidRounded, InboxSolidRounded, InformationCircleSolidRounded, InstagramSolidRounded, JobSearchSolidRounded, LaptopCheckSolidRounded, LaurelWreath02SolidRounded, LibrarySolidRounded, LicenseSolidRounded, Link01SolidRounded, Link04SolidRounded, Linkedin02SolidRounded, LinkSquare02SolidRounded, LiverSolidRounded, Loading02SolidRounded, Loading03SolidRounded, Location01SolidRounded, Login01SolidRounded, Mail01SolidRounded, MailAtSign01SolidRounded, MapsSearchSolidRounded, MaximizeScreenSolidRounded, Menu01SolidRounded, MessageDownload01SolidRounded, MinimizeScreenSolidRounded, MusicNote01SolidRounded, MusicNoteSquare02SolidRounded, NewsSolidRounded, NewTwitterSolidRounded, Notification03SolidRounded, Passport01SolidRounded, PassportSolidRounded, PauseSolidRounded, PencilEdit01SolidRounded, PencilEdit02SolidRounded, PencilSolidRounded, PinSolidRounded, PinLocation03SolidRounded, PlaySolidRounded, PlusSignSolidRounded, PropertyEditSolidRounded, QuoteDownSolidRounded, RefreshSolidRounded, Remove01SolidRounded, Remove02SolidRounded, SaveMoneyDollarSolidRounded, Search01SolidRounded, SecurityCheckSolidRounded, SentSolidRounded, SeoSolidRounded, Settings02SolidRounded, Share05SolidRounded, Shirt01SolidRounded, SmartPhone01SolidRounded, Sorting19SolidRounded, Sorting91SolidRounded, SoundcloudSolidRounded, SpotifySolidRounded, StarSolidRounded, Tag01SolidRounded, TagsSolidRounded, Task01SolidRounded, TaskAdd01SolidRounded, TaskDone01SolidRounded, TaskEdit01SolidRounded, TextFontSolidRounded, ThreadsSolidRounded, Tick01SolidRounded, Ticket01SolidRounded, TiktokSolidRounded, Time02SolidRounded, TrafficLightSolidRounded, TwitterSolidRounded, UnavailableSolidRounded, UserSolidRounded, UserMultiple02SolidRounded, UserShield01SolidRounded, Video01SolidRounded, Video02SolidRounded, ViewSolidRounded, VimeoSolidRounded, VolumeMute01SolidRounded, VolumeOffSolidRounded, WavingHand01SolidRounded, WifiConnected02SolidRounded, YoutubeSolidRounded, ZapSolidRounded } from"@hugeicons-pro/core-solid-rounded"

// Bulk Variant
import { Mouse01BulkRounded, FileAttachmentBulkRounded, Logout01BulkRounded, MoreHorizontalBulkRounded, ArrowDownRight01BulkRounded, CheckListBulkRounded, MailEdit01BulkRounded, LeftToRightBlockQuoteBulkRounded, jarIconBulkRounded, Add01BulkRounded, Album01BulkRounded, Album02BulkRounded, Alert01BulkRounded, Alert02BulkRounded, AlertCircleBulkRounded, AlertDiamondBulkRounded, AppleBulkRounded, Archive02BulkRounded, ArrowAllDirectionBulkRounded, ArrowDown01BulkRounded, ArrowDown02BulkRounded, ArrowExpand01BulkRounded, ArrowExpandBulkRounded, ArrowHorizontalBulkRounded, ArrowLeft01BulkRounded, ArrowLeft02BulkRounded, ArrowLeft03BulkRounded, ArrowRight01BulkRounded, ArrowRight02BulkRounded, ArrowRight03BulkRounded, ArrowShrink01BulkRounded, ArrowShrinkBulkRounded, ArrowUp02BulkRounded, ArrowUpRight01BulkRounded, ArrowUpRight02BulkRounded, BlueskyBulkRounded, Book02BulkRounded, Bookmark01BulkRounded, Briefcase02BulkRounded, Calendar03BulkRounded, Camera01BulkRounded, CameraVideoBulkRounded, Cancel01BulkRounded, CancelCircleBulkRounded, Chatting01BulkRounded, CheckmarkBadge01BulkRounded, CheckmarkBadge03BulkRounded, CheckmarkCircle02BulkRounded, ClipboardBulkRounded, CloudSavingDone01BulkRounded, CloudUploadBulkRounded, Cone01BulkRounded, ContactBulkRounded, Copy01BulkRounded, DashboardBrowsingBulkRounded, DashboardSpeed02BulkRounded, DashboardSquare02BulkRounded, Database01BulkRounded, Database02BulkRounded, Delete01BulkRounded, Delete02BulkRounded, Delete03BulkRounded, Delete04BulkRounded, DeskBulkRounded, DocumentValidationBulkRounded, DragDropBulkRounded, Edit02BulkRounded, Facebook02BulkRounded, FavouriteBulkRounded, FileEditBulkRounded, Files01BulkRounded, Files02BulkRounded, FileUnknownBulkRounded, FileUploadBulkRounded, FilterBulkRounded, Flag02BulkRounded, Folder01BulkRounded, GameController01BulkRounded, Github01BulkRounded, GithubBulkRounded, Globe02BulkRounded, GoBackward10SecBulkRounded, GoForward10SecBulkRounded, GridBulkRounded, HandPointingRight01BulkRounded, Home01BulkRounded, Image02BulkRounded, ImageUpload01BulkRounded, ImageUploadBulkRounded, InboxBulkRounded, InformationCircleBulkRounded, InstagramBulkRounded, JobSearchBulkRounded, LaptopCheckBulkRounded, LaurelWreath02BulkRounded, LibraryBulkRounded, LicenseBulkRounded, Link01BulkRounded, Link04BulkRounded, Linkedin02BulkRounded, LinkSquare02BulkRounded, LiverBulkRounded, Loading02BulkRounded, Loading03BulkRounded, Location01BulkRounded, Login01BulkRounded, Mail01BulkRounded, MailAtSign01BulkRounded, MapsSearchBulkRounded, MaximizeScreenBulkRounded, Menu01BulkRounded, MessageDownload01BulkRounded, MinimizeScreenBulkRounded, MusicNote01BulkRounded, MusicNoteSquare02BulkRounded, NewsBulkRounded, NewTwitterBulkRounded, Notification03BulkRounded, Passport01BulkRounded, PassportBulkRounded, PauseBulkRounded, PencilEdit01BulkRounded, PencilEdit02BulkRounded, PencilBulkRounded, PinBulkRounded, PinLocation03BulkRounded, PlayBulkRounded, PlusSignBulkRounded, PropertyEditBulkRounded, QuoteDownBulkRounded, RefreshBulkRounded, Remove01BulkRounded, Remove02BulkRounded, SaveMoneyDollarBulkRounded, Search01BulkRounded, SecurityCheckBulkRounded, SentBulkRounded, SeoBulkRounded, Settings02BulkRounded, Share05BulkRounded, Shirt01BulkRounded, SmartPhone01BulkRounded, Sorting19BulkRounded, Sorting91BulkRounded, SoundcloudBulkRounded, SpotifyBulkRounded, StarBulkRounded, Tag01BulkRounded, TagsBulkRounded, Task01BulkRounded, TaskAdd01BulkRounded, TaskDone01BulkRounded, TaskEdit01BulkRounded, TextFontBulkRounded, ThreadsBulkRounded, Tick01BulkRounded, Ticket01BulkRounded, TiktokBulkRounded, Time02BulkRounded, TrafficLightBulkRounded, TwitterBulkRounded, UnavailableBulkRounded, UserBulkRounded, UserMultiple02BulkRounded, UserShield01BulkRounded, Video01BulkRounded, Video02BulkRounded, ViewBulkRounded, VimeoBulkRounded, VolumeMute01BulkRounded, VolumeOffBulkRounded, WavingHand01BulkRounded, WifiConnected02BulkRounded, YoutubeBulkRounded, ZapBulkRounded } from"@hugeicons-pro/core-bulk-rounded"

// Twotone Variant
import { Mouse01TwotoneRounded, FileAttachmentTwotoneRounded, Logout01TwotoneRounded, MoreHorizontalTwotoneRounded, ArrowDownRight01TwotoneRounded, CheckListTwotoneRounded, MailEdit01TwotoneRounded, LeftToRightBlockQuoteTwotoneRounded, jarIconTwotoneRounded, Add01TwotoneRounded, Album01TwotoneRounded, Album02TwotoneRounded, Alert01TwotoneRounded, Alert02TwotoneRounded, AlertCircleTwotoneRounded, AlertDiamondTwotoneRounded, AppleTwotoneRounded, Archive02TwotoneRounded, ArrowAllDirectionTwotoneRounded, ArrowDown01TwotoneRounded, ArrowDown02TwotoneRounded, ArrowExpand01TwotoneRounded, ArrowExpandTwotoneRounded, ArrowHorizontalTwotoneRounded, ArrowLeft01TwotoneRounded, ArrowLeft02TwotoneRounded, ArrowLeft03TwotoneRounded, ArrowRight01TwotoneRounded, ArrowRight02TwotoneRounded, ArrowRight03TwotoneRounded, ArrowShrink01TwotoneRounded, ArrowShrinkTwotoneRounded, ArrowUp02TwotoneRounded, ArrowUpRight01TwotoneRounded, ArrowUpRight02TwotoneRounded, BlueskyTwotoneRounded, Book02TwotoneRounded, Bookmark01TwotoneRounded, Briefcase02TwotoneRounded, Calendar03TwotoneRounded, Camera01TwotoneRounded, CameraVideoTwotoneRounded, Cancel01TwotoneRounded, CancelCircleTwotoneRounded, Chatting01TwotoneRounded, CheckmarkBadge01TwotoneRounded, CheckmarkBadge03TwotoneRounded, CheckmarkCircle02TwotoneRounded, ClipboardTwotoneRounded, CloudSavingDone01TwotoneRounded, CloudUploadTwotoneRounded, Cone01TwotoneRounded, ContactTwotoneRounded, Copy01TwotoneRounded, DashboardBrowsingTwotoneRounded, DashboardSpeed02TwotoneRounded, DashboardSquare02TwotoneRounded, Database01TwotoneRounded, Database02TwotoneRounded, Delete01TwotoneRounded, Delete02TwotoneRounded, Delete03TwotoneRounded, Delete04TwotoneRounded, DeskTwotoneRounded, DocumentValidationTwotoneRounded, DragDropTwotoneRounded, Edit02TwotoneRounded, Facebook02TwotoneRounded, FavouriteTwotoneRounded, FileEditTwotoneRounded, Files01TwotoneRounded, Files02TwotoneRounded, FileUnknownTwotoneRounded, FileUploadTwotoneRounded, FilterTwotoneRounded, Flag02TwotoneRounded, Folder01TwotoneRounded, GameController01TwotoneRounded, Github01TwotoneRounded, GithubTwotoneRounded, Globe02TwotoneRounded, GoBackward10SecTwotoneRounded, GoForward10SecTwotoneRounded, GridTwotoneRounded, HandPointingRight01TwotoneRounded, Home01TwotoneRounded, Image02TwotoneRounded, ImageUpload01TwotoneRounded, ImageUploadTwotoneRounded, InboxTwotoneRounded, InformationCircleTwotoneRounded, InstagramTwotoneRounded, JobSearchTwotoneRounded, LaptopCheckTwotoneRounded, LaurelWreath02TwotoneRounded, LibraryTwotoneRounded, LicenseTwotoneRounded, Link01TwotoneRounded, Link04TwotoneRounded, Linkedin02TwotoneRounded, LinkSquare02TwotoneRounded, LiverTwotoneRounded, Loading02TwotoneRounded, Loading03TwotoneRounded, Location01TwotoneRounded, Login01TwotoneRounded, Mail01TwotoneRounded, MailAtSign01TwotoneRounded, MapsSearchTwotoneRounded, MaximizeScreenTwotoneRounded, Menu01TwotoneRounded, MessageDownload01TwotoneRounded, MinimizeScreenTwotoneRounded, MusicNote01TwotoneRounded, MusicNoteSquare02TwotoneRounded, NewsTwotoneRounded, NewTwitterTwotoneRounded, Notification03TwotoneRounded, Passport01TwotoneRounded, PassportTwotoneRounded, PauseTwotoneRounded, PencilEdit01TwotoneRounded, PencilEdit02TwotoneRounded, PencilTwotoneRounded, PinTwotoneRounded, PinLocation03TwotoneRounded, PlayTwotoneRounded, PlusSignTwotoneRounded, PropertyEditTwotoneRounded, QuoteDownTwotoneRounded, RefreshTwotoneRounded, Remove01TwotoneRounded, Remove02TwotoneRounded, SaveMoneyDollarTwotoneRounded, Search01TwotoneRounded, SecurityCheckTwotoneRounded, SentTwotoneRounded, SeoTwotoneRounded, Settings02TwotoneRounded, Share05TwotoneRounded, Shirt01TwotoneRounded, SmartPhone01TwotoneRounded, Sorting19TwotoneRounded, Sorting91TwotoneRounded, SoundcloudTwotoneRounded, SpotifyTwotoneRounded, StarTwotoneRounded, Tag01TwotoneRounded, TagsTwotoneRounded, Task01TwotoneRounded, TaskAdd01TwotoneRounded, TaskDone01TwotoneRounded, TaskEdit01TwotoneRounded, TextFontTwotoneRounded, ThreadsTwotoneRounded, Tick01TwotoneRounded, Ticket01TwotoneRounded, TiktokTwotoneRounded, Time02TwotoneRounded, TrafficLightTwotoneRounded, TwitterTwotoneRounded, UnavailableTwotoneRounded, UserTwotoneRounded, UserMultiple02TwotoneRounded, UserShield01TwotoneRounded, Video01TwotoneRounded, Video02TwotoneRounded, ViewTwotoneRounded, VimeoTwotoneRounded, VolumeMute01TwotoneRounded, VolumeOffTwotoneRounded, WavingHand01TwotoneRounded, WifiConnected02TwotoneRounded, YoutubeTwotoneRounded, ZapTwotoneRounded } from"@hugeicons-pro/core-twotone-rounded"

// Duotone Variant
import { Mouse01DuotoneRounded, ArrowRight01DuotoneRounded, FileAttachmentDuotoneRounded, Logout01DuotoneRounded, MoreHorizontalDuotoneRounded, ArrowDownRight01DuotoneRounded, CheckListDuotoneRounded, MailEdit01DuotoneRounded, LeftToRightBlockQuoteDuotoneRounded, jarIconDuotoneRounded, Add01DuotoneRounded, Album01DuotoneRounded, Album02DuotoneRounded, Alert01DuotoneRounded, Alert02DuotoneRounded, AlertCircleDuotoneRounded, AlertDiamondDuotoneRounded, AppleDuotoneRounded, Archive02DuotoneRounded, ArrowAllDirectionDuotoneRounded, ArrowDown01DuotoneRounded, ArrowDown02DuotoneRounded, ArrowExpand01DuotoneRounded, ArrowExpandDuotoneRounded, ArrowHorizontalDuotoneRounded, ArrowLeft01DuotoneRounded, ArrowLeft02DuotoneRounded, ArrowLeft03DuotoneRounded, ArrowRight02DuotoneRounded, ArrowRight03DuotoneRounded, ArrowShrink01DuotoneRounded, ArrowShrinkDuotoneRounded, ArrowUp02DuotoneRounded, ArrowUpRight01DuotoneRounded, ArrowUpRight02DuotoneRounded, BlueskyDuotoneRounded, Book02DuotoneRounded, Bookmark01DuotoneRounded, Briefcase02DuotoneRounded, Calendar03DuotoneRounded, Camera01DuotoneRounded, CameraVideoDuotoneRounded, Cancel01DuotoneRounded, CancelCircleDuotoneRounded, Chatting01DuotoneRounded, CheckmarkBadge01DuotoneRounded, CheckmarkBadge03DuotoneRounded, CheckmarkCircle02DuotoneRounded, ClipboardDuotoneRounded, CloudSavingDone01DuotoneRounded, CloudUploadDuotoneRounded, Cone01DuotoneRounded, ContactDuotoneRounded, Copy01DuotoneRounded, DashboardBrowsingDuotoneRounded, DashboardSpeed02DuotoneRounded, DashboardSquare02DuotoneRounded, Database01DuotoneRounded, Database02DuotoneRounded, Delete01DuotoneRounded, Delete02DuotoneRounded, Delete03DuotoneRounded, Delete04DuotoneRounded, DeskDuotoneRounded, DocumentValidationDuotoneRounded, DragDropDuotoneRounded, Edit02DuotoneRounded, Facebook02DuotoneRounded, FavouriteDuotoneRounded, FileEditDuotoneRounded, Files01DuotoneRounded, Files02DuotoneRounded, FileUnknownDuotoneRounded, FileUploadDuotoneRounded, FilterDuotoneRounded, Flag02DuotoneRounded, Folder01DuotoneRounded, GameController01DuotoneRounded, Github01DuotoneRounded, GithubDuotoneRounded, Globe02DuotoneRounded, GoBackward10SecDuotoneRounded, GoForward10SecDuotoneRounded, GridDuotoneRounded, HandPointingRight01DuotoneRounded, Home01DuotoneRounded, Image02DuotoneRounded, ImageUpload01DuotoneRounded, ImageUploadDuotoneRounded, InboxDuotoneRounded, InformationCircleDuotoneRounded, InstagramDuotoneRounded, JobSearchDuotoneRounded, LaptopCheckDuotoneRounded, LaurelWreath02DuotoneRounded, LibraryDuotoneRounded, LicenseDuotoneRounded, Link01DuotoneRounded, Link04DuotoneRounded, Linkedin02DuotoneRounded, LinkSquare02DuotoneRounded, LiverDuotoneRounded, Loading02DuotoneRounded, Loading03DuotoneRounded, Location01DuotoneRounded, Login01DuotoneRounded, Mail01DuotoneRounded, MailAtSign01DuotoneRounded, MapsSearchDuotoneRounded, MaximizeScreenDuotoneRounded, Menu01DuotoneRounded, MessageDownload01DuotoneRounded, MinimizeScreenDuotoneRounded, MusicNote01DuotoneRounded, MusicNoteSquare02DuotoneRounded, NewsDuotoneRounded, NewTwitterDuotoneRounded, Notification03DuotoneRounded, Passport01DuotoneRounded, PassportDuotoneRounded, PauseDuotoneRounded, PencilEdit01DuotoneRounded, PencilEdit02DuotoneRounded, PencilDuotoneRounded, PinDuotoneRounded, PinLocation03DuotoneRounded, PlayDuotoneRounded, PlusSignDuotoneRounded, PropertyEditDuotoneRounded, QuoteDownDuotoneRounded, RefreshDuotoneRounded, Remove01DuotoneRounded, Remove02DuotoneRounded, SaveMoneyDollarDuotoneRounded, Search01DuotoneRounded, SecurityCheckDuotoneRounded, SentDuotoneRounded, SeoDuotoneRounded, Settings02DuotoneRounded, Share05DuotoneRounded, Shirt01DuotoneRounded, SmartPhone01DuotoneRounded, Sorting19DuotoneRounded, Sorting91DuotoneRounded, SoundcloudDuotoneRounded, SpotifyDuotoneRounded, StarDuotoneRounded, Tag01DuotoneRounded, TagsDuotoneRounded, Task01DuotoneRounded, TaskAdd01DuotoneRounded, TaskDone01DuotoneRounded, TaskEdit01DuotoneRounded, TextFontDuotoneRounded, ThreadsDuotoneRounded, Tick01DuotoneRounded, Ticket01DuotoneRounded, TiktokDuotoneRounded, Time02DuotoneRounded, TrafficLightDuotoneRounded, TwitterDuotoneRounded, UnavailableDuotoneRounded, UserDuotoneRounded, UserMultiple02DuotoneRounded, UserShield01DuotoneRounded, Video01DuotoneRounded, Video02DuotoneRounded, ViewDuotoneRounded, VimeoDuotoneRounded, VolumeMute01DuotoneRounded, VolumeOffDuotoneRounded, WavingHand01DuotoneRounded, WifiConnected02DuotoneRounded, YoutubeDuotoneRounded, ZapDuotoneRounded } from"@hugeicons-pro/core-duotone-rounded"

export type IconVariant = "stroke" | "solid" | "bulk"  | "twotone" | "duotone"

export type IconName = "mouse-01" | "file-attachment" | "arrow-right-01" | "bluesky" | "youtube" | "video-01" | "video-02" | "mail-at-sign-01" | "arrow-all-direction" | "file-unknown" | "arrow-up-right-01" | "link-square-02" | "home-01" | "refresh" | "album-02" | "alert-diamond" | "camera-video" | "chatting-01" | "files-02" | "link-01" | "news" | "waving-hand-01" | "zap" | "cancel-01" | "cloud-upload" | "file-upload" | "calendar-03" | "delete-02" | "edit-02" | "image-02" | "image-upload-01" | "image-upload" | "information-circle" | "play" | "drag-drop" | "delete-03" | "delete-01" | "cloud-saving-done-01"| "plus-sign" | "pencil-edit-01" | "pencil-edit-02" | "grid" | "link-04" | "file-edit" | "alert-circle" | "checkmark-badge-03" | "cone-01" | "add-01" | "alert-01" | "alert-02" | "archive-02" | "bookmark-01" | "cancel-circle" | "checkmark-circle-02" | "dashboard-browsing" | "dashboard-speed-02" | "favourite" |"flag-02" | "folder-01" | "laurel-wreath" | "location-01" | "mail-01" | "notification-03" | "pencil" | "search-01" | "security-check" | "sent" | "settings-02" | "star" | "tag-01" | "save-money-dollar" | "seo" | "smart-phone-01" | "text-font" | "new-twitter" | "game-controller-01" | "wifi-connected-02" | "spotify" | "vimeo" | "music-note-square-02" | "shirt-01" | "soundcloud" | "icon-jar" | "facebook-02" | "github" | "instagram" | "laptop-check" | "linkedin-02" | "threads" | "tiktok" | "property-edit" | "view" | "arrow-left-02" | "arrow-left-03" |"arrow-right-02" | "arrow-right-03" | "go-backward-10-sec" | "go-forward-10-sec" | "pause" | "loading-03" | "arrow-down-01" | "briefcase-02" | "dashboard-square-02" | "job-search" | "passport-01" | "passport" | "hand-pointing-right-01" | "quote-down" | "login-01" | "twitter" | "files-01" | "tick-01" | "ticket-01" | "remove-01" |"book-02" | "contact" | "time-02" | "license" | "task-add-01" | "task-done-01" | "task-edit-01" | "arrow-down-02" | "checkmark-badge-01" | "menu-01" | "remove-02" | "unavailable" | "task-01" | "user" | "user-shield-01" | "album-01" | "desk" | "globe-02" | "pin-location-03" | "tags" | "database-02" | "library" | "user-multiple-02" | "arrow-expand-01" | "arrow-expand" | "arrow-horizontal" | "arrow-left-01" | "arrow-shrink-01" | "arrow-shrink" | "arrow-up-right-02" | "copy-01" | "database-01" | "liver" | "maximize-screen" | "minimize-screen" | "share-05" | "volume-mute-01" | "volume-off" | "maps-search" | "camera-01" | "filter" | "pin" | "sorting-19" | "sorting-91" | "music-note-01" | "delete-04" | "apple" | "github-01" | "message-download-01" | "clipboard" | "inbox" | "document-validation" | "loading-02" | "traffic-light" | "arrow-up-02" | "left-to-right-block-quote" | "mail-edit-01" | "check-list" | "arrow-down-right-01" | "more-horizontal" | "logout-01"

export type NotImplemented108 = "1st-bracket" | "1st-bracket-circle" | "1st-bracket-square" | "2nd-bracket" | "2nd-bracket-circle" | "2nd-bracket-square" | "3d-move" | "3d-rotate" | "3d-scale" | "3-d-view" | "3rd-bracket" | "3rd-bracket-circle" | "3rd-bracket-square" | "4k" | "abacus" | "absolute" | "acceleration" | "access" | "accident" | "account-setting-01" | "account-setting-02" | "account-setting-03" | "activity-01" | "activity-02" | "activity-03" | "activity-04" | "acute" | "add-02" | "add-circle" | "add-circle-half-dot" | "add-female" | "add-invoice" | "add-male" | "add-money-circle" | "address-book" | "add-square" | "add-team" | "add-team-02" | "add-to-list" | "adobe-after-effect" | "adobe-illustrator" | "adobe-indesign" | "adobe-photoshop" | "adobe-premier" | "adobe-xd" | "adventure" | "advertisiment" | "adzan" | "affiliate" | "agreement-01" | "agreement-02" | "agreement-03" | "ai-audio" | "ai-beautify" | "ai-book" | "ai-brain-01" | "ai-brain-02" | "ai-brain-03" | "ai-brain-04" | "ai-brain-05" | "ai-browser" | "ai-chat-01" | "ai-chat-02" | "ai-chemistry-01" | "ai-chemistry-02" | "ai-chemistry-03" | "ai-chip" | "ai-cloud" | "ai-cloud-01" | "ai-cloud-02" | "ai-computer" | "ai-content-generator-01" | "ai-content-generator-02" | "ai-dna" | "aids" | "ai-editing" | "ai-eraser" | "ai-file" | "ai-folder-01" | "ai-folder-02" | "ai-game" | "ai-generative" | "ai-idea" | "ai-image" | "ai-innovation-01" | "ai-innovation-02" | "ai-innovation-03" | "ai-laptop" | "ai-learning" | "ai-lock" | "ai-magic" | "ai-mail" | "ai-mail-01" | "ai-mail-02" | "ai-mic" | "ai-network" | "ai-phone-01" | "ai-phone-02" | "ai-programming" | "airbnb" | "aircraft-game" | "airdrop" | "airplane-01" | "airplane-02" | "airplane-landing-01" | "airplane-landing-02" | "airplane-mode" | "airplane-mode-off" | "airplane-seat" | "airplane-take-off-01" | "airplane-take-off-02" | "airplay-line" | "airpod-01" | "airpod-02" | "airpod-03" | "airport" | "ai-scan" | "ai-scheduling" | "ai-search" | "ai-search-02" | "ai-security-01" | "ai-security-02" | "ai-security-03" | "ai-setting" | "ai-sheets" | "ai-smartwatch" | "ai-user" | "ai-video" | "ai-view" | "ai-vision-recognition" | "ai-voice" | "ai-voice-generator" | "ai-web-browsing" | "al-aqsa-mosque" | "alarm-clock" | "album-not-found-01" | "album-not-found-02" | "alert-square" | "algorithm" | "alien-01" | "alien-02" | "align-bottom" | "align-box-bottom-center" | "align-box-bottom-left" | "align-box-bottom-right" | "align-box-middle-center" | "align-box-middle-left" | "align-box-middle-right" | "align-box-top-center" | "align-box-top-left" | "align-box-top-right" | "align-horizontal-center" | "align-key-object" | "align-left" | "align-right" | "align-selection" | "align-top" | "align-vertical-center" | "allah" | "all-bookmark" | "alms" | "alpha" | "alphabet-arabic" | "alphabet-bangla" | "alphabet-chinese" | "alphabet-greek" | "alphabet-hebrew" | "alphabet-hindi" | "alphabet-japanese" | "alphabet-korean" | "alphabet-thai" | "alpha-circle" | "alpha-square" | "amazon" | "ambulance" | "american-football" | "amie" | "ampoule" | "analysis-text-link" | "analytics-01" | "analytics-02" | "analytics-03" | "analytics-down" | "analytics-up" | "anchor" | "anchor-point" | "android" | "angel" | "angle" | "angle-01" | "angry" | "angry-bird" | "anonymous" | "api" | "apple-01" | "apple-finder" | "apple-intelligence" | "apple-news" | "apple-pie" | "apple-reminder" | "apple-stocks" | "apple-vision-pro" | "appointment-01" | "appointment-02" | "approximately-equal" | "approximately-equal-circle" | "approximately-equal-square" | "app-store" | "apricot" | "apron" | "arc-browser" | "archer" | "archive" | "archive-01" | "armored-boot" | "arrange" | "arrange-by-letters-a-z" | "arrange-by-letters-z-a" | "arrange-by-numbers-1-9" | "arrange-by-numbers-9-1" | "arrow-data-transfer-diagonal" | "arrow-data-transfer-horizontal" | "arrow-data-transfer-vertical" | "arrow-diagonal" | "arrow-down-03" | "arrow-down-04" | "arrow-down-05" | "arrow-down-double" | "arrow-down-left-01" | "arrow-down-left-02" | "arrow-down-right-02" | "arrow-expand-02" | "arrow-expand-diagonal-01" | "arrow-expand-diagonal-02" | "arrow-left-04" | "arrow-left-05" | "arrow-left-double" | "arrow-left-right" | "arrow-move-down-left" | "arrow-move-down-right" | "arrow-move-left-down" | "arrow-move-right-down" | "arrow-move-up-left" | "arrow-move-up-right" | "arrow-reload-horizontal" | "arrow-reload-vertical" | "arrow-right-04" | "arrow-right-05" | "arrow-right-double" | "arrow-shrink-02" | "arrow-turn-backward" | "arrow-turn-down" | "arrow-turn-forward" | "arrow-turn-up" | "arrow-up-01" | "arrow-up-03" | "arrow-up-04" | "arrow-up-05" | "arrow-up-double" | "arrow-up-down" | "arrow-up-left-01" | "arrow-up-left-02" | "arrow-up-right-03" | "arrow-vertical" | "artboard" | "artboard-tool" | "artificial-intelligence-01" | "artificial-intelligence-02" | "artificial-intelligence-03" | "artificial-intelligence-04" | "artificial-intelligence-05" | "artificial-intelligence-06" | "artificial-intelligence-07" | "artificial-intelligence-08" | "aspect-ratio" | "assignments" | "asteroid-01" | "asteroid-02" | "astronaut-01" | "astronaut-02" | "at" | "atm-01" | "atm-02" | "atom-01" | "atom-02" | "atomic-power" | "attachment" | "attachment-01" | "attachment-02" | "attachment-circle" | "attachment-square" | "auction" | "audio-book-01" | "audio-book-02" | "audio-book-03" | "audio-book-04" | "audio-wave-01" | "audio-wave-02" | "audit-01" | "audit-02" | "augmented-reality-ar" | "authorized" | "auto-conversations" | "automotive-battery-01" | "automotive-battery-02" | "avalanche" | "avocado" | "award-01" | "award-02" | "award-03" | "award-04" | "award-05" | "baby-01" | "baby-02" | "baby-bed-01" | "baby-bed-02" | "baby-bottle" | "baby-boy-dress" | "baby-girl-dress" | "background" | "back-muscle-body" | "backpack-01" | "backpack-02" | "backpack-03" | "backward-01" | "backward-02" | "bacteria" | "badminton" | "badminton-shuttle" | "balance-scale" | "balloons" | "banana" | "bandage" | "bank" | "bar-chart" | "bar-chart-horizontal" | "bar-code-01" | "bar-code-02" | "barns" | "baseball" | "baseball-bat" | "baseball-helmet" | "bash" | "basketball-01" | "basketball-02" | "basketball-hoop" | "bathtub-01" | "bathtub-02" | "batteries-energy" | "battery-charging-01" | "battery-charging-02" | "battery-eco-charging" | "battery-empty" | "battery-full" | "battery-low" | "battery-medium-01" | "battery-medium-02" | "bbq-grill" | "beach" | "beach-02" | "beater" | "bebo" | "bed" | "bed-bunk" | "bed-double" | "bed-single-01" | "bed-single-02" | "bedug-01" | "bedug-02" | "behance-01" | "behance-02" | "belt" | "bend-tool" | "berlin" | "berlin-tower" | "beta" | "bicycle" | "bicycle-01" | "billiard-01" | "billiard-02" | "binary-code" | "bing" | "binoculars" | "bio-energy" | "biomass-energy" | "biometric-access" | "biometric-device" | "birthday-cake" | "biscuit" | "bitcoin" | "bitcoin-01" | "bitcoin-02" | "bitcoin-03" | "bitcoin-04" | "bitcoin-bag" | "bitcoin-circle" | "bitcoin-cloud" | "bitcoin-cpu" | "bitcoin-credit-card" | "bitcoin-database" | "bitcoin-down-01" | "bitcoin-down-02" | "bitcoin-ellipse" | "bitcoin-eye" | "bitcoin-filter" | "bitcoin-flashdisk" | "bitcoin-graph" | "bitcoin-invoice" | "bitcoin-key" | "bitcoin-location" | "bitcoin-lock" | "bitcoin-mail" | "bitcoin-mind" | "bitcoin-money-01" | "bitcoin-money-02" | "bitcoin-pie-chart" | "bitcoin-piggy-bank" | "bitcoin-presentation" | "bitcoin-receipt" | "bitcoin-receive" | "bitcoin-rectangle" | "bitcoin-safe" | "bitcoin-search" | "bitcoin-send" | "bitcoin-setting" | "bitcoin-shield" | "bitcoin-shopping" | "bitcoin-smartphone-01" | "bitcoin-smartphone-02" | "bitcoin-square" | "bitcoin-store" | "bitcoin-tag" | "bitcoin-target" | "bitcoin-transaction" | "bitcoin-up-01" | "bitcoin-up-02" | "bitcoin-wallet" | "bitcoin-withdraw" | "black-hole" | "black-hole-01" | "blend" | "blender" | "blockchain-01" | "blockchain-02" | "blockchain-03" | "blockchain-04" | "blockchain-05" | "blockchain-06" | "blockchain-07" | "blocked" | "block-game" | "blogger" | "blood" | "blood-bag" | "blood-bottle" | "blood-pressure" | "blood-type" | "bluetooth" | "bluetooth-circle" | "bluetooth-not-connected" | "bluetooth-search" | "bluetooth-square" | "blur" | "blush-brush-01" | "blush-brush-02" | "board-math" | "boat" | "body-armor" | "body-part-leg" | "body-part-muscle" | "body-part-six-pack" | "body-soap" | "body-weight" | "bomb" | "bone-01" | "bone-02" | "book-01" | "book-03" | "book-04" | "book-bookmark-01" | "book-bookmark-02" | "book-download" | "book-edit" | "bookmark-02" | "bookmark-03" | "bookmark-add-01" | "bookmark-add-02" | "bookmark-block-01" | "bookmark-block-02" | "bookmark-check-01" | "bookmark-check-02" | "bookmark-minus-01" | "bookmark-minus-02" | "bookmark-off-01" | "bookmark-off-02" | "bookmark-remove-01" | "bookmark-remove-02" | "book-open-01" | "book-open-02" | "books-01" | "books-02" | "bookshelf-01" | "bookshelf-02" | "bookshelf-03" | "book-upload" | "bootstrap" | "border-all-01" | "border-all-02" | "border-bottom-01" | "border-bottom-02" | "border-full" | "border-horizontal" | "border-inner" | "border-left-01" | "border-left-02" | "border-none-01" | "border-none-02" | "border-right-01" | "border-right-02" | "border-top-01" | "border-top-02" | "border-vertical" | "borobudur" | "bot" | "bounce-left" | "bounce-right" | "bounding-box" | "bowling" | "bowling-ball" | "bowling-pins" | "bow-tie" | "boxer" | "boxing-bag" | "boxing-glove" | "boxing-glove-01" | "brain" | "brain-01" | "brain-02" | "brain-03" | "brandfetch" | "bread-01" | "bread-02" | "bread-03" | "bread-04" | "breast-pump" | "bridge" | "briefcase-01" | "briefcase-03" | "briefcase-04" | "briefcase-05" | "briefcase-06" | "briefcase-07" | "briefcase-08" | "briefcase-09" | "briefcase-dollar" | "broccoli" | "brochure" | "broken-bone" | "browser" | "brush" | "bubble-chat" | "bubble-chat-add" | "bubble-chat-blocked" | "bubble-chat-cancel" | "bubble-chat-delay" | "bubble-chat-done" | "bubble-chat-download-01" | "bubble-chat-download-02" | "bubble-chat-edit" | "bubble-chat-favourite" | "bubble-chat-income" | "bubble-chat-lock" | "bubble-chat-notification" | "bubble-chat-outcome" | "bubble-chat-preview" | "bubble-chat-question" | "bubble-chat-search" | "bubble-chat-secure" | "bubble-chat-translate" | "bubble-chat-unlock" | "bubble-chat-upload" | "bubble-chat-user" | "bubble-tea-01" | "bubble-tea-02" | "bug-01" | "bug-02" | "building-01" | "building-02" | "building-03" | "building-04" | "building-05" | "building-06" | "bulb" | "bulb-charging" | "bulletproof-vest" | "burj-al-arab" | "burning-cd" | "bus-01" | "bus-02" | "bus-03" | "c++" | "cabinet-01" | "cabinet-02" | "cabinet-03" | "cabinet-04" | "cable-car" | "cactus" | "caduceus" | "cafe" | "calculate" | "calculator" | "calculator-01" | "calendar-01" | "calendar-02" | "calendar-04" | "calendar-add-01" | "calendar-add-02" | "calendar-block-01" | "calendar-block-02" | "calendar-check-in-01" | "calendar-check-in-02" | "calendar-check-out-01" | "calendar-check-out-02" | "calendar-download-01" | "calendar-download-02" | "calendar-favorite-01" | "calendar-favorite-02" | "calendar-lock-01" | "calendar-lock-02" | "calendar-love-01" | "calendar-love-02" | "calendar-minus-01" | "calendar-minus-02" | "calendar-remove-01" | "calendar-remove-02" | "calendar-setting-01" | "calendar-setting-02" | "calendar-upload-01" | "calendar-upload-02" | "call" | "call-02" | "call-add" | "call-add-02" | "call-blocked" | "call-blocked-02" | "call-disabled" | "call-disabled-02" | "call-done" | "call-done-02" | "call-end-01" | "call-end-02" | "call-end-03" | "call-end-04" | "call-incoming-01" | "call-incoming-02" | "call-incoming-03" | "call-incoming-04" | "calling" | "calling-02" | "call-internal" | "call-internal-02" | "call-locked" | "call-locked-02" | "call-minus" | "call-minus-02" | "call-missed-01" | "call-missed-02" | "call-missed-03" | "call-missed-04" | "call-outgoing-01" | "call-outgoing-02" | "call-outgoing-03" | "call-outgoing-04" | "call-paused" | "call-paused-02" | "call-received" | "call-received-02" | "call-ringing-01" | "call-ringing-02" | "call-ringing-03" | "call-ringing-04" | "call-unlocked" | "call-unlocked-02" | "camel" | "camera-02" | "camera-add-01" | "camera-add-02" | "camera-automatically-01" | "camera-automatically-02" | "camera-lens" | "camera-microphone-01" | "camera-microphone-02" | "camera-night-mode-01" | "camera-night-mode-02" | "camera-off-01" | "camera-off-02" | "camera-rotated-01" | "camera-rotated-02" | "camera-smile-01" | "camera-smile-02" | "camera-tripod" | "camper" | "campfire" | "cancel-02" | "cancel-circle-half-dot" | "cancel-square" | "candelier-01" | "candelier-02" | "canvas" | "cap" | "capcut" | "capcut-rectangle" | "cap-projecting" | "cap-round" | "cap-straight" | "car-01" | "car-02" | "car-03" | "car-04" | "car-05" | "car-alert" | "caravan" | "card-exchange-01" | "card-exchange-02" | "cardigan" | "cardiogram-01" | "cardiogram-02" | "cards-01" | "cards-02" | "cargo-ship" | "carousel-horizontal" | "carousel-horizontal-02" | "carousel-vertical" | "car-parking-01" | "car-parking-02" | "carrot" | "car-signal" | "car-time" | "cash-01" | "cash-02" | "cashback" | "cashier" | "cashier-02" | "castle" | "castle-01" | "castle-02" | "catalogue" | "cayan-tower" | "cctv-camera" | "cd" | "cells" | "cellular-network" | "cellular-network-offline" | "celsius" | "center-focus" | "centralized" | "central-shaheed-minar" | "certificate-01" | "certificate-02" | "chair-01" | "chair-02" | "chair-03" | "chair-04" | "chair-05" | "chair-barber" | "champion" | "change-screen-mode" | "character-phonetic" | "charity" | "chart" | "chart-01" | "chart-02" | "chart-03" | "chart-average" | "chart-bar-line" | "chart-breakout-circle" | "chart-breakout-square" | "chart-bubble-01" | "chart-bubble-02" | "chart-column" | "chart-decrease" | "chart-down" | "chart-evaluation" | "chart-high-low" | "chart-histogram" | "chart-increase" | "chart-line-data-01" | "chart-line-data-02" | "chart-line-data-03" | "chart-maximum" | "chart-medium" | "chart-minimum" | "chart-radar" | "chart-relationship" | "chart-ring" | "chart-rose" | "chart-scatter" | "chart-up" | "chat-bot" | "chat-gpt" | "checkmark-badge-02" | "checkmark-badge-04" | "checkmark-circle-01" | "checkmark-circle-03" | "checkmark-circle-04" | "checkmark-square-01" | "checkmark-square-02" | "checkmark-square-03" | "checkmark-square-04" | "check-unread-01" | "check-unread-02" | "check-unread-03" | "check-unread-04" | "cheese" | "cheese-cake-01" | "cheese-cake-02" | "chef" | "chef-hat" | "chemistry-01" | "chemistry-02" | "chemistry-03" | "cherry" | "chess-01" | "chess-02" | "chess-pawn" | "chicken-thighs" | "child" | "chimney" | "china-temple" | "chip" | "chip-02" | "chocolate" | "chopsticks" | "chrome" | "chrysler" | "church" | "cinnamon-roll" | "circle" | "circle-arrow-data-transfer-diagonal" | "circle-arrow-data-transfer-horizontal" | "circle-arrow-data-transfer-vertical" | "circle-arrow-diagonal-01" | "circle-arrow-diagonal-02" | "circle-arrow-down-01" | "circle-arrow-down-02" | "circle-arrow-down-03" | "circle-arrow-down-double" | "circle-arrow-down-left" | "circle-arrow-down-right" | "circle-arrow-expand-01" | "circle-arrow-expand-02" | "circle-arrow-horizontal" | "circle-arrow-left-01" | "circle-arrow-left-02" | "circle-arrow-left-03" | "circle-arrow-left-double" | "circle-arrow-left-right" | "circle-arrow-move-down-left" | "circle-arrow-move-down-right" | "circle-arrow-move-left-down" | "circle-arrow-move-right-down" | "circle-arrow-move-up-left" | "circle-arrow-move-up-right" | "circle-arrow-reload-01" | "circle-arrow-reload-02" | "circle-arrow-right-01" | "circle-arrow-right-02" | "circle-arrow-right-03" | "circle-arrow-right-double" | "circle-arrow-shrink-01" | "circle-arrow-shrink-02" | "circle-arrow-up-01" | "circle-arrow-up-02" | "circle-arrow-up-03" | "circle-arrow-up-double" | "circle-arrow-up-down" | "circle-arrow-up-left" | "circle-arrow-up-right" | "circle-arrow-up-right-02" | "circle-arrow-vertical" | "circle-lock-01" | "circle-lock-02" | "circle-lock-add-01" | "circle-lock-add-02" | "circle-lock-check-01" | "circle-lock-check-02" | "circle-lock-minus-01" | "circle-lock-minus-02" | "circle-lock-remove-01" | "circle-lock-remove-02" | "circle-password" | "circle-unlock-01" | "circle-unlock-02" | "city-01" | "city-02" | "city-03" | "clapping-01" | "clapping-02" | "clean" | "cleaning-bucket" | "clinic" | "clip" | "cliparts" | "clock-01" | "clock-02" | "clock-03" | "clock-04" | "clock-05" | "closed-caption" | "closed-caption-alt" | "clothes" | "cloud" | "cloud-angled-rain" | "cloud-angled-rain-zap" | "cloud-angled-zap" | "cloud-big-rain" | "cloud-download" | "cloud-fast-wind" | "cloud-hailstone" | "cloud-little-rain" | "cloud-little-snow" | "cloud-loading" | "cloud-mid-rain" | "cloud-mid-snow" | "cloud-saving-done-02" | "cloud-server" | "cloud-slow-wind" | "cloud-snow" | "clubs-01" | "clubs-02" | "code" | "code-circle" | "code-folder" | "codesandbox" | "code-square" | "coffee-01" | "coffee-02" | "coffee-beans" | "coinbase" | "coins-01" | "coins-02" | "coins-bitcoin" | "coins-dollar" | "coins-euro" | "coins-pound" | "coins-swap" | "coins-yen" | "collections-bookmark" | "color-picker" | "colors" | "colosseum" | "column-delete" | "column-insert" | "comet-01" | "comet-02" | "coming-soon-01" | "coming-soon-02" | "command" | "command-line" | "comment-01" | "comment-02" | "comment-add-01" | "comment-add-02" | "comment-block-01" | "comment-block-02" | "comment-remove-01" | "comment-remove-02" | "compass" | "compass-01" | "complaint" | "computer" | "computer-add" | "computer-check" | "computer-cloud" | "computer-desk-01" | "computer-desk-02" | "computer-desk-03" | "computer-dollar" | "computer-phone-sync" | "computer-programming-01" | "computer-programming-02" | "computer-protection" | "computer-remove" | "computer-settings" | "computer-terminal-01" | "computer-terminal-02" | "computer-video" | "computer-video-call" | "cone-02" | "conference" | "configuration-01" | "configuration-02" | "confused" | "congruent-to" | "congruent-to-circle" | "congruent-to-square" | "connect" | "console" | "constellation" | "contact-01" | "contact-02" | "contact-book" | "container-truck" | "container-truck-01" | "container-truck-02" | "content-writing" | "contracts" | "conversation" | "cook-book" | "cookie" | "coordinate-01" | "coordinate-02" | "copilot" | "co-present" | "copy-02" | "copy-link" | "copyright" | "corn" | "corporate" | "cos" | "cosine-01" | "cosine-02" | "cottage" | "cotton-candy" | "coupon-01" | "coupon-02" | "coupon-03" | "coupon-percent" | "course" | "court-house" | "court-law" | "covariate" | "covid-info" | "cowboy-hat" | "cpp" | "c-programming" | "cpu" | "cpu-charge" | "cpu-settings" | "crab" | "crane" | "crazy" | "creative-market" | "credit-card" | "credit-card-accept" | "credit-card-add" | "credit-card-change" | "credit-card-defrost" | "credit-card-freeze" | "credit-card-not-accept" | "credit-card-not-found" | "credit-card-pos" | "credit-card-validation" | "cricket-bat" | "cricket-helmet" | "croissant" | "crop" | "crowdfunding" | "crown" | "crying" | "csv-01" | "csv-02" | "cube" | "cupcake-01" | "cupcake-02" | "cupcake-03" | "curling" | "cursor-01" | "cursor-02" | "cursor-add-selection-01" | "cursor-add-selection-02" | "cursor-circle-selection-01" | "cursor-circle-selection-02" | "cursor-disabled-01" | "cursor-disabled-02" | "cursor-edit-01" | "cursor-edit-02" | "cursor-hold-01" | "cursor-hold-02" | "cursor-info-01" | "cursor-info-02" | "cursor-in-window" | "cursor-loading-01" | "cursor-loading-02" | "cursor-magic-selection-01" | "cursor-magic-selection-02" | "cursor-magic-selection-03" | "cursor-magic-selection-04" | "cursor-move-01" | "cursor-move-02" | "cursor-pointer-01" | "cursor-pointer-02" | "cursor-progress-01" | "cursor-progress-02" | "cursor-progress-03" | "cursor-progress-04" | "cursor-rectangle-selection-01" | "cursor-rectangle-selection-02" | "cursor-remove-selection-01" | "cursor-remove-selection-02" | "cursor-text" | "curtains" | "curvy-left-direction" | "curvy-left-right-direction" | "curvy-right-direction" | "curvy-up-down-direction" | "customer-service" | "customer-service-01" | "customer-service-02" | "customer-support" | "custom-field" | "customize" | "cylinder-01" | "cylinder-02" | "cylinder-03" | "cylinder-04" | "danger" | "dark-mode" | "dart" | "dashboard-circle" | "dashboard-circle-add" | "dashboard-circle-edit" | "dashboard-circle-remove" | "dashboard-circle-settings" | "dashboard-speed-01" | "dashboard-square-01" | "dashboard-square-03" | "dashboard-square-add" | "dashboard-square-edit" | "dashboard-square-remove" | "dashboard-square-setting" | "dashed-line-01" | "dashed-line-02" | "dashed-line-circle" | "database" | "database-add" | "database-export" | "database-import" | "database-locked" | "database-restore" | "database-setting" | "database-sync" | "database-sync-01" | "data-recovery" | "dates" | "date-time" | "datev" | "dead" | "delete-column" | "delete-put-back" | "delete-row" | "delete-throw" | "delivered-sent" | "delivery-box-01" | "delivery-box-02" | "delivery-delay-01" | "delivery-delay-02" | "delivery-return-01" | "delivery-return-02" | "delivery-secure-01" | "delivery-secure-02" | "delivery-sent-01" | "delivery-sent-02" | "delivery-tracking-01" | "delivery-tracking-02" | "delivery-truck-01" | "delivery-truck-02" | "delivery-view-01" | "delivery-view-02" | "dental-braces" | "dental-broken-tooth" | "dental-care" | "dental-tooth" | "departement" | "desert" | "desk-01" | "desk-02" | "developer" | "deviantart" | "device-access" | "diagonal-scroll-point-01" | "diagonal-scroll-point-02" | "dialpad-circle-01" | "dialpad-circle-02" | "dialpad-square-01" | "dialpad-square-02" | "diameter" | "diamond" | "diamond-01" | "diamond-02" | "diaper" | "dice" | "dice-faces-01" | "dice-faces-02" | "dice-faces-03" | "dice-faces-04" | "dice-faces-05" | "dice-faces-06" | "digestion" | "digg" | "digital-clock" | "dim-sum-01" | "dim-sum-02" | "dining-table" | "diploma" | "direction-left-01" | "direction-left-02" | "direction-right-01" | "direction-right-02" | "directions-01" | "directions-02" | "dirham" | "disability-01" | "disability-02" | "discord" | "discount" | "discount-01" | "discount-tag-01" | "discount-tag-02" | "discover-circle" | "discover-square" | "dish-01" | "dish-02" | "dish-washer" | "displeased" | "distribute-horizontal-center" | "distribute-horizontal-left" | "distribute-horizontal-right" | "distribute-vertical-bottom" | "distribute-vertical-center" | "distribute-vertical-top" | "distribution" | "divide-sign" | "divide-sign-circle" | "divide-sign-square" | "dna" | "dna-01" | "doc-01" | "doc-02" | "doctor-01" | "doctor-02" | "doctor-03" | "document-attachment" | "document-code" | "dollar-01" | "dollar-02" | "dollar-circle" | "dollar-receive-01" | "dollar-receive-02" | "dollar-send-01" | "dollar-send-02" | "dollar-square" | "dome" | "domino" | "do-not-touch-01" | "do-not-touch-02" | "door" | "door-01" | "door-02" | "door-lock" | "doughnut" | "download-01" | "download-02" | "download-03" | "download-04" | "download-05" | "download-circle-01" | "download-circle-02" | "download-square-01" | "download-square-02" | "drag-01" | "drag-02" | "drag-03" | "drag-04" | "drag-drop-horizontal" | "drag-drop-vertical" | "drag-left-01" | "drag-left-02" | "drag-left-03" | "drag-left-04" | "drag-right-01" | "drag-right-02" | "drag-right-03" | "drag-right-04" | "drawing-compass" | "drawing-mode" | "dress-01" | "dress-02" | "dress-03" | "dress-04" | "dress-05" | "dress-06" | "dress-07" | "dressing-table-01" | "dressing-table-02" | "dressing-table-03" | "dribbble" | "drink" | "drone" | "drooling" | "dropbox" | "droplet" | "dropper" | "ds3-tool" | "dua" | "dumbbell-01" | "dumbbell-02" | "dumbbell-03" | "ear" | "ear-rings-01" | "ear-rings-02" | "ear-rings-03" | "earth" | "ease-curve-control-points" | "ease-in" | "ease-in-control-point" | "ease-in-out" | "ease-out" | "ease-out-control-point" | "eco-energy" | "eco-lab" | "eco-lab-01" | "eco-lab-02" | "eco-power" | "edge-style" | "edit-01" | "edit-off" | "edit-road" | "edit-table" | "edit-user-02" | "eggs" | "eid-mubarak" | "eiffel-tower" | "elearning-exchange" | "electric-home-01" | "electric-home-02" | "electric-plugs" | "electric-tower-01" | "electric-tower-02" | "electric-wire" | "ellipse-selection" | "encrypt" | "energy" | "energy-ellipse" | "energy-rectangle" | "entering-geo-fence" | "entrance-stairs" | "envato" | "equal-sign" | "equal-sign-circle" | "equal-sign-square" | "equipment-bench-press" | "equipment-chest-press" | "equipment-gym-01" | "equipment-gym-02" | "equipment-gym-03" | "equipment-weightlifting" | "eraser" | "eraser-01" | "eraser-add" | "eraser-auto" | "estimate-01" | "estimate-02" | "ethereum" | "ethereum-ellipse" | "ethereum-rectangle" | "euro" | "euro-circle" | "euro-receive" | "euro-send" | "euro-square" | "ev-charging" | "evil" | "exchange-01" | "exchange-02" | "exchange-03" | "expander" | "external-drive" | "eye" | "facebook-01" | "face-id" | "factory" | "factory-01" | "factory-02" | "fahrenheit" | "falling-star" | "fast-wind" | "favourite-circle" | "favourite-square" | "feather" | "female-02" | "female-symbol" | "fencing" | "fencing-mask" | "ferris-wheel" | "ferry-boat" | "figma" | "file-01" | "file-02" | "file-add" | "file-audio" | "file-bitcoin" | "file-block" | "file-bookmark" | "file-cloud" | "file-corrupt" | "file-dollar" | "file-download" | "file-empty-01" | "file-empty-02" | "file-euro" | "file-export" | "file-favourite" | "file-import" | "file-link" | "file-locked" | "file-management" | "file-minus" | "file-music" | "file-not-found" | "file-paste" | "file-pin" | "file-pound" | "file-remove" | "file-script" | "file-search" | "file-security" | "file-shredder" | "file-star" | "file-sync" | "file-unlocked" | "file-validation" | "file-verified" | "file-video" | "file-view" | "file-yen" | "file-zip" | "film-01" | "film-02" | "film-roll-01" | "film-roll-02" | "filter-add" | "filter-edit" | "filter-horizontal" | "filter-mail-circle" | "filter-mail-square" | "filter-remove" | "filter-reset" | "filter-vertical" | "finger-access" | "finger-print" | "finger-print-add" | "finger-print-check" | "finger-print-minus" | "finger-print-remove" | "finger-print-scan" | "fingerprint-scan" | "fins" | "fire" | "fire-02" | "fire-03" | "fire-pit" | "fire-security" | "firewall" | "fireworks" | "first-aid-kit" | "fish-food" | "fit-to-screen" | "fiverr" | "flag-01" | "flag-03" | "flash" | "flashlight" | "flash-off" | "flaticon" | "flickr" | "flim-slate" | "flip-bottom" | "flip-horizontal" | "flip-left" | "flip-phone" | "flip-right" | "flip-top" | "flip-vertical" | "floor-plan" | "floppy-disk" | "flow" | "flowchart-01" | "flowchart-02" | "flow-circle" | "flow-connection" | "flower" | "flower-pot" | "flow-square" | "flushed" | "flying-human" | "focus-point" | "folder-02" | "folder-03" | "folder-add" | "folder-attachment" | "folder-audio" | "folder-block" | "folder-check" | "folder-cloud" | "folder-details" | "folder-details-reference" | "folder-download" | "folder-edit" | "folder-export" | "folder-favourite" | "folder-file-storage" | "folder-import" | "folder-library" | "folder-links" | "folder-locked" | "folder-management" | "folder-minus" | "folder-music" | "folder-off" | "folder-open" | "folder-pin" | "folder-remove" | "folders" | "folder-search" | "folder-security" | "folder-shared-01" | "folder-shared-02" | "folder-shared-03" | "folder-sync" | "folder-transfer" | "folder-unknown" | "folder-unlocked" | "folder-upload" | "folder-video" | "folder-view" | "folder-zip" | "football" | "football-pitch" | "forgot-password" | "fork" | "forrst" | "fortress" | "forward-01" | "forward-02" | "four-finger-02" | "four-finger-03" | "foursquare" | "framer" | "frameworks" | "french-fries-01" | "french-fries-02" | "fridge" | "frisbee" | "fry" | "fuel" | "fuel-01" | "fuel-02" | "fuel-station" | "full-screen" | "full-signal" | "function" | "function-circle" | "function-of-x" | "function-square" | "galaxy" | "game" | "gameboy" | "game-controller-02" | "game-controller-03" | "garage" | "garbage-truck" | "garlands" | "gas-pipe" | "gas-stove" | "gears" | "gem" | "geology-crust" | "geometric-shapes-01" | "geometric-shapes-02" | "gibbous-moon" | "gif-01" | "gif-02" | "gift" | "gift-card" | "gift-card-02" | "gitbook" | "git-branch" | "git-commit" | "git-compare" | "git-fork" | "gitlab" | "git-merge" | "git-pull-request" | "git-pull-request-closed" | "git-pull-request-draft" | "give-blood" | "give-pill" | "glasses" | "global" | "global-editing" | "global-education" | "global-refresh" | "global-search" | "globe" | "glove" | "go-backward-15-sec" | "go-backward-30-sec" | "go-backward-5-sec" | "go-backward-60-sec" | "go-forward-15-sec" | "go-forward-30-sec" | "go-forward-5-sec" | "go-forward-60-sec" | "gold" | "gold-ingots" | "golf-ball" | "golf-bat" | "golf-cart" | "golf-hole" | "google" | "google-doc" | "google-drive" | "google-gemini" | "google-home" | "google-lens" | "google-maps" | "google-photos" | "google-sheet" | "gps-01" | "gps-02" | "gps-disconnected" | "gps-off-01" | "gps-off-02" | "gps-signal-01" | "gps-signal-02" | "gpu" | "graduate-female" | "graduate-male" | "graduation-scroll" | "grapes" | "gravity" | "greater-than" | "greater-than-circle" | "greater-than-square" | "greek-helmet" | "green-house" | "grid-02" | "grid-off" | "grid-table" | "grid-view" | "grimacing" | "grinning" | "grok" | "group-01" | "group-items" | "group-layers" | "guest-house" | "gun" | "gymnastic" | "gymnastic-rings" | "hackerrank" | "hair-clips" | "hair-dryer" | "haji" | "halal" | "halal-lab" | "hamburger-01" | "hamburger-02" | "hand-bag-01" | "hand-bag-02" | "hand-beater" | "handcuffs" | "hand-grip" | "hand-pointing-down-01" | "hand-pointing-down-02" | "hand-pointing-down-03" | "hand-pointing-down-04" | "hand-pointing-left-01" | "hand-pointing-left-02" | "hand-pointing-left-03" | "hand-pointing-left-04" | "hand-pointing-right-02" | "hand-pointing-right-03" | "hand-pointing-right-04" | "hand-prayer" | "hand-sanitizer" | "hanger" | "hanging-clock" | "hangout" | "happy" | "hard-drive" | "hat" | "hdd" | "hdr-01" | "hdr-02" | "heading" | "heading-01" | "heading-02" | "heading-03" | "heading-04" | "heading-05" | "heading-06" | "headphone-mute" | "headphones" | "headset" | "headset-connected" | "headset-off" | "healtcare" | "health" | "heart-add" | "heartbreak" | "heart-check" | "heart-remove" | "helicopter" | "help-circle" | "help-square" | "hexagon" | "hexagon-01" | "hierarchy" | "hierarchy-circle-01" | "hierarchy-circle-02" | "hierarchy-circle-03" | "hierarchy-files" | "hierarchy-square-01" | "hierarchy-square-02" | "hierarchy-square-03" | "hierarchy-square-04" | "hierarchy-square-05" | "hierarchy-square-06" | "hierarchy-square-07" | "hierarchy-square-08" | "hierarchy-square-10" | "high-heels-01" | "high-heels-02" | "highlighter" | "hijab" | "hockey" | "hold-01" | "hold-02" | "hold-03" | "hold-04" | "hold-05" | "hold-locked-01" | "hold-locked-02" | "hold-phone" | "hologram" | "home-02" | "home-03" | "home-04" | "home-05" | "home-06" | "home-07" | "home-08" | "home-09" | "home-10" | "home-11" | "home-12" | "home-13" | "home-wifi" | "honey-01" | "honey-02" | "honor" | "honour-star" | "hoodie" | "horizonal-scroll-point" | "horizontal-resize" | "horse" | "horse-head" | "horse-saddle" | "hospital-01" | "hospital-02" | "hospital-bed-01" | "hospital-bed-02" | "hospital-location" | "hot-air-balloon" | "hotdog" | "hotel-01" | "hotel-02" | "hotel-bell" | "hot-price" | "hotspot" | "hotspot-offline" | "hot-tube" | "hourglass" | "hourglass-off" | "house-01" | "house-02" | "house-03" | "house-04" | "house-05" | "house-solar-panel" | "html-5" | "hugeicons" | "humidity" | "hut" | "hydro-power" | "hyperbole" | "ice-cream-01" | "ice-cream-02" | "ice-cream-03" | "ice-cream-04" | "ice-cubes" | "ice-hockey" | "ice-skating" | "ico" | "iconjar" | "id" | "idea" | "idea-01" | "identification" | "identity-card" | "id-not-verified" | "id-verified" | "image-01" | "image-03" | "image-actual-size" | "image-add-01" | "image-add-02" | "image-composition" | "image-composition-oval" | "image-counter-clockwise" | "image-crop" | "image-delete-01" | "image-delete-02" | "image-done-01" | "image-done-02" | "image-download" | "image-download-02" | "image-flip -horizontal" | "image-flip-vertical" | "image-not-found-01" | "image-not-found-02" | "image-remove-01" | "image-remove-02" | "image-rotation-clockwise" | "imo" | "important-book" | "inbox-check" | "inbox-download" | "inbox-unread" | "inbox-upload" | "incognito" | "india-gate" | "inequality-01" | "inequality-02" | "inequality-circle-01" | "inequality-circle-02" | "inequality-square-01" | "inequality-square-02" | "infant" | "infinity-01" | "infinity-02" | "infinity-circle" | "infinity-square" | "information-diamond" | "information-square" | "injection" | "in-love" | "insert-bottom-image" | "insert-center-image" | "insert-column" | "insert-column-left" | "insert-column-right" | "insert-pi" | "insert-row" | "insert-row-down" | "insert-row-up" | "insert-top-image" | "inspect-code" | "installing-updates-01" | "installing-updates-02" | "internet" | "internet-antenna-01" | "internet-antenna-02" | "internet-antenna-03" | "internet-antenna-04" | "investigation" | "invoice" | "invoice-01" | "invoice-02" | "invoice-03" | "invoice-04" | "ipod" | "iris-scan" | "island" | "jar" | "java" | "java-script" | "job-link" | "job-share" | "jogger-pants" | "join-bevel" | "join-round" | "join-straight" | "joker" | "joystick-01" | "joystick-02" | "joystick-03" | "joystick-04" | "joystick-05" | "jpg-01" | "jpg-02" | "jsx-01" | "jsx-02" | "jsx-03" | "judge" | "jumpers" | "jupiter" | "justice-scale-01" | "justice-scale-02" | "kaaba-01" | "kaaba-02" | "kanban" | "kayak" | "keffiyeh" | "kettle" | "kettle-01" | "kettlebell" | "ketupat" | "key-01" | "key-02" | "keyboard" | "keyframe" | "keyframe-add" | "keyframe-align-center" | "keyframe-align-horizontal" | "keyframe-align-vertical" | "keyframe-bottom" | "keyframe-left" | "keyframe-remove" | "keyframe-right" | "keyframes-double" | "keyframes-double-add" | "keyframes-double-remove" | "keyframes-multiple" | "keyframes-multiple-add" | "keyframes-multiple-remove" | "keyframe-top" | "key-generator-fob" | "kickstarter-01" | "kickstarter-02" | "kid" | "kidneys" | "kissing" | "kitchen-utensils" | "kite" | "klarna" | "knife-01" | "knife-02" | "knife-bread" | "knight-shield" | "knives" | "knowledge-01" | "knowledge-02" | "ko-fi" | "kurta" | "kurta-01" | "label" | "label-important" | "labor" | "labs" | "lake" | "lamp" | "lamp-01" | "lamp-02" | "lamp-03" | "lamp-04" | "lamp-05" | "language-circle" | "language-skill" | "language-square" | "lantern" | "laptop" | "laptop-add" | "laptop-charging" | "laptop-cloud" | "laptop-issue" | "laptop-performance" | "laptop-phone-sync" | "laptop-programming" | "laptop-remove" | "laptop-settings" | "laptop-video" | "lasso-tool-01" | "lasso-tool-02" | "last-fm" | "latitude" | "laughing" | "laurel-wreath-01" | "laurel-wreath-02" | "laurel-wreath-first-01" | "laurel-wreath-first-02" | "laurel-wreath-left-01" | "laurel-wreath-left-02" | "laurel-wreath-left-03" | "laurel-wreath-right-01" | "laurel-wreath-right-02" | "laurel-wreath-right-03" | "layer-add" | "layer-mask-01" | "layer-mask-02" | "layers-01" | "layers-02" | "layers-logo" | "layout-01" | "layout-02" | "layout-03" | "layout-04" | "layout-05" | "layout-06" | "layout-07" | "layout-2-column" | "layout-2-row" | "layout-3-column" | "layout-3-row" | "layout-bottom" | "layout-grid" | "layout-left" | "layout-right" | "layout-table-01" | "layout-table-02" | "layout-top" | "leaf-01" | "leaf-02" | "leaf-03" | "leaf-04" | "leaving-geo-fence" | "leetcode" | "left-angle" | "left-to-right-list-bullet" | "left-to-right-list-dash" | "left-to-right-list-number" | "left-to-right-list-star" | "left-to-right-list-star-01" | "left-to-right-list-triangle" | "left-triangle" | "legal-01" | "legal-02" | "legal-document-01" | "legal-document-02" | "legal-hammer" | "less-than" | "less-than-circle" | "less-than-square" | "letter-spacing" | "libraries" | "license-draft" | "license-maintenance" | "license-no" | "license-pin" | "license-third-party" | "lifebuoy" | "lift-truck" | "lighthouse" | "limitation" | "limit-order" | "line" | "liner" | "link-02" | "link-03" | "link-05" | "link-06" | "link-backward" | "link-circle" | "link-circle-02" | "linkedin-01" | "link-forward" | "link-square-01" | "list-setting" | "list-view" | "litecoin" | "live-streaming-01" | "live-streaming-02" | "live-streaming-03" | "loading-01" | "loading-04" | "location-02" | "location-03" | "location-04" | "location-05" | "location-06" | "location-07" | "location-08" | "location-09" | "location-10" | "location-add-01" | "location-add-02" | "location-check-01" | "location-check-02" | "location-favourite-01" | "location-favourite-02" | "location-offline-01" | "location-offline-02" | "location-offline-03" | "location-offline-04" | "location-remove-01" | "location-remove-02" | "location-share-01" | "location-share-02" | "location-star-01" | "location-star-02" | "location-update-01" | "location-update-02" | "location-user-01" | "location-user-02" | "location-user-03" | "location-user-04" | "lock" | "lock-computer" | "locked" | "locker" | "locker-01" | "lock-key" | "lock-password" | "lock-sync-01" | "lock-sync-02" | "login-02" | "login-03" | "login-circle-01" | "login-circle-02" | "login-method" | "login-square-01" | "login-square-02" | "logout-02" | "logout-03" | "logout-04" | "logout-05" | "logout-circle-01" | "logout-circle-02" | "logout-square-01" | "logout-square-02" | "lollipop" | "longitude" | "long-sleeve-shirt" | "look-bottom" | "look-left" | "look-right" | "look-top" | "loom" | "lottiefiles" | "love-korean-finger" | "low-signal" | "loyalty-card" | "luggage-01" | "luggage-02" | "lungs" | "machine-robot" | "magic-wand-01" | "magic-wand-02" | "magic-wand-03" | "magic-wand-04" | "magnet" | "magnet-01" | "magnet-02" | "mail-02" | "mail-account-01" | "mail-account-02" | "mail-add-01" | "mail-add-02" | "mail-at-sign-02" | "mail-block-01" | "mail-block-02" | "mailbox" | "mailbox-01" | "mail-download-01" | "mail-download-02" | "mail-edit-02" | "mail-lock-01" | "mail-lock-02" | "mail-love-01" | "mail-love-02" | "mail-minus-01" | "mail-minus-02" | "mail-open" | "mail-open-01" | "mail-open-02" | "mail-open-love" | "mail-receive-01" | "mail-receive-02" | "mail-remove-01" | "mail-remove-02" | "mail-reply-01" | "mail-reply-02" | "mail-reply-all-01" | "mail-reply-all-02" | "mail-search-01" | "mail-search-02" | "mail-secure-01" | "mail-secure-02" | "mail-send-01" | "mail-send-02" | "mail-setting-01" | "mail-setting-02" | "mail-unlock-01" | "mail-unlock-02" | "mail-upload-01" | "mail-upload-02" | "mail-validation-01" | "mail-validation-02" | "mail-voice-01" | "mail-voice-02" | "male-02" | "male-symbol" | "man" | "manager" | "man-woman" | "maping" | "map-pin" | "map-pinpoint-01" | "map-pinpoint-02" | "maps" | "maps-circle-01" | "maps-circle-02" | "maps-editing" | "maps-global-01" | "maps-global-02" | "maps-location-01" | "maps-location-02" | "maps-off" | "maps-refresh" | "maps-square-01" | "maps-square-02" | "market-analysis" | "marketing" | "market-order" | "mask" | "mask-love" | "master-card" | "mastodon" | "matches" | "material-and-texture" | "math" | "matrix" | "maximize-01" | "maximize-02" | "maximize-03" | "maximize-04" | "mayan-pyramid" | "maze" | "medal-01" | "medal-02" | "medal-03" | "medal-04" | "medal-05" | "medal-06" | "medal-07" | "medal-first-place" | "medal-second-place" | "medal-third-place" | "medical-file" | "medical-mask" | "medicine-01" | "medicine-02" | "medicine-bottle-01" | "medicine-bottle-02" | "medicine-syrup" | "medium" | "medium-signal" | "medium-square" | "meeting-room" | "megaphone-01" | "megaphone-02" | "megaphone-03" | "meh" | "mentor" | "mentoring" | "menu-02" | "menu-03" | "menu-04" | "menu-05" | "menu-06" | "menu-07" | "menu-08" | "menu-09" | "menu-10" | "menu-11" | "menu-circle" | "menu-collapse" | "menu-restaurant" | "menu-square" | "menu-two-line" | "message-01" | "message-02" | "message-add-01" | "message-add-02" | "message-blocked" | "message-cancel-01" | "message-cancel-02" | "message-delay-01" | "message-delay-02" | "message-done-01" | "message-done-02" | "message-download-02" | "message-edit-01" | "message-edit-02" | "message-favourite-01" | "message-favourite-02" | "message-incoming-01" | "message-incoming-02" | "message-lock-01" | "message-lock-02" | "message-multiple-01" | "message-multiple-02" | "message-notification-01" | "message-notification-02" | "message-outgoing-01" | "message-outgoing-02" | "message-preview-01" | "message-preview-02" | "message-programming" | "message-question" | "message-search-01" | "message-search-02" | "message-secure-01" | "message-secure-02" | "message-translate" | "message-unlock-01" | "message-unlock-02" | "message-upload-01" | "message-upload-02" | "message-user-01" | "message-user-02" | "messenger" | "meta" | "metro" | "mic-01" | "mic-02" | "mic-off-01" | "mic-off-02" | "microscope" | "microsoft" | "microsoft-admin" | "microwave" | "milk-bottle" | "milk-carton" | "milk-coconut" | "milk-oat" | "minimize-01" | "minimize-02" | "minimize-03" | "minimize-04" | "mining-01" | "mining-02" | "mining-03" | "minus-plus-01" | "minus-plus-02" | "minus-plus-circle-01" | "minus-plus-circle-02" | "minus-plus-square-01" | "minus-plus-square-02" | "minus-sign" | "minus-sign-circle" | "minus-sign-square" | "mirror" | "mirroring-screen" | "mixer" | "mobile-navigator-01" | "mobile-navigator-02" | "mobile-programming-01" | "mobile-programming-02" | "mobile-protection" | "mobile-security" | "mochi" | "modern-tv" | "modern-tv-4-k" | "modern-tv-issue" | "molecules" | "mollie" | "monas" | "money-01" | "money-02" | "money-03" | "money-04" | "money-add-01" | "money-add-02" | "money-bag-01" | "money-bag-02" | "money-exchange-01" | "money-exchange-02" | "money-exchange-03" | "money-not-found-01" | "money-not-found-02" | "money-not-found-03" | "money-not-found-04" | "money-receive-01" | "money-receive-02" | "money-receive-circle" | "money-receive-flow-01" | "money-receive-flow-02" | "money-receive-square" | "money-remove-01" | "money-remove-02" | "money-safe" | "money-saving-jar" | "money-security" | "money-send-01" | "money-send-02" | "money-send-circle" | "money-send-flow-01" | "money-send-flow-02" | "money-send-square" | "monocle" | "monocle-01" | "monster" | "moon" | "moon-01" | "moon-02" | "moon-angled-rain-zap" | "moon-cloud" | "moon-cloud-angled-rain" | "moon-cloud-angled-zap" | "moon-cloud-big-rain" | "moon-cloud-fast-wind" | "moon-cloud-hailstone" | "moon-cloud-little-rain" | "moon-cloud-little-snow" | "moon-cloud-mid-rain" | "moon-cloud-mid-snow" | "moon-cloud-slow-wind" | "moon-cloud-snow" | "moon-eclipse" | "moon-fast-wind" | "moon-landing" | "moonset" | "moon-slow-wind" | "more" | "more-01" | "more-02" | "more-03" | "more-horizontal-circle-01" | "more-horizontal-circle-02" | "more-horizontal-square-01" | "more-horizontal-square-02" | "more-or-less" | "more-or-less-circle" | "more-or-less-square" | "more-vertical" | "more-vertical-circle-01" | "more-vertical-circle-02" | "more-vertical-square-01" | "more-vertical-square-02" | "mortar" | "mortarboard-01" | "mortarboard-02" | "mosque-01" | "mosque-02" | "mosque-03" | "mosque-04" | "mosque-05" | "mosque-location" | "motion-01" | "motion-02" | "motorbike-01" | "motorbike-02" | "mountain" | "mouse-02" | "mouse-03" | "mouse-04" | "mouse-05" | "mouse-06" | "mouse-07" | "mouse-08" | "mouse-09" | "mouse-10" | "mouse-11" | "mouse-12" | "mouse-13" | "mouse-14" | "mouse-15" | "mouse-16" | "mouse-17" | "mouse-18" | "mouse-19" | "mouse-20" | "mouse-21" | "mouse-22" | "mouse-23" | "mouse-left-click-01" | "mouse-left-click-02" | "mouse-left-click-03" | "mouse-left-click-04" | "mouse-left-click-05" | "mouse-left-click-06" | "mouse-right-click-01" | "mouse-right-click-02" | "mouse-right-click-03" | "mouse-right-click-04" | "mouse-right-click-05" | "mouse-right-click-06" | "mouse-scroll-01" | "mouse-scroll-02" | "move" | "move-01" | "move-02" | "move-bottom" | "move-left" | "move-right" | "move-to" | "move-top" | "mp3-01" | "mp-3-02" | "mp-4-01" | "mp-4-02" | "muhammad" | "multiplication-sign" | "multiplication-sign-circle" | "multiplication-sign-square" | "mushroom" | "mushroom-01" | "music-note-02" | "music-note-03" | "music-note-04" | "music-note-square-01" | "muslim" | "mute" | "mymind" | "nano-technology" | "napkins-01" | "napkins-02" | "natural-food" | "navigation-01" | "navigation-02" | "navigation-03" | "navigation-04" | "navigation-05" | "navigator-01" | "navigator-02" | "necklace" | "nerd" | "neural-network" | "neutral" | "new-job" | "new-office" | "new-releases" | "news-01" | "new-twitter-ellipse" | "new-twitter-rectangle" | "next" | "nike" | "nintendo" | "nintendo-switch" | "niqab" | "node-add" | "node-edit" | "node-move-down" | "node-move-up" | "node-remove" | "no-internet" | "no-meeting-room" | "noodles" | "nose" | "no-signal" | "note" | "note-01" | "note-02" | "note-03" | "note-04" | "note-05" | "note-add" | "notebook" | "notebook-01" | "notebook-02" | "note-done" | "note-edit" | "not-equal-sign" | "not-equal-sign-circle" | "not-equal-sign-square" | "note-remove" | "notification-01" | "notification-02" | "notification-block-01" | "notification-block-02" | "notification-block-03" | "notification-bubble" | "notification-circle" | "notification-off-01" | "notification-off-02" | "notification-off-03" | "notification-snooze-01" | "notification-snooze-02" | "notification-snooze-03" | "notification-square" | "notion-01" | "notion-02" | "npm" | "n-th-root" | "n-th-root-circle" | "n-th-root-square" | "nuclear-power" | "nut" | "obtuse" | "octagon" | "octopus" | "office" | "office-365" | "office-chair" | "oil-barrel" | "ok-finger" | "olympic-torch" | "online-learning-01" | "online-learning-02" | "online-learning-03" | "online-learning-04" | "open-caption" | "option" | "orange" | "orbit-01" | "orbit-02" | "organic-food" | "orthogonal-edge" | "oval" | "oven" | "package" | "package-02" | "package-03" | "package-add" | "package-delivered" | "package-dimensions-01" | "package-dimensions-02" | "package-moving" | "package-open" | "package-out-of-stock" | "package-process" | "package-receive" | "package-remove" | "package-search" | "package-sent" | "packaging" | "pacman-01" | "pacman-02" | "paella" | "paint-board" | "paint-brush-01" | "paint-brush-02" | "paint-brush-03" | "paint-brush-04" | "paint-bucket" | "pan-01" | "pan-02" | "pan-03" | "parabola-01" | "parabola-02" | "parabola-03" | "paragliding" | "paragraph" | "paragraph-bullets-point-01" | "paragraph-bullets-point-02" | "paragraph-spacing" | "parallelogram" | "parking-area-circle" | "parking-area-square" | "party" | "passport-expired" | "passport-valid" | "password-validation" | "path" | "pathfinder-crop" | "pathfinder-divide" | "pathfinder-exclude" | "pathfinder-intersect" | "pathfinder-merge" | "pathfinder-minus-back" | "pathfinder-minus-front" | "pathfinder-outline" | "pathfinder-trim" | "pathfinder-unite" | "patient" | "patio" | "pause-circle" | "pavilon" | "pay-by-check" | "payment-01" | "payment-02" | "payment-success-01" | "payment-success-02" | "payoneer" | "paypal" | "pdf-01" | "pdf-02" | "peer-to-peer-01" | "peer-to-peer-02" | "peer-to-peer-03" | "pen-01" | "pen-02" | "pen-connect-bluetooth" | "pen-connect-usb" | "pen-connect-wifi" | "pendulum" | "pensive" | "pentagon" | "pentagon-01" | "pen-tool-01" | "pen-tool-02" | "pen-tool-03" | "pen-tool-add" | "pen-tool-minus" | "percent" | "percent-circle" | "percent-square" | "perfume" | "periscope" | "permanent-job" | "perplexity-ai" | "perspective" | "petrol-pump" | "pexels" | "phone-off-01" | "phone-off-02" | "php" | "physics" | "pi" | "picasa" | "pi-circle" | "pickup-01" | "pickup-02" | "picture-in-picture-exit" | "picture-in-picture-on" | "pie" | "pie-chart" | "pie-chart-01" | "pie-chart-02" | "pie-chart-03" | "pie-chart-04" | "pie-chart-05" | "pie-chart-06" | "pie-chart-07" | "pie-chart-08" | "pie-chart-09" | "pie-chart-square" | "piggy-bank" | "pin-02" | "pin-code" | "pine-tree" | "pin-location-01" | "pin-location-02" | "pin-off" | "pinterest" | "pipeline" | "pisa-tower" | "pi-square" | "pivot" | "pizza-01" | "pizza-02" | "pizza-03" | "pizza-04" | "pizza-cutter" | "plane" | "plant-01" | "plant-02" | "plant-03" | "plant-04" | "plate" | "plaxo" | "play-circle" | "play-circle-02" | "play-list" | "playlist-01" | "playlist-02" | "playlist-03" | "play-list-add" | "play-list-favourite-01" | "play-list-favourite-02" | "play-list-minus" | "play-list-remove" | "play-square" | "play-store" | "plaza" | "plug-01" | "plug-02" | "plug-socket" | "plus-minus" | "plus-minus-01" | "plus-minus-02" | "plus-minus-circle-01" | "plus-minus-circle-02" | "plus-minus-square-01" | "plus-minus-square-02" | "plus-sign-circle" | "plus-sign-square" | "png-01" | "png-02" | "podcast" | "podium" | "pointing-left-01" | "pointing-left-02" | "pointing-left-03" | "pointing-left-04" | "pointing-left-05" | "pointing-left-06" | "pointing-left-07" | "pointing-left-08" | "pointing-right-01" | "pointing-right-02" | "pointing-right-03" | "pointing-right-04" | "pointing-right-05" | "pointing-right-06" | "pointing-right-07" | "pointing-right-08" | "pokeball" | "pokemon" | "police-badge" | "police-cap" | "police-car" | "police-station" | "policy" | "polygon" | "poly-tank" | "pool" | "pool-table" | "poop" | "popcorn" | "pot-01" | "pot-02" | "potion" | "pound" | "pound-circle" | "pound-receive" | "pound-send" | "pound-square" | "power-service" | "power-socket-01" | "power-socket-02" | "ppt-01" | "ppt-02" | "prawn" | "prayer-rug-01" | "prayer-rug-02" | "preference-horizontal" | "preference-vertical" | "prescription" | "presentation-01" | "presentation-02" | "presentation-03" | "presentation-04" | "presentation-05" | "presentation-06" | "presentation-07" | "presentation-bar-chart-01" | "presentation-bar-chart-02" | "presentation-line-chart-01" | "presentation-line-chart-02" | "presentation-online" | "presentation-podium" | "previous" | "printer" | "printer-off" | "prism" | "prism-01" | "prison" | "prisoner" | "prison-guard" | "product-loading" | "profile" | "profile-02" | "profit" | "programming-flag" | "progress" | "progress-01" | "progress-02" | "progress-03" | "progress-04" | "projector" | "projector-01" | "promotion" | "property-add" | "property-delete" | "property-new" | "property-search" | "property-view" | "protection-mask" | "pulley" | "pulse-01" | "pulse-02" | "pulse-rectangle-01" | "pulse-rectangle-02" | "pumpkin" | "punch" | "punching-ball-01" | "punching-ball-02" | "purse" | "purse-01" | "push-up-bar" | "puzzle" | "pyramid" | "pyramid-maslowo" | "pyramid-structure-01" | "pyramid-structure-02" | "python" | "qq-plot" | "qr-code" | "qr-code-01" | "question" | "queue-01" | "queue-02" | "quill-write-01" | "quill-write-02" | "quiz-01" | "quiz-02" | "quiz-03" | "quiz-04" | "quiz-05" | "quora" | "quote-down-circle" | "quote-down-square" | "quotes" | "quote-up" | "quote-up-circle" | "quote-up-square" | "quran-01" | "quran-02" | "quran-03" | "racing-flag" | "radar-01" | "radar-02" | "radial" | "radio" | "radio-01" | "radio-02" | "radioactive-alert" | "radio-button" | "radius" | "rain" | "rainbow" | "rain-double-drop" | "rain-drop" | "ramadhan-01" | "ramadhan-02" | "ramadhan-month" | "ranking" | "raw-01" | "raw-02" | "re" | "re:" | "react" | "real-estate-01" | "real-estate-02" | "receipt-dollar" | "record" | "recovery-mail" | "rectangular" | "rectangular-01" | "recycle-01" | "recycle-02" | "recycle-03" | "reddit" | "redo" | "redo-02" | "redo-03" | "reflex" | "refrigerator" | "register" | "registered" | "relieved-01" | "relieved-02" | "reload" | "reminder" | "remote-control" | "remove-circle" | "remove-circle-half-dot" | "remove-female" | "remove-male" | "remove-pi" | "remove-square" | "renewable-energy" | "renewable-energy-01" | "repair" | "repeat" | "repeat-off" | "repeat-one-01" | "repeat-one-02" | "replay" | "repository" | "reset-password" | "resize-01" | "resize-02" | "resize-field" | "resize-field-rectangle" | "resources-add" | "resources-remove" | "restaurant" | "restaurant-01" | "restaurant-02" | "restaurant-03" | "restaurant-table" | "restore-bin" | "return-request" | "reverse-withdrawal-01" | "reverse-withdrawal-02" | "rhombus" | "rhombus-01" | "rice-bowl-01" | "rice-bowl-02" | "right-angle" | "right-to-left-block-quote" | "right-to-left-list-bullet" | "right-to-left-list-dash" | "right-to-left-list-number" | "right-to-left-list-triangle" | "right-triangle" | "ripple" | "riyal" | "riyal-rectangle" | "road" | "road-01" | "road-02" | "road-location-01" | "road-location-02" | "road-wayside" | "robot-01" | "robot-02" | "robotic" | "rocket" | "rocket-01" | "rocket-02" | "rocking-chair" | "rocking-horse" | "roller-skate" | "rolling-pin" | "root-01" | "root-02" | "root-1st-bracket" | "root-2nd-bracket" | "root-3rd-bracket" | "root-circle" | "rotate-01" | "rotate-02" | "rotate-360" | "rotate-bottom-left" | "rotate-bottom-right" | "rotate-clockwise" | "rotate-crop" | "rotate-left-01" | "rotate-left-02" | "rotate-left-03" | "rotate-left-04" | "rotate-left-05" | "rotate-left-06" | "rotate-right-01" | "rotate-right-02" | "rotate-right-03" | "rotate-right-04" | "rotate-right-05" | "rotate-right-06" | "rotate-square" | "rotate-top-left" | "rotate-top-right" | "route-01" | "route-02" | "route-03" | "route-block" | "router" | "router-01" | "router-02" | "row-delete" | "row-insert" | "rss" | "rss-connected-01" | "rss-connected-02" | "rss-error" | "rss-locked" | "rss-unlocked" | "rubber-duck" | "rub-el-hizb" | "rubik's-cube" | "rubiks-cube" | "ruku" | "ruler" | "running-shoes" | "sad-01" | "sad-02" | "sad-dizzy" | "safari" | "safe" | "safe-delivery-01" | "safe-delivery-02" | "safety-pin-01" | "safety-pin-02" | "sailboat-coastal" | "sailboat-offshore" | "sakura" | "salah" | "salah-time" | "sale-tag-01" | "sale-tag-02" | "sandals" | "satellite" | "satellite-01" | "satellite-02" | "satellite-03" | "saturn" | "saturn-01" | "saturn-02" | "sausage" | "save-energy-01" | "save-energy-02" | "save-money-euro" | "save-money-pound" | "save-money-yen" | "savings" | "scheme" | "school" | "school-01" | "school-bell-01" | "school-bell-02" | "school-bus" | "school-report-card" | "school-tie" | "scissor" | "scissor-01" | "scissor-rectangle" | "scooter-01" | "scooter-02" | "scooter-03" | "scooter-04" | "scooter-electric" | "scratch-card" | "screen-add-to-home" | "screen-lock-rotation" | "screen-rotation" | "scribd" | "scroll" | "scroll-horizontal" | "scroll-vertical" | "sd-card" | "seal" | "search-02" | "search-add" | "search-area" | "search-circle" | "search-dollar" | "search-focus" | "searching" | "search-list-01" | "search-list-02" | "search-minus" | "search-remove" | "search-replace" | "search-square" | "search-visual" | "seat-selector" | "secured-network" | "security" | "security-block" | "security-key-usb" | "security-lock" | "security-password" | "security-validation" | "security-wifi" | "segment" | "select-01" | "select-02" | "self-transfer" | "semi-truck" | "sending-order" | "send-to-mobile" | "senseless" | "sent-02" | "server-stack-01" | "server-stack-02" | "server-stack-03" | "service" | "serving-food" | "setting-06" | "setting-07" | "setting-done-01" | "setting-done-02" | "setting-done-03" | "setting-done-04" | "setting-error-03" | "setting-error-04" | "settings-01" | "settings-03" | "settings-04" | "settings-05" | "settings-error-01" | "settings-error-02" | "setup-01" | "setup-02" | "shaka-01" | "shaka-02" | "shaka-03" | "shaka-04" | "shampoo" | "shape-collection" | "shapes" | "share-01" | "share-02" | "share-03" | "share-04" | "share-06" | "share-07" | "share-08" | "shared-wifi" | "share-knowledge" | "share-location-01" | "share-location-02" | "sharing" | "shellfish" | "sheriff-01" | "sheriff-02" | "shield-01" | "shield-02" | "shield-blockchain" | "shield-energy" | "shield-key" | "shield-user" | "shipment-tracking" | "shipping-center" | "shipping-loading" | "shipping-truck-01" | "shipping-truck-02" | "shocked" | "shopify" | "shopping-bag-01" | "shopping-bag-02" | "shopping-bag-03" | "shopping-bag-add" | "shopping-bag-check" | "shopping-bag-favorite" | "shopping-bag-remove" | "shopping-basket-01" | "shopping-basket-02" | "shopping-basket-03" | "shopping-basket-add-01" | "shopping-basket-add-02" | "shopping-basket-add-03" | "shopping-basket-check-in-01" | "shopping-basket-check-in-02" | "shopping-basket-check-in-03" | "shopping-basket-check-out-01" | "shopping-basket-check-out-02" | "shopping-basket-check-out-03" | "shopping-basket-done-01" | "shopping-basket-done-02" | "shopping-basket-done-03" | "shopping-basket-favorite-01" | "shopping-basket-favorite-02" | "shopping-basket-favorite-03" | "shopping-basket-remove-01" | "shopping-basket-remove-02" | "shopping-basket-remove-03" | "shopping-basket-secure-01" | "shopping-basket-secure-02" | "shopping-basket-secure-03" | "shopping-cart-01" | "shopping-cart-02" | "shopping-cart-add-01" | "shopping-cart-add-02" | "shopping-cart-check-01" | "shopping-cart-check-02" | "shopping-cart-check-in-01" | "shopping-cart-check-in-02" | "shopping-cart-check-out-01" | "shopping-cart-check-out-02" | "shopping-cart-favorite-01" | "shopping-cart-favorite-02" | "shopping-cart-remove-01" | "shopping-cart-remove-02" | "shop-sign" | "shorts-pants" | "shoulder" | "shuffle" | "shuffle-square" | "shut-down" | "shutterstock" | "sidebar-bottom" | "sidebar-left" | "sidebar-left-01" | "sidebar-right" | "sidebar-right-01" | "sidebar-top" | "signal" | "signal-full-01" | "signal-full-02" | "signal-low-01" | "signal-low-02" | "signal-low-medium" | "signal-medium-01" | "signal-medium-02" | "signal-no-01" | "signal-no-02" | "signature" | "sign-language-c" | "silence" | "simcard-01" | "simcard-02" | "simcard-dual" | "sin" | "sine-01" | "sine-02" | "sing-left" | "sing-right" | "sink-01" | "sink-02" | "siri" | "siri-new" | "sketch" | "skew" | "ski" | "skipping-rope" | "skool" | "skull" | "skype" | "slack" | "sleeping" | "sleeveless" | "sliders-horizontal" | "sliders-vertical" | "slideshare" | "slow-winds" | "smart" | "smart-ac" | "smart-phone-02" | "smart-phone-03" | "smart-phone-04" | "smart-phone-landscape" | "smartphone-lost-wifi" | "smartphone-wifi" | "smart-watch-01" | "smart-watch-02" | "smart-watch-03" | "smart-watch-04" | "smile" | "smile-dizzy" | "sms-code" | "snail" | "snapchat" | "snow" | "socks" | "soda-can" | "sofa-01" | "sofa-02" | "sofa-03" | "sofa-single" | "soft-drink-01" | "soft-drink-02" | "software" | "software-license" | "software-uninstall" | "soil-moisture-field" | "soil-moisture-global" | "soil-temperature-field" | "soil-temperature-global" | "solar-energy" | "solar-panel-01" | "solar-panel-02" | "solar-panel-03" | "solar-panel-04" | "solar-panel-05" | "solar-power" | "solar-system" | "solar-system-01" | "solid-line-01" | "solid-line-02" | "sort-by-down-01" | "sort-by-down-02" | "sort-by-up-01" | "sort-by-up-02" | "sorting-01" | "sorting-02" | "sorting-03" | "sorting-04" | "sorting-05" | "sorting-1-9" | "sorting-9-1" | "sorting-a-z-01" | "sorting-a-z-02" | "sorting-down" | "sorting-up" | "sorting-z-a-01" | "source-code" | "source-code-circle" | "source-code-square" | "spaceship" | "spades" | "spaghetti" | "spam" | "sparkles" | "spartan-helmet" | "spatula" | "speaker" | "speaker-01" | "speech-to-text" | "speed-train-01" | "speed-train-02" | "sperm" | "sphere" | "spirals" | "spoon" | "spoon-and-fork" | "spoon-and-knife" | "sql" | "square" | "square-01" | "square-arrow-data-transfer-diagonal" | "square-arrow-data-transfer-horizontal" | "square-arrow-data-transfer-vertical" | "square-arrow-diagonal-01" | "square-arrow-diagonal-02" | "square-arrow-down-01" | "square-arrow-down-02" | "square-arrow-down-03" | "square-arrow-down-double" | "square-arrow-down-left" | "square-arrow-down-right" | "square-arrow-expand-01" | "square-arrow-expand-02" | "square-arrow-horizontal" | "square-arrow-left-01" | "square-arrow-left-02" | "square-arrow-left-03" | "square-arrow-left-double" | "square-arrow-left-right" | "square-arrow-move-down-left" | "square-arrow-move-down-right" | "square-arrow-move-left-down" | "square-arrow-move-left-up" | "square-arrow-move-right-down" | "square-arrow-move-right-up" | "square-arrow-reload-01" | "square-arrow-reload-02" | "square-arrow-right-01" | "square-arrow-right-02" | "square-arrow-right-03" | "square-arrow-right-double" | "square-arrow-shrink-01" | "square-arrow-shrink-02" | "square-arrow-up-01" | "square-arrow-up-02" | "square-arrow-up-03" | "square-arrow-up-double" | "square-arrow-up-down" | "square-arrow-up-left" | "square-arrow-up-right" | "square-arrow-up-right-02" | "square-arrow-vertical" | "square-circle" | "square-lock-01" | "square-lock-02" | "square-lock-add-01" | "square-lock-add-02" | "square-lock-check-01" | "square-lock-check-02" | "square-lock-minus-01" | "square-lock-minus-02" | "square-lock-password" | "square-lock-remove-01" | "square-lock-remove-02" | "square-root-square" | "square-square" | "square-unlock-01" | "square-unlock-02" | "stack-star" | "stake" | "stamp" | "stamp-01" | "stamp-02" | "star-award-01" | "star-award-02" | "star-circle" | "star-face" | "star-half" | "star-off" | "stars" | "star-square" | "start-up-01" | "start-up-02" | "stationery" | "status" | "steak" | "steering" | "step-into" | "step-out" | "step-over" | "stethoscope" | "stethoscope-02" | "sticky-note-01" | "sticky-note-02" | "sticky-note-03" | "stop" | "stop-circle" | "stop-loss-order" | "stop-watch" | "store-01" | "store-02" | "store-03" | "store-04" | "store-add-01" | "store-add-02" | "store-location-01" | "store-location-02" | "store-management-01" | "store-management-02" | "store-remove-01" | "store-remove-02" | "store-verified-01" | "store-verified-02" | "straight-edge" | "strategy" | "streering-wheel" | "street-food" | "stripe" | "stroke-bottom" | "stroke-center" | "stroke-inside" | "stroke-left" | "stroke-outside" | "stroke-right" | "stroke-top" | "structure-01" | "structure-02" | "structure-03" | "structure-04" | "structure-05" | "structure-add" | "structure-check" | "structure-fail" | "structure-folder" | "structure-folder-circle" | "student" | "student-card" | "students" | "study-desk" | "study-lamp" | "stumbleupon" | "submarine" | "submerge" | "subnode-add" | "subnode-delete" | "subpoena" | "subtitle" | "suit-01" | "suit-02" | "sujood" | "summation-01" | "summation-02" | "summation-circle" | "summation-square" | "sun-01" | "sun-02" | "sun-03" | "sun-cloud-01" | "sun-cloud-02" | "sun-cloud-angled-rain-01" | "sun-cloud-angled-rain-02" | "sun-cloud-angled-rain-zap-01" | "sun-cloud-angled-rain-zap-02" | "sun-cloud-angled-zap-01" | "sun-cloud-angled-zap-02" | "sun-cloud-big-rain-01" | "sun-cloud-big-rain-02" | "sun-cloud-fast-wind-01" | "sun-cloud-fast-wind-02" | "sun-cloud-hailstone-01" | "sun-cloud-hailstone-02" | "sun-cloud-little-rain-01" | "sun-cloud-little-rain-02" | "sun-cloud-little-snow-01" | "sun-cloud-little-snow-02" | "sun-cloud-mid-rain-01" | "sun-cloud-mid-rain-02" | "sun-cloud-mid-snow-01" | "sun-cloud-mid-snow-02" | "sun-cloud-slow-wind-01" | "sun-cloud-slow-wind-02" | "sun-cloud-snow-01" | "sun-cloud-snow-02" | "sunglasses" | "sunrise" | "sunset" | "super-mario" | "super-mario-toad" | "surfboard" | "surprise" | "sushi-01" | "sushi-02" | "sushi-03" | "suspicious" | "sustainable-energy" | "svg-01" | "svg-02" | "swarm" | "swatch" | "swimming" | "swimming-cap" | "swipe-down-01" | "swipe-down-02" | "swipe-down-03" | "swipe-down-04" | "swipe-down-05" | "swipe-down-06" | "swipe-down-07" | "swipe-down-08" | "swipe-left-01" | "swipe-left-02" | "swipe-left-03" | "swipe-left-04" | "swipe-left-05" | "swipe-left-06" | "swipe-left-07" | "swipe-left-08" | "swipe-left-09" | "swipe-right-01" | "swipe-right-02" | "swipe-right-03" | "swipe-right-04" | "swipe-right-05" | "swipe-right-06" | "swipe-right-07" | "swipe-right-08" | "swipe-right-09" | "swipe-up-01" | "swipe-up-02" | "swipe-up-03" | "swipe-up-04" | "swipe-up-05" | "swipe-up-06" | "swipe-up-07" | "swipe-up-08" | "sword-01" | "sword-02" | "sword-03" | "system-update-01" | "system-update-02" | "table" | "table-01" | "table-02" | "table-03" | "table-lamp-01" | "table-lamp-02" | "table-round" | "tablet-01" | "tablet-02" | "tablet-connected-bluetooth" | "tablet-connected-usb" | "tablet-connected-wifi" | "table-tennis-bat" | "tablet-pen" | "taco-01" | "taco-02" | "tag-02" | "taj-mahal" | "tan" | "tanker-truck" | "tank-top" | "tap-01" | "tap-02" | "tap-03" | "tap-04" | "tap-05" | "tap-06" | "tap-07" | "tap-08" | "tape-measure" | "target-01" | "target-02" | "target-03" | "target-dollar" | "tasbih" | "task-02" | "task-add-02" | "task-daily-01" | "task-daily-02" | "task-done-02" | "task-edit-02" | "task-remove-01" | "task-remove-02" | "taxes" | "taxi" | "taxi-02" | "tea" | "teacher" | "teaching" | "teamviewer" | "tea-pod" | "telegram" | "telephone" | "telescope-01" | "telescope-02" | "television-table" | "temperature" | "tennis-ball" | "terrace" | "test-tube" | "test-tube-01" | "test-tube-02" | "test-tube-03" | "tetris" | "text" | "text-align-center" | "text-align-justify-center" | "text-align-justify-left" | "text-align-justify-right" | "text-align-left" | "text-align-left-01" | "text-align-right" | "text-align-right-01" | "text-all-caps" | "text-bold" | "text-centerline-center-top" | "text-centerline-left" | "text-centerline-middle" | "text-centerline-right" | "text-check" | "text-circle" | "text-clear" | "text-color" | "text-creation" | "text-firstline-left" | "text-firstline-right" | "text-footnote" | "text-indent" | "text-indent-01" | "text-indent-less" | "text-indent-more" | "text-italic" | "text-italic-slash" | "text-kerning" | "text-number-sign" | "text-selection" | "text-smallcaps" | "text-square" | "text-strikethrough" | "text-subscript" | "text-superscript" | "text-tracking" | "text-underline" | "text-variable-front" | "text-vertical-alignment" | "text-wrap" | "the-prophets-mosque" | "thermometer" | "thermometer-cold" | "thermometer-warm" | "thread" | "threads-ellipse" | "threads-rectangle" | "three-finger-01" | "three-finger-02" | "three-finger-03" | "three-finger-04" | "three-finger-05" | "thumbs-down" | "thumbs-down-ellipse" | "thumbs-down-rectangle" | "thumbs-up" | "thumbs-up-down" | "thumbs-up-ellipse" | "thumbs-up-rectangle" | "tick-02" | "tick-03" | "tick-04" | "tick-double-01" | "tick-double-02" | "tick-double-03" | "tick-double-04" | "ticket-02" | "ticket-03" | "ticket-star" | "tic-tac-toe" | "tie" | "tiltify" | "time-01" | "time-03" | "time-04" | "time-half-pass" | "time-management" | "time-management-circle" | "time-quarter" | "time-quarter-02" | "time-quarter-pass" | "timer-01" | "timer-02" | "time-schedule" | "time-setting-01" | "time-setting-02" | "time-setting-03" | "tips" | "tire" | "tired-01" | "tired-02" | "tissue-paper" | "toggle-off" | "toggle-on" | "toilet-01" | "toilet-02" | "token-circle" | "token-square" | "tongue" | "tongue-01" | "tongue-wink-left" | "tongue-wink-right" | "tools" | "tornado-01" | "tornado-02" | "torri-gate" | "touch-01" | "touch-02" | "touch-03" | "touch-04" | "touch-05" | "touch-06" | "touch-07" | "touch-08" | "touch-09" | "touch-10" | "touch-interaction-01" | "touch-interaction-02" | "touch-interaction-03" | "touch-interaction-04" | "touch-locked-01" | "touch-locked-02" | "touch-locked-03" | "touch-locked-04" | "touchpad-01" | "touchpad-02" | "touchpad-03" | "touchpad-04" | "towels" | "tow-truck" | "toy-train" | "tractor" | "trade-down" | "trade-mark" | "trademark" | "trade-up" | "traffic-incident" | "traffic-jam-01" | "traffic-jam-02" | "train-01" | "train-02" | "tram" | "trampoline" | "transaction" | "transition-bottom" | "transition-left" | "transition-right" | "transition-top" | "translate" | "translation" | "transmission" | "transparency" | "trapezoid-line-horizontal" | "trapezoid-line-vertical" | "travel-bag" | "treadmill-01" | "treadmill-02" | "treatment" | "tree-01" | "tree-02" | "tree-03" | "tree-04" | "tree-05" | "tree-06" | "tree-07" | "trello" | "triangle" | "triangle-01" | "triangle-02" | "triangle-03" | "trolley-01" | "trolley-02" | "tropical-storm" | "tropical-storm-tracks-01" | "tropical-storm-tracks-02" | "truck" | "truck-delivery" | "truck-monster" | "truck-return" | "trulli" | "t-shirt" | "tsunami" | "tulip" | "tumblr" | "turtle-neck" | "tv-01" | "tv-02" | "tv-fix" | "tv-issue" | "tv-smart" | "twin-tower" | "twitch" | "twitter-square" | "two-factor-access" | "two-finger-01" | "two-finger-02" | "two-finger-03" | "two-finger-04" | "two-finger-05" | "txt-01" | "txt-02" | "type-cursor" | "typescript-01" | "typescript-02" | "typescript-03" | "uber" | "ufo" | "ufo-01" | "umbrella" | "umbrella-dollar" | "unamused" | "underpants-01" | "underpants-02" | "underpants-03" | "undo" | "undo-02" | "undo-03" | "unfold-less" | "unfold-more" | "ungroup-items" | "ungroup-layers" | "unhappy" | "universal-access" | "universal-access-circle" | "university" | "unlink-01" | "unlink-02" | "unlink-03" | "unlink-04" | "unlink-05" | "unlink-06" | "unsplash" | "upload-01" | "upload-02" | "upload-03" | "upload-04" | "upload-05" | "upload-circle-01" | "upload-circle-02" | "upload-square-01" | "upload-square-02" | "upwork" | "usb" | "usb-bugs" | "usb-connected-01" | "usb-connected-02" | "usb-connected-03" | "usb-error" | "usb-memory-01" | "usb-memory-02" | "usb-not-connected-01" | "usb-not-connected-02" | "user-02" | "user-03" | "user-account" | "user-add-01" | "user-add-02" | "user-arrow-left-right" | "user-block-01" | "user-block-02" | "user-check-01" | "user-check-02" | "user-circle" | "user-circle-02" | "user-edit-01" | "user-full-view" | "user-group" | "user-group-02" | "user-group-03" | "user-id-verification" | "user-list" | "user-lock-01" | "user-lock-02" | "user-love-01" | "user-love-02" | "user-minus-01" | "user-minus-02" | "user-multiple" | "user-multiple-03" | "user-question-01" | "user-question-02" | "user-remove-01" | "user-remove-02" | "user-roadside" | "user-search-01" | "user-search-02" | "user-settings-01" | "user-settings-02" | "user-sharing" | "user-shield-02" | "user-square" | "user-star-01" | "user-star-02" | "user-status" | "user-story" | "user-switch" | "user-unlock-01" | "user-unlock-02" | "uv-01" | "uv-02" | "uv-03" | "vaccine" | "validation" | "validation-approval" | "van" | "variable" | "vegetarian-food" | "versus" | "vertical-resize" | "vertical-scroll-point" | "vest" | "victory-finger-01" | "victory-finger-02" | "victory-finger-03" | "video-console" | "video-off" | "video-replay" | "view-off" | "view-off-slash" | "vine" | "vine-square" | "vintage-clock" | "virtual-reality-vr-01" | "virtual-reality-vr-02" | "vision" | "vk" | "vk-square" | "voice" | "voice-id" | "volleyball" | "volume-high" | "volume-low" | "volume-minus" | "volume-mute-02" | "volume-up" | "vomiting" | "voucher" | "vr" | "vr-glasses" | "vynil-01" | "vynil-02" | "vynil-03" | "waiter" | "waiters" | "wallet-01" | "wallet-02" | "wallet-03" | "wallet-04" | "wallet-05" | "wallet-add-01" | "wallet-add-02" | "wallet-done-01" | "wallet-done-02" | "wallet-not-found-01" | "wallet-not-found-02" | "wallet-remove-01" | "wallet-remove-02" | "wall-lamp" | "wanted" | "wardrobe-01" | "wardrobe-02" | "wardrobe-03" | "wardrobe-04" | "warehouse" | "washington-monument" | "waste" | "waste-restore" | "watch-01" | "watch-02" | "water-energy" | "waterfall-down-01" | "waterfall-down-03" | "waterfall-up-01" | "waterfall-up-02" | "watermelon" | "water-polo" | "water-pump" | "wattpad" | "wattpad-square" | "waving-hand-02" | "waze" | "web-design-01" | "web-design-02" | "webflow" | "webflow-ellipse" | "webflow-rectangle" | "webhook" | "web-programming" | "web-protection" | "web-security" | "web-validation" | "wechat" | "wedding" | "weight-scale" | "weight-scale-01" | "wellness" | "whatsapp" | "whatsapp-business" | "wheelchair" | "whisk" | "whistle" | "whiteboard" | "wifi-01" | "wifi-02" | "wifi-circle" | "wifi-connected-01" | "wifi-connected-03" | "wifi-disconnected-01" | "wifi-disconnected-02" | "wifi-disconnected-03" | "wifi-disconnected-04" | "wifi-error-01" | "wifi-error-02" | "wifi-full-signal" | "wifi-location" | "wifi-lock" | "wifi-low-signal" | "wifi-medium-signal" | "wifi-no-signal" | "wifi-off-01" | "wifi-off-02" | "wifi-square" | "wifi-unlock" | "wikipedia" | "windows-new" | "windows-old" | "wind-power" | "wind-power-01" | "wind-power-02" | "wind-power-03" | "wind-surf" | "wind-turbine" | "wink" | "winking" | "wireless" | "wireless-cloud-access" | "wise" | "woman" | "wordpress" | "work" | "work-alert" | "workflow-circle-01" | "workflow-circle-02" | "workflow-circle-03" | "workflow-circle-04" | "workflow-circle-05" | "workflow-circle-06" | "workflow-square-01" | "workflow-square-02" | "workflow-square-03" | "workflow-square-04" | "workflow-square-05" | "workflow-square-06" | "workflow-square-07" | "workflow-square-08" | "workflow-square-09" | "workflow-square-10" | "work-history" | "workout-battle-ropes" | "workout-gymnastics" | "workout-kicking" | "workout-run" | "workout-sport" | "workout-squats" | "workout-stretching" | "workout-warm-up" | "work-update" | "worry" | "wps-office" | "wps-office-rectangle" | "wrench-01" | "wrench-02" | "wudu" | "xing" | "xls-01" | "xls-02" | "xml-01" | "xml-02" | "x-ray" | "xsl-01" | "xsl-02" | "x-variable" | "x-variable-circle" | "x-variable-square" | "yelp" | "yen" | "yen-circle" | "yen-receive" | "yen-send" | "yen-square" | "yoga-01" | "yoga-02" | "yoga-03" | "yoga-ball" | "yoga-mat" | "yogurt" | "yurt" | "zakat" | "zeppelin" | "zip-01" | "zip-02" | "zoom" | "zoom-circle" | "zoom-in-area" | "zoom-out-area" | "zoom-square" | "zsh" | "zzz"

export type IconArray = {name: IconName, variant?: IconVariant}

export default function HugeIcon({ name, variant, size, color, weight, clickOption }: { name: IconName, variant?: IconVariant, size?: any, color?: string, weight?: any, [key: string]: any, clickOption?: any }) {
    const options = { size: size ? size : undefined, color: color ? color : "currentColor", strokeWidth: weight ? weight : undefined}

    const getIcon: any = 
        name === "file-unknown" && !variant ? FileUnknownStrokeRounded 
            : name === "file-unknown" && variant === "solid" ? FileUnknownSolidRounded 
            : name === "file-unknown" && variant === "bulk" ? FileUnknownBulkRounded 
            : name === "file-unknown" && variant === "twotone" ? FileUnknownTwotoneRounded
            : name === "file-unknown" && variant === "duotone" ? FileUnknownDuotoneRounded 
        : name === "bluesky" && !variant ? BlueskyStrokeRounded 
            : name === "bluesky" && variant === "solid" ? BlueskySolidRounded 
            : name === "bluesky" && variant === "bulk" ? BlueskyBulkRounded 
            : name === "bluesky" && variant === "twotone" ? BlueskyTwotoneRounded
            : name === "bluesky" && variant === "duotone" ? BlueskyDuotoneRounded
        : name === "mouse-01" && !variant ? Mouse01StrokeRounded 
            : name === "mouse-01" && variant === "solid" ? Mouse01SolidRounded 
            : name === "mouse-01" && variant === "bulk" ? Mouse01BulkRounded 
            : name === "mouse-01" && variant === "twotone" ? Mouse01TwotoneRounded
            : name === "mouse-01" && variant === "duotone" ? Mouse01DuotoneRounded
        : name === "file-attachment" && !variant ? FileAttachmentStrokeRounded 
            : name === "file-attachment" && variant === "solid" ? FileAttachmentSolidRounded 
            : name === "file-attachment" && variant === "bulk" ? FileAttachmentBulkRounded 
            : name === "file-attachment" && variant === "twotone" ? FileAttachmentTwotoneRounded
            : name === "file-attachment" && variant === "duotone" ? FileAttachmentDuotoneRounded
        : name === "logout-01" && !variant ? Logout01StrokeRounded 
            : name === "logout-01" && variant === "solid" ? Logout01SolidRounded 
            : name === "logout-01" && variant === "bulk" ? Logout01BulkRounded 
            : name === "logout-01" && variant === "twotone" ? Logout01TwotoneRounded
            : name === "logout-01" && variant === "duotone" ? Logout01DuotoneRounded
        : name === "more-horizontal" && !variant ? MoreHorizontalStrokeRounded 
            : name === "more-horizontal" && variant === "solid" ? MoreHorizontalSolidRounded 
            : name === "more-horizontal" && variant === "bulk" ? MoreHorizontalBulkRounded 
            : name === "more-horizontal" && variant === "twotone" ? MoreHorizontalTwotoneRounded
            : name === "more-horizontal" && variant === "duotone" ? MoreHorizontalDuotoneRounded
        : name === "check-list" && !variant ? CheckListStrokeRounded 
            : name === "check-list" && variant === "solid" ? CheckListSolidRounded 
            : name === "check-list" && variant === "bulk" ? CheckListBulkRounded 
            : name === "check-list" && variant === "twotone" ? CheckListTwotoneRounded
            : name === "check-list" && variant === "duotone" ? CheckListDuotoneRounded
        : name === "arrow-down-right-01" && !variant ? ArrowDownRight01StrokeRounded 
            : name === "arrow-down-right-01" && variant === "solid" ? ArrowDownRight01SolidRounded 
            : name === "arrow-down-right-01" && variant === "bulk" ? ArrowDownRight01BulkRounded 
            : name === "arrow-down-right-01" && variant === "twotone" ? ArrowDownRight01TwotoneRounded
            : name === "arrow-down-right-01" && variant === "duotone" ? ArrowDownRight01DuotoneRounded
        : name === "left-to-right-block-quote" && !variant ? LeftToRightBlockQuoteStrokeRounded 
            : name === "left-to-right-block-quote" && variant === "solid" ? LeftToRightBlockQuoteSolidRounded 
            : name === "left-to-right-block-quote" && variant === "bulk" ? LeftToRightBlockQuoteBulkRounded 
            : name === "left-to-right-block-quote" && variant === "twotone" ? LeftToRightBlockQuoteTwotoneRounded
            : name === "left-to-right-block-quote" && variant === "duotone" ? LeftToRightBlockQuoteDuotoneRounded
        : name === "youtube" && !variant ? YoutubeStrokeRounded 
            : name === "youtube" && variant === "solid" ? YoutubeSolidRounded 
            : name === "youtube" && variant === "bulk" ? YoutubeBulkRounded 
            : name === "youtube" && variant === "twotone" ? YoutubeTwotoneRounded
            : name === "youtube" && variant === "duotone" ? YoutubeDuotoneRounded 
        : name === "mail-edit-01" && !variant ? MailEdit01StrokeRounded 
            : name === "mail-edit-01" && variant === "solid" ? MailEdit01SolidRounded 
            : name === "mail-edit-01" && variant === "bulk" ? MailEdit01BulkRounded 
            : name === "mail-edit-01" && variant === "twotone" ? MailEdit01TwotoneRounded
            : name === "mail-edit-01" && variant === "duotone" ? MailEdit01DuotoneRounded 
        : name === "video-01" && !variant ? Video01StrokeRounded 
            : name === "video-01" && variant === "solid" ? Video01SolidRounded 
            : name === "video-01" && variant === "bulk" ? Video01BulkRounded 
            : name === "video-01" && variant === "twotone" ? Video01TwotoneRounded
            : name === "video-01" && variant === "duotone" ? Video01DuotoneRounded 
        : name === "video-02" && !variant ? Video02StrokeRounded 
            : name === "video-02" && variant === "solid" ? Video02SolidRounded 
            : name === "video-02" && variant === "bulk" ? Video02BulkRounded 
            : name === "video-02" && variant === "twotone" ? Video02TwotoneRounded                
            : name === "video-02" && variant === "duotone" ? Video02DuotoneRounded 
        : name === "mail-at-sign-01" && !variant ? MailAtSign01StrokeRounded 
            : name === "mail-at-sign-01" && variant === "solid" ? MailAtSign01SolidRounded 
            : name === "mail-at-sign-01" && variant === "bulk" ? MailAtSign01BulkRounded 
            : name === "mail-at-sign-01" && variant === "twotone" ? MailAtSign01TwotoneRounded                
            : name === "mail-at-sign-01" && variant === "duotone" ? MailAtSign01DuotoneRounded 
        : name === "arrow-all-direction" && !variant ? ArrowAllDirectionStrokeRounded 
            : name === "arrow-all-direction" && variant === "solid" ? ArrowAllDirectionSolidRounded 
            : name === "arrow-all-direction" && variant === "bulk" ? ArrowAllDirectionBulkRounded 
            : name === "arrow-all-direction" && variant === "twotone" ? ArrowAllDirectionTwotoneRounded                
            : name === "arrow-all-direction" && variant === "duotone" ? ArrowAllDirectionDuotoneRounded
        : name === "arrow-up-right-01" && !variant ? ArrowUpRight01StrokeRounded
            : name === "arrow-up-right-01" && variant === "solid" ? ArrowUpRight01SolidRounded
            : name === "arrow-up-right-01" && variant === "bulk" ? ArrowUpRight01BulkRounded
            : name === "arrow-up-right-01" && variant === "twotone" ? ArrowUpRight01TwotoneRounded
            : name === "arrow-up-right-01" && variant === "duotone" ? ArrowUpRight01DuotoneRounded
        : name === "link-square-02" && !variant ? LinkSquare02StrokeRounded
            : name === "link-square-02" && variant === "solid" ? LinkSquare02SolidRounded
            : name === "link-square-02" && variant === "bulk" ? LinkSquare02BulkRounded
            : name === "link-square-02" && variant === "twotone" ? LinkSquare02TwotoneRounded
            : name === "link-square-02" && variant === "duotone" ? LinkSquare02DuotoneRounded
        : name === "home-01" && !variant ? Home01StrokeRounded
            : name === "home-01" && variant === "solid" ? Home01SolidRounded
            : name === "home-01" && variant === "bulk" ? Home01BulkRounded
            : name === "home-01" && variant === "twotone" ? Home01TwotoneRounded
            : name === "home-01" && variant === "duotone" ? Home01DuotoneRounded
        : name === "refresh" && !variant ? RefreshStrokeRounded
            : name === "refresh" && variant === "solid" ? RefreshSolidRounded
            : name === "refresh" && variant === "bulk" ? RefreshBulkRounded
            : name === "refresh" && variant === "twotone" ? RefreshTwotoneRounded
            : name === "refresh" && variant === "duotone" ? RefreshDuotoneRounded
        : name === "album-02" && !variant ? Album02StrokeRounded
            : name === "album-02" && variant === "solid" ? Album02SolidRounded
            : name === "album-02" && variant === "bulk" ? Album02BulkRounded
            : name === "album-02" && variant === "twotone" ? Album02TwotoneRounded
            : name === "album-02" && variant === "duotone" ? Album02DuotoneRounded
        : name === "alert-diamond" && !variant ? AlertDiamondStrokeRounded
            : name === "alert-diamond" && variant === "solid" ? AlertDiamondSolidRounded
            : name === "alert-diamond" && variant === "bulk" ? AlertDiamondBulkRounded
            : name === "alert-diamond" && variant === "twotone" ? AlertDiamondTwotoneRounded
            : name === "alert-diamond" && variant === "duotone" ? AlertDiamondDuotoneRounded
        : name === "camera-video" && !variant ? CameraVideoStrokeRounded
            : name === "camera-video" && variant === "solid" ? CameraVideoSolidRounded
            : name === "camera-video" && variant === "bulk" ? CameraVideoBulkRounded
            : name === "camera-video" && variant === "twotone" ? CameraVideoTwotoneRounded
            : name === "camera-video" && variant === "duotone" ? CameraVideoDuotoneRounded
        : name === "chatting-01" && !variant ? Chatting01StrokeRounded
            : name === "chatting-01" && variant === "solid" ? Chatting01SolidRounded
            : name === "chatting-01" && variant === "bulk" ? Chatting01BulkRounded
            : name === "chatting-01" && variant === "twotone" ? Chatting01TwotoneRounded
            : name === "chatting-01" && variant === "duotone" ? Chatting01DuotoneRounded
        : name === "files-02" && !variant ? Files02StrokeRounded
            : name === "files-02" && variant === "solid" ? Files02SolidRounded
            : name === "files-02" && variant === "bulk" ? Files02BulkRounded
            : name === "files-02" && variant === "twotone" ? Files02TwotoneRounded
            : name === "files-02" && variant === "duotone" ? Files02DuotoneRounded
        : name === "link-01" && !variant ? Link01StrokeRounded
            : name === "link-01" && variant === "solid" ? Link01SolidRounded
            : name === "link-01" && variant === "bulk" ? Link01BulkRounded
            : name === "link-01" && variant === "twotone" ? Link01TwotoneRounded
            : name === "link-01" && variant === "duotone" ? Link01DuotoneRounded
        : name === "news" && !variant ? NewsStrokeRounded
            : name === "news" && variant === "solid" ? NewsSolidRounded
            : name === "news" && variant === "bulk" ? NewsBulkRounded
            : name === "news" && variant === "twotone" ? NewsTwotoneRounded
            : name === "news" && variant === "duotone" ? NewsDuotoneRounded
        : name === "waving-hand-01" && !variant ? WavingHand01StrokeRounded
            : name === "waving-hand-01" && variant === "solid" ? WavingHand01SolidRounded
            : name === "waving-hand-01" && variant === "bulk" ? WavingHand01BulkRounded
            : name === "waving-hand-01" && variant === "twotone" ? WavingHand01TwotoneRounded
            : name === "waving-hand-01" && variant === "duotone" ? WavingHand01DuotoneRounded
        : name === "zap" && !variant ? ZapStrokeRounded
            : name === "zap" && variant === "solid" ? ZapSolidRounded
            : name === "zap" && variant === "bulk" ? ZapBulkRounded
            : name === "zap" && variant === "twotone" ? ZapTwotoneRounded
            : name === "zap" && variant === "duotone" ? ZapDuotoneRounded
        : name === "cancel-01" && !variant ? Cancel01StrokeRounded
            : name === "cancel-01" && variant === "solid" ? Cancel01SolidRounded
            : name === "cancel-01" && variant === "bulk" ? Cancel01BulkRounded
            : name === "cancel-01" && variant === "twotone" ? Cancel01TwotoneRounded
            : name === "cancel-01" && variant === "duotone" ? Cancel01DuotoneRounded
        : name === "cloud-upload" && !variant ? CloudUploadStrokeRounded
            : name === "cloud-upload" && variant === "solid" ? CloudUploadSolidRounded
            : name === "cloud-upload" && variant === "bulk" ? CloudUploadBulkRounded
            : name === "cloud-upload" && variant === "twotone" ? CloudUploadTwotoneRounded
            : name === "cloud-upload" && variant === "duotone" ? CloudUploadDuotoneRounded
        : name === "file-upload" && !variant ? FileUploadStrokeRounded
            : name === "file-upload" && variant === "solid" ? FileUploadSolidRounded
            : name === "file-upload" && variant === "bulk" ? FileUploadBulkRounded
            : name === "file-upload" && variant === "twotone" ? FileUploadTwotoneRounded
            : name === "file-upload" && variant === "duotone" ? FileUploadDuotoneRounded
        : name === "calendar-03" && !variant ? Calendar03StrokeRounded
            : name === "calendar-03" && variant === "solid" ? Calendar03SolidRounded
            : name === "calendar-03" && variant === "bulk" ? Calendar03BulkRounded
            : name === "calendar-03" && variant === "twotone" ? Calendar03TwotoneRounded
            : name === "calendar-03" && variant === "duotone" ? Calendar03DuotoneRounded
        : name === "delete-02" && !variant ? Delete02StrokeRounded
            : name === "delete-02" && variant === "solid" ? Delete02SolidRounded
            : name === "delete-02" && variant === "bulk" ? Delete02BulkRounded
            : name === "delete-02" && variant === "twotone" ? Delete02TwotoneRounded
            : name === "delete-02" && variant === "duotone" ? Delete02DuotoneRounded
        : name === "edit-02" && !variant ? Edit02StrokeRounded
            : name === "edit-02" && variant === "solid" ? Edit02SolidRounded
            : name === "edit-02" && variant === "bulk" ? Edit02BulkRounded
            : name === "edit-02" && variant === "twotone" ? Edit02TwotoneRounded
            : name === "edit-02" && variant === "duotone" ? Edit02DuotoneRounded
        : name === "image-02" && !variant ? Image02StrokeRounded
            : name === "image-02" && variant === "solid" ? Image02SolidRounded
            : name === "image-02" && variant === "bulk" ? Image02BulkRounded
            : name === "image-02" && variant === "twotone" ? Image02TwotoneRounded
            : name === "image-02" && variant === "duotone" ? Image02DuotoneRounded
        : name === "image-upload-01" && !variant ? ImageUpload01StrokeRounded
            : name === "image-upload-01" && variant === "solid" ? ImageUpload01SolidRounded
            : name === "image-upload-01" && variant === "bulk" ? ImageUpload01BulkRounded
            : name === "image-upload-01" && variant === "twotone" ? ImageUpload01TwotoneRounded
            : name === "image-upload-01" && variant === "duotone" ? ImageUpload01DuotoneRounded
        : name === "image-upload" && !variant ? ImageUploadStrokeRounded
            : name === "image-upload" && variant === "solid" ? ImageUploadSolidRounded
            : name === "image-upload" && variant === "bulk" ? ImageUploadBulkRounded
            : name === "image-upload" && variant === "twotone" ? ImageUploadTwotoneRounded
            : name === "image-upload" && variant === "duotone" ? ImageUploadDuotoneRounded
        : name === "information-circle" && !variant ? InformationCircleStrokeRounded
            : name === "information-circle" && variant === "solid" ? InformationCircleSolidRounded
            : name === "information-circle" && variant === "bulk" ? InformationCircleBulkRounded
            : name === "information-circle" && variant === "twotone" ? InformationCircleTwotoneRounded
            : name === "information-circle" && variant === "duotone" ? InformationCircleDuotoneRounded
        : name === "play" && !variant ? PlayStrokeRounded
            : name === "play" && variant === "solid" ? PlaySolidRounded
            : name === "play" && variant === "bulk" ? PlayBulkRounded
            : name === "play" && variant === "twotone" ? PlayTwotoneRounded
            : name === "play" && variant === "duotone" ? PlayDuotoneRounded
        : name === "drag-drop" && !variant ? DragDropStrokeRounded
            : name === "drag-drop" && variant === "solid" ? DragDropSolidRounded
            : name === "drag-drop" && variant === "bulk" ? DragDropBulkRounded
            : name === "drag-drop" && variant === "twotone" ? DragDropTwotoneRounded
            : name === "drag-drop" && variant === "duotone" ? DragDropDuotoneRounded
        : name === "delete-03" && !variant ? Delete03StrokeRounded
            : name === "delete-03" && variant === "solid" ? Delete03SolidRounded
            : name === "delete-03" && variant === "bulk" ? Delete03BulkRounded
            : name === "delete-03" && variant === "twotone" ? Delete03TwotoneRounded
            : name === "delete-03" && variant === "duotone" ? Delete03DuotoneRounded
        : name === "delete-01" && !variant ? Delete01StrokeRounded
            : name === "delete-01" && variant === "solid" ? Delete01SolidRounded
            : name === "delete-01" && variant === "bulk" ? Delete01BulkRounded
            : name === "delete-01" && variant === "twotone" ? Delete01TwotoneRounded
            : name === "delete-01" && variant === "duotone" ? Delete01DuotoneRounded
        : name === "cloud-saving-done-01" && !variant ? CloudSavingDone01StrokeRounded
            : name === "cloud-saving-done-01" && variant === "solid" ? CloudSavingDone01SolidRounded
            : name === "cloud-saving-done-01" && variant === "bulk" ? CloudSavingDone01BulkRounded
            : name === "cloud-saving-done-01" && variant === "twotone" ? CloudSavingDone01TwotoneRounded
            : name === "cloud-saving-done-01" && variant === "duotone" ? CloudSavingDone01DuotoneRounded
        : name === "plus-sign" && !variant ? PlusSignStrokeRounded
            : name === "plus-sign" && variant === "solid" ? PlusSignSolidRounded
            : name === "plus-sign" && variant === "bulk" ? PlusSignBulkRounded
            : name === "plus-sign" && variant === "twotone" ? PlusSignTwotoneRounded
            : name === "plus-sign" && variant === "duotone" ? PlusSignDuotoneRounded
        : name === "pencil-edit-01" && !variant ? PencilEdit01StrokeRounded
            : name === "pencil-edit-01" && variant === "solid" ? PencilEdit01SolidRounded
            : name === "pencil-edit-01" && variant === "bulk" ? PencilEdit01BulkRounded
            : name === "pencil-edit-01" && variant === "twotone" ? PencilEdit01TwotoneRounded
            : name === "pencil-edit-01" && variant === "duotone" ? PencilEdit01DuotoneRounded
        : name === "pencil-edit-02" && !variant ? PencilEdit02StrokeRounded
            : name === "pencil-edit-02" && variant === "solid" ? PencilEdit02SolidRounded
            : name === "pencil-edit-02" && variant === "bulk" ? PencilEdit02BulkRounded
            : name === "pencil-edit-02" && variant === "twotone" ? PencilEdit02TwotoneRounded
            : name === "pencil-edit-02" && variant === "duotone" ? PencilEdit02DuotoneRounded
        : name === "grid" && !variant ? GridStrokeRounded
            : name === "grid" && variant === "solid" ? GridSolidRounded
            : name === "grid" && variant === "bulk" ? GridBulkRounded
            : name === "grid" && variant === "twotone" ? GridTwotoneRounded
            : name === "grid" && variant === "duotone" ? GridDuotoneRounded
        : name === "link-04" && !variant ? Link04StrokeRounded
            : name === "link-04" && variant === "solid" ? Link04SolidRounded
            : name === "link-04" && variant === "bulk" ? Link04BulkRounded
            : name === "link-04" && variant === "twotone" ? Link04TwotoneRounded
            : name === "link-04" && variant === "duotone" ? Link04DuotoneRounded
        : name === "file-edit" && !variant ? FileEditStrokeRounded
            : name === "file-edit" && variant === "solid" ? FileEditSolidRounded
            : name === "file-edit" && variant === "bulk" ? FileEditBulkRounded
            : name === "file-edit" && variant === "twotone" ? FileEditTwotoneRounded
            : name === "file-edit" && variant === "duotone" ? FileEditDuotoneRounded
        : name === "alert-circle" && !variant ? AlertCircleStrokeRounded
            : name === "alert-circle" && variant === "solid" ? AlertCircleSolidRounded
            : name === "alert-circle" && variant === "bulk" ? AlertCircleBulkRounded
            : name === "alert-circle" && variant === "twotone" ? AlertCircleTwotoneRounded
            : name === "alert-circle" && variant === "duotone" ? AlertCircleDuotoneRounded
        : name === "checkmark-badge-03" && !variant ? CheckmarkBadge03StrokeRounded
            : name === "checkmark-badge-03" && variant === "solid" ? CheckmarkBadge03SolidRounded
            : name === "checkmark-badge-03" && variant === "bulk" ? CheckmarkBadge03BulkRounded
            : name === "checkmark-badge-03" && variant === "twotone" ? CheckmarkBadge03TwotoneRounded
            : name === "checkmark-badge-03" && variant === "duotone" ? CheckmarkBadge03DuotoneRounded
        : name === "cone-01" && !variant ? Cone01StrokeRounded
            : name === "cone-01" && variant === "solid" ? Cone01SolidRounded
            : name === "cone-01" && variant === "bulk" ? Cone01BulkRounded
            : name === "cone-01" && variant === "twotone" ? Cone01TwotoneRounded
            : name === "cone-01" && variant === "duotone" ? Cone01DuotoneRounded
        : name === "add-01" && !variant ? Add01StrokeRounded
            : name === "add-01" && variant === "solid" ? Add01SolidRounded
            : name === "add-01" && variant === "bulk" ? Add01BulkRounded
            : name === "add-01" && variant === "twotone" ? Add01TwotoneRounded
            : name === "add-01" && variant === "duotone" ? Add01DuotoneRounded
        : name === "alert-01" && !variant ? Alert01StrokeRounded
            : name === "alert-01" && variant === "solid" ? Alert01SolidRounded
            : name === "alert-01" && variant === "bulk" ? Alert01BulkRounded
            : name === "alert-01" && variant === "twotone" ? Alert01TwotoneRounded
            : name === "alert-01" && variant === "duotone" ? Alert01DuotoneRounded
        : name === "alert-02" && !variant ? Alert02StrokeRounded
            : name === "alert-02" && variant === "solid" ? Alert02SolidRounded
            : name === "alert-02" && variant === "bulk" ? Alert02BulkRounded
            : name === "alert-02" && variant === "twotone" ? Alert02TwotoneRounded
            : name === "alert-02" && variant === "duotone" ? Alert02DuotoneRounded
        : name === "archive-02" && !variant ? Archive02StrokeRounded
            : name === "archive-02" && variant === "solid" ? Archive02SolidRounded
            : name === "archive-02" && variant === "bulk" ? Archive02BulkRounded
            : name === "archive-02" && variant === "twotone" ? Archive02TwotoneRounded
            : name === "archive-02" && variant === "duotone" ? Archive02DuotoneRounded
        : name === "bookmark-01" && !variant ? Bookmark01StrokeRounded
            : name === "bookmark-01" && variant === "solid" ? Bookmark01SolidRounded
            : name === "bookmark-01" && variant === "bulk" ? Bookmark01BulkRounded
            : name === "bookmark-01" && variant === "twotone" ? Bookmark01TwotoneRounded
            : name === "bookmark-01" && variant === "duotone" ? Bookmark01DuotoneRounded
        : name === "cancel-circle" && !variant ? CancelCircleStrokeRounded
            : name === "cancel-circle" && variant === "solid" ? CancelCircleSolidRounded
            : name === "cancel-circle" && variant === "bulk" ? CancelCircleBulkRounded
            : name === "cancel-circle" && variant === "twotone" ? CancelCircleTwotoneRounded
            : name === "cancel-circle" && variant === "duotone" ? CancelCircleDuotoneRounded
        : name === "checkmark-circle-02" && !variant ? CheckmarkCircle02StrokeRounded
            : name === "checkmark-circle-02" && variant === "solid" ? CheckmarkCircle02SolidRounded
            : name === "checkmark-circle-02" && variant === "bulk" ? CheckmarkCircle02BulkRounded
            : name === "checkmark-circle-02" && variant === "twotone" ? CheckmarkCircle02TwotoneRounded
            : name === "checkmark-circle-02" && variant === "duotone" ? CheckmarkCircle02DuotoneRounded
        : name === "dashboard-browsing" && !variant ? DashboardBrowsingStrokeRounded
            : name === "dashboard-browsing" && variant === "solid" ? DashboardBrowsingSolidRounded
            : name === "dashboard-browsing" && variant === "bulk" ? DashboardBrowsingBulkRounded
            : name === "dashboard-browsing" && variant === "twotone" ? DashboardBrowsingTwotoneRounded
            : name === "dashboard-browsing" && variant === "duotone" ? DashboardBrowsingDuotoneRounded
        : name === "dashboard-speed-02" && !variant ? DashboardSpeed02StrokeRounded
            : name === "dashboard-speed-02" && variant === "solid" ? DashboardSpeed02SolidRounded
            : name === "dashboard-speed-02" && variant === "bulk" ? DashboardSpeed02BulkRounded
            : name === "dashboard-speed-02" && variant === "twotone" ? DashboardSpeed02TwotoneRounded
            : name === "dashboard-speed-02" && variant === "duotone" ? DashboardSpeed02DuotoneRounded
        : name === "favourite" && !variant ? FavouriteStrokeRounded
            : name === "favourite" && variant === "solid" ? FavouriteSolidRounded
            : name === "favourite" && variant === "bulk" ? FavouriteBulkRounded
            : name === "favourite" && variant === "twotone" ? FavouriteTwotoneRounded
            : name === "favourite" && variant === "duotone" ? FavouriteDuotoneRounded            
        : name === "flag-02" && !variant ? Flag02StrokeRounded
            : name === "flag-02" && variant === "solid" ? Flag02SolidRounded
            : name === "flag-02" && variant === "bulk" ? Flag02BulkRounded
            : name === "flag-02" && variant === "twotone" ? Flag02TwotoneRounded
            : name === "flag-02" && variant === "duotone" ? Flag02DuotoneRounded
        : name === "folder-01" && !variant ? Folder01StrokeRounded
            : name === "folder-01" && variant === "solid" ? Folder01SolidRounded
            : name === "folder-01" && variant === "bulk" ? Folder01BulkRounded
            : name === "folder-01" && variant === "twotone" ? Folder01TwotoneRounded
            : name === "folder-01" && variant === "duotone" ? Folder01DuotoneRounded
        : name === "laurel-wreath" && !variant ? LaurelWreath02StrokeRounded
            : name === "laurel-wreath" && variant === "solid" ? LaurelWreath02SolidRounded
            : name === "laurel-wreath" && variant === "bulk" ? LaurelWreath02BulkRounded
            : name === "laurel-wreath" && variant === "twotone" ? LaurelWreath02TwotoneRounded
            : name === "laurel-wreath" && variant === "duotone" ? LaurelWreath02DuotoneRounded
        : name === "location-01" && !variant ? Location01StrokeRounded
            : name === "location-01" && variant === "solid" ? Location01SolidRounded
            : name === "location-01" && variant === "bulk" ? Location01BulkRounded
            : name === "location-01" && variant === "twotone" ? Location01TwotoneRounded
            : name === "location-01" && variant === "duotone" ? Location01DuotoneRounded
        : name === "mail-01" && !variant ? Mail01StrokeRounded
            : name === "mail-01" && variant === "solid" ? Mail01SolidRounded
            : name === "mail-01" && variant === "bulk" ? Mail01BulkRounded
            : name === "mail-01" && variant === "twotone" ? Mail01TwotoneRounded
            : name === "mail-01" && variant === "duotone" ? Mail01DuotoneRounded
        : name === "notification-03" && !variant ? Notification03StrokeRounded
            : name === "notification-03" && variant === "solid" ? Notification03SolidRounded
            : name === "notification-03" && variant === "bulk" ? Notification03BulkRounded
            : name === "notification-03" && variant === "twotone" ? Notification03TwotoneRounded
            : name === "notification-03" && variant === "duotone" ? Notification03DuotoneRounded
        : name === "pencil" && !variant ? PencilStrokeRounded
            : name === "pencil" && variant === "solid" ? PencilSolidRounded
            : name === "pencil" && variant === "bulk" ? PencilBulkRounded
            : name === "pencil" && variant === "twotone" ? PencilTwotoneRounded
            : name === "pencil" && variant === "duotone" ? PencilDuotoneRounded
        : name === "search-01" && !variant ? Search01StrokeRounded
            : name === "search-01" && variant === "solid" ? Search01SolidRounded
            : name === "search-01" && variant === "bulk" ? Search01BulkRounded
            : name === "search-01" && variant === "twotone" ? Search01TwotoneRounded
            : name === "search-01" && variant === "duotone" ? Search01DuotoneRounded
        : name === "security-check" && !variant ? SecurityCheckStrokeRounded
            : name === "security-check" && variant === "solid" ? SecurityCheckSolidRounded
            : name === "security-check" && variant === "bulk" ? SecurityCheckBulkRounded
            : name === "security-check" && variant === "twotone" ? SecurityCheckTwotoneRounded
            : name === "security-check" && variant === "duotone" ? SecurityCheckDuotoneRounded
        : name === "sent" && !variant ? SentStrokeRounded
            : name === "sent" && variant === "solid" ? SentSolidRounded
            : name === "sent" && variant === "bulk" ? SentBulkRounded
            : name === "sent" && variant === "twotone" ? SentTwotoneRounded
            : name === "sent" && variant === "duotone" ? SentDuotoneRounded
        : name === "settings-02" && !variant ? Settings02StrokeRounded
            : name === "settings-02" && variant === "solid" ? Settings02SolidRounded
            : name === "settings-02" && variant === "bulk" ? Settings02BulkRounded
            : name === "settings-02" && variant === "twotone" ? Settings02TwotoneRounded
            : name === "settings-02" && variant === "duotone" ? Settings02DuotoneRounded
        : name === "star" && !variant ? StarStrokeRounded
            : name === "star" && variant === "solid" ? StarSolidRounded
            : name === "star" && variant === "bulk" ? StarBulkRounded
            : name === "star" && variant === "twotone" ? StarTwotoneRounded
            : name === "star" && variant === "duotone" ? StarDuotoneRounded
        : name === "tag-01" && !variant ? Tag01StrokeRounded
            : name === "tag-01" && variant === "solid" ? Tag01SolidRounded
            : name === "tag-01" && variant === "bulk" ? Tag01BulkRounded
            : name === "tag-01" && variant === "twotone" ? Tag01TwotoneRounded
            : name === "tag-01" && variant === "duotone" ? Tag01DuotoneRounded
        : name === "save-money-dollar" && !variant ? SaveMoneyDollarStrokeRounded
            : name === "save-money-dollar" && variant === "solid" ? SaveMoneyDollarSolidRounded
            : name === "save-money-dollar" && variant === "bulk" ? SaveMoneyDollarBulkRounded
            : name === "save-money-dollar" && variant === "twotone" ? SaveMoneyDollarTwotoneRounded
            : name === "save-money-dollar" && variant === "duotone" ? SaveMoneyDollarDuotoneRounded
        : name === "seo" && !variant ? SeoStrokeRounded
            : name === "seo" && variant === "solid" ? SeoSolidRounded
            : name === "seo" && variant === "bulk" ? SeoBulkRounded
            : name === "seo" && variant === "twotone" ? SeoTwotoneRounded
            : name === "seo" && variant === "duotone" ? SeoDuotoneRounded
        : name === "smart-phone-01" && !variant ? SmartPhone01StrokeRounded
            : name === "smart-phone-01" && variant === "solid" ? SmartPhone01SolidRounded
            : name === "smart-phone-01" && variant === "bulk" ? SmartPhone01BulkRounded
            : name === "smart-phone-01" && variant === "twotone" ? SmartPhone01TwotoneRounded
            : name === "smart-phone-01" && variant === "duotone" ? SmartPhone01DuotoneRounded
        : name === "text-font" && !variant ? TextFontStrokeRounded
            : name === "text-font" && variant === "solid" ? TextFontSolidRounded
            : name === "text-font" && variant === "bulk" ? TextFontBulkRounded
            : name === "text-font" && variant === "twotone" ? TextFontTwotoneRounded
            : name === "text-font" && variant === "duotone" ? TextFontDuotoneRounded
        : name === "new-twitter" && !variant ? NewTwitterStrokeRounded
            : name === "new-twitter" && variant === "solid" ? NewTwitterSolidRounded
            : name === "new-twitter" && variant === "bulk" ? NewTwitterBulkRounded
            : name === "new-twitter" && variant === "twotone" ? NewTwitterTwotoneRounded
            : name === "new-twitter" && variant === "duotone" ? NewTwitterDuotoneRounded
        : name === "game-controller-01" && !variant ? GameController01StrokeRounded
            : name === "game-controller-01" && variant === "solid" ? GameController01SolidRounded
            : name === "game-controller-01" && variant === "bulk" ? GameController01BulkRounded
            : name === "game-controller-01" && variant === "twotone" ? GameController01TwotoneRounded
            : name === "game-controller-01" && variant === "duotone" ? GameController01DuotoneRounded
        : name === "wifi-connected-02" && !variant ? WifiConnected02StrokeRounded
            : name === "wifi-connected-02" && variant === "solid" ? WifiConnected02SolidRounded
            : name === "wifi-connected-02" && variant === "bulk" ? WifiConnected02BulkRounded
            : name === "wifi-connected-02" && variant === "twotone" ? WifiConnected02TwotoneRounded
            : name === "wifi-connected-02" && variant === "duotone" ? WifiConnected02DuotoneRounded
        : name === "spotify" && !variant ? SpotifyStrokeRounded
            : name === "spotify" && variant === "solid" ? SpotifySolidRounded
            : name === "spotify" && variant === "bulk" ? SpotifyBulkRounded
            : name === "spotify" && variant === "twotone" ? SpotifyTwotoneRounded
            : name === "spotify" && variant === "duotone" ? SpotifyDuotoneRounded
        : name === "vimeo" && !variant ? VimeoStrokeRounded
            : name === "vimeo" && variant === "solid" ? VimeoSolidRounded
            : name === "vimeo" && variant === "bulk" ? VimeoBulkRounded
            : name === "vimeo" && variant === "twotone" ? VimeoTwotoneRounded
            : name === "vimeo" && variant === "duotone" ? VimeoDuotoneRounded
        : name === "music-note-square-02" && !variant ? MusicNoteSquare02StrokeRounded
            : name === "music-note-square-02" && variant === "solid" ? MusicNoteSquare02SolidRounded
            : name === "music-note-square-02" && variant === "bulk" ? MusicNoteSquare02BulkRounded
            : name === "music-note-square-02" && variant === "twotone" ? MusicNoteSquare02TwotoneRounded
            : name === "music-note-square-02" && variant === "duotone" ? MusicNoteSquare02DuotoneRounded
        : name === "shirt-01" && !variant ? Shirt01StrokeRounded
            : name === "shirt-01" && variant === "solid" ? Shirt01SolidRounded
            : name === "shirt-01" && variant === "bulk" ? Shirt01BulkRounded
            : name === "shirt-01" && variant === "twotone" ? Shirt01TwotoneRounded
            : name === "shirt-01" && variant === "duotone" ? Shirt01DuotoneRounded
        : name === "soundcloud" && !variant ? SoundcloudStrokeRounded
            : name === "soundcloud" && variant === "solid" ? SoundcloudSolidRounded
            : name === "soundcloud" && variant === "bulk" ? SoundcloudBulkRounded
            : name === "soundcloud" && variant === "twotone" ? SoundcloudTwotoneRounded
            : name === "soundcloud" && variant === "duotone" ? SoundcloudDuotoneRounded
        : name === "icon-jar" && !variant ? jarIconStrokeRounded
            : name === "icon-jar" && variant === "solid" ? jarIconSolidRounded
            : name === "icon-jar" && variant === "bulk" ? jarIconBulkRounded
            : name === "icon-jar" && variant === "twotone" ? jarIconTwotoneRounded
            : name === "icon-jar" && variant === "duotone" ? jarIconDuotoneRounded
        : name === "facebook-02" && !variant ? Facebook02StrokeRounded
            : name === "facebook-02" && variant === "solid" ? Facebook02SolidRounded
            : name === "facebook-02" && variant === "bulk" ? Facebook02BulkRounded
            : name === "facebook-02" && variant === "twotone" ? Facebook02TwotoneRounded
            : name === "facebook-02" && variant === "duotone" ? Facebook02DuotoneRounded
        : name === "github" && !variant ? GithubStrokeRounded
            : name === "github" && variant === "solid" ? GithubSolidRounded
            : name === "github" && variant === "bulk" ? GithubBulkRounded
            : name === "github" && variant === "twotone" ? GithubTwotoneRounded
            : name === "github" && variant === "duotone" ? GithubDuotoneRounded
        : name === "instagram" && !variant ? InstagramStrokeRounded
            : name === "instagram" && variant === "solid" ? InstagramSolidRounded
            : name === "instagram" && variant === "bulk" ? InstagramBulkRounded
            : name === "instagram" && variant === "twotone" ? InstagramTwotoneRounded
            : name === "instagram" && variant === "duotone" ? InstagramDuotoneRounded
        : name === "laptop-check" && !variant ? LaptopCheckStrokeRounded
            : name === "laptop-check" && variant === "solid" ? LaptopCheckSolidRounded
            : name === "laptop-check" && variant === "bulk" ? LaptopCheckBulkRounded
            : name === "laptop-check" && variant === "twotone" ? LaptopCheckTwotoneRounded
            : name === "laptop-check" && variant === "duotone" ? LaptopCheckDuotoneRounded
        : name === "linkedin-02" && !variant ? Linkedin02StrokeRounded
            : name === "linkedin-02" && variant === "solid" ? Linkedin02SolidRounded
            : name === "linkedin-02" && variant === "bulk" ? Linkedin02BulkRounded
            : name === "linkedin-02" && variant === "twotone" ? Linkedin02TwotoneRounded
            : name === "linkedin-02" && variant === "duotone" ? Linkedin02DuotoneRounded
        : name === "threads" && !variant ? ThreadsStrokeRounded
            : name === "threads" && variant === "solid" ? ThreadsSolidRounded
            : name === "threads" && variant === "bulk" ? ThreadsBulkRounded
            : name === "threads" && variant === "twotone" ? ThreadsTwotoneRounded
            : name === "threads" && variant === "duotone" ? ThreadsDuotoneRounded
        : name === "tiktok" && !variant ? TiktokStrokeRounded
            : name === "tiktok" && variant === "solid" ? TiktokSolidRounded
            : name === "tiktok" && variant === "bulk" ? TiktokBulkRounded
            : name === "tiktok" && variant === "twotone" ? TiktokTwotoneRounded
            : name === "tiktok" && variant === "duotone" ? TiktokDuotoneRounded
        : name === "property-edit" && !variant ? PropertyEditStrokeRounded
            : name === "property-edit" && variant === "solid" ? PropertyEditSolidRounded
            : name === "property-edit" && variant === "bulk" ? PropertyEditBulkRounded
            : name === "property-edit" && variant === "twotone" ? PropertyEditTwotoneRounded
            : name === "property-edit" && variant === "duotone" ? PropertyEditDuotoneRounded
        : name === "view" && !variant ? ViewStrokeRounded
            : name === "view" && variant === "solid" ? ViewSolidRounded
            : name === "view" && variant === "bulk" ? ViewBulkRounded
            : name === "view" && variant === "twotone" ? ViewTwotoneRounded
            : name === "view" && variant === "duotone" ? ViewDuotoneRounded
        : name === "arrow-left-02" && !variant ? ArrowLeft02StrokeRounded
            : name === "arrow-left-02" && variant === "solid" ? ArrowLeft02SolidRounded
            : name === "arrow-left-02" && variant === "bulk" ? ArrowLeft02BulkRounded
            : name === "arrow-left-02" && variant === "twotone" ? ArrowLeft02TwotoneRounded
            : name === "arrow-left-02" && variant === "duotone" ? ArrowLeft02DuotoneRounded
        : name === "arrow-left-03" && !variant ? ArrowLeft03StrokeRounded
            : name === "arrow-left-03" && variant === "solid" ? ArrowLeft03SolidRounded
            : name === "arrow-left-03" && variant === "bulk" ? ArrowLeft03BulkRounded
            : name === "arrow-left-03" && variant === "twotone" ? ArrowLeft03TwotoneRounded
            : name === "arrow-left-03" && variant === "duotone" ? ArrowLeft03DuotoneRounded
        : name === "arrow-right-01" && !variant ? ArrowRight01StrokeRounded
            : name === "arrow-right-01" && variant === "solid" ? ArrowRight01SolidRounded
            : name === "arrow-right-01" && variant === "bulk" ? ArrowRight01BulkRounded
            : name === "arrow-right-01" && variant === "twotone" ? ArrowRight01TwotoneRounded
            : name === "arrow-right-01" && variant === "duotone" ? ArrowRight01DuotoneRounded
        : name === "arrow-right-02" && !variant ? ArrowRight02StrokeRounded
            : name === "arrow-right-02" && variant === "solid" ? ArrowRight02SolidRounded
            : name === "arrow-right-02" && variant === "bulk" ? ArrowRight02BulkRounded
            : name === "arrow-right-02" && variant === "twotone" ? ArrowRight02TwotoneRounded
            : name === "arrow-right-02" && variant === "duotone" ? ArrowRight02DuotoneRounded
        : name === "arrow-right-03" && !variant ? ArrowRight03StrokeRounded
            : name === "arrow-right-03" && variant === "solid" ? ArrowRight03SolidRounded
            : name === "arrow-right-03" && variant === "bulk" ? ArrowRight03BulkRounded
            : name === "arrow-right-03" && variant === "twotone" ? ArrowRight03TwotoneRounded
            : name === "arrow-right-03" && variant === "duotone" ? ArrowRight03DuotoneRounded
        : name === "go-backward-10-sec" && !variant ? GoBackward10SecStrokeRounded
            : name === "go-backward-10-sec" && variant === "solid" ? GoBackward10SecSolidRounded
            : name === "go-backward-10-sec" && variant === "bulk" ? GoBackward10SecBulkRounded
            : name === "go-backward-10-sec" && variant === "twotone" ? GoBackward10SecTwotoneRounded
            : name === "go-backward-10-sec" && variant === "duotone" ? GoBackward10SecDuotoneRounded
        : name === "go-forward-10-sec" && !variant ? GoForward10SecStrokeRounded
            : name === "go-forward-10-sec" && variant === "solid" ? GoForward10SecSolidRounded
            : name === "go-forward-10-sec" && variant === "bulk" ? GoForward10SecBulkRounded
            : name === "go-forward-10-sec" && variant === "twotone" ? GoForward10SecTwotoneRounded
            : name === "go-forward-10-sec" && variant === "duotone" ? GoForward10SecDuotoneRounded
        : name === "pause" && !variant ? PauseStrokeRounded
            : name === "pause" && variant === "solid" ? PauseSolidRounded
            : name === "pause" && variant === "bulk" ? PauseBulkRounded
            : name === "pause" && variant === "twotone" ? PauseTwotoneRounded
            : name === "pause" && variant === "duotone" ? PauseDuotoneRounded
        : name === "loading-03" && !variant ? Loading03StrokeRounded
            : name === "loading-03" && variant === "solid" ? Loading03SolidRounded
            : name === "loading-03" && variant === "bulk" ? Loading03BulkRounded
            : name === "loading-03" && variant === "twotone" ? Loading03TwotoneRounded
            : name === "loading-03" && variant === "duotone" ? Loading03DuotoneRounded
        : name === "arrow-down-01" && !variant ? ArrowDown01StrokeRounded
            : name === "arrow-down-01" && variant === "solid" ? ArrowDown01SolidRounded
            : name === "arrow-down-01" && variant === "bulk" ? ArrowDown01BulkRounded
            : name === "arrow-down-01" && variant === "twotone" ? ArrowDown01TwotoneRounded
            : name === "arrow-down-01" && variant === "duotone" ? ArrowDown01DuotoneRounded
        : name === "briefcase-02" && !variant ? Briefcase02StrokeRounded
            : name === "briefcase-02" && variant === "solid" ? Briefcase02SolidRounded
            : name === "briefcase-02" && variant === "bulk" ? Briefcase02BulkRounded
            : name === "briefcase-02" && variant === "twotone" ? Briefcase02TwotoneRounded
            : name === "briefcase-02" && variant === "duotone" ? Briefcase02DuotoneRounded
        : name === "dashboard-square-02" && !variant ? DashboardSquare02StrokeRounded
            : name === "dashboard-square-02" && variant === "solid" ? DashboardSquare02SolidRounded
            : name === "dashboard-square-02" && variant === "bulk" ? DashboardSquare02BulkRounded
            : name === "dashboard-square-02" && variant === "twotone" ? DashboardSquare02TwotoneRounded
            : name === "dashboard-square-02" && variant === "duotone" ? DashboardSquare02DuotoneRounded
        : name === "job-search" && !variant ? JobSearchStrokeRounded
            : name === "job-search" && variant === "solid" ? JobSearchSolidRounded
            : name === "job-search" && variant === "bulk" ? JobSearchBulkRounded
            : name === "job-search" && variant === "twotone" ? JobSearchTwotoneRounded
            : name === "job-search" && variant === "duotone" ? JobSearchDuotoneRounded
        : name === "passport-01" && !variant ? Passport01StrokeRounded
            : name === "passport-01" && variant === "solid" ? Passport01SolidRounded
            : name === "passport-01" && variant === "bulk" ? Passport01BulkRounded
            : name === "passport-01" && variant === "twotone" ? Passport01TwotoneRounded
            : name === "passport-01" && variant === "duotone" ? Passport01DuotoneRounded
        : name === "passport" && !variant ? PassportStrokeRounded
            : name === "passport" && variant === "solid" ? PassportSolidRounded
            : name === "passport" && variant === "bulk" ? PassportBulkRounded
            : name === "passport" && variant === "twotone" ? PassportTwotoneRounded
            : name === "passport" && variant === "duotone" ? PassportDuotoneRounded
        : name === "hand-pointing-right-01" && !variant ? HandPointingRight01StrokeRounded
            : name === "hand-pointing-right-01" && variant === "solid" ? HandPointingRight01SolidRounded
            : name === "hand-pointing-right-01" && variant === "bulk" ? HandPointingRight01BulkRounded
            : name === "hand-pointing-right-01" && variant === "twotone" ? HandPointingRight01TwotoneRounded
            : name === "hand-pointing-right-01" && variant === "duotone" ? HandPointingRight01DuotoneRounded
        : name === "quote-down" && !variant ? QuoteDownStrokeRounded 
            : name === "quote-down" && variant === "solid" ? QuoteDownSolidRounded 
            : name === "quote-down" && variant === "bulk" ? QuoteDownBulkRounded 
            : name === "quote-down" && variant === "twotone" ? QuoteDownTwotoneRounded                
            : name === "quote-down" && variant === "duotone" ? QuoteDownDuotoneRounded 
        : name === "login-01" && !variant ? Login01StrokeRounded
            : name === "login-01" && variant === "solid" ? Login01SolidRounded
            : name === "login-01" && variant === "bulk" ? Login01BulkRounded
            : name === "login-01" && variant === "twotone" ? Login01TwotoneRounded
            : name === "login-01" && variant === "duotone" ? Login01DuotoneRounded
        : name === "twitter" && !variant ? TwitterStrokeRounded
            : name === "twitter" && variant === "solid" ? TwitterSolidRounded
            : name === "twitter" && variant === "bulk" ? TwitterBulkRounded
            : name === "twitter" && variant === "twotone" ? TwitterTwotoneRounded
            : name === "twitter" && variant === "duotone" ? TwitterDuotoneRounded
        : name === "files-01" && !variant ? Files01StrokeRounded
            : name === "files-01" && variant === "solid" ? Files01SolidRounded
            : name === "files-01" && variant === "bulk" ? Files01BulkRounded
            : name === "files-01" && variant === "twotone" ? Files01TwotoneRounded
            : name === "files-01" && variant === "duotone" ? Files01DuotoneRounded
        : name === "tick-01" && !variant ? Tick01StrokeRounded
            : name === "tick-01" && variant === "solid" ? Tick01SolidRounded
            : name === "tick-01" && variant === "bulk" ? Tick01BulkRounded
            : name === "tick-01" && variant === "twotone" ? Tick01TwotoneRounded
            : name === "tick-01" && variant === "duotone" ? Tick01DuotoneRounded
        : name === "ticket-01" && !variant ? Ticket01StrokeRounded
            : name === "ticket-01" && variant === "solid" ? Ticket01SolidRounded
            : name === "ticket-01" && variant === "bulk" ? Ticket01BulkRounded
            : name === "ticket-01" && variant === "twotone" ? Ticket01TwotoneRounded
            : name === "ticket-01" && variant === "duotone" ? Ticket01DuotoneRounded
        : name === "remove-01" && !variant ? Remove01StrokeRounded
            : name === "remove-01" && variant === "solid" ? Remove01SolidRounded
            : name === "remove-01" && variant === "bulk" ? Remove01BulkRounded
            : name === "remove-01" && variant === "twotone" ? Remove01TwotoneRounded
            : name === "remove-01" && variant === "duotone" ? Remove01DuotoneRounded
        : name === "book-02" && !variant ? Book02StrokeRounded
            : name === "book-02" && variant === "solid" ? Book02SolidRounded
            : name === "book-02" && variant === "bulk" ? Book02BulkRounded
            : name === "book-02" && variant === "twotone" ? Book02TwotoneRounded
            : name === "book-02" && variant === "duotone" ? Book02DuotoneRounded
        : name === "contact" && !variant ? ContactStrokeRounded
            : name === "contact" && variant === "solid" ? ContactSolidRounded
            : name === "contact" && variant === "bulk" ? ContactBulkRounded
            : name === "contact" && variant === "twotone" ? ContactTwotoneRounded
            : name === "contact" && variant === "duotone" ? ContactDuotoneRounded
        : name === "time-02" && !variant ? Time02StrokeRounded
            : name === "time-02" && variant === "solid" ? Time02SolidRounded
            : name === "time-02" && variant === "bulk" ? Time02BulkRounded
            : name === "time-02" && variant === "twotone" ? Time02TwotoneRounded
            : name === "time-02" && variant === "duotone" ? Time02DuotoneRounded
        : name === "license" && !variant ? LicenseStrokeRounded
            : name === "license" && variant === "solid" ? LicenseSolidRounded
            : name === "license" && variant === "bulk" ? LicenseBulkRounded
            : name === "license" && variant === "twotone" ? LicenseTwotoneRounded
            : name === "license" && variant === "duotone" ? LicenseDuotoneRounded
        : name === "task-add-01" && !variant ? TaskAdd01StrokeRounded
            : name === "task-add-01" && variant === "solid" ? TaskAdd01SolidRounded
            : name === "task-add-01" && variant === "bulk" ? TaskAdd01BulkRounded
            : name === "task-add-01" && variant === "twotone" ? TaskAdd01TwotoneRounded
            : name === "task-add-01" && variant === "duotone" ? TaskAdd01DuotoneRounded
        : name === "task-done-01" && !variant ? TaskDone01StrokeRounded
            : name === "task-done-01" && variant === "solid" ? TaskDone01SolidRounded
            : name === "task-done-01" && variant === "bulk" ? TaskDone01BulkRounded
            : name === "task-done-01" && variant === "twotone" ? TaskDone01TwotoneRounded
            : name === "task-done-01" && variant === "duotone" ? TaskDone01DuotoneRounded
        : name === "task-edit-01" && !variant ? TaskEdit01StrokeRounded
            : name === "task-edit-01" && variant === "solid" ? TaskEdit01SolidRounded
            : name === "task-edit-01" && variant === "bulk" ? TaskEdit01BulkRounded
            : name === "task-edit-01" && variant === "twotone" ? TaskEdit01TwotoneRounded
            : name === "task-edit-01" && variant === "duotone" ? TaskEdit01DuotoneRounded            
        : name === "arrow-down-02" && !variant ? ArrowDown02StrokeRounded
            : name === "arrow-down-02" && variant === "solid" ? ArrowDown02SolidRounded
            : name === "arrow-down-02" && variant === "bulk" ? ArrowDown02BulkRounded
            : name === "arrow-down-02" && variant === "twotone" ? ArrowDown02TwotoneRounded
            : name === "arrow-down-02" && variant === "duotone" ? ArrowDown02DuotoneRounded
        : name === "checkmark-badge-01" && !variant ? CheckmarkBadge01StrokeRounded
            : name === "checkmark-badge-01" && variant === "solid" ? CheckmarkBadge01SolidRounded
            : name === "checkmark-badge-01" && variant === "bulk" ? CheckmarkBadge01BulkRounded
            : name === "checkmark-badge-01" && variant === "twotone" ? CheckmarkBadge01TwotoneRounded
            : name === "checkmark-badge-01" && variant === "duotone" ? CheckmarkBadge01DuotoneRounded
        : name === "menu-01" && !variant ? Menu01StrokeRounded
            : name === "menu-01" && variant === "solid" ? Menu01SolidRounded
            : name === "menu-01" && variant === "bulk" ? Menu01BulkRounded
            : name === "menu-01" && variant === "twotone" ? Menu01TwotoneRounded
            : name === "menu-01" && variant === "duotone" ? Menu01DuotoneRounded
        : name === "remove-02" && !variant ? Remove02StrokeRounded
            : name === "remove-02" && variant === "solid" ? Remove02SolidRounded
            : name === "remove-02" && variant === "bulk" ? Remove02BulkRounded
            : name === "remove-02" && variant === "twotone" ? Remove02TwotoneRounded
            : name === "remove-02" && variant === "duotone" ? Remove02DuotoneRounded
        : name === "unavailable" && !variant ? UnavailableStrokeRounded
            : name === "unavailable" && variant === "solid" ? UnavailableSolidRounded
            : name === "unavailable" && variant === "bulk" ? UnavailableBulkRounded
            : name === "unavailable" && variant === "twotone" ? UnavailableTwotoneRounded
            : name === "unavailable" && variant === "duotone" ? UnavailableDuotoneRounded
        : name === "task-01" && !variant ? Task01StrokeRounded
            : name === "task-01" && variant === "solid" ? Task01SolidRounded
            : name === "task-01" && variant === "bulk" ? Task01BulkRounded
            : name === "task-01" && variant === "twotone" ? Task01TwotoneRounded
            : name === "task-01" && variant === "duotone" ? Task01DuotoneRounded
        : name === "user" && !variant ? UserStrokeRounded
            : name === "user" && variant === "solid" ? UserSolidRounded
            : name === "user" && variant === "bulk" ? UserBulkRounded
            : name === "user" && variant === "twotone" ? UserTwotoneRounded
            : name === "user" && variant === "duotone" ? UserDuotoneRounded
        : name === "user-shield-01" && !variant ? UserShield01StrokeRounded
            : name === "user-shield-01" && variant === "solid" ? UserShield01SolidRounded
            : name === "user-shield-01" && variant === "bulk" ? UserShield01BulkRounded
            : name === "user-shield-01" && variant === "twotone" ? UserShield01TwotoneRounded
            : name === "user-shield-01" && variant === "duotone" ? UserShield01DuotoneRounded
        : name === "album-01" && !variant ? Album01StrokeRounded
            : name === "album-01" && variant === "solid" ? Album01SolidRounded
            : name === "album-01" && variant === "bulk" ? Album01BulkRounded
            : name === "album-01" && variant === "twotone" ? Album01TwotoneRounded
            : name === "album-01" && variant === "duotone" ? Album01DuotoneRounded
        : name === "desk" && !variant ? DeskStrokeRounded
            : name === "desk" && variant === "solid" ? DeskSolidRounded
            : name === "desk" && variant === "bulk" ? DeskBulkRounded
            : name === "desk" && variant === "twotone" ? DeskTwotoneRounded
            : name === "desk" && variant === "duotone" ? DeskDuotoneRounded
        : name === "globe-02" && !variant ? Globe02StrokeRounded
            : name === "globe-02" && variant === "solid" ? Globe02SolidRounded
            : name === "globe-02" && variant === "bulk" ? Globe02BulkRounded
            : name === "globe-02" && variant === "twotone" ? Globe02TwotoneRounded
            : name === "globe-02" && variant === "duotone" ? Globe02DuotoneRounded
        : name === "pin-location-03" && !variant ? PinLocation03StrokeRounded
            : name === "pin-location-03" && variant === "solid" ? PinLocation03SolidRounded
            : name === "pin-location-03" && variant === "bulk" ? PinLocation03BulkRounded
            : name === "pin-location-03" && variant === "twotone" ? PinLocation03TwotoneRounded
            : name === "pin-location-03" && variant === "duotone" ? PinLocation03DuotoneRounded
        : name === "tags" && !variant ? TagsStrokeRounded
            : name === "tags" && variant === "solid" ? TagsSolidRounded
            : name === "tags" && variant === "bulk" ? TagsBulkRounded
            : name === "tags" && variant === "twotone" ? TagsTwotoneRounded
            : name === "tags" && variant === "duotone" ? TagsDuotoneRounded
        : name === "database-02" && !variant ? Database02StrokeRounded
            : name === "database-02" && variant === "solid" ? Database02SolidRounded
            : name === "database-02" && variant === "bulk" ? Database02BulkRounded
            : name === "database-02" && variant === "twotone" ? Database02TwotoneRounded
            : name === "database-02" && variant === "duotone" ? Database02DuotoneRounded
        : name === "library" && !variant ? LibraryStrokeRounded
            : name === "library" && variant === "solid" ? LibrarySolidRounded
            : name === "library" && variant === "bulk" ? LibraryBulkRounded
            : name === "library" && variant === "twotone" ? LibraryTwotoneRounded
            : name === "library" && variant === "duotone" ? LibraryDuotoneRounded
        : name === "user-multiple-02" && !variant ? UserMultiple02StrokeRounded
            : name === "user-multiple-02" && variant === "solid" ? UserMultiple02SolidRounded
            : name === "user-multiple-02" && variant === "bulk" ? UserMultiple02BulkRounded
            : name === "user-multiple-02" && variant === "twotone" ? UserMultiple02TwotoneRounded
            : name === "user-multiple-02" && variant === "duotone" ? UserMultiple02DuotoneRounded
        : name === "arrow-expand-01" && !variant ? ArrowExpand01StrokeRounded
            : name === "arrow-expand-01" && variant === "solid" ? ArrowExpand01SolidRounded
            : name === "arrow-expand-01" && variant === "bulk" ? ArrowExpand01BulkRounded
            : name === "arrow-expand-01" && variant === "twotone" ? ArrowExpand01TwotoneRounded
            : name === "arrow-expand-01" && variant === "duotone" ? ArrowExpand01DuotoneRounded
        : name === "arrow-expand" && !variant ? ArrowExpandStrokeRounded
            : name === "arrow-expand" && variant === "solid" ? ArrowExpandSolidRounded
            : name === "arrow-expand" && variant === "bulk" ? ArrowExpandBulkRounded
            : name === "arrow-expand" && variant === "twotone" ? ArrowExpandTwotoneRounded
            : name === "arrow-expand" && variant === "duotone" ? ArrowExpandDuotoneRounded
        : name === "arrow-horizontal" && !variant ? ArrowHorizontalStrokeRounded
            : name === "arrow-horizontal" && variant === "solid" ? ArrowHorizontalSolidRounded
            : name === "arrow-horizontal" && variant === "bulk" ? ArrowHorizontalBulkRounded
            : name === "arrow-horizontal" && variant === "twotone" ? ArrowHorizontalTwotoneRounded
            : name === "arrow-horizontal" && variant === "duotone" ? ArrowHorizontalDuotoneRounded
        : name === "arrow-left-01" && !variant ? ArrowLeft01StrokeRounded
            : name === "arrow-left-01" && variant === "solid" ? ArrowLeft01SolidRounded
            : name === "arrow-left-01" && variant === "bulk" ? ArrowLeft01BulkRounded
            : name === "arrow-left-01" && variant === "twotone" ? ArrowLeft01TwotoneRounded
            : name === "arrow-left-01" && variant === "duotone" ? ArrowLeft01DuotoneRounded
        : name === "arrow-shrink-01" && !variant ? ArrowShrink01StrokeRounded
            : name === "arrow-shrink-01" && variant === "solid" ? ArrowShrink01SolidRounded
            : name === "arrow-shrink-01" && variant === "bulk" ? ArrowShrink01BulkRounded
            : name === "arrow-shrink-01" && variant === "twotone" ? ArrowShrink01TwotoneRounded
            : name === "arrow-shrink-01" && variant === "duotone" ? ArrowShrink01DuotoneRounded
        : name === "arrow-shrink" && !variant ? ArrowShrinkStrokeRounded
            : name === "arrow-shrink" && variant === "solid" ? ArrowShrinkSolidRounded
            : name === "arrow-shrink" && variant === "bulk" ? ArrowShrinkBulkRounded
            : name === "arrow-shrink" && variant === "twotone" ? ArrowShrinkTwotoneRounded
            : name === "arrow-shrink" && variant === "duotone" ? ArrowShrinkDuotoneRounded
        : name === "arrow-up-right-02" && !variant ? ArrowUpRight02StrokeRounded
            : name === "arrow-up-right-02" && variant === "solid" ? ArrowUpRight02SolidRounded
            : name === "arrow-up-right-02" && variant === "bulk" ? ArrowUpRight02BulkRounded
            : name === "arrow-up-right-02" && variant === "twotone" ? ArrowUpRight02TwotoneRounded
            : name === "arrow-up-right-02" && variant === "duotone" ? ArrowUpRight02DuotoneRounded
        : name === "copy-01" && !variant ? Copy01StrokeRounded
            : name === "copy-01" && variant === "solid" ? Copy01SolidRounded
            : name === "copy-01" && variant === "bulk" ? Copy01BulkRounded
            : name === "copy-01" && variant === "twotone" ? Copy01TwotoneRounded
            : name === "copy-01" && variant === "duotone" ? Copy01DuotoneRounded
        : name === "database-01" && !variant ? Database01StrokeRounded
            : name === "database-01" && variant === "solid" ? Database01SolidRounded
            : name === "database-01" && variant === "bulk" ? Database01BulkRounded
            : name === "database-01" && variant === "twotone" ? Database01TwotoneRounded
            : name === "database-01" && variant === "duotone" ? Database01DuotoneRounded
        : name === "liver" && !variant ? LiverStrokeRounded
            : name === "liver" && variant === "solid" ? LiverSolidRounded
            : name === "liver" && variant === "bulk" ? LiverBulkRounded
            : name === "liver" && variant === "twotone" ? LiverTwotoneRounded
            : name === "liver" && variant === "duotone" ? LiverDuotoneRounded
        : name === "maximize-screen" && !variant ? MaximizeScreenStrokeRounded
            : name === "maximize-screen" && variant === "solid" ? MaximizeScreenSolidRounded
            : name === "maximize-screen" && variant === "bulk" ? MaximizeScreenBulkRounded
            : name === "maximize-screen" && variant === "twotone" ? MaximizeScreenTwotoneRounded
            : name === "maximize-screen" && variant === "duotone" ? MaximizeScreenDuotoneRounded
        : name === "minimize-screen" && !variant ? MinimizeScreenStrokeRounded
            : name === "minimize-screen" && variant === "solid" ? MinimizeScreenSolidRounded
            : name === "minimize-screen" && variant === "bulk" ? MinimizeScreenBulkRounded
            : name === "minimize-screen" && variant === "twotone" ? MinimizeScreenTwotoneRounded
            : name === "minimize-screen" && variant === "duotone" ? MinimizeScreenDuotoneRounded            
        : name === "share-05" && !variant ? Share05StrokeRounded
            : name === "share-05" && variant === "solid" ? Share05SolidRounded
            : name === "share-05" && variant === "bulk" ? Share05BulkRounded
            : name === "share-05" && variant === "twotone" ? Share05TwotoneRounded
            : name === "share-05" && variant === "duotone" ? Share05DuotoneRounded
        : name === "volume-mute-01" && !variant ? VolumeMute01StrokeRounded
            : name === "volume-mute-01" && variant === "solid" ? VolumeMute01SolidRounded
            : name === "volume-mute-01" && variant === "bulk" ? VolumeMute01BulkRounded
            : name === "volume-mute-01" && variant === "twotone" ? VolumeMute01TwotoneRounded
            : name === "volume-mute-01" && variant === "duotone" ? VolumeMute01DuotoneRounded
        : name === "volume-off" && !variant ? VolumeOffStrokeRounded
            : name === "volume-off" && variant === "solid" ? VolumeOffSolidRounded
            : name === "volume-off" && variant === "bulk" ? VolumeOffBulkRounded
            : name === "volume-off" && variant === "twotone" ? VolumeOffTwotoneRounded
            : name === "volume-off" && variant === "duotone" ? VolumeOffDuotoneRounded
        : name === "maps-search" && !variant ? MapsSearchStrokeRounded
            : name === "maps-search" && variant === "solid" ? MapsSearchSolidRounded
            : name === "maps-search" && variant === "bulk" ? MapsSearchBulkRounded
            : name === "maps-search" && variant === "twotone" ? MapsSearchTwotoneRounded
            : name === "maps-search" && variant === "duotone" ? MapsSearchDuotoneRounded
        : name === "camera-01" && !variant ? Camera01StrokeRounded
            : name === "camera-01" && variant === "solid" ? Camera01SolidRounded
            : name === "camera-01" && variant === "bulk" ? Camera01BulkRounded
            : name === "camera-01" && variant === "twotone" ? Camera01TwotoneRounded
            : name === "camera-01" && variant === "duotone" ? Camera01DuotoneRounded
        : name === "filter" && !variant ? FilterStrokeRounded
            : name === "filter" && variant === "solid" ? FilterSolidRounded
            : name === "filter" && variant === "bulk" ? FilterBulkRounded
            : name === "filter" && variant === "twotone" ? FilterTwotoneRounded
            : name === "filter" && variant === "duotone" ? FilterDuotoneRounded
        : name === "pin" && !variant ? PinStrokeRounded
            : name === "pin" && variant === "solid" ? PinSolidRounded
            : name === "pin" && variant === "bulk" ? PinBulkRounded
            : name === "pin" && variant === "twotone" ? PinTwotoneRounded
            : name === "pin" && variant === "duotone" ? PinDuotoneRounded
        : name === "sorting-19" && !variant ? Sorting19StrokeRounded
            : name === "sorting-19" && variant === "solid" ? Sorting19SolidRounded
            : name === "sorting-19" && variant === "bulk" ? Sorting19BulkRounded
            : name === "sorting-19" && variant === "twotone" ? Sorting19TwotoneRounded
            : name === "sorting-19" && variant === "duotone" ? Sorting19DuotoneRounded
        : name === "sorting-91" && !variant ? Sorting91StrokeRounded
            : name === "sorting-91" && variant === "solid" ? Sorting91SolidRounded
            : name === "sorting-91" && variant === "bulk" ? Sorting91BulkRounded
            : name === "sorting-91" && variant === "twotone" ? Sorting91TwotoneRounded
            : name === "sorting-91" && variant === "duotone" ? Sorting91DuotoneRounded
        : name === "music-note-01" && !variant ? MusicNote01StrokeRounded
            : name === "music-note-01" && variant === "solid" ? MusicNote01SolidRounded
            : name === "music-note-01" && variant === "bulk" ? MusicNote01BulkRounded
            : name === "music-note-01" && variant === "twotone" ? MusicNote01TwotoneRounded
            : name === "music-note-01" && variant === "duotone" ? MusicNote01DuotoneRounded
        : name === "delete-04" && !variant ? Delete04StrokeRounded
            : name === "delete-04" && variant === "solid" ? Delete04SolidRounded
            : name === "delete-04" && variant === "bulk" ? Delete04BulkRounded
            : name === "delete-04" && variant === "twotone" ? Delete04TwotoneRounded
            : name === "delete-04" && variant === "duotone" ? Delete04DuotoneRounded
        : name === "apple" && !variant ? AppleStrokeRounded
            : name === "apple" && variant === "solid" ? AppleSolidRounded
            : name === "apple" && variant === "bulk" ? AppleBulkRounded
            : name === "apple" && variant === "twotone" ? AppleTwotoneRounded
            : name === "apple" && variant === "duotone" ? AppleDuotoneRounded
        : name === "github-01" && !variant ? Github01StrokeRounded
            : name === "github-01" && variant === "solid" ? Github01SolidRounded
            : name === "github-01" && variant === "bulk" ? Github01BulkRounded
            : name === "github-01" && variant === "twotone" ? Github01TwotoneRounded
            : name === "github-01" && variant === "duotone" ? Github01DuotoneRounded
        : name === "message-download-01" && !variant ? MessageDownload01StrokeRounded
            : name === "message-download-01" && variant === "solid" ? MessageDownload01SolidRounded
            : name === "message-download-01" && variant === "bulk" ? MessageDownload01BulkRounded
            : name === "message-download-01" && variant === "twotone" ? MessageDownload01TwotoneRounded
            : name === "message-download-01" && variant === "duotone" ? MessageDownload01DuotoneRounded
        : name === "clipboard" && !variant ? ClipboardStrokeRounded
            : name === "clipboard" && variant === "solid" ? ClipboardSolidRounded
            : name === "clipboard" && variant === "bulk" ? ClipboardBulkRounded
            : name === "clipboard" && variant === "twotone" ? ClipboardTwotoneRounded
            : name === "clipboard" && variant === "duotone" ? ClipboardDuotoneRounded
        : name === "inbox" && !variant ? InboxStrokeRounded
            : name === "inbox" && variant === "solid" ? InboxSolidRounded
            : name === "inbox" && variant === "bulk" ? InboxBulkRounded
            : name === "inbox" && variant === "twotone" ? InboxTwotoneRounded
            : name === "inbox" && variant === "duotone" ? InboxDuotoneRounded
        : name === "document-validation" && !variant ? DocumentValidationStrokeRounded
            : name === "document-validation" && variant === "solid" ? DocumentValidationSolidRounded
            : name === "document-validation" && variant === "bulk" ? DocumentValidationBulkRounded
            : name === "document-validation" && variant === "twotone" ? DocumentValidationTwotoneRounded
            : name === "document-validation" && variant === "duotone" ? DocumentValidationDuotoneRounded
        : name === "loading-02" && !variant ? Loading02StrokeRounded
            : name === "loading-02" && variant === "solid" ? Loading02SolidRounded
            : name === "loading-02" && variant === "bulk" ? Loading02BulkRounded
            : name === "loading-02" && variant === "twotone" ? Loading02TwotoneRounded
            : name === "loading-02" && variant === "duotone" ? Loading02DuotoneRounded
        : name === "traffic-light" && !variant ? TrafficLightStrokeRounded
            : name === "traffic-light" && variant === "solid" ? TrafficLightSolidRounded
            : name === "traffic-light" && variant === "bulk" ? TrafficLightBulkRounded
            : name === "traffic-light" && variant === "twotone" ? TrafficLightTwotoneRounded
            : name === "traffic-light" && variant === "duotone" ? TrafficLightDuotoneRounded
        : name === "arrow-up-02" && !variant ? ArrowUp02StrokeRounded
            : name === "arrow-up-02" && variant === "solid" ? ArrowUp02SolidRounded
            : name === "arrow-up-02" && variant === "bulk" ? ArrowUp02BulkRounded
            : name === "arrow-up-02" && variant === "twotone" ? ArrowUp02TwotoneRounded
            : name === "arrow-up-02" && variant === "duotone" ? ArrowUp02DuotoneRounded
        : FileUnknownStrokeRounded
    return <HugeiconsIcon icon={getIcon} {...options} onClick={clickOption ? clickOption : undefined} />
}
