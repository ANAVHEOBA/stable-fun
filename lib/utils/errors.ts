export const getErrorMessage = (error: any): string => {
    if (error.code === 6000) return "Name too short";
    if (error.code === 6001) return "Symbol too short";
    if (error.code === 6002) return "Invalid amount";
    if (error.code === 6003) return "Invalid currency";
    if (error.code === 6004) return "Insufficient collateral";
    if (error.code === 6005) return "Invalid oracle price";
    return "An unexpected error occurred";
  };