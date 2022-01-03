import { FailedEvent, IsLoadingEvent, SuccessEvent } from "./LoadableDataEvent";

export function isLoading<T>(storeDate: boolean = false): IsLoadingEvent<T> {
  return {
    state: "isLoading",
    storeDate,
  };
}

export function success<T>(data: T): SuccessEvent<T> {
  return {
    state: "success",
    data,
  };
}

export function failed<T>(
  failure: Error,
  storeDate: boolean = false
): FailedEvent<T> {
  return {
    state: "failed",
    storeDate,
    failure,
  };
}
