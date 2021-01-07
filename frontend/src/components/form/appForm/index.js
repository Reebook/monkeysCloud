import React, { memo } from 'react';
import { Formik } from 'formik';

const AppForm = ({ initialValues, validationSchema, onSubmit, children }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
  </Formik>
);
export default memo(AppForm);
