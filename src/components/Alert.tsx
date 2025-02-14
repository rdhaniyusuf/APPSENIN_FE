import { Alert, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

interface AlertCompProps {
    colorA: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    contentA: string;
    titleA: string;
    buttonTextA: string;
    hrefA:string;
}

export default function AlertComp({ colorA, contentA, titleA, buttonTextA, hrefA }: AlertCompProps) {
    const router = useRouter();

    if (typeof window === 'undefined') {
        console.log(window);
        return null;
    }

    return (
        <div className="flex items-center justify-center">
            <Alert
            color={colorA}
            description={contentA}
            endContent={
                <Button
                color={colorA}
                size="sm"
                variant="flat"
                onPress={() => {
                    router.push(hrefA);
                }}
                >
                {buttonTextA}
                </Button>
            }
            title={titleA}
            variant="faded"
            classNames={{
                base:['w-[32rem]']
            }}
            />
        </div>
    );
}