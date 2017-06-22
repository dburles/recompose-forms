import React from 'react';
import { render } from 'react-dom';
import { compose, withHandlers, withState } from 'recompose';
import {
  withFormData,
  withIsSubmitting,
  withError,
  withValidationErrors,
} from './lib/forms';

function MyForm({
  onSubmit,
  onChange,
  isSubmitting,
  error,
  errors,
  data,
  output,
}) {
  return (
    <form onSubmit={onSubmit}>
      {error ? <span className="error">{error}</span> : null}
      <field>
        <label htmlFor="name">Name (required)</label>
        {errors.name ? <span className="error">{errors.name}</span> : null}
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={onChange}
        />
      </field>

      <field>
        <label htmlFor="number">Number</label>
        <input
          type="number"
          name="number"
          id="number"
          value={data.number}
          onChange={onChange}
        />
      </field>

      <field>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={onChange}
        />
      </field>

      <field>
        <label htmlFor="email">Description</label>
        <textarea
          type="description"
          name="description"
          id="description"
          value={data.description}
          onChange={onChange}
        />
      </field>

      <field>
        <label htmlFor="email">Animal</label>
        <select
          type="animal"
          name="animal"
          id="animal"
          value={data.animal}
          onChange={onChange}
        >
          <option value="doggo">Doggo</option>
          <option value="pupper">Pupper</option>
          <option value="catto">Catto</option>
        </select>
      </field>

      <field>
        <label htmlFor="simulateServerError">Simulate Server Error?</label>
        <input
          type="checkbox"
          name="simulateServerError"
          id="simulateServerError"
          value={data.simulateServerError}
          onChange={onChange}
        />
      </field>

      <div className="radio-group">
        <field className="condensed">
          <input
            type="radio"
            name="food"
            id="donut"
            checked={data.food === 'donut'}
            onChange={onChange}
            value="donut"
          />
          <label htmlFor="donut">Donut</label>
        </field>

        <field className="condensed">
          <input
            type="radio"
            name="food"
            id="cake"
            checked={data.food === 'cake'}
            onChange={onChange}
            value="cake"
          />
          <label htmlFor="cake">Cake</label>
        </field>

        <field className="condensed">
          <input
            type="radio"
            name="food"
            id="burger"
            checked={data.food === 'burger'}
            onChange={onChange}
            value="burger"
          />
          <label htmlFor="burger">Burger</label>
        </field>
      </div>

      <input
        type="submit"
        value={isSubmitting ? 'Submitting' : 'Submit'}
        disabled={isSubmitting}
      />

      <pre>
        {output}
      </pre>
    </form>
  );
}

const initialFormState = {
  name: '',
  email: '',
  number: 0,
  description: '',
  animal: 'doggo',
  food: '',
  simulateServerError: false,
};

const MyFormContainer = compose(
  withState('output', 'setOutput', ''),
  withFormData(initialFormState),
  withIsSubmitting,
  withError,
  withValidationErrors,
  withHandlers({
    onSubmit: props => event => {
      event.preventDefault();

      // validate however
      if (props.data.name.length === 0) {
        return props.setValidationErrors({ name: 'Name is required' });
      }
      props.setValidationErrors({});

      props.setIsSubmitting(true);

      props.setOutput(JSON.stringify(props.data, null, 2));
      console.log(props.data);

      // simulate something async
      setTimeout(() => {
        props.setIsSubmitting(false);
        // some kind of server error
        if (props.data.simulateServerError) {
          return props.setError('A simulated server error happened');
        }
        props.setError(null);
        props.updateForm(initialFormState);
      }, 1000);
    },
  }),
)(MyForm);

render(<MyFormContainer />, document.getElementById('root'));
