# Loadable Data

## Description

This library provides primitives for removing
boilerplate code when you use redux-thunk

By default, if you want to create async action
you need to create three primitive actions and
one composite action:

```ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';
import { get } from './api';

export type Data = any;

export type State = {
  loadingState: 'INIT' | 'LOADING' | 'SUCCESS' | 'FAILED';
  data?: Data;
  error?: Error;
};

export const data = createSlice({
  name: 'data',
  initialState: {
    loadingState: 'INIT',
  } as State,
  reducers: {
    isLoading: (state: State) => {
      state.loadingState = 'LOADING';
      state.data = undefined;
      state.error = undefined;
    },
    hasLoaded: (state: State, action: PayloadAction<Data>) => {
      state.loadingState = 'SUCCESS';
      state.data = action.payload;
      state.error = undefined;
    },
    hasFailed: (state: State, action: PayloadAction<Error>) => {
      state.loadingState = 'FAILED';
      state.data = undefined;
      state.error = action.payload;
    },
  },
});

export const { isLoading, hasLoaded, hasFailed } = data.actions;

export const loadData = () => async (dispatch: Dispatch) => {
  dispatch(isLoading());
  try {
    const data = await get();
    dispatch(hasLoaded(data));
  } catch (e) {
    dispatch(hasFailed(e));
  }
};

export default data.reducer;
```

With Loadable Data you need to have only one action:

```ts
import {
  LoadableData,
  LoadableDataEvent,
  init,
  isLoading,
  success,
  updateLoadableData,
} from 'loadable-data';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';
import { get } from './api';

export type Data = any;

export type State = {
  data: LoadableData<Data>;
};

export const data = createSlice({
  name: 'data',
  initialState: {
    data: init(),
  } as State,
  reducers: {
    processData: (state: State, action: PayloadAction<LoadableDataEvent<Data>>) => {
      state.data = updateLoadableData(state.data, action.payload);
    },
  },
});

export const { processData } = data.actions;

export const loadData = () => async (dispatch: Dispatch) => {
  dispatch(processData(isLoading()));
  try {
    const data = await get();
    dispatch(processData(success(data)));
  } catch (e) {
    dispatch(processData(fail(e)));
  }
};

export default data.reducer;
```

## API

### LoadableData

```ts
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
```

### LoadableDataEvent

```ts
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
```

### updateLoadableData

```ts
export declare function updateLoadableData<T>(
  previousState: LoadableData<T>,
  event: LoadableDataEvent<T>
): LoadableData<T>;
```

### LoadableDataEvent helpers

```ts
export declare function isLoading<T>(storeDate?: boolean): IsLoadingEvent<T>;
export declare function success<T>(data: T): SuccessEvent<T>;
export declare function failed<T>(failure: Error, storeDate?: boolean): FailedEvent<T>;
```

## Configuration

By default, `updateLoadableData` removes old data
on `isLoading` and `failed` events.

You can change this behaviour by adding flag `storeDate`
for `isLoading` and `failed` events:

```ts
export const loadData = () => async (dispatch: Dispatch) => {
  dispatch(processData(isLoading(true)));
  try {
    const data = await get();
    dispatch(processData(success(data)));
  } catch (e) {
    dispatch(processData(fail(e, true)));
  }
};
```
