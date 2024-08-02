import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
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

 filteredServices = this.services;
  activeFilter: string = 'all';

  filterServices(category: string): void {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredServices = this.services; 
    } else {
      this.filteredServices = this.services.filter(service => service.dataCategory === category);
    }
  }

  ngOnInit() {
    
  }

}