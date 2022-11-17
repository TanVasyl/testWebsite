import * as React from 'react';
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../reducers/store';

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector