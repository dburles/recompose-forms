import { compose, withState, withHandlers } from 'recompose';

export const onChangeHandler = props => event => {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  props.updateForm(state => ({ ...state, [name]: value }));
};

export const withValidationErrors = withState(
  'errors',
  'setValidationErrors',
  {},
);

export const withFormData = initialState =>
  compose(
    withState('data', 'updateForm', initialState),
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
