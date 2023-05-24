# Answers

1. How long time did you end up spending on this coding test?

I spent about 2-3 hours

2. Explain why you chose the code structure(s) you used in your solution. 
3. What would you add to your solution if you had more time? This question is especially important if you did not spend much time on the coding test - use this as an opportunity to explain what your solution is missing.

The project needed some way to store the simulation parameters. Therefore there needed to be some simulation state that could be manipulated as the car is being controlled. The simulationState does that job. Why I chose using getters and setters is because there had to be an ability to reassign values. If the simulationState was a variable object changed directly, the values stored would point back to the original source that is subsequently manipulated. This results in the history having the same values. This structure with setters and getters also provides some readability.

What is lacking is input validation and error handling. If a user decides to put in an invalid number, the simulator will not move the car and always return a successfull simulation. To achieve this I would likely create som prompt function with a validator. The handle any errors given by the validator, one could wrap the function in a try catch inside a while loop that retries of there is an invalid input.

Regarding the history, there was no need for an extensive solution with hard typing at the moment. If there would be additional complexity to the project, one could consider adding the same keys to all history events. Since the project was limited by time there were no such limitation as it made the history more modular and easy to work with.

4. What did you think of this recruitment test?
I think it was a fun small project. There is room for improvement but also an easy quick solution that does not require much time.
