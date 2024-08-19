import { Component, OnInit} from '@angular/core';
import { ShService} from "../services/SH-service/sh.service";
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import {Observable} from "rxjs";
import { Router } from '@angular/router';
import { ProfileService} from "../services/pf-service/profile.service";

// Define an interface for the ticket object
interface Ticket {
  requestId: string;
  requestDate: string;
  serviceType: string;
  assignedTo: string;
  startDate: string;
  totalDays: number;
  endDate: string;
  severity: string;
  status: string;
  viewed:boolean;
}

@Component({
  selector: 'app-servicehandler',
  templateUrl: './servicehandler.component.html',
  styleUrls: ['./servicehandler.component.css']
})
export class ServicehandlerComponent implements OnInit {
  displayData: Ticket[] = [];
  loading: boolean = false;
  showProfileMenu: boolean = false;
  allTickets: Ticket[] = [];
  currentPage = 1;
  itemsPerPage = 20;
  headerTitle: string = 'All Service Requests'; // Initialize header title
  showBackButton: boolean = false; // Initialize back button visibility
  searchQuery: string = '';
  isSearchActive: boolean = false;
  currentUser: string = '';
  currentUserUsername: string= '';
  displayedTickets: string='' ;
  alertMessage: string='';
  showAlertMessage: boolean = false;
  alertTimeout: any;

  constructor(private shService: ShService, private http: HttpClient, private router: Router, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.loadDisplayData();
    this.fetchDisplayData();

    const email = localStorage.getItem('userEmail'); // Get email from local storage
    if (email) {
      this.loadCurrentUserProfile(email);
    } else {
      // console.error('Email not found');
    }
  }

  loadCurrentUserProfile(email: string): void {
    this.profileService.getCurrentUserProfile(email).subscribe(
        profile => {

          this.currentUser = profile.Name;
          this.currentUserUsername = profile.Username;
        },
        error => {
          // console.error('Error fetching current user profile:', error);
        }
    );
  }


  loadDisplayData(): void {
    this.shService.getDisplayData().subscribe(
        (data: any) => {
          this.displayData = data;
        },
        (error: any) => {
          // console.error('Error fetching display data:', error);
        }
    );
  }


