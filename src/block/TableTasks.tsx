import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Modal, Space, Table, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Task } from "../model/data";

type DataIndex = keyof Task;

const tasks: Task[] = [
  {
    id: "1",
    title: "Complete React Project",
    description: "Finish the React project by adding final features.",
    startDate: "2024-08-01",
    endDate: "2024-08-10",
    priority: "high",
    dueDate: "2024-08-10",
    status: "in progress",
    tags: ["React", "Project"],
    createdAt: "2024-07-20",
    updatedAt: "2024-07-25",
  },
  {
    id: "2",
    title: "Write Documentation",
    description: "Write documentation for the new API endpoints.",
    startDate: "2024-08-05",
    endDate: "2024-08-12",
    priority: "medium",
    dueDate: "2024-08-12",
    status: "not started",
    tags: ["Documentation", "API"],
    createdAt: "2024-07-21",
    updatedAt: "2024-07-22",
  },
  {
    id: "3",
    title: "Fix Bug in Payment Module",
    description:
      "Resolve the bug in the payment module causing incorrect amounts.",
    startDate: "2024-08-03",
    endDate: "2024-08-07",
    priority: "high",
    dueDate: "2024-08-07",
    status: "completed",
    tags: ["Bug", "Payment"],
    createdAt: "2024-07-18",
    updatedAt: "2024-07-30",
  },
  {
    id: "4",
    title: "Design User Interface",
    description: "Design the UI for the new dashboard feature.",
    startDate: "2024-08-02",
    endDate: "2024-08-15",
    priority: "medium",
    dueDate: "2024-08-15",
    status: "in progress",
    tags: ["Design", "UI"],
    createdAt: "2024-07-25",
    updatedAt: "2024-07-28",
  },
  {
    id: "5",
    title: "Database Optimization",
    description: "Optimize the database queries for better performance.",
    startDate: "2024-08-07",
    endDate: "2024-08-14",
    priority: "high",
    dueDate: "2024-08-14",
    status: "not started",
    tags: ["Database", "Optimization"],
    createdAt: "2024-07-26",
    updatedAt: "2024-07-27",
  },
  {
    id: "6",
    title: "Update Dependencies",
    description: "Update all project dependencies to their latest versions.",
    startDate: "2024-08-10",
    endDate: "2024-08-12",
    priority: "low",
    dueDate: "2024-08-12",
    status: "not started",
    tags: ["Dependencies", "Update"],
    createdAt: "2024-07-28",
    updatedAt: "2024-07-29",
  },
  {
    id: "7",
    title: "User Testing",
    description: "Conduct user testing sessions for the new feature.",
    startDate: "2024-08-05",
    endDate: "2024-08-20",
    priority: "medium",
    dueDate: "2024-08-20",
    status: "not started",
    tags: ["Testing", "User"],
    createdAt: "2024-07-30",
    updatedAt: "2024-07-31",
  },
  {
    id: "8",
    title: "API Rate Limiting",
    description: "Implement rate limiting for the API to prevent abuse.",
    startDate: "2024-08-01",
    endDate: "2024-08-08",
    priority: "high",
    dueDate: "2024-08-08",
    status: "completed",
    tags: ["API", "Rate Limiting"],
    createdAt: "2024-07-22",
    updatedAt: "2024-07-23",
  },
  {
    id: "9",
    title: "Review Code",
    description: "Perform code review for recent pull requests.",
    startDate: "2024-08-12",
    endDate: "2024-08-18",
    priority: "medium",
    dueDate: "2024-08-18",
    status: "in progress",
    tags: ["Code Review", "Quality"],
    createdAt: "2024-07-31",
    updatedAt: "2024-08-01",
  },
  {
    id: "10",
    title: "Prepare Release Notes",
    description: "Prepare and publish release notes for the upcoming release.",
    startDate: "2024-08-15",
    endDate: "2024-08-20",
    priority: "low",
    dueDate: "2024-08-20",
    status: "not started",
    tags: ["Release", "Documentation"],
    createdAt: "2024-08-01",
    updatedAt: "2024-08-02",
  },
];
const getTagColor = (tag: string) => {
  switch (tag) {
    case "React":
      return "blue";
    case "Project":
      return "purple";
    case "Documentation":
      return "green";
    case "API":
      return "orange";
    case "Bug":
      return "red";
    case "Payment":
      return "geekblue";
    case "Design":
      return "volcano";
    case "UI":
      return "magenta";
    case "Database":
      return "cyan";
    case "Optimization":
      return "gold";
    case "Dependencies":
      return "lime";
    case "Update":
      return "pink";
    case "Testing":
      return "blue";
    case "User":
      return "purple";
    case "Rate Limiting":
      return "orange";
    case "Code Review":
      return "cyan";
    case "Quality":
      return "green";
    case "Release":
      return "gold";
  }
};
const TableTasks = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [visible, setVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const formatDateRange = (startDate: string, endDate: string) => {
    return `${startDate} - ${endDate}`;
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const handleShowDescription = (description: string) => {
    setSelectedDescription(description);
    setVisible(true);
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Task> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<Task> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filterSearch: true,
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
      width: 250,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 250,
      render: (text: string) => (
        <div>
          {text.length > 10 ? (
            <>
              {text.slice(0, 10)}...
              <Button type="link" onClick={() => handleShowDescription(text)}>
                Read More
              </Button>
            </>
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filterSearch: true,
      ...getColumnSearchProps("priority"),
      sorter: (a, b) => a.priority.length - b.priority.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "dueDate",
      dataIndex: "dueDate",
      key: "dueDate",
      filterSearch: true,
      sorter: (a, b) => a.dueDate.length - b.dueDate.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date Range",
      key: "dateRange",
      dataIndex: ["startDate", "endDate"],
      render: (text, record) =>
        formatDateRange(record.startDate, record.endDate),
      filterSearch: true,
      //   ...getColumnSearchProps("dateRange"),
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filterSearch: true,
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color={getTagColor(tag)} key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      filterSearch: true,
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      filterSearch: true,
      sorter: (a, b) => a.updatedAt.length - b.updatedAt.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <>
      <Modal
        title="Description"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <p>{selectedDescription}</p>
      </Modal>
      <Table
        columns={columns}
        dataSource={tasks}
        scroll={{ x: 1500, y: 500 }}
      />
    </>
  );
};

export default TableTasks;
