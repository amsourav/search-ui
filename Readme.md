Approach
---------

I used React to implement the task

1. When user focuses on the inpout field and starts typing, I listen for two events
    
    - `onKeyUp`: This event only listens for navigation, enter and escape keys to interact with the page
    - `onChange`: This event listens for changes in text on the input filed makes call to an API to get sugesstions

2. Once sugesstions is received, I store it in the state. Since the state changes, the `Search` component is re-rendered.

3. The sugesstions list is rendered if the `callApi` function gives a non-empty result.

4. If the user presses `->, <-, up, down` keys `onKeyUp` gets triggered and updates the input field and appends a space at the end

5. If user presses `enter` or `escape` the sugesstions list is hidden and input changed if applicable