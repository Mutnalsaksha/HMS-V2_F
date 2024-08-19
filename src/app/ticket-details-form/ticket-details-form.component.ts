import {Component, OnInit} from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import  { TicketService } from "../services/Ticket-service/ticket.service";
import { UserService} from "../CareTaker/services/User-service/user.service";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import * as moment from 'moment';


export interface User {
  _id:string;
  Username: string;
  Usertype: string;
  MobileNumber: string;
  EmailAddress: string;
  Password: string;
  Name: string;
  Address: string;
  Bio: string;
}

@Component({
  selector: 'app-ticket-details-form',
  templateUrl: './ticket-details-form.component.html',
  styleUrls: ['./ticket-details-form.component.css']
})


export class TicketDetailsFormComponent implements OnInit {
  submittedSuccessfully= false;
  ticketDetails: any;
  ticketId: any;
  formData!: FormGroup;
  users: any[] = [];  // Array to store users

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private userService: UserService  // Inject the UserService
  ) {
    // Initialize the form group
    this.formData = this.fb.group({
      requestId: [''],
      reqDate: ['', Validators.required],
      serviceType: ['', Validators.required],
      assignedTo: ['', Validators.required],
      totalDays: [{ value: '', disabled: true }],
      severity: ['', Validators.required],
      status: ['New', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, { validators: this.dateRangeValidator });

    // Subscribe to changes in startDate and endDate
    this.formData.get('startDate')?.valueChanges.subscribe(() => {
      this.calculateTotalDays();
    });
    this.formData.get('endDate')?.valueChanges.subscribe(() => {
      this.calculateTotalDays();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ticketId = params['id']; // Extract ticket ID from route parameters
      this.loadTicketDetails(this.ticketId);
  });
    this.loadUsers();  // Load users when component initializes
  }

  loadTicketDetails(requestId: string): void {
    this.ticketService.getTicketDetails(requestId).subscribe(data => {
      // Format reqDate to YYYY/MM/DD HH:mm:ss format using moment
      const formattedReqDate = moment(data.requestDate).format('YYYY-MM-DD HH:mm:ss');
      this.formData.patchValue({
        requestId: data.requestId ||'',
        reqDate: formattedReqDate ||'',
        serviceType: data.serviceType ||'',
        assignedTo: data.assignedTo ||'',
        startDate: data.startDate ||'',
        totalDays: data.totalDays ||'',
        endDate: data.endDate||'',
        severity: data.severity ||'',
        status: data.status ||'New'
      });
    }, error => {
      console.error(`Error loading details for request ID: ${requestId}`, error); // Log errors
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(response => {

      // Assuming response is an array of user objects
      if (Array.isArray(response)) {
        // Log each user object
        response.forEach(user => {
        });

        // Optional: Filter and log the filtered users
        const filteredUsers = response.filter(user => user.Usertype === 'ServiceHandler');

        // Update the users array with filtered users
        this.users = filteredUsers;
      } else {
        // console.error('Expected an array but received:', response);
      }
    }, error => {
      // console.error('Error loading users:', error);
    });
  }













  formatDate(controlName: string): void {
    const dateValue = this.formData.get(controlName)?.value;
    if (dateValue) {
      const formattedDate = moment(dateValue, 'YYYY-MM-DD').format('YYYY-MM-DD');
      this.formData.patchValue({ [controlName]: formattedDate });
    }
  }

  calculateTotalDays(): void {
    const startDate = this.formData.get('startDate')?.value;
    const endDate = this.formData.get('endDate')?.value;

    if (startDate && endDate) {
      const start = moment(startDate, 'YYYY-MM-DD');
      const end = moment(endDate, 'YYYY-MM-DD');
      const totalDays = end.diff(start, 'days') + 1;  // Including start date and end date

      this.formData.patchValue({ totalDays: totalDays });
    } else {
      this.formData.patchValue({ totalDays: '' });
    }
  }


  cancelForm(): void {
    // Implement cancel logic here, if needed
    // For now, you can navigate back to the ticket list or previous page
    this.router.navigate(['/service-handler']); // Adjust the route as per your application
  }


  submitForm() {
    if (this.formData.valid) {
      // Format dates before submitting
      this.formatDate('startDate');
      this.formatDate('endDate');

      // Temporarily enable the totalDays field
      this.formData.get('totalDays')?.enable();

      this.ticketService.updateTicketDetails(this.ticketId, this.formData.value).subscribe(response => {
        this.submittedSuccessfully = true;
        this.ticketDetails = response;

        // After 2 seconds, navigate back to the service handler page
        setTimeout(() => {
          this.router.navigate(['/service-handler']); // Replace '/service-handler' with your actual route path
        }, 2000); // 2000 milliseconds = 2 seconds
      }, error => {
        console.error('Error updating ticket:', error); // Log errors
      });
      // Disable totalDays field again
      this.formData.get('totalDays')?.disable();
    } else {
      console.log('Form data is invalid:', this.formData); // Debugging statement
    }
  }

  // Custom validator function for date range (startDate < endDate)
  dateRangeValidator: ValidatorFn = (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const startDateControl = formGroup.get('startDate');
    const endDateControl = formGroup.get('endDate');
    const reqDateControl = formGroup.get('reqDate');

    if (!startDateControl || !endDateControl || !reqDateControl) {
      return null;
    }

    const startDate = new Date(startDateControl.value);
    const endDate = new Date(endDateControl.value);
    const reqDate = new Date(reqDateControl.value);

    const errors: any = {};

    if (startDate < reqDate) {
      errors.startDateInvalid = true;
    }

    if (endDate < reqDate) {
      errors.endDateInvalid = true;
    }

    if (startDate > endDate) {
      errors.dateRangeInvalid = true;
    }

    if (Object.keys(errors).length) {
      startDateControl.setErrors(errors);
      endDateControl.setErrors(errors);
      return errors;
    } else {
      startDateControl.setErrors(null);
      endDateControl.setErrors(null);
      return null;
    }
  };
}

