// const login = async (userInfo) => {
//     try {
//         const response = await fetch('http://localhost:3001/auth', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userInfo),
//         });
        
//         const data = await response.json();
        
//         console.log('Response Status:', response.status);
//         console.log('Response Data:', data);

//         if (response.ok) {
//             // Store the token in localStorage
//             localStorage.setItem('jwt', data.token);
//             return { success: true };
//         }
//         else {
//             return { success: false, message: data.message };
//         }
//     }
//     catch (err) {
//         return { success: false, message: 'Server Error' };
//     }
// };

const login = async (userInfo) => {
    try {
        const response = await fetch('http://localhost:3001/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        // Check if response is empty before trying to parse JSON
        const textResponse = await response.text(); // Get the raw response body as text
        let data;

        // Try parsing the text response as JSON
        try {
            data = JSON.parse(textResponse);
        } catch (err) {
            console.error("Failed to parse response as JSON:", err);
            return { success: false, message: 'Invalid JSON response from server' };
        }

        console.log('Response Status:', response.status);
        console.log('Response Data:', data);

        if (response.ok) {
            // Check for the expected structure in the response
            if (data && data.token) {
                // Store the token in localStorage
                localStorage.setItem('jwt', data.token);
                return { success: true };
            } else {
                const errorToken = await response.text();  // get the error message if available                
                console.error('Error from server/token:', errorToken);
                return { success: false, message: 'Missing token in response' };
            }        
        } else {
            // return { success: false, message: data.message };
            // Handle non-2xx status codes (like 500, 404)
            const errorText = await response.text();  // get the error message if available
            console.error('Error from server:', errorText);
            return { success: false, message: 'Login failed. Please try again.' };            
        }

    } catch (err) {
        console.error('Error during login:', err);
        return { success: false, message: 'Server Error' };
    }
};

export { login };
