import {
    CaretDownOutlined,
  PlusOutlined,
  SaveOutlined,
  StarOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps } from "antd";
import React from "react";

const Header = () => {
  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <div className="header-main flex items-center gap-[1rem]">
      <Input
        placeholder="Please enter your task..."
        variant="filled"
        className="w-[40rem] input-search-task"
      />
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          className="button-filter-tags"
          type="primary"
          onClick={(e) => e.preventDefault()}
        >
          <TagOutlined />
          Tags
        </Button>
      </Dropdown>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          className="button-filter-tags"
          type="text"
          onClick={(e) => e.preventDefault()}
        >
          <SaveOutlined />
          Priority
        </Button>
      </Dropdown>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          className="button-filter-tags"
          type="dashed"
          onClick={(e) => e.preventDefault()}
        >
          <StarOutlined />
          Status
        </Button>
      </Dropdown>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          className="button-filter-tags"
          type="link"
          onClick={(e) => e.preventDefault()}
        >
          <CaretDownOutlined />
          Sort
        </Button>
      </Dropdown>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          className="button-filter-tags"
          type="default"
          onClick={(e) => e.preventDefault()}
        >
          <PlusOutlined />
          Add
        </Button>
      </Dropdown>
    </div>
  );
};

export default Header;
