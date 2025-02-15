document.addEventListener('DOMContentLoaded', () => {
    // Get forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Get password toggle buttons
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    // Add password toggle functionality
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;
            const remember = loginForm.querySelector('#remember').checked;

            // Validate input
            if (!validateEmail(email)) {
                showError('الرجاء إدخال بريد إلكتروني صحيح');
                return;
            }

            if (password.length < 6) {
                showError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                return;
            }

            try {
                // Here you would typically make an API call to your backend
                // For now, we'll just simulate a successful login
                await simulateLogin({ email, password, remember });
                
                // Redirect to home page after successful login
                window.location.href = 'index.html';
            } catch (error) {
                showError(error.message);
            }
        });
    }

    // Registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fullName = registerForm.querySelector('#fullName').value;
            const email = registerForm.querySelector('#email').value;
            const phone = registerForm.querySelector('#phone').value;
            const password = registerForm.querySelector('#password').value;
            const confirmPassword = registerForm.querySelector('#confirmPassword').value;
            const terms = registerForm.querySelector('#terms').checked;

            // Validate input
            if (fullName.length < 3) {
                showError('الرجاء إدخال اسم صحيح');
                return;
            }

            if (!validateEmail(email)) {
                showError('الرجاء إدخال بريد إلكتروني صحيح');
                return;
            }

            if (!validatePhone(phone)) {
                showError('الرجاء إدخال رقم هاتف صحيح');
                return;
            }

            if (password.length < 6) {
                showError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                return;
            }

            if (password !== confirmPassword) {
                showError('كلمات المرور غير متطابقة');
                return;
            }

            if (!terms) {
                showError('يجب الموافقة على الشروط والأحكام');
                return;
            }

            try {
                // Here you would typically make an API call to your backend
                // For now, we'll just simulate a successful registration
                await simulateRegistration({ fullName, email, phone, password });
                
                // Show success message and redirect to login page
                alert('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
                window.location.href = 'login.html';
            } catch (error) {
                showError(error.message);
            }
        });
    }

    // Utility functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        // Basic phone validation - can be adjusted based on your requirements
        const re = /^[0-9+\-\s]{8,}$/;
        return re.test(phone);
    }

    function showError(message) {
        // You could implement a more sophisticated error display
        alert(message);
    }

    // Simulated API calls
    async function simulateLogin(credentials) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate basic validation
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
            return true;
        } else {
            throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
    }

    async function simulateRegistration(userData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate email check
        if (userData.email === 'test@example.com') {
            throw new Error('البريد الإلكتروني مستخدم بالفعل');
        }
        
        return true;
    }
});
