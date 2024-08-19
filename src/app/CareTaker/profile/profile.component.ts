import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProfileService} from "../services/pf-service/profile.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  isEditing: boolean = false;

  editProfileForm: FormGroup;

  constructor(private fb: FormBuilder, private profileService: ProfileService,
              private route: ActivatedRoute) {
    this.editProfileForm = this.fb.group({
      username: [''],
      email: [''],
      name: [''],
      phone: [''],
      address: [''],
      bio: ['']
    });
  }

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail'); // Get email from local storage
    if (email) {
      this.loadProfile(email);
    } else {
      console.error('Email not found');
    }
  }

  loadProfile(email: string): void {
    this.profileService.getProfile(email).subscribe(
      data => {
        this.userProfile = data;
        this.editProfileForm.patchValue({
          username: data.Username,
          email: data.EmailAddress,
          name: data.Name,
          phone: data.MobileNumber,
          address: data.Address,
          bio: data.Bio
        });
      },
      error => {
        console.error('Error fetching profile', error);
      }
    );
  }

  editProfile() {
    this.isEditing = true;
  }

  closeModal() {
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      this.profileService.updateProfile(this.editProfileForm.value).subscribe(
        data => {
          this.userProfile = data;
          this.isEditing = false;
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}