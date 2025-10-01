1 Requirements
Create a basic web application using the following technology stack:
• Technology - React with Typescript (https://create-react-app.dev/docs/adding-typescript/)
• State management - Redux and redux-toolkit (https://redux-toolkit.js.org/introduction/getting-started)
• HTTP client (optional) - e.g. Axios (https://github.com/axios/axios)
• UI Library (optional) - e.g. Antd (https://ant.design/components/overview/)
• Router - react-router (https://reactrouter.com/)
• Backend - JSONPlaceholder API (https://jsonplaceholder.typicode.com/guide/)
2 Users list
GET https://jsonplaceholder.typicode.com/users
GET https://jsonplaceholder.typicode.com/users/:userId
• Use the public JSONPlaceholder API to fetch and display 10 users on the home page of the application
• Display the users as a vertical list of collapsible sections
• Expanded users should be editable
• Add basic input validation - username, email, address.street, address.suite, and address.city are
mandatory
• Implement cancel/revert and submit buttons (should only be active when changes are made)
• Add a button ’See posts’ that redirects to a new page
3 User posts
GET https://jsonplaceholder.typicode.com/posts?userId=X
• Display the user details at the top of the page (information should be editable as on the home page)
• Fetch and display a list of posts for the given user id
• Posts should be editable and deletable through the JSONPlaceholder API - use a confirmation popup for
the delete functionality
4 Tasks
GET https://jsonplaceholder.typicode.com/todos
• Create a separate /tasks route
• Fetch and display a list of tasks - use HTML table with basic pagination of page size 10
• Allow filtering by task status (completed or not completed), title and owner (user)
• Implement functionality for changing the status of a task - changes should persist through searches
5 Notes
• Use functional components
• Cover empty, error and loading states
• Aim for a simple but good-looking UI