var axios = require('axios');
var data = JSON.stringify({
  "messages": [
    {
      "channel": "sms",
      "recipients": [
        "+918960434188",
        "+918960434188"
      ],
      "content": "Greetings from D7 API",
      "msg_type": "text",
      "data_coding": "text"
    }
  ],
  "message_globals": {
    "originator": "SignOTP",
    "report_url": "https://the_url_to_recieve_delivery_report.com"
  }
});

var config = {
  method: 'post',
  url: 'https://api.d7networks.com/messages/v1/send',
  headers: { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYmRlN2RhYjgtNTZkYS00Y2M1LWJlMzQtMTA3NjkxZTYyOGJjIn0.Be7KsTiC78KpbjysVkJynsQJvnf6-aU_rn_TFAFR_p4'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});