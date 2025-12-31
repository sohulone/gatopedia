import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CatApi, Breed } from '../../services/cat-api';
import { CAT_AVATARS } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  
  catAvatars = CAT_AVATARS;
  breeds = signal<Breed[]>([]);
  isLoadingBreeds = signal<boolean>(false);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    favoriteBreed: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required),
  }, { validators: this.passwordMatchValidator });

  constructor(
    private authService: AuthService,
    private catApi: CatApi,
    private router: Router
  ) {}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.isLoadingBreeds.set(true);
    this.catApi.getBreeds().subscribe({
      next: (breeds) => {
        this.breeds.set(breeds);
        this.isLoadingBreeds.set(false);
      },
      error: () => {
        this.isLoadingBreeds.set(false);
        this.errorMessage.set('Error al cargar las razas');
      }
    });
  }

  selectAvatar(avatar: string): void {
    this.registerForm.patchValue({ avatar });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const { confirmPassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData as any).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.successMessage.set(response.message);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage.set(response.message);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al registrar usuario');
      }
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword.set(!this.showPassword());
    } else {
      this.showConfirmPassword.set(!this.showConfirmPassword());
    }
  }
}
