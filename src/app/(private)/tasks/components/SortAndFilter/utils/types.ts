import { z } from "zod";

import { filterSchema } from "./schema";

export type FilterType = z.infer<typeof filterSchema>;
