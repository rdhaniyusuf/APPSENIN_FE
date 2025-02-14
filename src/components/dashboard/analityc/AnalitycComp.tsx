"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { GalleryThumbnailsIcon, MusicIcon, VideoIcon } from "lucide-react";

const TabsAnalitycComp = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <GalleryThumbnailsIcon />
              <span>Photos</span>
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <MusicIcon />
              <span>Music</span>
            </div>
          }
        />
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <VideoIcon />
              <span>Videos</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export { TabsAnalitycComp };
