/*
    Hugeicons Icon Component v. 0.0.1
    By: [Donald Louch](https://donaldlouch.ca)

    Featuring: [Hugeicons: @hugeicons/react@0.6.2](https://hugeicons.com/icons)

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

import { Add01Icon, Album01Icon, Album02Icon, Alert01Icon, Alert02Icon, AlertCircleIcon, AlertDiamondIcon, AppleIcon, Archive02Icon, ArrowAllDirectionIcon, ArrowDown01Icon, ArrowDown02Icon, ArrowExpand01Icon, ArrowExpandIcon, ArrowHorizontalIcon, ArrowLeft01Icon, ArrowLeft02Icon, ArrowLeft03Icon, ArrowRight02Icon, ArrowRight03Icon, ArrowShrink01Icon, ArrowShrinkIcon, ArrowUp02Icon, ArrowUpRight01Icon, ArrowUpRight02Icon, Book02Icon, Bookmark01Icon, Briefcase02Icon, Calendar03Icon, Camera01Icon, CameraVideoIcon, Cancel01Icon, CancelCircleIcon, Chatting01Icon, CheckmarkBadge01Icon, CheckmarkBadge03Icon, CheckmarkCircle02Icon, ClipboardIcon, CloudSavingDone01Icon, CloudUploadIcon, Cone01Icon, ContactIcon, Copy01Icon, DashboardBrowsingIcon, DashboardSpeed02Icon, DashboardSquare02Icon, Database01Icon, Database02Icon, Delete01Icon, Delete02Icon, Delete03Icon, Delete04Icon, DeskIcon, DocumentValidationIcon, DragDropIcon, Edit02Icon, Facebook02Icon, FavouriteIcon, FileEditIcon, Files01Icon, Files02Icon, FileUnknownIcon, FileUploadIcon, FilterIcon, Flag02Icon, Folder01Icon, GameController01Icon, Github01Icon, GithubIcon, Globe02Icon, GoBackward10SecIcon, GoForward10SecIcon, GridIcon, HandPointingRight01Icon, Home01Icon, IconjarIcon, Image02Icon, ImageUpload01Icon, ImageUploadIcon, InboxIcon, InformationCircleIcon, InstagramIcon, JobSearchIcon, LaptopCheckIcon, LaurelWreath02Icon, LibraryIcon, LicenseIcon, Link01Icon, Link04Icon, Linkedin02Icon, LinkSquare02Icon, LiverIcon, Loading02Icon, Loading03Icon, Location01Icon, Login01Icon, Mail01Icon, MailAtSign01Icon, MapsSearchIcon, MaximizeScreenIcon, Menu01Icon, MessageDownload01Icon, MinimizeScreenIcon, MusicNote01Icon, MusicNoteSquare02Icon, NewsIcon, NewTwitterIcon, Notification03Icon, Passport01Icon, PassportIcon, PauseIcon, PencilEdit01Icon, PencilEdit02Icon, PencilIcon, PinIcon, PinLocation03Icon, PlayIcon, PlusSignIcon, PropertyEditIcon, QuoteDownIcon, RefreshIcon, Remove01Icon, Remove02Icon, SaveMoneyDollarIcon, Search01Icon, SecurityCheckIcon, SentIcon, SeoIcon, Settings02Icon, Share05Icon, Shirt01Icon, SmartPhone01Icon, Sorting19Icon, Sorting91Icon, SoundcloudIcon, SpotifyIcon, StarIcon, Tag01Icon, TagsIcon, Task01Icon, TaskAdd01Icon, TaskDone01Icon, TaskEdit01Icon, TextFontIcon, ThreadsIcon, Tick01Icon, Ticket01Icon, TiktokIcon, Time02Icon, TrafficLightIcon, TwitterIcon, UnavailableIcon, UserIcon, UserMultiple02Icon, UserShield01Icon, Video01Icon, Video02Icon, ViewIcon, VimeoIcon, VolumeMute01Icon, VolumeOffIcon, WavingHand01Icon, WifiConnected02Icon, YoutubeIcon, ZapIcon } from "@hugeicons/react"

export type IconVariant = "bulk"  | "stroke" | "solid" | "twotone" | "duotone"

export type IconName = "youtube" | "video-01" | "video-02" | "mail-at-sign-01" | "arrow-all-direction" | "file-unknown" | "arrow-up-right-01" | "link-square-02" | "home-01" | "refresh" | "album-02" | "alert-diamond" | "camera-video" | "chatting-01" | "files-02" | "link-01" | "news" | "waving-hand-01" | "zap" | "cancel-01" | "cloud-upload" | "file-upload" | "calendar-03" | "delete-02" | "edit-02" | "image-02" | "image-upload-01" | "image-upload" | "information-circle" | "play" | "drag-drop" | "delete-03" | "delete-01" | "cloud-saving-done-01"| "plus-sign" | "pencil-edit-01" | "pencil-edit-02" | "grid" | "link-04" | "file-edit" | "alert-circle" | "checkmark-badge-03" | "cone-01" | "add-01" | "alert-01" | "alert-02" | "archive-02" | "bookmark-01" | "cancel-circle" | "checkmark-circle-02" | "dashboard-browsing" | "dashboard-speed-02" | "favourite" |"flag-02" | "folder-01" | "laurel-wreath" | "location-01" | "mail-01" | "notification-03" | "pencil" | "search-01" | "security-check" | "sent" | "settings-02" | "star" | "tag-01" | "save-money-dollar" | "seo" | "smart-phone-01" | "text-font" | "new-twitter" | "game-controller-01" | "wifi-connected-02" | "spotify" | "vimeo" | "music-note-square-02" | "shirt-01" | "soundcloud" | "icon-jar" | "facebook-02" | "github" | "instagram" | "laptop-check" | "linkedin-02" | "threads" | "tiktok" | "property-edit" | "view" | "arrow-left-02" | "arrow-left-03" |"arrow-right-02" | "arrow-right-03" | "go-backward-10-sec" | "go-forward-10-sec" | "pause" | "loading-03" | "arrow-down-01" | "briefcase-02" | "dashboard-square-02" | "job-search" | "passport-01" | "passport" | "hand-pointing-right-01" | "quote-down" | "login-01" | "twitter" | "files-01" | "tick-01" | "ticket-01" | "remove-01" |"book-02" | "contact" | "time-02" | "license" | "task-add-01" | "task-done-01" | "task-edit-01" | "arrow-down-02" | "checkmark-badge-01" | "menu-01" | "remove-02" | "unavailable" | "task-01" | "user" | "user-shield-01" | "album-01" | "desk" | "globe-02" | "pin-location-03" | "tags" | "database-02" | "library" | "user-multiple-02" | "arrow-expand-01" | "arrow-expand" | "arrow-horizontal" | "arrow-left-01" | "arrow-shrink-01" | "arrow-shrink" | "arrow-up-right-02" | "copy-01" | "database-01" | "liver" | "maximize-screen" | "minimize-screen" | "share-05" | "volume-mute-01" | "volume-off" | "maps-search" | "camera-01" | "filter" | "pin" | "sorting-19" | "sorting-91" | "music-note-01" | "delete-04" | "apple" | "github-01" | "message-download-01" | "clipboard" | "inbox" | "document-validation" | "loading-02" | "traffic-light" | "arrow-up-02"

export type IconArray = {name: IconName, variant?: IconVariant}

export default function HugeIcon({name, variant, size, color, weight, ...rest}: {name: IconName, variant?: IconVariant, size?: any, color?: string, weight?: any, [key: string]: any}) {
    const options = {variant: variant ? variant : undefined, size: size ? size : undefined, color: color ? color : "currentColor", strokeWidth: weight ? weight : undefined}

    const icon = name === "file-unknown" ? <FileUnknownIcon {...options} />
        : name === "youtube" ? <YoutubeIcon {...options} /> 
        : name === "video-01" ? <Video01Icon {...options}  /> 
        : name === "video-02" ? <Video02Icon {...options}  /> 
        : name === "mail-at-sign-01" ? <MailAtSign01Icon {...options}  /> 
        : name === "arrow-all-direction" ? <ArrowAllDirectionIcon {...options}  />
        : name === "arrow-up-right-01" ? <ArrowUpRight01Icon {...options}  />
        : name === "link-square-02" ? <LinkSquare02Icon {...options}  />
        : name === "home-01" ? <Home01Icon {...options}  />
        : name === "refresh" ? <RefreshIcon {...options}  />
        : name === "album-02" ? <Album02Icon {...options}  />
        : name === "alert-diamond" ? <AlertDiamondIcon {...options}  />
        : name === "camera-video" ? <CameraVideoIcon {...options}  />
        : name === "chatting-01" ? <Chatting01Icon {...options}  />
        : name === "files-02" ? <Files02Icon {...options}  />
        : name === "link-01" ? <Link01Icon {...options}  />
        : name === "news" ? <NewsIcon {...options}  />
        : name === "waving-hand-01" ? <WavingHand01Icon {...options}  />
        : name === "zap" ? <ZapIcon {...options}  />
        : name === "cancel-01" ? <Cancel01Icon {...options}  />
        : name === "cloud-upload" ? <CloudUploadIcon {...options}  />
        : name === "file-upload" ? <FileUploadIcon {...options}  />
        : name === "calendar-03" ? <Calendar03Icon {...options}  />
        : name === "delete-02" ? <Delete02Icon {...options}  />
        : name === "edit-02" ? <Edit02Icon {...options}  /> 
        : name === "image-02" ? <Image02Icon {...options}  />
        : name === "image-upload-01" ? <ImageUpload01Icon {...options}  />
        : name === "image-upload" ? <ImageUploadIcon {...options}  />
        : name === "information-circle" ? <InformationCircleIcon {...options}  />
        : name === "play" ? <PlayIcon {...options}  />
        : name === "drag-drop" ? <DragDropIcon {...options}  />
        : name === "delete-03" ? <Delete03Icon {...options}  />
        : name === "delete-01" ? <Delete01Icon {...options}  />
        : name === "cloud-saving-done-01" ? <CloudSavingDone01Icon {...options}  />
        : name === "plus-sign" ? <PlusSignIcon {...options}  />
        : name === "pencil-edit-01" ? <PencilEdit01Icon {...options}  />
        : name === "pencil-edit-02" ? <PencilEdit02Icon {...options}  />
        : name === "grid" ? <GridIcon {...options}  />
        : name === "link-04" ? <Link04Icon {...options}  />
        : name === "file-edit" ? <FileEditIcon {...options}  />
        : name === "alert-circle" ? <AlertCircleIcon {...options}  />
        : name === "checkmark-badge-03" ? <CheckmarkBadge03Icon {...options}  />
        : name === "cone-01" ? <Cone01Icon {...options}  />
        : name === "add-01" ? <Add01Icon {...options}  />
        : name === "alert-01" ? <Alert01Icon {...options}  />
        : name === "alert-02" ? <Alert02Icon {...options}  />
        : name === "archive-02" ? <Archive02Icon {...options}  />
        : name === "bookmark-01" ? <Bookmark01Icon {...options}  />
        : name === "cancel-circle" ? <CancelCircleIcon {...options}  />
        : name === "checkmark-circle-02" ? <CheckmarkCircle02Icon {...options}  />
        : name === "dashboard-browsing" ? <DashboardBrowsingIcon {...options}  />
        : name === "dashboard-speed-02" ? <DashboardSpeed02Icon {...options}  />
        : name === "favourite" ? <FavouriteIcon {...options}  />
        : name === "flag-02" ? <Flag02Icon {...options}  />
        : name === "folder-01" ? <Folder01Icon {...options}  />
        : name === "laurel-wreath" ? <LaurelWreath02Icon {...options}  />
        : name === "location-01" ? <Location01Icon {...options}  />
        : name === "mail-01" ? <Mail01Icon {...options}  />
        : name === "notification-03" ? <Notification03Icon {...options}  />
        : name === "pencil" ? <PencilIcon {...options}  />
        : name === "search-01" ? <Search01Icon {...options}  />
        : name === "security-check" ? <SecurityCheckIcon {...options}  />
        : name === "sent" ? <SentIcon {...options}  />
        : name === "settings-02" ? <Settings02Icon {...options}  />
        : name === "star" ? <StarIcon {...options}  />
        : name === "tag-01" ? <Tag01Icon {...options}  />
        : name === "save-money-dollar" ? <SaveMoneyDollarIcon {...options}  />
        : name === "seo" ? <SeoIcon {...options}  />
        : name === "smart-phone-01" ? <SmartPhone01Icon {...options}  />
        : name === "text-font" ? <TextFontIcon {...options}  />
        : name === "new-twitter" ? <NewTwitterIcon {...options}  />
        : name === "game-controller-01" ? <GameController01Icon {...options}  />
        : name === "wifi-connected-02" ? <WifiConnected02Icon {...options}  />
        : name === "spotify" ? <SpotifyIcon {...options}  />
        : name === "vimeo" ? <VimeoIcon {...options}  />
        : name === "music-note-square-02" ? <MusicNoteSquare02Icon {...options}  />
        : name === "shirt-01" ? <Shirt01Icon {...options}  />
        : name === "soundcloud" ? <SoundcloudIcon {...options}  />
        : name === "icon-jar" ? <IconjarIcon {...options}  />
        : name === "facebook-02" ? <Facebook02Icon {...options}  />
        : name === "github" ? <GithubIcon {...options}  />
        : name === "instagram" ? <InstagramIcon {...options}  />
        : name === "laptop-check" ? <LaptopCheckIcon {...options}  />
        : name === "linkedin-02" ? <Linkedin02Icon {...options}  />
        : name === "threads" ? <ThreadsIcon {...options}  />
        : name === "tiktok" ? <TiktokIcon {...options}  />
        : name === "property-edit" ? <PropertyEditIcon {...options}  />
        : name === "view" ? <ViewIcon {...options}  />
        : name === "arrow-left-02" ? <ArrowLeft02Icon {...options}  />
        : name === "arrow-left-03" ? <ArrowLeft03Icon {...options}  />
        : name === "arrow-right-02" ? <ArrowRight02Icon {...options}  />
        : name === "arrow-right-03" ? <ArrowRight03Icon {...options}  />
        : name === "go-backward-10-sec" ? <GoBackward10SecIcon {...options}  />
        : name === "go-forward-10-sec" ? <GoForward10SecIcon {...options}  />
        : name === "pause" ? <PauseIcon {...options}  />
        : name === "loading-03" ? <Loading03Icon {...options}  />
        : name === "arrow-down-01" ? <ArrowDown01Icon {...options}  />
        : name === "briefcase-02" ? <Briefcase02Icon {...options}  />
        : name === "dashboard-square-02" ? <DashboardSquare02Icon {...options}  />
        : name === "job-search" ? <JobSearchIcon {...options}  />
        : name === "passport-01" ? <Passport01Icon {...options}  />
        : name === "passport" ? <PassportIcon {...options}  />
        : name === "hand-pointing-right-01" ? <HandPointingRight01Icon {...options}  />
        : name === "quote-down" ? <QuoteDownIcon {...options}  />
        : name === "login-01" ? <Login01Icon {...options}  />
        : name === "twitter" ? <TwitterIcon {...options}  />
        : name === "files-01" ? <Files01Icon {...options}  />
        : name === "tick-01" ? <Tick01Icon {...options}  />
        : name === "ticket-01" ? <Ticket01Icon {...options}  />
        : name === "remove-01" ? <Remove01Icon {...options}  />
        : name === "book-02" ? <Book02Icon {...options}  />
        : name === "contact" ? <ContactIcon {...options}  />
        : name === "time-02" ? <Time02Icon {...options}  />
        : name === "license" ? <LicenseIcon {...options}  />
        : name === "task-add-01" ? <TaskAdd01Icon {...options}  />
        : name === "task-done-01" ? <TaskDone01Icon {...options}  />
        : name === "task-edit-01" ? <TaskEdit01Icon {...options}  />
        : name === "arrow-down-02" ? <ArrowDown02Icon {...options}  />
        : name === "checkmark-badge-01" ? <CheckmarkBadge01Icon {...options}  />
        : name === "menu-01" ? <Menu01Icon {...options}  />
        : name === "remove-02" ? <Remove02Icon {...options}  />
        : name === "unavailable" ? <UnavailableIcon {...options}  />
        : name === "task-01" ? <Task01Icon {...options}  />
        : name === "user" ? <UserIcon {...options}  />
        : name === "user-shield-01" ? <UserShield01Icon {...options}  />
        : name === "album-01" ? <Album01Icon {...options}  />
        : name === "desk" ? <DeskIcon {...options}  />
        : name === "globe-02" ? <Globe02Icon {...options}  />
        : name === "pin-location-03" ? <PinLocation03Icon {...options}  />
        : name === "tags" ? <TagsIcon {...options}  />
        : name === "database-02" ? <Database02Icon {...options}  />
        : name === "library" ? <LibraryIcon {...options}  />
        : name === "user-multiple-02" ? <UserMultiple02Icon {...options}  />
        : name === "arrow-expand-01" ? <ArrowExpand01Icon {...options}  />
        : name === "arrow-expand" ? <ArrowExpandIcon {...options}  />
        : name === "arrow-horizontal" ? <ArrowHorizontalIcon {...options}  />
        : name === "arrow-left-01" ? <ArrowLeft01Icon {...options}  />
        : name === "arrow-shrink-01" ? <ArrowShrink01Icon {...options}  />
        : name === "arrow-shrink" ? <ArrowShrinkIcon {...options}  />
        : name === "arrow-up-right-02" ? <ArrowUpRight02Icon {...options}  />
        : name === "copy-01" ? <Copy01Icon {...options}  />
        : name === "database-01" ? <Database01Icon {...options}  />
        : name === "liver" ? <LiverIcon {...options}  />
        : name === "maximize-screen" ? <MaximizeScreenIcon {...options}  />
        : name === "minimize-screen" ? <MinimizeScreenIcon {...options}  />
        : name === "share-05" ? <Share05Icon {...options}  />
        : name === "volume-mute-01" ? <VolumeMute01Icon {...options}  />
        : name === "volume-off" ? <VolumeOffIcon {...options}  />
        : name === "maps-search" ? <MapsSearchIcon {...options}  />
        : name === "camera-01" ? <Camera01Icon {...options}  />
        : name === "filter" ? <FilterIcon {...options}  />
        : name === "pin" ? <PinIcon {...options}  />
        : name === "sorting-19" ? <Sorting19Icon {...options}  />
        : name === "sorting-91" ? <Sorting91Icon {...options}  />
        : name === "music-note-01" ? <MusicNote01Icon {...options}  />
        : name === "delete-04" ? <Delete04Icon {...options}  />
        : name === "apple" ? <AppleIcon {...options}  />
        : name === "github-01" ? <Github01Icon {...options}  />
        : name === "message-download-01" ? <MessageDownload01Icon {...options}  />
        : name === "clipboard" ? <ClipboardIcon {...options}  />
        : name === "inbox" ? <InboxIcon {...options}  />
        : name === "document-validation" ? <DocumentValidationIcon {...options}  />
        : name === "loading-02" ? <Loading02Icon {...options}  />
        : name === "traffic-light" ? <TrafficLightIcon {...options}  />
        : name === "arrow-up-02" ? <ArrowUp02Icon {...options}  />
        // : name === "bluesky" ? <BlueskyIcon {...options}  />
        : <FileUnknownIcon {...options}  />

    return icon
}
