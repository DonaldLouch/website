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

export default function page() {
    const iconNames = HugeIconsNames.icons
    const iconsToRemove = [
        "mouse-01", "file-attachment", "arrow-right-01", "bluesky", "youtube", 
        "video-01", "video-02", "mail-at-sign-01", "arrow-all-direction", 
        "file-unknown", "arrow-up-right-01", "link-square-02", "home-01", 
        "refresh", "album-02", "alert-diamond", "camera-video", "chatting-01", 
        "files-02", "link-01", "news", "waving-hand-01", "zap", "cancel-01", 
        "cloud-upload", "file-upload", "calendar-03", "delete-02", "edit-02", 
        "image-02", "image-upload-01", "image-upload", "information-circle", 
        "play", "drag-drop", "delete-03", "delete-01", "cloud-saving-done-01",
        "plus-sign", "pencil-edit-01", "pencil-edit-02", "grid", "link-04", 
        "file-edit", "alert-circle", "checkmark-badge-03", "cone-01", "add-01", 
        "alert-01", "alert-02", "archive-02", "bookmark-01", "cancel-circle", 
        "checkmark-circle-02", "dashboard-browsing", "dashboard-speed-02", 
        "favourite", "flag-02", "folder-01", "laurel-wreath", "location-01", 
        "mail-01", "notification-03", "pencil", "search-01", "security-check", 
        "sent", "settings-02", "star", "tag-01", "save-money-dollar", "seo", 
        "smart-phone-01", "text-font", "new-twitter", "game-controller-01", 
        "wifi-connected-02", "spotify", "vimeo", "music-note-square-02", 
        "shirt-01", "soundcloud", "icon-jar", "facebook-02", "github", 
        "instagram", "laptop-check", "linkedin-02", "threads", "tiktok", 
        "property-edit", "view", "arrow-left-02", "arrow-left-03", 
        "arrow-right-02", "arrow-right-03", "go-backward-10-sec", 
        "go-forward-10-sec", "pause", "loading-03", "arrow-down-01", 
        "briefcase-02", "dashboard-square-02", "job-search", "passport-01", 
        "passport", "hand-pointing-right-01", "quote-down", "login-01", 
        "twitter", "files-01", "tick-01", "ticket-01", "remove-01", "book-02", 
        "contact", "time-02", "license", "task-add-01", "task-done-01", 
        "task-edit-01", "arrow-down-02", "checkmark-badge-01", "menu-01", 
        "remove-02", "unavailable", "task-01", "user", "user-shield-01", 
        "album-01", "desk", "globe-02", "pin-location-03", "tags", 
        "database-02", "library", "user-multiple-02", "arrow-expand-01", 
        "arrow-expand", "arrow-horizontal", "arrow-left-01", "arrow-shrink-01", 
        "arrow-shrink", "arrow-up-right-02", "copy-01", "database-01", "liver", 
        "maximize-screen", "minimize-screen", "share-05", "volume-mute-01", 
        "volume-off", "maps-search", "camera-01", "filter", "pin", 
        "sorting-19", "sorting-91", "music-note-01", "delete-04", "apple", 
        "github-01", "message-download-01", "clipboard", "inbox", 
        "document-validation", "loading-02", "traffic-light", "arrow-up-02", 
        "left-to-right-block-quote", "mail-edit-01", "check-list", 
        "arrow-down-right-01", "more-horizontal", "logout-01"
    ]
    
    const icons = iconNames
        .filter(icon => !iconsToRemove.includes(icon.name))
        .map(icon => icon.name)
    
    const list = icons.toString().replaceAll(",", '" | "')
    
    return <Box mt="2rem">
        <InlineCode code="console.log('Hello World')" />
        <ClipboardButton copyValue={list}></ClipboardButton>
        <HugeIcon name="tiktok" color="red" size="10rem" variant="twotone" />
    </Box>
}
