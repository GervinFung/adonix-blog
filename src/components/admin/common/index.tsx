import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Option = <A, T extends string>({
    value,
    label,
    isUseDisabled,
    options,
    onOptionSelected,
}: Readonly<{
    value: T;
    label: string;
    isUseDisabled: boolean;
    options: ReadonlyArray<T>;
    onOptionSelected: (t: T) => A;
}>) => (
    <FormControl
        fullWidth
        sx={{
            mt: 2,
            boxSizing: 'border-box',
        }}
    >
        <InputLabel id="query-option-label">{label}</InputLabel>
        <Select
            labelId="query-option-label"
            id="query-option"
            label={label}
            value={value}
            onChange={(event) => onOptionSelected(event.target.value as T)}
        >
            {options.map((option) => (
                <MenuItem
                    key={option}
                    value={option}
                    disabled={isUseDisabled && option === value}
                >
                    {capitalize(option)}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

const Input = ({
    id,
    value,
    multiline,
    type,
    placeholder,
    autoComplete,
    onChanged,
}: Readonly<{
    placeholder: string;
    autoComplete?: string;
    id: string;
    type: string;
    value?: string;
    multiline?: true;
    onChanged: (value: string) => void;
}>) => (
    <Container>
        <InputLabel htmlFor={id}>{capitalize(id)}</InputLabel>
        <TextField
            required
            multiline={multiline}
            rows={multiline ? 15 : undefined}
            id={id}
            value={value}
            name={id}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={(event) => onChanged(event.target.value)}
        />
    </Container>
);

export { Option, Input };
