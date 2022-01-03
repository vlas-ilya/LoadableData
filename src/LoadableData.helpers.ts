import { Init, LoadableData } from "./LoadableData";
import { LoadableDataEvent } from "./LoadableDataEvent";

export function init<T>(data?: T): Init<T> {
  return {
    state: "init",
    data,
  };
}

export function updateLoadableData<T>(
  previousState: LoadableData<T>,
  event: LoadableDataEvent<T>
): LoadableData<T> {
  switch (event.state) {
    case "isLoading":
      return {
        state: "isLoading",
        data: event.storeDate ? previousState?.data : undefined,
      };
    case "success":
      return {
        state: "success",
        data: event.data,
      };
    case "failed":
      return {
        state: "failed",
        data: event.storeDate ? previousState?.data : undefined,
        failure: event.failure,
      };
  }
}
