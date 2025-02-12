"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  Input,
  Tabs,
  Tab,
} from "@heroui/react";
import { columnAct, usersDummy2 } from "@/utils/Helpers";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import {
  ClockArrowDown,
  RefreshCw,
  Signature,
  UserRoundPen,
} from "lucide-react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";

const radius = ["full", "lg", "md", "sm", "none"];
const TopActivityTabs = () => {
  const [selected, setSelected] = React.useState("absence");

  return (
    <Tabs
      className="flex items-center justify-start"
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={(key) => setSelected(key as string)}
    >
      <Tab
        key="absensi"
        title={
          <div className="flex items-center space-x-2">
            <span>Absensi</span>
            <Chip size="sm" variant="solid" color="danger">
              1
            </Chip>
          </div>
        }
      >
        {/* Table yang belum absen */}
        <TopActivityComp />
        {/* action send message */}
      </Tab>
      <Tab
        key="cuti"
        title={
          <div className="flex items-center space-x-2">
            <span>Cuti</span>
            <Chip size="sm" variant="solid" color="warning">
              1
            </Chip>
          </div>
        }
      >
        {/* Table yang request cuti */}
        {/* TABS UNTUK LEMBUR IN PAGE ACTIVITY */}
        {/* action approval and review */}
      </Tab>
      <Tab
        key="lembur"
        title={
          <div className="flex items-center space-x-2">
            <span>Lembur</span>
            <Chip size="sm" variant="solid" color="secondary">
              1
            </Chip>
          </div>
        }
      >
        {/* Table yang request lembur*/}
        {/* <TableLembur /> */}
        {/* action approval and review */}
      </Tab>
    </Tabs>
  );
};
const TopActivityComp = () => {
  const RefreshIcon = () => {
    return (
      <Button
        className="border-none"
        color="secondary"
        variant="light"
        radius="md"
        size="sm"
      >
        <RefreshCw className="text-default-400" />
      </Button>
    );
  };
  const AprovalIcon = () => {
    return (
      <Button
        className="border-none"
        color="secondary"
        variant="light"
        radius="md"
        size="sm"
      >
        <UserRoundPen className="text-defaul-400" />
      </Button>
    );
  };
  type user = (typeof usersDummy2)[0];
  const renderCell = React.useCallback((user: user, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof user];
    const statusColorMap: Record<string, ChipProps["color"]> = {
      WFO: "success",
      WFH: "danger",
      SUBMISSION: "warning",
    };
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <h3>{cellValue}</h3>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.id}
              {/* ID Berisi NIP Pegawai */}
            </p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-center gap-[-10]">
            <Tooltip content="Refresh">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <RefreshIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit User">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <AprovalIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columnAct}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={usersDummy2}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
const TopModalComp = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex mb-5 mt-5 justify-start flex-col gap-4">
      <div className="flex-wrap flex gap-5">
        <div className="flex gap-2">
          <Button
            endContent={<ClockArrowDown />}
            className="flex max-w-fit bg-lamaSky"
            onPress={onOpen}
          >
            Pending
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          placement={"top-center"}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Permintaan Approval Absense
                </ModalHeader>
                <ModalBody>
                  <div className="w-full flex flex-row flex-wrap gap-4">
                    {radius.map((r) => (
                      <Input
                        key={r}
                        className="max-w-[220px]"
                        defaultValue="junior@heroui.com"
                        label="Email"
                        placeholder="Enter your email"
                        radius={"md"}
                        type="email"
                      />
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="flex gap-2">
          <Button
            endContent={<ClockArrowDown />}
            className="flex max-w-fit bg-LamaYellow"
            onPress={onOpen}
          >
            Lembur
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          placement={"top-center"}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <div className="w-full flex flex-row flex-wrap gap-4">
                    {radius.map((r) => (
                      <Input
                        key={r}
                        className="max-w-[220px]"
                        defaultValue="junior@heroui.com"
                        label="Email"
                        placeholder="Enter your email"
                        radius={"md"}
                        type="email"
                      />
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="flex gap-2 bg-lamaRedLight">
          <Button
            endContent={<ClockArrowDown />}
            className="flex max-w-fit"
            onPress={onOpen}
          >
            Cuti
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          placement={"top-center"}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <div className="w-full flex flex-row flex-wrap gap-4">
                    {radius.map((r) => (
                      <Input
                        key={r}
                        className="max-w-[220px]"
                        defaultValue="junior@heroui.com"
                        label="Email"
                        placeholder="Enter your email"
                        radius={"md"}
                        type="email"
                      />
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
const TopCutiPop = ({}) => {
  const UserTwitterCard = () => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
      <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
        <CardHeader className="justify-between">
          <div className="flex gap-3">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                @zoeylang
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0">
          <p className="text-small pl-px text-default-500">
            Full-stack developer, @hero_ui lover she/her
            <span aria-label="confetti" role="img">
              🎉
            </span>
          </p>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-600 text-small">4</p>
            <p className=" text-default-500 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-600 text-small">97.1K</p>
            <p className="text-default-500 text-small">Followers</p>
          </div>
        </CardFooter>
      </Card>
    );
  };
  const App = () => {
    return (
      <Popover showArrow placement="bottom">
        <PopoverTrigger>
          <User
            as="button"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            className="transition-transform"
            description="Product Designer"
            name="Zoe Lang"
          />
        </PopoverTrigger>
        <PopoverContent className="p-1">
          <UserTwitterCard />
        </PopoverContent>
      </Popover>
    );
  };
};
export { TopActivityComp, TopModalComp, TopCutiPop, TopActivityTabs };
