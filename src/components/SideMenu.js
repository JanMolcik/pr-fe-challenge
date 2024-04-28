import { Paper, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { useFilters } from '../providers/FilterProvider';
import * as employeeService from '../services/employeeService';
import Controls from './controls/Controls';
import { Form, useForm } from './useForm';

const useStyles = makeStyles({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '320px',
    height: '100%',
    backgroundColor: '#253053'
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: '10px',
    marginTop: '18rem',
  }
});

export default function SideMenu() {
    const classes = useStyles();
    const [filters, setFilters] = useFilters();
    const resetFitlers = () => setFilters({})

    const {
      values,
      handleInputChange,
    } = useForm(filters, true, () => {});

    const handleSubmit = (e) => {
      e.preventDefault();
      const nonEmpty = Object.entries(values).filter(([, value]) => value !== '');
      setFilters(Object.fromEntries(nonEmpty));
    };


    return (
        <div className={classes.sideMenu}>
          <Paper className={classes.filters}>
          <Typography variant='h6' component='div'>
            Filters
          </Typography>
          <Form onSubmit={handleSubmit}>
            {/* Generic solution so we could add more filters in the future */}
            <Controls.Select
              name='departmentId'
              label='Department'
              value={values.departmentId ?? ''}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
            />

            <Controls.Button type='submit' text='Apply filters' />
            <Controls.Button text='Reset filters' color='default' onClick={resetFitlers} />
          </Form>
          </Paper>
        </div>
    )
}
