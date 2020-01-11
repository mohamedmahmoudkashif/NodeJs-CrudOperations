'use strict';


var helper = {};

/**
 * @author Mohamed Kashif
 * @description Validate the password and email format
 * @param {regular expression} reg 
 * @param {String} str
 * @returns Boolean 
 */
helper.regCheck = (reg, str) => {

	if (reg.test(str)) {
		return true;
	} else {
		return false;
	}
}

module.exports = helper;