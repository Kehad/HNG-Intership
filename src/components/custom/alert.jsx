import React from "react";

const Alert = ({ className = "", variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-background text-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  };

  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDescription = ({ className = "", children, ...props }) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Alert, AlertDescription };
