export class ApiResponse {
  static success(data, message = 'Success') {
    return {
      success: true,
      message,
      data
    }
  }

  static error(message, statusCode = 400) {
    return {
      success: false,
      message,
      statusCode
    }
  }
} 