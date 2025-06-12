import React, { useState } from "react";
import { Button } from "../ui/button";
import Divider from "../Divider";
import { CgSpinner } from "react-icons/cg";

type Props = {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirmClick?: () => Promise<void>;
  onCancelClick?: () => void;
  hideAction?: boolean;
  cancelBtnProps?: React.ComponentProps<typeof Button>;
  confirmBtnProps?: React.ComponentProps<typeof Button>;
  onClose: () => void;
};

const ConfirmationModal = ({
  title = "Confirmation",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirmClick,
  onCancelClick,
  hideAction = false,
  cancelBtnProps,
  confirmBtnProps,
  onClose,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelClick = () => {
    onCancelClick?.();
    onClose();
  };

  const handleConfirmClick = async () => {
    setIsLoading(true);
    await onConfirmClick?.();
    setIsLoading(false);
    onClose();
  };

  return (
    <div>
      {title && <p className="text-foreground text-lg font-semibold">{title}</p>}
      {message && <p className="text-secondary-foreground text-sm">{message}</p>}
      <Divider />
      {!hideAction && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="destructive"
            onClick={handleCancelClick}
            disabled={isLoading}
            {...cancelBtnProps}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            onClick={handleConfirmClick}
            disabled={isLoading}
            {...confirmBtnProps}
          >
            {!isLoading ? confirmLabel : <CgSpinner className="animate-spin" />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
