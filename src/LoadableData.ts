export type Init<T> = {
  state: "init";
  data?: T;
};

export type IsLoading<T> = {
  state: "isLoading";
  data?: T;
};

export type Success<T> = {
  state: "success";
  data: T;
};

export type Failed<T> = {
  state: "failed";
  data?: T;
  failure: Error;
};

export type LoadableData<T> = Init<T> | IsLoading<T> | Success<T> | Failed<T>;