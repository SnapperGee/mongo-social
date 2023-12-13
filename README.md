# Mongo Social

Collection of API endpoints for a social network application.

## Schemas

This application uses MongoDB as the database and Mongoose to interact with it as the ODM. The following schemas are
used.

### User model

```typescript
{
    username: string; // Required, unique, trimmed, and must be at least 1 character
    email: string; // Required, unique, and Validated via validator package isEmail(string) method
    thoughts: Schema.Types.ObjectId[]; // References Thought model
    friends: Schema.Types.ObjectId[]; // References other users
}
```

### Thought model

```typescript
{
    thoughtText: string; // Required, must be between 1 and 280 characters
    user: Schema.Types.ObjectId; // References User model, required. Specifies user Thought is associated with
    reactions: Reaction[]; // References Reaction schema. Reactions to the Thought form other Users
    reactionCount: number;
    createdAt: Date;
    updatedAt: Date;
}
```

### Reaction schema

```typescript
{
    reactionId: Schema.Types.ObjectId; // Alias to _id of Reaction document
    reactionBody: string; // Required, must be no more than 280 characters
    user: Schema.Types.ObjectId; // References User model, required. Specifies user Reaction is associated with
    createdAt: Date;
    updatedAt: Date;
}
```

## Endpoints

### Users

A user can be interacted with via the following endpoints.

#### `/api/users`

- A **GET** request to this endpoint gets all users.
- A **POST** request to this endpoint will create a new user.
  - the request body `username` and `email` properties set the respective properties of the created user.

#### `/api/users/:id`

- A **GET** request to this endpoint gets the user with the ID provided via the request URL `id` parameter.
- A **PUT** request to this endpoint updates the user with the ID provided via the request URL `id` parameter.
  - the request body `username`, `email`, and `thoughts` property update each respective property of the user.
- A **DELETE** request to this endpoint deletes the user with the ID provided via the request URL `id` parameter.

### Thoughts

A user's thoughts can be interacted with via the following endpoints.

#### `/api/thoughts`

- A **GET** request to this endpoint gets all thoughts.
- A **POST** request to this endpoint will create a new thought.
  - the request body `userId` and `thoughtText` properties set the respective properties of the created thought.

#### `/api/thoughts/:id`

- A **GET** request to this endpoint gets the thought with the ID provided via the request URL `id` parameter.
- A **PUT** request to this endpoint updates the thought with the ID provided via the request URL `id` parameter.
  - the request body `user`, `reactions`, and `thoughtText` property update each respective property of the thought.
- A **DELETE** request to this endpoint deletes the thought with the ID provided via the request URL `id` parameter.

### Reactions

A user's thought reactions can be interacted with via the following endpoints.

#### `/api/thoughts/:thoughtId/reactions`

A **POST** request to this endpoint is used to create a reaction:

- the request URL `thoughtId` parameter provides the ID of the Thought the reaction will be associated with.
- the request body `userId` and `reactionBody` properties set the respective properties of the created reaction.

A **DELETE** request to this endpoint is used to delete a reaction:

- the request URL `thoughtId` parameter is used to provide the ID of the Thought the deleted reaction is associated with.
- the request body `reactionId` provides the ID of the reaction to be deleted.

### Friends

A user's friends can be interacted with via the following endpoints.

#### `/users/:userId/friends/:friendId`

A **POST** request to this endpoint is used to add a friend:

- the request URL `userId` parameter provides the ID of the User the friend will be associated with.
- the request URL `friendId` parameter provides the ID of the User to be added as a friend.

A **DELETE** request to this endpoint is used to remove a friend:

- the request URL `userId` parameter provides the ID of the User the friend will be removed from.
- the request URL `friendId` parameter provides the ID of the User to be removed as a friend.

## Examples

Below are links showing the type of requests that can be made to the endpoints and the type of data that's returned.

- GET requests to get all *Users* and *Thoughts* -> [HERE][get-all] <-
- GET requests to get single *User* and *Thought* by ID -> [HERE][get-single] <-
- DELETE request to delete *User* by ID -> [HERE][delete-user] <-
- DELETE request to delete *Thought* by ID -> [HERE][delete-thought] <-
- DELETE request to delete *Reaction* by ID -> [HERE][delete-reaction] <-
- POST requests to create *User*, *Thought*, and *Reaction* -> [HERE][create-user-thought-and-reaction] <-
- POST and DELETE requests to add and delete *Friend* from User -> [HERE][add-and-delete-friend] <-
- PUT request to update *User* -> [HERE][update-user] <-
- PUT request to update *Thought* -> [HERE][update-thought] <-

The source code for this application is written in TypeScript and needs to be built before the database can be seeded.
The video below shows how to compile the source code, seed the database, and start the application via npm package
scripts:

[Build and seed database example](https://drive.google.com/file/d/1czN4xZitbzUuTJzfOIrC5dgtqOKlbray/view?usp=sharing "Build and seed database example")

[get-all]: https://drive.google.com/file/d/1XdGeQhf6KLn32KwlCUYjmXYL8-6f3wD7/view?usp=sharing "Get all Users and Thoughts"
[get-single]: https://drive.google.com/file/d/1UjudtVvCT3TBXvLefU5XTivGREXFb43y/view?usp=sharing "Get single User and Thought"
[delete-user]: https://drive.google.com/file/d/1hxDWARXBT_Mj84_iHu8D8tQhUZNmjq-Q/view?usp=sharing "Delete User"
[delete-thought]: https://drive.google.com/file/d/1FZOQ3sl1Ic6acaZB2YtVVbKo88yJRqI6/view?usp=sharing "Delete Thought"
[delete-reaction]: https://drive.google.com/file/d/1A3y1R0HiHNW3ifL1rGxksneV9ZI-HFrh/view?usp=sharing "Delete Reaction"
[create-user-thought-and-reaction]: https://drive.google.com/file/d/1s9R-B3iizOixT7eDZw-Vm9uWtCClC9pq/view?usp=sharing "Create User, Thought, and Reaction"
[add-and-delete-friend]: https://drive.google.com/file/d/1s5ut0UHtTChN9yMcX5WY2gi05lfrWsjf/view?usp=sharing "Add and Delete Friend"
[update-user]: https://drive.google.com/file/d/1jDjArrSc_RCHPHxhutXzRhoY6AwmiS_k/view?usp=sharing "Update User"
[update-thought]: https://drive.google.com/file/d/1JBzRqaHyJkz09zItza1NG64AnILfIj5v/view?usp=sharing "Update Thought"
