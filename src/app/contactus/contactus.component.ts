import { Component } from '@angular/core';
import { ContactUsService } from '../newservices/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent {
  formData: any = {
    date: new Date().toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    name: '',
    phoneNumber: '',
    email: '',
    service: '',
    message: '',
  };

  formSubmitted = false;
  nameError = '';
  numberError = '';
  emailError = '';
  serviceError = '';
  messageError = '';
  errorMessage = '';
  successMessage = '';

  constructor(private contactUsService: ContactUsService) {}

  submitContactForm() {
    this.errorMessage = '';
    this.successMessage = '';

    // Reset all error messages
    this.resetErrorMessages();
     // Check form data for validation errors
     if (!this.isValidFormData()) {
      this.formSubmitted = true;
      return;
    }

    // If form data is valid, proceed with form submission
    this.contactUsService.submitContactForm(this.formData).subscribe(
      (response) => {
        // Handle success
        //console.log('Success:', response);
        this.successMessage = 'Form submitted successfully!';
        this.formSubmitted = true;
        this.resetForm();

         // Automatically clear the success message after 5 seconds (5000 milliseconds)
        setTimeout(() => {
          this.successMessage = '';
          this.formSubmitted = false;
        }, 3000);
      },
      (error) => {
        // Handle other errors
        //console.error('Error submitting form:', error);
        this.errorMessage = 'Failed to submit the form. Please try again later.';
        this.formSubmitted = true;
      }
    );
  }

  resetErrorMessages() {
    // Reset all error messages
    this.nameError = '';
    this.numberError = '';
    this.emailError = '';
    this.serviceError='';
    this.messageError = '';
  }

  resetForm() {
    // Reset the form data after successful submission
    this.formData = {
      name: '',
      phoneNumber: '',
      email: '',
      service: '',
      message: '',
    };
  }

  isValidFormData(): boolean {
    // Name validation
    if (this.formData.name.trim() === '') {
      this.nameError = 'Name is required.';
      return false;
    } else if (this.formData.name.trim().length < 3 || this.formData.name.trim().length > 15) {
      this.nameError = 'Name length should be between 3 and 15 characters.';
      return false;
    } else if (!/^[a-zA-Z\s]+$/.test(this.formData.name.trim())) {
      this.nameError = 'Name should only contain letters and spaces.';
      return false;
    }

    // Phone number validation
    if (this.formData.phoneNumber.trim() === '') {
      this.numberError = 'Phone Number is required';
      return false;
    } else if (/[a-zA-Z]/.test(this.formData.phoneNumber.trim())) {
      this.numberError = 'Phone number should contain only numbers.';
      return false;
    } else if (!/^[0-9]{10}$/.test(this.formData.phoneNumber.trim())) {
      this.numberError = 'Phone number should contain 10 digits.';
      return false;
    }

    // Email validation
    if (this.formData.email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email.trim())) {
      this.emailError = 'Please enter a valid email address.';
      return false;
    }

    // Service validation
    if (this.formData.service.trim() === '' || this.formData.service === null) {
      this.serviceError = 'Please select the service.';
      return false;
    }

    // Message validation
    if (this.formData.message.trim() !== '' && (this.formData.message.trim().length < 5 || this.formData.message.trim().length > 500)) {
      this.messageError = 'Message length should be between 5 and 500 characters.';
      return false;
    }
    return true;
  }
  }
