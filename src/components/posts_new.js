import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    // field is passing in pregenerated eventhandlers
    // meta.error property is automatically added to field from the error validation function 
    // meta state has 3 properties: pristine, touched, and invalid
    
    const { meta: { touched, error } } = field;
    const className = `form-label ${touched && error ? 'has-danger' : ''}`;
    
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="has-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  
  onSubmit(values){
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  
  render() {
    const { handleSubmit } = this.props;
    
    // handleSubmit will run validation through redux-form then calls the function we defined and passes us values 
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title for Post"
            name="title"
            component={this.renderField}
          />
          <Field 
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  
  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }
  
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

// How you do multiple connect type helpers 
export default reduxForm({
  validate,
  form: 'PostsNewForm'
  // considered the name of the form - useful for multiple forms
})(
  connect(null, { createPost })(PostsNew)
);
