import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export function Name() {
  return (
    <Input
      type="name"
      variant="bordered"
      className="max-w-xs"
      labelPlacement="outside"
      isClearable
      isRequired
      name="name"
      placeholder="Enter your first and last name"
      label="Name"
    />
  );
}

export function Password() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      label="Password"
      variant="bordered"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <EyeInvisibleOutlined className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeOutlined className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
      isRequired
      labelPlacement="outside"
      name="password"
      placeholder="Enter your password"
    />
  );
}

export function Email() {
  const [value, setValue] = React.useState("");
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setDebouncedValue("");
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 600); // Delay of 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const validateEmail = (value: any) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  useEffect(() => {
    if (debouncedValue === "") {
      setIsInvalid(false);
    } else {
      setIsInvalid(!validateEmail(debouncedValue));
    }
  }, [debouncedValue, setIsInvalid]);

  return (
    <Input
      value={value}
      type="email"
      label="Email"
      variant="bordered"
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "default"}
      onValueChange={setValue}
      className="max-w-xs"
      labelPlacement="outside"
      isClearable
      isRequired
      name="email"
      placeholder="Enter your email"
    />
  );
}

export function SportName() {
  return (
    <Input
      type="text"
      variant="bordered"
      labelPlacement="outside"
      isClearable
      isRequired
      name="name"
      placeholder="Enter the full sport name"
      label="Name"
    />
  );
}

export function SportSlug() {
  return (
    <Input
      type="slug"
      variant="bordered"
      labelPlacement="outside"
      isClearable
      isRequired
      name="slug"
      placeholder="Enter sport's name with no spaces"
      label="Slug"
    />
  );
}