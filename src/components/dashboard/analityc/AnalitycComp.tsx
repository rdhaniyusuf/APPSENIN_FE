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
  dateInput,
} from "@heroui/react";
import {
  CalendarDate,
  CalendarDateTime,
  getLocalTimeZone,
  isEqualMonth,
  parseDate,
  Time,
  today,
  ZonedDateTime,
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
  SearchIcon,
} from "lucide-react";
import React, { SVGProps, useEffect, useState } from "react";

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
// Main view in page Analityc
const AnalitycPageComp = () => {
  const [selected, setSelected] = React.useState("absence");
  return (
    <Tabs
      className="flex items-center justify-self-center gap-2 absolut"
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
// Deklarasi kolom absen
const INITIAL_VISIBLE_COLUMNS_ABSENSI = [
  "name",
  "day",
  "date",
  "schedule",
  "clockIn",
  "clockOut",
  "keterangan",
  "status",
  "koreksi",
];
//Table Utama activity
const TableAbsensi = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS_ABSENSI)
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
          <DateRangePicker
            onClick={close}
            showMonthAndYearPickers
            label="Start - End Date"
            className="w-[20%]"
            variant="bordered"
            color="default"
            description="Pilih absen bulanan"
          />

          <div className="flex gap-3">
            <Tooltip content="Unduh Pdf">
              <Button className="" size="sm" variant="flat" isIconOnly>
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
            <Input
              isClearable
              classNames={{
                base: "w-full",
                inputWrapper: "border-1",
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="flat"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
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
  }, [statusFilter, onRowsPerPageChange, filterValue, onSearchChange]);

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
//=============================================================================
const INITIAL_VISIBLE_COLUMNS_CUTI = [
  "name",
  "day",
  "schedule",
  "date",
  "time",
  "ket",
  "keterangan",
  "status",
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
          <DateRangePicker
            showMonthAndYearPickers={true}
            label="Start - End Date"
            className="w-[20%]"
            variant="bordered"
            maxValue={today(getLocalTimeZone())}
            description="Pilih absen bulanan"
          />
          <div className="flex gap-3">
            <Tooltip content="Unduh Pdf">
              <Button className="" size="sm" variant="flat" isIconOnly>
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
            <Input
              isClearable
              classNames={{
                base: "w-full",
                inputWrapper: "border-1",
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="flat"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
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
  }, [statusFilter, filterValue, onSearchChange, onRowsPerPageChange]);

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
const INITIAL_VISIBLE_COLUMNS_LEMBUR = [
  "name",
  "day",
  "date",
  "time1",
  "time2",
  "keterangan",
  "status",
];
const TableLembur = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS_LEMBUR)
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
          <DateRangePicker
            showMonthAndYearPickers
            label="Start - End Date"
            className="w-[20%]"
            variant="bordered"
            maxValue={today(getLocalTimeZone())}
            description="Pilih absen bulanan"
          />

          <div className="flex gap-3">
            {/* <ModalLembur /> */}
            <Tooltip content="Unduh Pdf">
              <Button className="" size="sm" variant="flat" isIconOnly>
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
            <Input
              isClearable
              classNames={{
                base: "w-full",
                inputWrapper: "border-1",
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="flat"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
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
  }, [statusFilter, filterValue, onSearchChange, onRowsPerPageChange]);

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
  const [user, setUser] = useState<user | null>(null);
  type user = (typeof usersDummy)[0];

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["kategori lembur"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );
  return (
    <>
      <Tooltip content="Tambah Lembur">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          className="bg-foreground text-background"
          color="secondary"
          onPress={onOpen}
        >
          <FilePen className="text-default-400" size={17} />
        </Button>
      </Tooltip>
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
                Form Pengajuan Lembur
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
                        <p className="text-md">{user?.name}</p>
                        <p className="text-small text-default-500">
                          {user?.role}
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            className="capitalize gap-2 mb-2"
                            variant="bordered"
                          >
                            {selectedValue}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          disallowEmptySelection
                          aria-label="Single selection example"
                          selectedKeys={selectedKeys}
                          selectionMode="single"
                          variant="flat"
                          onSelectionChange={setSelectedKeys}
                        >
                          <DropdownItem key="HARI KERJA">
                            Hari Kerja
                          </DropdownItem>
                          <DropdownItem key="LIBUR">Libur Biasa</DropdownItem>
                          <DropdownItem key="LIBUR NASIONAL">
                            Libur Nasional
                          </DropdownItem>
                          <DropdownItem key="PIKET HARI RAYA">
                            Piket Hari Raya
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      {/* <p>Reason for Leave Inpurt</p> */}
                      <Input
                        isRequired
                        variant="bordered"
                        className="max-w-lg"
                        placeholder="..."
                        labelPlacement="inside"
                        label="Reasoning"
                        type="text"
                      />
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex-wrap gap-2">
                      <TimeInput
                        variant="bordered"
                        isRequired
                        defaultValue={new Time(11, 45)}
                        label="Start Overtime"
                      />
                      <TimeInput
                        variant="bordered"
                        isRequired
                        defaultValue={new Time(11, 45)}
                        label="End Overtime"
                      />
                      <Input
                        isDisabled
                        className="bg-white "
                        label="Note Team Leader"
                        placeholder="Catatan"
                        type="text"
                        variant="flat"
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
                            isRequired
                            isSelected={isSelected}
                            onValueChange={setIsSelected}
                          ></Checkbox>
                        </Tooltip>
                        <p className="text-default-500">TTD Lembur</p>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
                <Chip color="danger" variant="flat" onclose={onClose}>
                  Batalkan
                </Chip>
                <label {...getBaseProps()}>
                  <VisuallyHidden>
                    <input {...getInputProps()} />
                  </VisuallyHidden>
                  <Chip
                    onClick={close}
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
                    {children ? children : isSelected ? "Ajukan" : "TTD"}
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
export { AnalitycPageComp, TableAbsensi, TableCuti, TableLembur, ModalLembur };
