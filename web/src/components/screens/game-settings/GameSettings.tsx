import { FormikValues, useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { GAME_PATH } from '../../../config/paths';

const GameSettings = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: { rows: '', columns: '', mines: '' },
    onSubmit: ({ rows, columns, mines }: FormikValues) => {
      history.push({
        pathname: GAME_PATH,
        state: { rows, columns, mines },
      });
    },
    // TODO: add validation and make rows, columns, mines mandatory
  });

  return (
    <form className="game-seetings-form" onSubmit={formik.handleSubmit}>
      <input
        data-cy="rows"
        id="rows"
        name="rows"
        type="number"
        placeholder="rows"
        onChange={formik.handleChange}
      />
      <input
        data-cy="columns"
        id="columns"
        name="columns"
        type="number"
        placeholder="columns"
        onChange={formik.handleChange}
      />
      <input
        data-cy="mines"
        id="mines"
        name="mines"
        type="number"
        placeholder="mines"
        onChange={formik.handleChange}
      />
      <button data-cy="start" type="submit">START</button>
    </form>
  );
};

export { GameSettings };
