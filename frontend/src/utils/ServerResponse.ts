/**
 * Utility for simulating server responses in the application
 * In a real app, this would be replaced with actual API calls
 */

interface SimulateResponseOptions {
  delay?: number;
  successRate?: number;
  errorMessage?: string;
}

/**
 * Simulates a server response with a configurable delay and success rate
 * @param data The data to be returned on success
 * @param options Configuration options
 * @returns Promise that resolves with the data or rejects with an error
 */
export const simulateResponse = <T>(
  data: T, 
  options: SimulateResponseOptions = {}
): Promise<T> => {
  const { 
    delay = 1000, 
    successRate = 0.95, 
    errorMessage = "An error occurred while processing your request" 
  } = options;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success based on success rate
      if (Math.random() <= successRate) {
        resolve(data);
      } else {
        reject(new Error(errorMessage));
      }
    }, delay);
  });
};

/**
 * Creates form data from an object for sending to the server
 * @param data Object containing form data
 * @returns FormData object
 */
export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    // Skip null or undefined values
    if (value === null || value === undefined) return;
    
    // Handle File objects
    if (value instanceof File) {
      formData.append(key, value);
    } 
    // Handle arrays
    else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } 
    // Handle objects
    else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } 
    // Handle primitives
    else {
      formData.append(key, String(value));
    }
  });
  
  return formData;
};

/**
 * Creates a mock API response based on form data
 * Used for development and testing when backend is not available
 * @param endpoint The API endpoint
 * @param method The HTTP method
 * @param data The form data
 * @returns Promise that resolves with a mock response
 */
export const mockApiCall = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: Record<string, any>
): Promise<any> => {
  // Log the request for debugging
  console.log(`Mock ${method} request to ${endpoint}`, data);
  
  // Create a unique ID for new items
  const id = Math.floor(Math.random() * 1000000);
  
  // Create response data based on the endpoint and method
  let responseData;
  
  if (method === 'POST') {
    responseData = { id, ...data, createdAt: new Date().toISOString() };
  } else if (method === 'PUT') {
    responseData = { ...data, updatedAt: new Date().toISOString() };
  } else if (method === 'DELETE') {
    responseData = { success: true, message: 'Item deleted successfully' };
  } else {
    responseData = { id, ...data };
  }
  
  // Simulate network delay and potential errors
  return simulateResponse(responseData, { 
    delay: 800 + Math.random() * 500,
    successRate: 0.98
  });
}; 