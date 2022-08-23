import { JSONValue } from "@graphprotocol/graph-ts";

export function extractString(value: JSONValue): String | null {
    if (value) {
      return value.toString();
    } else {
      return null;
    }
}