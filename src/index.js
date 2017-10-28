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
  formData,
  output,
}) {
  return (
    <form onSubmit={onSubmit}>
      {error ? <span className="error">{error}</span> : null}
      <section>
        <label htmlFor="name">Name (required)</label>
        {errors.name ? <span className="error">{errors.name}</span> : null}
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={onChange}
        />
      </section>

      <section>
        <label htmlFor="number">Number</label>
        <input
          type="number"
          name="number"
          id="number"
          value={formData.number}
          onChange={onChange}
        />
      </section>

      <section>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={onChange}
        />
      </section>

      <section>
        <label htmlFor="email">Description</label>
        <textarea
          type="description"
          name="description"
          id="description"
          value={formData.description}
          onChange={onChange}
        />
      </section>

      <section>
        <label htmlFor="email">Animal</label>
        <select
          type="animal"
          name="animal"
          id="animal"
          value={formData.animal}
          onChange={onChange}
        >
          <option value="doggo">Doggo</option>
          <option value="pupper">Pupper</option>
          <option value="catto">Catto</option>
        </select>
      </section>

      <section>
        <label htmlFor="simulateServerError">Simulate Server Error?</label>
        <input
          type="checkbox"
          name="simulateServerError"
          id="simulateServerError"
          value={formData.simulateServerError}
          onChange={onChange}
        />
      </section>

      <div className="radio-group">
        <section className="condensed">
          <input
            type="radio"
            name="food"
            id="donut"
            checked={formData.food === 'donut'}
            onChange={onChange}
            value="donut"
          />
          <label htmlFor="donut">Donut</label>
        </section>

        <section className="condensed">
          <input
            type="radio"
            name="food"
            id="cake"
            checked={formData.food === 'cake'}
            onChange={onChange}
            value="cake"
          />
          <label htmlFor="cake">Cake</label>
        </section>

        <section className="condensed">
          <input
            type="radio"
            name="food"
            id="burger"
            checked={formData.food === 'burger'}
            onChange={onChange}
            value="burger"
          />
          <label htmlFor="burger">Burger</label>
        </section>
      </div>

      <input
        type="submit"
        value={isSubmitting ? 'Submitting' : 'Submit'}
        disabled={isSubmitting}
      />

      <pre>{output}</pre>
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
    onSubmit: ({
      formData,
      setValidationErrors,
      setIsSubmitting,
      setError,
      setFormData,
      setOutput,
    }) => event => {
      event.preventDefault();

      // validate however
      if (formData.name.length === 0) {
        return setValidationErrors({ name: 'Name is required' });
      }
      setValidationErrors({});

      setIsSubmitting(true);

      setOutput(JSON.stringify(formData, null, 2));
      console.log(formData);

      // simulate something async
      setTimeout(() => {
        setIsSubmitting(false);
        // some kind of server error
        if (formData.simulateServerError) {
          return setError('A simulated server error happened');
        }
        setError(null);
        setFormData(initialFormState);
      }, 1000);
    },
  }),
)(MyForm);

render(<MyFormContainer />, document.getElementById('root'));
