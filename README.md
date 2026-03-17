# Twitter Servers Clone
This Twitter server clone is a modular backend application designed to handle the core data operations of a social media platform. By leveraging a persistent database, the system allows for the seamless creation, retrieval, updating, and deletion of both user profiles and their corresponding messages.
The architecture is built around a clean separation of concerns, ensuring that every interaction—from registering a new account to editing a live tweet—is processed reliably and stored securely.

The project is structured using a modular export pattern, where specific methods and endpoints are organized into dedicated files using module.exports. This approach keeps the codebase highly maintainable and allows for easy scaling of the API.
By mapping each CRUD operation to a clear endpoint, the server provides a robust foundation for any frontend client looking to implement real-time social networking features like user management and message history.

# Starting and using the app
Once the dependencies are installed via npm install, the user can launch the program using npm start. After the registration process is completed, the user remains logged in thanks to the implementation of cookies, allowing them to start tweeting immediately. Users have full control over their content with the ability to edit or delete their posts at any time. Additionally, the system provides the flexibility to logout or completely remove their digital footprint by deleting both their account tracks and their messages.

<img width="1913" height="778" alt="image" src="https://github.com/user-attachments/assets/92b9275f-b61c-4b3c-a966-88bb3139c20c" />
