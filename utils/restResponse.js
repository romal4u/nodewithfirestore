const express = require('express');

/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Romal Patel
 * @since   2020
 */

/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
 exports.success = (msg, result=[]) => {
    let data = {}
    data.code = 200;
    data.success = true;
    data.message = msg;
    data.payload = result;
    return data;
  };
  
  /**
   * @desc    Send any error response
   *
   * @param   {string} message
   * @param   {number} statusCode
   */
  exports.error = (data, statusCode) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
  
    if (!findCode) statusCode = 500;
    else statusCode = findCode;
  
    return {
      code: statusCode,
      success: false,
      message: data
    };
  };
  
  /**
   * @desc    Send any validation response
   *
   * @param   {object | array} errors
   */
  exports.validation = (errors, statusCode=422) => {
    return {
      code: statusCode,
      success: false,
      message: "Validation errors",
      errors
    };
  };