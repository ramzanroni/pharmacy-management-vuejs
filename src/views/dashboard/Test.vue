<template>
    <Form @submit="onSubmit">
      <label for="name">Your Name</label>
      <Field name="name" type="text" rules="required" />
      <ErrorMessage name="name" />
  
      <label for="name">Age</label>
      <Field name="age" type="number" rules="required" />
      <ErrorMessage name="age" />
      
      <label for="birth_reg_number">Age</label>
      <Field name="birth_reg_number" type="number" rules="required" />
      <ErrorMessage name="birth_reg_number" />
  
      <label for="name">Confirm Age</label>
      <Field name="ageConfirm" type="number" rules="required" />
      <ErrorMessage name="ageConfirm" />
  
      <button type="submit">Submit</button>
    </Form>
  </template>
  
  <script>
  import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate';
  import { required } from '@vee-validate/rules';
  import { localize } from '@vee-validate/i18n';
  
  // Define global rules
  defineRule('required', required);
  
  configure({
    generateMessage: localize({
      en: {
        fields: {
          name: {
            required: 'Please provide your name.',
          },
          age: {
            required: 'Age is required.',
          },
          ageConfirm: {
            required: 'Please confirm your age.',
          },
          birth_reg_number: {
            required: 'আপনার জন্ম-নিবন্ধন নম্বর দিন।',
            // digits: 'আপনার ১৭ ডিজিটের সঠিক জন্ম-নিবন্ধন নম্বর দিন।',
          },
        },
      },
      // Add other locales if needed
    }),
  });
  
  export default {
    components:{
        Form, Field,ErrorMessage
    },
    methods: {
      onSubmit(values) {
        alert(JSON.stringify(values, null, 2));
      },
    },
  };
  </script>
  
  <style scoped>
  span,
  button {
    display: block;
    margin: 10px 0;
  }
  
  label {
    display: block;
  }
  </style>