import { UserLogin } from "../interfaces/UserLogin";

// const login = async (userInfo: UserLogin) => {
//   // TODO: make a POST request to the login route
// }

// export { login };

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem('jwt', data.token);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    return { success: false, message: 'Server Error' };
  }
};

export { login };
