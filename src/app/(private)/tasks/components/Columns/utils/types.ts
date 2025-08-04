import { z } from "zod";

import { columnSchema } from "./schema";

export type Props = {
  id: string;
  name: string;
  color: string;
  type: "ADD" | "EDIT";
  onClose?: () => void;
};

export type ColumnPayload = z.infer<typeof columnSchema>;
