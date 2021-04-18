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
    <div>
      <form className="game-seetings-form" onSubmit={formik.handleSubmit}>
        <input
          id="rows"
          name="rows"
          type="number"
          placeholder="rows"
          onChange={formik.handleChange}
        />
        <input
          id="columns"
          name="columns"
          type="number"
          placeholder="columns"
          onChange={formik.handleChange}
        />
        <input
          id="mines"
          name="mines"
          type="number"
          placeholder="mines"
          onChange={formik.handleChange}
        />
        <button type="submit">START</button>
      </form>
    </div>
  );
};

export { GameSettings };
