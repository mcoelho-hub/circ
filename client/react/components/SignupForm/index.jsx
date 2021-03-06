import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Icon, Button, Message } from 'semantic-ui-react';
import { InputField, UploadField } from 'react-semantic-redux-form';

import FileInput from '../FileInput';
import constants from '../../../../common/constants';

import './styles.css';

import { isEmail, isPassword, isText } from '../../../../common/validation';

const {
    USER_TYPES: {
        ORGANISATION: ORGANISATION_TYPE
    }
} = constants;

const validate = (values) => {
    let errors = {};

    const {
        name,
        email,
        confirmEmail,
        password,
        confirmPassword
    } = values;

    if (!isText(name)) {
        errors = {
            name: 'Please enter your name',
            ...errors
        };
    }

    const isEmailValid = isEmail(email);
    const isPasswordValid = isPassword(password, true); // We want to check the length of the password here

    if (!isEmailValid) {
        errors = {
            email: 'Please enter a valid email',
            ...errors
        };
    }

    if (!isPasswordValid) {
        errors = {
            password: 'Please choose a password that is at least 6 character in length',
            ...errors
        };
    }

    if (isEmailValid && confirmEmail !== email) {
        errors = {
            confirmEmail: 'Emails must match',
            ...errors
        };
    }

    if (isPasswordValid && confirmPassword !== password) {
        errors = {
            confirmPassword: 'Passwords must match',
            ...errors
        };
    }

    return errors;
}

// NOTE: Valid is a prop passed in by redux-form
const SignUpForm = ({
    onSubmit,
    isProcessing,
    valid,
    errorMessage,
    className,
    userType
}) => (
    <Form className={className} onSubmit={onSubmit} error={!!errorMessage}>
        {userType === ORGANISATION_TYPE ? 'TODO... orgnaisation specific sign up fields' : ''}
        <Message
            error
            header='Error'
            content={errorMessage}
        />
        <Field
            name='name'
            component={InputField}
            label='Name'
            labelPosition='left'
            placeholder='Name'
        />
        <Field
            name='email'
            component={InputField}
            label='Email'
            labelPosition='left'
            placeholder='Email'
        />
        <Field
            name='confirmEmail'
            component={InputField}
            label='Confirm Email'
            labelPosition='left'
            placeholder='Confirm Email'
        />
        <Field
            name='password'
            component={InputField}
            label='Password'
            labelPosition='left'
            placeholder='Password'
            type='password'
        />
        <Field
            name='confirmPassword'
            component={InputField}
            label='Confirm Password'
            labelPosition='left'
            placeholder='Confirm Password'
            type='password'
        />
        <Field
            name='profilePic'
            component={FileInput}
            label='Upload a profile picture'
            accept='image/x-png,image/jpeg'
            iconName='image'
        />
        <Button type='submit' color='green' loading={isProcessing} disabled={!valid || isProcessing}>Register</Button>
    </Form>
)

export default reduxForm({
    form: 'signUp',
    validate
})(SignUpForm);
