import {LocalDate, LocalDateTime} from "../../../datatypes/datetime.ts";
import {ScalarType} from "../../../reflection.ts";

export type $local_date = ScalarType<"cal::local_date", LocalDate>;
export type $local_datetime = ScalarType<"cal::local_datetime", LocalDateTime>;
