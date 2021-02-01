import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useFormikContext } from 'formik';

import './style.scss';

const AppDatePicker = ({ label, name }) => {
  const { values, setFieldValue } = useFormikContext();
  return (
    <div className='form-group'>
      <label>{label}</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          value={values[name]}
          onChange={date => setFieldValue(name, date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default AppDatePicker;
