import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactUsService } from '../newservices/contactus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

  export class HomeComponent implements OnInit {
    private scrollDots = ['dot1', 'dot2', 'dot3'];
    private scrollingTexts = ['MediHome', 'Well Visit', 'Empower Health'];
    private descriptions = [
    'Experience personalized care in the comforting familiarity of your own home, ensuring a nurturing environment tailored to your well-being.',
    'Explore a range of tailored services designed to meet your individual needs, ensuring comprehensive and personalized care.',
    'Enjoy convenient access to doctors for hassle-free consultations and check-ups, ensuring your health is a priority on your terms.'
   ];

   private intervalId: any;

  testimonials = [
    { image: 'assets/100.png', alt: 'Client 1', review: 'Grateful for the convenience and compassion of the home care service. The personalized attention from the visiting doctor made my recovery at home a seamless and positive experience.', name: 'Prakash N', place:'Banglore' ,visible: true },
    { image: 'assets/200.png', alt: 'Client 2', review: 'Booking a doctor for a home visit was a game-changer. The personalized care and professional service exceeded my expectations, making my recovery comfortable and stress-free.',  name: 'Indumati S', place:'Banglore' ,visible: true },
    { image: 'assets/300.png', alt: 'Client 3', review: 'Exceptional service! The hassle-free delivery of medical equipment to my doorstep made managing my health needs incredibly convenient. Thank you for the prompt and reliable service.', name: 'Suresh P', place:'Banglore' , visible: false },
    { image: 'assets/400.png', alt: 'Client 4', review: 'Thankful for the skilled nursing service at home, a reassuring and efficient support system that made my recovery seamless and comfortable. Thank you for the best service.',  name: 'Nilam S', place:'Banglore' ,visible: false }
  ];

  currentIndex: number = 0;
  currentSetIndex = 0;

  services =[
    {
      dataCategory: 'nurse',
      title: 'Skilled Nursing',
      description: 'Experience expert care with our skilled nursing services, where professionals provide dedicated support, personalized treatment, and ensuring your well-being in the comfort of your home.',
      imageUrl: 'assets/SkilledNurse1.jpg'
    },
    {
      dataCategory: 'others',
      title: 'Lab Assistance',
      description: 'Simplify your healthcare routine with our lab assistance service. Book at-home lab tests for the utmost convenience, ensuring accurate results and care within the comfort of your own space.',
      imageUrl: 'assets/Lab.jpg'
    },
    {
      dataCategory: 'doctor',
      title: 'Critical Care',
      description: 'Experience peace with our critical care at home. Our dedicated team brings expert medical support to your doorstep, ensuring comfort and specialized attention during challenging times.',
      imageUrl: 'assets/Critical.png'
    },
    {
      dataCategory: 'delivery',
      title: 'Medicine Delivery',
      description: 'Effortless and timely healthcare: Our medicine delivery service brings prescribed medications directly to your doorstep, ensuring a seamless and convenient experience for your well-being.',
      imageUrl: 'assets/Medicine.jpg'
    },
    {
      dataCategory: 'others',
      title: 'Physiotherapist',
      description: 'Recover and thrive with our in-home physiotherapy service. Our expert physiotherapists provide personalized care, guiding you through exercises and therapies in the comfort of your own space.',
      imageUrl: 'assets/physiotherapy.jpg'
    },
    {
      dataCategory: 'nurse',
      title: 'Nursing Assistance',
      description: 'Experience compassionate care with our nursing assistance. Our dedicated nurses provide professional and personalized support, ensuring your well-being in comforting environment.',
      imageUrl: 'assets/BasicNursing.jpg'
    },
    {
      dataCategory: 'doctor',
      title: 'Doctor Visit',
      description: 'Experience the convenience of healthcare tailored to you. Schedule a doctors visit for thorough consultations and expert care, all within the comfort and familiarity of your own home.',
      imageUrl: 'assets/DocVisit.png'
    },
    {
      dataCategory: 'doctor',
      title: 'Wound Care',
      description: 'Trust specialized wound care for expert attention to your healing needs. Our team ensures professional wound care in the comfort of your home, promoting a seamless recovery process.',
      imageUrl: 'assets/WoundCare.png'
    },
    {
      dataCategory: 'others',
      title: 'Nutritionist',
      description: 'Elevate well-being with personalized nutrition guidance. Experienced nutritionists provide tailored advice and support to help achieve your health goals, all from the comfort of your home.',
      imageUrl: 'assets/Nutritionist.jpg'
    },
    {
      dataCategory: 'delivery',
      title: 'Medical Equipment',
      description: 'Simplify healthcare journey with our medical equipment delivery service. We bring essential medical supplies right to your doorstep, ensuring convenience and peace of mind for your health needs.',
      imageUrl:'assets/MedicalEquipment.png'
    },
    {
      dataCategory: 'others',
      title: 'Counceling',
      description: 'Get on a journey to emotional well-being with our Services. Our counselors provide support and guidance, empowering you to face lifes challenges from the comfort and privacy of your own space.',
      imageUrl:'assets/Counceling.jpg'
    },
  ];

  // Replace 'any[]' with your actual service model
  filteredServices: any[] = this.services;
  activeFilter: string = 'all';

  filterServices(category: string): void {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(service => service.dataCategory === category);
    }
  }

  formData: any = {
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

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private contactUsService: ContactUsService
  ) {}

  ngOnInit() {
    this.setupScrolling();
    this.setupDotClickHandlers();
    this.showTestimonials();
  }

  private updateContent() {
    this.renderer.setProperty(this.el.nativeElement.querySelector('#scrollingText'), 'innerHTML', this.scrollingTexts[this.currentIndex]);
    this.renderer.setProperty(this.el.nativeElement.querySelector('#description'), 'innerHTML', this.descriptions[this.currentIndex]);
  }

  private updateActiveDot() {
    this.scrollDots.forEach((dot, i) => {
      this.renderer.setStyle(this.el.nativeElement.querySelector(`#${dot}`), 'width', i === this.currentIndex ? '15px' : '10px');
      this.renderer.setStyle(this.el.nativeElement.querySelector(`#${dot}`), 'height', i === this.currentIndex ? '15px' : '10px');
    });
  }

  private transitionText() {
    const textContainer = this.el.nativeElement.querySelector('.text-container');
    this.renderer.setStyle(textContainer, 'animation', 'none');
    setTimeout(() => {
      this.renderer.setStyle(textContainer, 'animation', 'fadeInLeft 1s forwards');
    }, 100);
  }

  showTestimonials(): void {
    setInterval(() => {
      // Set the visibility of the current set of testimonials to false
      this.testimonials.slice(this.currentSetIndex, this.currentSetIndex + 2).forEach(testimonial => testimonial.visible = false);

      // Increment the counter and wrap around if needed
      this.currentSetIndex = (this.currentSetIndex + 2) % this.testimonials.length;

      // Set the visibility of the next set of testimonials to true
      this.testimonials.slice(this.currentSetIndex, this.currentSetIndex + 2).forEach(testimonial => testimonial.visible = true);
    }, 5000); // Adjust the interval (milliseconds) for scrolling
  }

  private setupScrolling() {
    this.updateContent();
    this.transitionText();
    // Clear the existing interval if it exists
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // After the third text, reset to the first text and continue
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.scrollingTexts.length;
      this.updateContent();
      this.transitionText();
      this.updateActiveDot();
    }, 5000); // Interval after displaying the third text
  }

  private setupDotClickHandlers() {
    this.scrollDots.forEach((dot, index) => {
      const dotElement = this.el.nativeElement.querySelector(`#${dot}`);
      dotElement.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateContent();
        this.transitionText();
        setTimeout(() => {
          this.updateActiveDot();
        }, 100); // Delay to ensure styles are updated after the transition
        this.setupScrolling();
      });
    });
  }

  // AboutUs
  navigateToAboutUs(): void {
    // Navigate to the "aboutus" route
    this.router.navigate(['/aboutus']);
  }

  bookNow(): void {
    // Implement the functionality when the "Book Now" button is clicked
    // You can handle form submission, send data to a server, etc.
    //console.log('Booking service...');
  }

  //bookservice form section
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
        }, 5000);
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
