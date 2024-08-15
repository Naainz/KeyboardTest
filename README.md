# Typing Speed Test

A web-based typing speed test application that allows users to measure their typing speed in words per minute (WPM). The application features a dynamic typing interface, a countdown timer, and a smooth transition to display the final WPM score at the end of the test.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Typing Interface**: A real-time typing interface that highlights correct and incorrect characters.
- **Countdown Timer**: A faint countdown timer that begins when the user starts typing and counts down from 30 seconds.
- **Dynamic Word List**: A comprehensive word list including fruits, animals, objects, places, adjectives, verbs, colors, emotions, and weather-related words.
- **WPM Calculation**: Accurate calculation of words per minute based on the number of words typed correctly during the test.
- **Smooth Transitions**: The typing test smoothly fades out after completion, and a card displaying the WPM score fades in.
- **Responsive Design**: The application is designed to be responsive and works on various screen sizes.

## Demo

You can see a live demo of the project [here](#). (Replace with your actual demo link)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Naainz/KeyboardTest.git
cd KeyboardTest
```

2. Open the `index.html` file in your browser to run the application.

## Usage

1. Press every button on the keyboard to start the test.
2. Type the words displayed on the screen as fast as you can.
3. The timer will start when you begin typing.
4. After 30 seconds, the test will end, and your WPM score will be displayed.

## Project Structure

typing-speed-test/
│
├── assets/
│   ├── styles.css         # Main stylesheet for the application
│   └── script.js          # Main JavaScript file for the application logic
│
├── index.html             # Main HTML file for the application
└── README.md              # Project documentation (this file)

## Customization

You can customize the typing test by modifying the array `words= [...]` in the `wpm.js` file. You can add or remove words from the list to suit your preferences.

## License

This project is licensed under the [MIT License](LICENSE).