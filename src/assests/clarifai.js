const raw = JSON.stringify({
    user_app_id: {
          user_id: "6ue986vwo8oh",
          app_id: "40866775378e41b09daccea1d96e2128"
      },
    inputs: [
      {
        data: {
          image: {
            url: "https://media.istockphoto.com/photos/group-portrait-of-a-creative-business-team-standing-outdoors-three-picture-id1146473249?k=20&m=1146473249&s=612x612&w=0&h=9Ki3nKs4Su-_YRMc6__iuWnHLhpp58ULOsz4l9PT6tw="
          }
        }
      }
    ]
  });
  
  export const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key 4d6a22fc42294ca89a144005005b3b4a'
    },
    body: raw
  };