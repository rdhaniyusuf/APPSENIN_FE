"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Checkbox,
  ModalFooter,
  CardHeader,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  user,
  DateInput,
  TimeInput,
  useCheckbox,
  VisuallyHidden,
  tv,
} from "@heroui/react";
import { getLocalTimeZone, Time, today } from "@internationalized/date";
import {
  topCardList,
  tableColumns,
  usersDummy,
  statusOptions,
} from "@/utils/Helpers";
import {
  SearchIcon,
  ChevronDownIcon,
  PlusIcon,
  Ellipsis,
  Signature,
  RefreshCw,
  UserRoundPen,
  Columns,
  MailIcon,
  LockIcon,
  Link,
  ClockAlert,
  ClipboardPen,
  FilePen,
} from "lucide-react";
import React, { SVGProps, useState } from "react";

const TopCardComp = () => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {topCardList.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0"></CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <Chip
              className="rounded-lg items-center"
              color={
                item.color as
                  | "danger"
                  | "warning"
                  | "default"
                  | "success"
                  | "primary"
                  | "secondary"
              }
              startContent={<item.icon size={16} />}
              variant="flat"
            >
              {item.count}
            </Chip>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
const statusColorMap: Record<string, ChipProps["color"]> = {
  wfo: "success",
  wfh: "primary",
  submission: "warning",
};
type user = (typeof usersDummy)[0];
export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "clockIn",
  "clockOut",
  "status",
  "actions",
];
const BottomTable = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "nip",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(usersDummy.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return tableColumns;

    return tableColumns.filter((tableColumns) =>
      Array.from(visibleColumns).includes(tableColumns.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...usersDummy];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [filterValue, statusFilter, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: user, b: user) => {
      const first = a[sortDescriptor.column as keyof user] as number;
      const second = b[sortDescriptor.column as keyof user] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: user, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof user];

    switch (columnKey) {
      case "name":
        return (
          <User
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Ellipsis className="text-default-400 rotate-90" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {tableColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {usersDummy.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-content", "max-w-content"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper:
            "flex-col relative box-sizing:border-box overflow: hidden display: inline-block after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.nip}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
//tampilan tabel utama
const BottomActivity = () => {
  const [selected, setSelected] = React.useState("absence");
  return (
    <Tabs
      className="flex items-center justify-self-center"
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
        <TableAbsensi />
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
        <TableCuti />
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
        <TableLembur />
        {/* action approval and review */}
      </Tab>
    </Tabs>
  );
};
//tampilan daftar user yang belum absen
const TableAbsensi = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [] = React.useState<Selection>(new Set([]));
  const [statusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(13);
  const INITIAL_VISIBLE_COLUMNS_ABSEN = ["name", "time", "status", "actions"];
  const [visibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS_ABSEN)
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "clockIn",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(usersDummy.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all")
      return tableColumns.map((column) => ({ ...column, sortable: false }));

    return tableColumns
      .filter((tableColumns) =>
        Array.from(visibleColumns).includes(tableColumns.uid)
      )
      .map((column) => ({ ...column, sortable: false }));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...usersDummy];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [filterValue, statusFilter, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: user, b: user) => {
      const first = a[sortDescriptor.column as keyof user] as number;
      const second = b[sortDescriptor.column as keyof user] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: user, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof user];

    switch (columnKey) {
      case "name":
        return <>{cellValue}</>;
      case "status":
        return (
          <Chip
            className="capitalize border-none text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="justify-center">
            <PopMesssage />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );
  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mb-[-10]">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <div className="flex-wrap justify-between items-center">
              <span className="text-default-400 text-small">
                {/* Total {use?.length} users */}
              </span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onRowsPerPageChange]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="px-2 flex justify-end items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400"></span>
      </div>
    );
  }, [page, pages, hasSearchFilter]);
  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-content", "max-w-content"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    []
  );
  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.nip}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
// Modal messager user
const ModalMessage = () => {
  const [messageSend, diretTo] = React.useState(false);
  const item = usersDummy[0];

  return (
    <>
      <Card className="w-[300px] border-none bg-transparent" shadow="none">
        <CardHeader className="justify-between">
          <div className="flex gap-3">
            <Avatar isBordered radius="full" size="md" src={item.role} />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {item.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                {item.team}
              </h5>
            </div>
          </div>
          <Button
            className={
              messageSend
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={messageSend ? "bordered" : "solid"}
            onPress={() => diretTo(!messageSend)}
          >
            {messageSend ? "Direct to" : "Message"}
          </Button>
        </CardHeader>
        <CardBody key="item" className="flex px-3 py-0">
          <div className="flex gap-2 items-center">
            <ClockAlert className="" />
            <p className="text-small pl-px">Work Time In : {item.clockIn}</p>
            <p className="text-small pl-px">Work Tim Over : {item.time}</p>
          </div>
        </CardBody>
        <CardFooter className="flex gap-3">
          <div className="flex gap-1">
            <p className="text-default-500 text-small">
              Date : 12 Februari 2025
            </p>
          </div>
          <div className="flex gap-1">
            <p className=" text-default-500 text-small">{item.status}</p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
//trigger ke Whatsapp untuk kirim pesan ke nomor telepon user
const PopMesssage = () => {
  return (
    <Popover showArrow placement="left-start">
      <PopoverTrigger>
        <Button
          className="border-none"
          color="secondary"
          variant="light"
          radius="full"
          size="sm"
        >
          <Tooltip content="Report User">
            <UserRoundPen className="text-default-400" />
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <ModalMessage />
      </PopoverContent>
    </Popover>
  );
};
// Data tabel permintaan cuti user di dashboar TL
const TableCuti = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [] = React.useState<Selection>(new Set([]));
  const [statusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(13);
  const INITIAL_VISIBLE_COLUMNS_ABSEN = ["name", "date", "ket", "actions"];
  const [visibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS_ABSEN)
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "clockIn",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(usersDummy.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all")
      return tableColumns.map((column) => ({ ...column, sortable: false }));

    return tableColumns
      .filter((tableColumns) =>
        Array.from(visibleColumns).includes(tableColumns.uid)
      )
      .map((column) => ({ ...column, sortable: false }));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...usersDummy];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [filterValue, statusFilter, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: user, b: user) => {
      const first = a[sortDescriptor.column as keyof user] as number;
      const second = b[sortDescriptor.column as keyof user] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: user, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof user];

    switch (columnKey) {
      case "name":
        return <>{cellValue}</>;
      case "status":
        return (
          <Chip
            className="capitalize border-none text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="justify-center">
            <ModalApprovalCuti />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );
  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mb-[-10]">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <div className="flex-wrap justify-between items-center">
              <span className="text-default-400 text-small">
                {/* Total {use?.length} users */}
              </span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onRowsPerPageChange]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex justify-end items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400"></span>
      </div>
    );
  }, [page, pages, hasSearchFilter]);
  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-content", "max-w-auto", "overflow-hidden"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    []
  );
  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.nip}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
// Modal Form Untuk Approval Cuti
const ModalApprovalCuti = () => {
  const [isSelected, setIsSelected] = React.useState(false);
  const {
    children,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: true,
  });
  const checkbox = tv({
    slots: {
      base: "border-default hover:bg-default-200",
      content: "text-default-500",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
          content: "text-primary-foreground pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });
  const styles = checkbox({ isSelected, isFocusVisible });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="border-none"
        color="secondary"
        variant="light"
        radius="full"
        onPress={onOpen}
        size="sm"
      >
        <Tooltip content="View & Sign">
          <ClipboardPen className="text-default-400" />
        </Tooltip>
      </Button>
      <Modal
        itemProp="User Testing"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Leave Agreement Form
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <Card className="max-w-[400px]">
                    <CardHeader itemProp="User Testing" className="flex gap-3">
                      <Image
                        alt="avatar"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                      />
                      <div className="flex flex-col">
                        <p className="text-md">Bayu Laksmana</p>
                        <p className="text-small text-default-500">
                          Technical Support G.I
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      {/* <p>Reason for Leave</p> */}
                      <Input
                        isDisabled
                        className="max-w-lg"
                        defaultValue="By Data Inputan User"
                        label="Reasoning"
                        type="string"
                      />
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex-wrap gap-2">
                      <DateInput
                      isDisabled
                        defaultValue={today(getLocalTimeZone()).subtract({
                          days: 1,
                        })}
                        label="Start Date"
                        minValue={today(getLocalTimeZone())}
                      />
                      <DateInput
                      isDisabled
                        defaultValue={today(getLocalTimeZone()).subtract({
                          days: 1,
                        })}
                        label="End Date"
                        minValue={today(getLocalTimeZone())}
                      />
                      <Input
                        className="bg-white "
                        label="notes for employees"
                        placeholder="Enter your note"
                        type="email"
                        variant="bordered"
                      />
                      <Button
                        className="border-none"
                        color="secondary"
                        variant="light"
                        radius="full"
                        onPress={onOpen}
                        size="sm"
                      >
                        <Tooltip content="Digi-sign">
                          <Checkbox
                            isSelected={isSelected}
                            onValueChange={setIsSelected}
                          ></Checkbox>
                        </Tooltip>
                        <p className="text-default-500">
                          Sign Approval must be checklist
                        </p>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
                <Chip color="danger" variant="flat" onPress={onClose}>
                  Reject
                </Chip>
                <label {...getBaseProps()}>
                  <VisuallyHidden>
                    <input {...getInputProps()} />
                  </VisuallyHidden>
                  <Chip
                    classNames={{
                      base: styles.base(),
                      content: styles.content(),
                    }}
                    color="primary"
                    startContent={
                      isSelected ? <Signature className="ml-1" /> : null
                    }
                    variant="faded"
                    {...getLabelProps()}
                  >
                    {children
                      ? children
                      : isSelected
                      ? "Approval"
                      : "Didn't Sign"}
                  </Chip>
                </label>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
const TableLembur = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [] = React.useState<Selection>(new Set([]));
  const [statusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(13);
  const INITIAL_VISIBLE_COLUMNS_ABSEN = ["name", "time", "status", "actions"];
  const [visibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS_ABSEN)
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "clockIn",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(usersDummy.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all")
      return tableColumns.map((column) => ({ ...column, sortable: false }));

    return tableColumns
      .filter((tableColumns) =>
        Array.from(visibleColumns).includes(tableColumns.uid)
      )
      .map((column) => ({ ...column, sortable: false }));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...usersDummy];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [filterValue, statusFilter, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: user, b: user) => {
      const first = a[sortDescriptor.column as keyof user] as number;
      const second = b[sortDescriptor.column as keyof user] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: user, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof user];

    switch (columnKey) {
      case "name":
        return <>{cellValue}</>;
      case "status":
        return (
          <Chip
            className="capitalize border-none text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="justify-center">
            <ModalApprovalLembur />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );
  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mb-[-10]">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <div className="flex-wrap justify-between items-center">
              <span className="text-default-400 text-small">
                {/* Total {use?.length} users */}
              </span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onRowsPerPageChange]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="px-2 flex justify-end items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400"></span>
      </div>
    );
  }, [page, pages, hasSearchFilter]);
  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-conten", "max-w-content"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    []
  );
  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.nip}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
// Modal Daftar User Yang Mengajukan Lemburan
const ModalApprovalLembur = () => {
  const [isSelected, setIsSelected] = React.useState(false);
  const {
    children,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: true,
  });
  const checkbox = tv({
    slots: {
      base: "border-default hover:bg-default-200",
      content: "text-default-500",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
          content: "text-primary-foreground pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });
  const styles = checkbox({ isSelected, isFocusVisible });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        className="border-none"
        color="secondary"
        variant="light"
        radius="full"
        onPress={onOpen}
        size="sm"
      >
        <Tooltip content="View & Sign">
          <FilePen className="text-default-400" />
        </Tooltip>
      </Button>
      <Modal
        itemProp="User Testing"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Overtime Request Form
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <Card className="max-w-[400px]">
                    {/* Foto User */}
                    <CardHeader itemProp="User Testing" className="flex gap-3">
                      <Image
                        alt="avatar"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                      />
                      {/* Name & Role */}
                      <div className="flex flex-col">
                        <p className="text-md">Bayu Laksmana</p>
                        <p className="text-small text-default-500">
                          Technical Support G.I
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      {/* <p>Reason for Leave Inpurt</p> */}
                      <Input
                        isDisabled
                        className="max-w-lg"
                        defaultValue="By Data Inputan User"
                        label="Reasoning"
                        type="string"
                      />
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex-wrap gap-2">
                      <TimeInput
                        defaultValue={new Time(11, 45)}
                        label="Start Overtime"
                      />
                      <TimeInput
                        defaultValue={new Time(11, 45)}
                        label="End Overtime"
                      />
                      <Input
                        className="bg-white "
                        label="notes for employees"
                        placeholder="Enter your note"
                        type="email"
                        variant="bordered"
                      />
                      <Button
                        className="border-none"
                        color="secondary"
                        variant="light"
                        radius="full"
                        onPress={onOpen}
                        size="sm"
                      >
                        <Tooltip content="Digi-sign">
                          <Checkbox
                            isSelected={isSelected}
                            onValueChange={setIsSelected}
                          ></Checkbox>
                        </Tooltip>
                        <p className="text-default-500">
                          Sign Approval must be checklist
                        </p>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
                <Chip color="danger" variant="flat" onPress={onClose}>
                  Reject
                </Chip>
                <label {...getBaseProps()}>
                  <VisuallyHidden>
                    <input {...getInputProps()} />
                  </VisuallyHidden>
                  <Chip
                    classNames={{
                      base: styles.base(),
                      content: styles.content(),
                    }}
                    color="primary"
                    startContent={
                      isSelected ? <Signature className="ml-1" /> : null
                    }
                    variant="faded"
                    {...getLabelProps()}
                  >
                    {children
                      ? children
                      : isSelected
                      ? "Approval"
                      : "Didn't Sign"}
                  </Chip>
                </label>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export {
  TopCardComp,
  BottomTable,
  TableAbsensi,
  BottomActivity,
  TableCuti,
  TableLembur,
  ModalMessage,
  ModalApprovalCuti,
  ModalApprovalLembur,
};

