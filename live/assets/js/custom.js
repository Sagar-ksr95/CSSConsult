
    async function sendUserMail(email, name) {

      const apiKeyPublic = '7aafbf98fee7df4f47a7812f6a37d381';
      const apiKeyPrivate = 'ffbb6c09da133dec18bdf696bdbd5ae4';
      const url = 'https://api.mailjet.com/v3.1/send';
      const templateID = 4978081;

      const data = {
        Messages: [
          {
            From: {
              Email: 'hello@hirewithcss.com',
              Name: 'Team CSS'
            },
            To: [
              {
                Email: email,
                Name: name
              }
            ],
            TemplateID: templateID,
            TemplateLanguage: true,
            Subject: 'Thank You for Contacting Us!',
            Variables: {
              name: name
            }
          }
        ]
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${apiKeyPublic}:${apiKeyPrivate}`)}`
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Mailjet API Response:', responseData);
        } else {
          console.error('Mailjet API Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }




    async function sendAdminMail(name,usermail,message) {

        const apiKeyPublic = '7aafbf98fee7df4f47a7812f6a37d381';
        const apiKeyPrivate = 'ffbb6c09da133dec18bdf696bdbd5ae4';
        const url = 'https://api.mailjet.com/v3.1/send';
        const templateID = 4978135;
  
        const data = {
          Messages: [
            {
              From: {
                Email: 'hello@hirewithcss.com',
                Name: 'Team CSS'
              },
              To: [
                {
                  Email: 'hello@hirewithcss.com',
                  Name: Admin
                }
              ],
              TemplateID: templateID,
              TemplateLanguage: true,
              Subject: 'New Contact Us Inquiry',
              "Variables": {
                "username": name,
                "usermail": usermail,
                "message": message
              }
            }
          ]
        };
  
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${btoa(`${apiKeyPublic}:${apiKeyPrivate}`)}`
            },
            body: JSON.stringify(data)
          });
  
          if (response.ok) {
            const responseData = await response.json();
            console.log('Mailjet API Response:', responseData);
          } else {
            console.error('Mailjet API Error:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }