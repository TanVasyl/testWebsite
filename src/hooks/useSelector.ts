import * as React from 'react';
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../reducers';

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector