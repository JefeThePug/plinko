# Plinko Game

This project is a physics-based Plinko game created using the [Matter.js](https://brm.io/matter-js/) physics engine and the p5.js library. 
Players drop balls into a pegboard and aim to achieve the highest score by strategically placing balls to hit score zones.

## Features

- **Physics Simulation**: Utilizes Matter.js to simulate realistic collisions, gravity, and object interactions.
- **Interactive Gameplay**: Players can drop up to 5 balls per round by clicking or pressing keys.
- **Score System**: Dynamic scoring based on ball positions.
- **Tilt Mechanic**: Introduces a "tilt" effect for added challenge or to unlodge stuck balls, triggered via keypress.
- **Responsive Graphics**: Vibrant visuals created with p5.js, including custom pegs, balls, and background imagery.
- **Sound Effects**: Engaging audio feedback using custom piano sounds for peg hits, spanning a musical octave.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JefeThePug/plinko.git
   ```
2. Ensure you have the necessary libraries:
   - [p5.js](https://p5js.org/)
   - [Matter.js](https://brm.io/matter-js/)
3. Place your assets (images and sound files) in the `/assets` directory:
   - Background image (`bg.jpg`)
   - Ball image (`ball.png`)
   - Sound effects (`1.wav`, `2.wav`, ..., `8.wav`)
   - Scoreball images (`0.png`, `1.png`, ..., `5.png`)
4. Open `index.html` in a browser to play.

## How to Play

1. **Starting the Game**:
   - Click anywhere at the top of the canvas to drop a ball.
   - or Use the spacebar to drop a ball at the mouse's current position.

2. **Scoring**:
   - Balls interact with pegs and land in goal zones at the bottom.
   - Each zone has a specific score, hidden during gameplay.
   - Achieve high scores by landing in high-value zones.

3. **Special Features**:
   - Press `SHIFT` to activate the tilt mechanic and nudge balls slightly.
   - Press `B` to trigger a bonus event (mostly used for debugging).

4. **Resetting**:
   - Drop 5 balls to complete the round and view your score.
   - Click anywhere to reset the game.

## Project Structure

- **Game Logic**:
  - `Particle`: Represents the balls dropped by the player.
  - `Plinko`: Pegs that balls interact with to change their paths.
  - `Boundary`: Borders and obstacles, including buckets and walls.
  - `Score`: Manages the scoring system and bonus logic.
- **Event Handling**:
  - Collisions between objects trigger specific actions, such as scoring or sound effects.
- **Graphics and Assets**:
  - All visuals are dynamically rendered using p5.js.
  - Audio feedback enhances player engagement.

## Future Improvements

- **Customization**: Add options to adjust board size, peg layout, or scoring rules.
- **Leaderboards**: Integrate a high-score system for competitive play.
- **Mobile Compatibility**: Optimize controls for touch devices.
- **Advanced Physics**: Introduce more complex interactions like spinning or moving pegs.

## Acknowledgments

- Built with [Matter.js](https://brm.io/matter-js/) for physics simulation.
- Graphics and interactivity powered by [p5.js](https://p5js.org/).

## License

This project is licensed under the [MIT License](LICENSE).