  fetchDisplayData(): void {
    this.loading = true;
    this.getDisplayData().subscribe(
        data => {
          this.allTickets = this.sortByDateDesc(data);
          // this.assignUniqueRequestIds();
          this.updateDisplayData();
          this.formatDates(); // Format dates here
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
    );
  }

  formatDates(): void {
    this.allTickets.forEach(ticket => {
      if (ticket.startDate) {
        ticket.startDate = this.formatDate(ticket.startDate);
      }
      if (ticket.endDate) {
        ticket.endDate = this.formatDate(ticket.endDate);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
  }

  updateDisplayData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayData = this.allTickets.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }

  getTotalPages() {
    return Math.ceil(this.allTickets.length / this.itemsPerPage);
  }

  getDisplayData(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('https://hms-v2-b.onrender.com/displaydata');
  }

  // Sorting method to sort tickets by requestDate in descending order
  sortByDateDesc(data: Ticket[]): Ticket[] {
    return data.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  }

  // Method to show alert with a timeout
  showAlert(message: string, duration: number = 1000) {
    this.alertMessage = message;
    this.showAlertMessage = true;
    setTimeout(() => {
      this.showAlertMessage = false;
    }, duration);
  }


  //Tickets for last 7 days
  filterTicketsForLast7Days() {
    const currentDate = new Date();
    // Set time to midnight for both today and seven days ago
    const beginningOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    // const beginningOfSevenDaysAgo = new Date(currentDate.getTime() - 6 * 24 * 60 * 60 * 1000); // Seven days ago from midnight
    const beginningOfSevenDaysAgo = new Date(beginningOfToday.getTime() - 6 * 24 * 60 * 60 * 1000);

    // Filter tickets requested between beginningOfSevenDaysAgo and beginningOfToday
    const filteredTickets = this.allTickets.filter((ticket: Ticket) => {
      const ticketDate = new Date(ticket.requestDate);
      return ticketDate >= beginningOfSevenDaysAgo && ticketDate <= currentDate;
    });
    this.allTickets = filteredTickets; // Update allTickets with filtered data
    this.headerTitle = 'Tickets for Last 7 Days';
    this.showBackButton = true; // Show back button
    this.currentPage = 1; // Reset to the first page
    this.updateDisplayData();

    if (this.allTickets.length === 0) {
      this.alertMessage = 'No tickets found for the last 7 days.';
      this.setAlertTimeout(); // Set timeout for alert message
    } else {
      this.alertMessage = ''; // Clear alert message if tickets are found
    }
  }

  filterTicketsAssignedToMe() {
    // Check if allTickets has been populated
    if (!this.allTickets || this.allTickets.length === 0) {
      this.showAlert('No tickets found to filter.');
      return;
    }

    //here
    // Ensure currentUserUsername is defined
    if (!this.currentUserUsername) {
      // console.error('Current user username is not set.');
      return;
    }

    this.allTickets = this.allTickets.filter(ticket => ticket.assignedTo === this.currentUserUsername);

    if (this.allTickets.length === 0) {
      this.alertMessage = 'No tickets assigned to you.';
      this.setAlertTimeout(); // Set timeout for alert message
    } else {
      this.alertMessage = '';
    }

    this.headerTitle = 'Tickets Assigned to Me'; // Update header title
    this.showBackButton = true; // Show back button
    this.currentPage = 1;
    this.updateDisplayData();
  }


  filterTicketsNew() {
    this.allTickets = this.allTickets.filter(ticket => ticket.status === 'New');
    this.headerTitle = 'New Tickets'; // Update header title
    this.showBackButton = true; // Show back button
    this.currentPage = 1;
    this.updateDisplayData();

    if (this.allTickets.length === 0) {
      this.alertMessage = 'No new tickets found.';
      this.setAlertTimeout(); // Set timeout for alert message
    } else {
      this.alertMessage = '';
    }
  }


  filterTicketsInProgress() {
    this.allTickets = this.allTickets.filter(ticket => ticket.status === 'In Progress');
    this.headerTitle = 'Tickets In Progress'; // Update header title
    this.showBackButton = true; // Show back button
    this.currentPage = 1;
    this.updateDisplayData();

    if (this.allTickets.length === 0) {
      this.alertMessage = 'No tickets in progress found.';
      this.setAlertTimeout(); // Set timeout for alert message
    } else {
      this.alertMessage = ''; // Clear alert message if tickets are found
    }
  }

  filterOverdueTickets() {
    //get the current date
    const currentDate = new Date();

    // Check if allTickets has been populated
    if (!this.allTickets || this.allTickets.length === 0) {
      return;
    }

    // Filter tickets where request date is more than 3 days ago and status is new
    this.allTickets = this.allTickets.filter(ticket => {
      const requestDate = new Date(ticket.requestDate);
      const timeDifference = currentDate.getTime() - requestDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference > 3 && ticket.status === 'New';
    });

    // Update header title and other properties
    this.headerTitle = 'Overdue Tickets'; // Update header title
    this.showBackButton = true; // Show back button
    this.currentPage = 1;
    this.updateDisplayData();

    if (this.allTickets.length === 0) {
      this.alertMessage = 'No overdue tickets found.';
      this.setAlertTimeout(); // Set timeout for alert message
    } else {
      this.alertMessage = ''; // Clear alert message if tickets are found
    }
  }

  setAlertTimeout() {
    // Clear previous timeout if exists
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    // Set new timeout to clear alert message after 5 seconds (5000 milliseconds)
    this.alertTimeout = setTimeout(() => {
      this.alertMessage = '';
    }, 7000); // Adjust the duration as needed (5 seconds in this example)
  }

  closeAlert() {
    // Clear timeout when alert is manually closed
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
      this.alertMessage = ''; // Clear the alert message immediately
    }
  }

  openTicketDetails(ticket: any): void {
    // this.selectedTicket = ticket;
    this.router.navigate(['/ticket-details', ticket.requestId], {state: {ticket}});
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  goToProfile() {
    this.showProfileMenu = false;
    this.router.navigate(['/profile']); // Adjust the route to your profile page
  }

  logout() {
    this.showProfileMenu = false;
    // Implement your logout logic here, such as clearing user session, tokens, etc.
    this.router.navigate(['']); // Adjust the route to your login page
  }

  backToAllServiceRequests() {
    if (this.isSearchActive) {
      this.isSearchActive = false;
      this.searchQuery = '';
      this.fetchDisplayData();
    } else {
      this.fetchDisplayData();
      this.headerTitle = 'All Service Requests';
      this.showBackButton = false;
    }
  }

  onSearchButtonClick() {
    this.filterTicketsBySearchQuery();
  }

  filterTicketsBySearchQuery() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      this.displayData = this.allTickets.filter(ticket => {
        return Object.values(ticket).some(value =>
            value !== null && value !== undefined && value.toString().toLowerCase().includes(query)
        );
      });
      this.isSearchActive = true; // Set search state to active
    } else {
      this.updateDisplayData();
      this.isSearchActive = false;
    }
    this.currentPage = 1; // Reset to the first page
  }
}