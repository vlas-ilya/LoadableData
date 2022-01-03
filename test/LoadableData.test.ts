import {
  LoadableData,
  LoadableDataEvent,
  failed,
  init,
  isLoading,
  success,
  updateLoadableData,
} from '../src';

type UpdateStateAction = {
  type: 'UPDATE_STATE';
  payload: LoadableDataEvent<String[]>;
};

type State = {
  list: LoadableData<String[]>;
};

const updateStateAction = (payload: LoadableDataEvent<String[]>): UpdateStateAction => ({
  type: 'UPDATE_STATE',
  payload,
});

const reducer = (state: State, action: UpdateStateAction): State => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return {
        ...state,
        list: updateLoadableData(state.list, action.payload),
      };
    default:
      return state;
  }
};

test('init state to isLoading', () => {
  const state = {
    list: init<String[]>(),
  } as State;
  const isLoadingState = reducer(state, updateStateAction(isLoading()));
  expect(isLoadingState.list.state).toBe('isLoading');
  expect(isLoadingState.list.data).toBeUndefined();
});

test('init state to failed', () => {
  const state = {
    list: init<String[]>(),
  } as State;
  const failedState = reducer(state, updateStateAction(failed(Error('error'))));
  expect(failedState.list.state).toBe('failed');
  expect(failedState.list.data).toBeUndefined();
});

test('init state to success', () => {
  const state = {
    list: init<String[]>(),
  } as State;
  const successState = reducer(state, updateStateAction(success(['Message'])));
  expect(successState.list.state).toBe('success');
  expect(successState.list.data).toEqual(['Message']);
});

test('success state to loading with saving old data', () => {
  const state = {
    list: {
      state: 'success',
      data: ['Message'],
    },
  } as State;
  const isLoadingStateWithData = reducer(state, updateStateAction(isLoading(true)));
  expect(isLoadingStateWithData.list.state).toBe('isLoading');
  expect(isLoadingStateWithData.list.data).toEqual(['Message']);
});

test('success state to failed with saving old data', () => {
  const state = {
    list: {
      state: 'success',
      data: ['Message'],
    },
  } as State;
  const isFailedStateWithData = reducer(state, updateStateAction(failed(Error('error'), true)));
  expect(isFailedStateWithData.list.state).toBe('failed');
  expect(isFailedStateWithData.list.data).toEqual(['Message']);
});

test('success state to new success state', () => {
  const state = {
    list: {
      state: 'success',
      data: ['Message'],
    },
  } as State;
  const successNewState = reducer(state, updateStateAction(success(['Message2'])));
  expect(successNewState.list.state).toBe('success');
  expect(successNewState.list.data).toEqual(['Message2']);
});

test('failed state without data to loading with saving old data', () => {
  const state = {
    list: {
      state: 'failed',
      data: undefined,
    },
  } as State;
  const isLoadingStateWithData = reducer(state, updateStateAction(isLoading(true)));
  expect(isLoadingStateWithData.list.state).toBe('isLoading');
  expect(isLoadingStateWithData.list.data).toBeUndefined();
});

test('failed state without data to failed with saving old data', () => {
  const state = {
    list: {
      state: 'failed',
      data: undefined,
    },
  } as State;
  const isFailedStateWithData = reducer(state, updateStateAction(failed(Error('error'), true)));
  expect(isFailedStateWithData.list.state).toBe('failed');
  expect(isFailedStateWithData.list.data).toBeUndefined();
});

test('failed state without data to new success state', () => {
  const state = {
    list: {
      state: 'failed',
      data: undefined,
    },
  } as State;
  const successNewState = reducer(state, updateStateAction(success(['Message2'])));
  expect(successNewState.list.state).toBe('success');
  expect(successNewState.list.data).toEqual(['Message2']);
});


test('success state to loading without saving old data', () => {
  const state = {
    list: {
      state: 'success',
      data: ['Message'],
    },
  } as State;
  const isLoadingStateWithData = reducer(state, updateStateAction(isLoading()));
  expect(isLoadingStateWithData.list.state).toBe('isLoading');
  expect(isLoadingStateWithData.list.data).toBeUndefined();
});

test('success state to failed without saving old data', () => {
  const state = {
    list: {
      state: 'success',
      data: ['Message'],
    },
  } as State;
  const isFailedStateWithData = reducer(state, updateStateAction(failed(Error('error'))));
  expect(isFailedStateWithData.list.state).toBe('failed');
  expect(isFailedStateWithData.list.data).toBeUndefined();
});
