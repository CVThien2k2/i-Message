import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCheck,
  IconExclamationCircle,
  IconInfoCircle,
} from "@tabler/icons-react";

export const Action = {
  Create: "create",
  Update: "update",
  Delete: "delete",
  DeleteAll: "deleteAll",
  Import: "import",
  Submit: "submit",
  Upload: "upload",
};

const Variant = {
  Error: "red",
  Warning: "orange",
  Info: "blue",
  Success: "green",
};

const useNotify = () => {
  const notify = (message, variant = Variant.Success, title, icon = null) => {
    if (!icon) {
      switch (variant) {
        case Variant.Success:
          icon = <IconCheck style={{ width: rem(18), height: rem(18) }} />;
          break;
        case Variant.Error:
          icon = (
            <IconExclamationCircle
              style={{ width: rem(18), height: rem(18) }}
            />
          );
          break;
        case Variant.Warning:
          icon = (
            <IconAlertTriangle style={{ width: rem(18), height: rem(18) }} />
          );
          break;
        case Variant.Info:
          icon = <IconInfoCircle style={{ width: rem(18), height: rem(18) }} />;
          break;
      }
    }

    notifications.show({
      color: variant,
      icon,
      title,
      message,
      withBorder: true,
    });
  };

  const notifyResult = (action, object, isSuccess, extraMessage = null) => {
    const actionText = action;
    const message = object;
    notifications.show({
      color: isSuccess ? "green" : "red",
      icon: isSuccess ? (
        <IconCheck style={{ width: rem(18), height: rem(18) }} />
      ) : (
        <IconExclamationCircle style={{ width: rem(18), height: rem(18) }} />
      ),
      title: `${actionText}`,
      message: extraMessage ? (
        <>
          {message}
          <br />
          {extraMessage}
        </>
      ) : (
        message
      ),
      withBorder: true,
      autoClose: isSuccess ? 6000 : 12000,
    });
  };

  return {
    notify,
    notifyResult,
  };
};

export default useNotify;
