
import React from "react";

const Select = ({ children, value, onValueChange }) => {
  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          value,
          onValueChange,
        })
      )}
    </div>
  );
};

const SelectTrigger = ({
  className = "",
  children,
  value,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const SelectValue = ({ placeholder, children }) => {
  return <span className="block truncate">{children || placeholder}</span>;
};

const SelectContent = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`relative mt-2 max-h-[200px] min-w-[8rem] overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md ${className}`}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
};

const SelectItem = ({
  className = "",
  children,
  value,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };