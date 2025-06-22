import { cn } from "@/lib/utils";

import CustomLoader from "./CustomLoader";

type Props = {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const Loader = ({
  title,
  subtitle,
  children,
  className,
  titleClassName,
  subtitleClassName,
}: Props) => {
  return (
    <div
      className={cn(
        "w-full fixed top-0 left-0 h-screen bg-background grid place-items-center z-50",
        className
      )}
    >
      {children ?? (
        <div className="text-center grid place-items-center ">
          <CustomLoader />
          {title && (
            <div className={cn("text-foreground font-bold mt-10", titleClassName)}>{title}</div>
          )}
          {subtitle && (
            <div className={cn("text-muted/80 text-sm", subtitleClassName)}>{subtitle}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Loader;
