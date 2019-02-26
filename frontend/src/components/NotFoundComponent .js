import React from 'react';
import { Alert } from 'antd';

function NotFoundComponent (){

	return  <Alert
	message="Error 404"
	description="Sorry this page is not found"
	type="error"
	showIcon
  />
}

export default NotFoundComponent;