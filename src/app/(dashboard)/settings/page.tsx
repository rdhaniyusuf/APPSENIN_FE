'use client';
import { Tabs, Tab, Card, CardBody } from "@heroui/react";

export default function SettingsPage() {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Disabled Options" variant="underlined">
                <Tab key="photos" title="Photos">
                    
                </Tab>
                <Tab key="music" title="Music">
                    <Card>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="videos" title="Videos">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}