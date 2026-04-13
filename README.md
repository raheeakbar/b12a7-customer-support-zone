1. What is JSX?
   Answer. HTML-like syntax written inside JavaScript. React converts it to regular JS. Makes component structure readable without leaving JS.

2. What is the difference between State and Props?
   Answer. Props - Data passed from parent to child, read only, child cannot change them.
   State - Data the component owns and can change itself using a setter function.

3. What is the useState hook, and how does it work?
   Answer. useState returns two things — a value and a setter function. When the setter is called React re-renders the component with the updated value.

4. How can you share state between components?
   Answer. Lift the state to the closest common parent and pass it down as props. For deeply nested components Context API is used to avoid prop drilling.

5. How is event handling done in React?
   Answer. Same as JS events but camelCase — onClick, onChange, onSubmit. A function reference is passed not a string like in HTML.
