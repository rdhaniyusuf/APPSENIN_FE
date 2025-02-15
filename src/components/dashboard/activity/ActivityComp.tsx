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
  DatePicker,
  DateRangePicker,
  DateRangePickerField,
  ButtonGroup,
} from "@heroui/react";
import {
  getLocalTimeZone,
  parseDate,
  Time,
  today,
} from "@internationalized/date";
import {
  topCardList,
  tableColumns,
  usersDummy,
  statusOptions,
  statusOptionsCuti,
} from "@/utils/Helpers";
import {
  PlusIcon,
  Ellipsis,
  Signature,
  RefreshCw,
  UserRoundPen,
  ClockAlert,
  ClipboardPen,
  FilePen,
  ChevronDownIcon,
  FileDown,
  FilePlus2,
} from "lucide-react";
import React, { SVGProps, useState } from "react";

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
  "day",
  "date",
  "clockIn",
  "clockOut",
  "status",
  "actions",
];
// Main view in page activity
const ActiviyPageComp = () => {
  const [selected, setSelected] = React.useState("absence");
  return (
    <Tabs
      className="flex items-center justify-self-center  gap-2"
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
        <TableLembur/>
        {/* action approval and review */}
      </Tab>
    </Tabs>
  );
};
//Table Utama activity
const TableAbsensi = () => {
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
            {" "}
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Ellipsis className="text-default-400 rotate-90" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view"><CorectionIcon/></DropdownItem>
                <DropdownItem key="edit">View Status</DropdownItem>
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
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <DateRangePicker
            showMonthAndYearPickers
            label="Start Date & End Date"
            className="w-[20%]"
            variant="bordered"
            description="Pilih tanggal absen bulanan"
          />

          <div className="flex gap-3">
            <Tooltip content="Download as Pdf">
              <Button className="" size="sm" variant="flat">
                <FileDown size={20} />
              </Button>
            </Tooltip>
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
                selectionMode={"multiple"}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
  
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
  }, [statusFilter, onRowsPerPageChange]);

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
//Button triger
  const CorectionIcon = () => {
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
           <CorectionCard />
         </PopoverContent>
       </Popover>
     );
  }

   const CorectionCard = () => {
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

//=============================================================================
const INITIAL_VISIBLE_COLUMNS_CUTI = [
  "name",
  "day",
  "date",
  "date",
  "ket",
  "status",
  "actions",
];
const TableCuti = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS_CUTI)
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
      Array.from(statusFilter).length !== statusOptionsCuti.length
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
            {" "}
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Ellipsis className="text-default-400 rotate-90" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">Correction</DropdownItem>
                <DropdownItem key="edit">View Status</DropdownItem>
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
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <DateRangePicker
            showMonthAndYearPickers={true}
            label="Start Date & End Date"
            className="w-[20%]"
            variant="bordered"
            maxValue={today(getLocalTimeZone())}
            description="Pilih tanggal absen bulanan"
          />
          <div className="flex gap-3">
            <Tooltip content="Download as Pdf">
              <Button className="" size="sm" variant="flat">
                <FileDown size={20} />
              </Button>
            </Tooltip>
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
                selectionMode={"multiple"}
              >
                {statusOptionsCuti.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
  }, [statusFilter, onRowsPerPageChange]);

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
const TableLembur = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS_CUTI)
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
      Array.from(statusFilter).length !== statusOptionsCuti.length
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
            {" "}
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Ellipsis className="text-default-400 rotate-90" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">Correction</DropdownItem>
                <DropdownItem key="edit">View Status</DropdownItem>
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
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <DateRangePicker
          showMonthAndYearPickers
            label="Start Date & End Date"
            className="w-[20%]"
            variant="bordered"
            maxValue={today(getLocalTimeZone())}
            description="Pilih tanggal absen bulanan"
          />

          <div className="flex gap-3">
            <Tooltip content="Download as Pdf">
              <Button className="" size="sm" variant="flat">
                <FileDown size={20} />
              </Button>
            </Tooltip>
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
                selectionMode={"multiple"}
              >
                {statusOptionsCuti.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
              <Button
                size="sm"
                variant="flat"
                endContent={<PlusIcon/>}
                className="bg-foreground text-background"
              >
                Tambah
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
  }, [statusFilter, onRowsPerPageChange]);

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
//Button triger
const BtnCuti = () => {};

//Modal kirim message, belum di panggil
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
// Modal Form Untuk Pengajuan Cuti
const ModalCuti = () => {
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
// Modal Daftar User Yang Mengajukan Lemburan
const ModalLembur = () => {
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
  CorectionIcon,
  CorectionCard,
  ActiviyPageComp,
  TableAbsensi,
  TableCuti,
  TableLembur,
  ModalMessage,
  PopMesssage,
  ModalCuti,
  ModalLembur,
  // BtnAbsensi,
  BtnCuti,
};
