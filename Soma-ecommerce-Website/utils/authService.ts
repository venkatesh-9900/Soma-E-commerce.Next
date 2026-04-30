export const authService = {
  login: async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) return reject(new Error('Fields cannot be empty'));
        resolve({ user: { email } });
      }, 1500);
    });
  },
  
  register: async (username: string, email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password || !username) return reject(new Error('Fields cannot be empty'));
        resolve({ user: { email, username } });
      }, 1500);
    });
  },

  forgotPassword: async (email: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email) return reject(new Error('Email is required'));
        resolve({ success: true, message: 'OTP Sent' });
      }, 1000);
    });
  },

  verifyOtp: async (otp: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp.length !== 4) return reject(new Error('Invalid OTP Length'));
        if (otp !== '1234' && otp !== '0000') {
          return reject(new Error('Invalid OTP Code. (Try 1234)'));
        }
        resolve({ success: true });
      }, 1200);
    });
  },

  resetPassword: async (newPassword: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newPassword.length < 6) return reject(new Error('Password must be at least 6 characters'));
        resolve({ success: true });
      }, 1500);
    });
  },

  googleSignIn: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: { email: 'google_user@example.com' } });
      }, 1000);
    });
  }
};
