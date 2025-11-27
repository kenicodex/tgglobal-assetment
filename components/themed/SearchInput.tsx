import React from 'react';
// import TextField, { TextFieldProps } from './themed/TextField';
import SearchIcon from '@/assets/svgs//common/search.svg';
import { ms } from 'react-native-size-matters';
import { TextField, TextFieldProps } from './TextField';

export const SearchInput = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      placeholder={props.placeholder || 'Search...'}
      style={{ fontSize: ms(12) }}
      leftIcon={<SearchIcon width={ms(16)} height={ms(16)} />}
    />
  );
};
