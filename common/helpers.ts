// utils/helpers.ts
export const Helpers = {
  // Capitalize first letter of a string
  capitalize: (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Format number as currency
  formatCurrency: (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  // Format date as readable string
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', options);
  },

  // Truncate text with ellipsis
  truncate: (text: string, length = 50) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '...' : text;
  },

  // Generate random ID
  generateId: (length = 8) => {
    return Math.random().toString(36).substr(2, length);
  },

  // Convert string to lowercase
  lowerCase: (str: string) => str.toLowerCase(),

  // Convert string to uppercase
  upperCase: (str: string) => str.toUpperCase(),
};
