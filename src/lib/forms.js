import { compose, withState, withHandlers } from 'recompose';

export const onChangeHandler = props => event => {
  const target = event.currentTarget;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  if (!name) {
    throw Error('Field must have a name attribute!');
  }
  props.setFormData(state => ({ ...state, [name]: value }));
};

export const withValidationErrors = withState(
  'errors',
  'setValidationErrors',
  {},
);

export const withFormData = initialState =>
  compose(
    withState('formData', 'setFormData', initialState),
    withHandlers({
      onChange: onChangeHandler,
    }),
  );

export const withError = withState('error', 'setError', '');

export const withIsSubmitting = withState(
  'isSubmitting',
  'setIsSubmitting',
  false,
);
