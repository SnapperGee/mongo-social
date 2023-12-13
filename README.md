# Mongo Social

Collection of API endpoints for a social network application.

## Endpoints

### Users

A user can be interacted with via the following endpoints.

#### `/api/users`

- A **GET** request to this endpoint gets all users.
- A **POST** request to this endpoint will create a new user.
  - the request body `username` and `email` properties set the respective properties of the created user.

#### `/api/users/:id`

- A **GET** request to this endpoint get's the user with the ID provided via the request URL `id` parameter.
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

- A **GET** request to this endpoint get's the thought with the ID provided via the request URL `id` parameter.
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
