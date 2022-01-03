export type IsLoadingEvent<T> = {
  state: "isLoading";
  storeDate: boolean;
};

export type SuccessEvent<T> = {
  state: "success";
  data: T;
};

export type FailedEvent<T> = {
  state: "failed";
  storeDate: boolean;
  failure: Error;
};

export type LoadableDataEvent<T> =
  | IsLoadingEvent<T>
  | SuccessEvent<T>
  | FailedEvent<T>;
