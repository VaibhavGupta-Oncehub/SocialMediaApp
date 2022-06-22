# SocialMediaApp

The SocialMedia Platform is an interactive application where users can share their ideas and thoughts through their posts, chat with other users , like or dislike the posts of other users, comment on their friend’s posts, add or remove friends and edit their profile details with ease.

![image](https://user-images.githubusercontent.com/98082102/174983001-5c5c3d14-f676-44be-82b4-0e4d2f698f6e.png)


## Project Stack

1. Front End - React
2. Backend - ruby on rails
3. Api testing tool- Postman
4. Database- sqlite3

## Features 
The SocialMedia Platform comes with a lot of features . Each of them is demonstrated below:

1. Devise Authentication System

The SocialMedia Platform provides devise authentication for users to securely sign and sign up the platform. Each Password of the user is encrypted using devise gem.  The platform also provides features like confirmation mail before signing in , lock the account of users on password failure , timeout and remember session of the users.

In the web-browser, a cookie is installed that maintains the details of the current logged in user. Cookie is deleted whenever the user is logged out of the session using **simple_token_authentication** gem. The login system is demonstrated below:

   https://user-images.githubusercontent.com/98082102/174989359-136445b4-d90e-48b3-b076-81308a5cd71f.mp4
   
  2. Share your ideas and thoughts through posts:
     
Users can create, update and delete their posts. Each Post can contain title,description and images of multiple types. Other users that are your friend can also     view your posts. This is demonstrated below:

   https://user-images.githubusercontent.com/98082102/175019171-d0296ac7-292b-4eb2-beb0-4f7a17cc31a8.mp4

  3. Add Friends to your user profile:

Users can send friend Requests to other people who have active accounts on this platform. Once the request has been accepted by the other user, you can view their profile and posts. This is demonstrated below:
    
   https://user-images.githubusercontent.com/98082102/175022515-14ae158f-9f17-4fac-9ef7-6a141327f64f.mp4

  4. Block/Remove your current friends:
Users can block/remove their existing friends.When a friend is blocked then the blocked friend cannot view your profile and posts. This is demonstrated below: 

   https://user-images.githubusercontent.com/98082102/175024573-ab9e0fa5-d6d4-4a9c-b424-e97ccb229128.mp4
   
 5. Chat with your friends:
A user can chat with his/her friends. This functionality was implemented without using webhooks so users have to refresh the page each time when they receive a message from another user. This is demonstrated below:
    
   https://user-images.githubusercontent.com/98082102/175026398-15256dd6-f94b-4cc5-987f-05f1a1874b81.mp4


  6. Comments :
Users can comment on their own post and their friend's posts. Users can also reply to the comments of their own or other users. Users can edit and delete their own comments. This is demonstrated below:

   https://user-images.githubusercontent.com/98082102/175029564-12e94c48-dcf8-45d3-ab1f-766aa6328380.mp4

    
   7. Like/DisLike:
Users can like/dislike their own and their friend’s posts. Like/Dislike is only counted once and model backed. This is demonstrated below: 

   https://user-images.githubusercontent.com/98082102/175030489-b3560343-7a92-4aab-b113-f7fa44029af3.mp4


  8. Edit User Profile:
Users can edit his/her profile details. This is demonstrated below:

   https://user-images.githubusercontent.com/98082102/175032361-13a65fc8-e842-47b4-8dc1-1292538278ee.mp4




   




