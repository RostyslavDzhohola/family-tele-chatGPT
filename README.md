# Telegram Gpt-4o Bot for My Family

## Description
A Telegram bot using OpenAI and Telegram API.

## Setup Instructions

### Prerequisites
- Node.js >= 14.0.0
- Telegram Bot Token
- OpenAI API Key

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/RostyslavDzhohola/family-tele-chatGPT.git
   cd family-tele-chatGPT
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your credentials:
   ```env
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   OPENAI_API_KEY=your-openai-api-key
   ```

### Running the Bot
Start the bot with:
```sh
npm start
```

### Usage
- `/start` - Welcome message
- `/help` - List of commands
- Mention the bot (`@znayka_gpt_bot` or `всезнайка`) to ask questions.


### Deploying to Heroku
1. Install the Heroku CLI using Homebrew:
   ```sh
   brew tap heroku/brew && brew install heroku
   ```

   - `brew tap heroku/brew`: Adds the Heroku repository to Homebrew.
   - `brew install heroku`: Installs the Heroku CLI.

2. Log in to Heroku:
   ```sh
   heroku login
   ```

3. Create a new Heroku app:
   ```sh
   heroku create
   ```

4. Add your environment variables to Heroku:
   ```sh
   heroku config:set TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   heroku config:set OPENAI_API_KEY=your-openai-api-key
   ```

5. Deploy the app:
   ```sh
   git push heroku main
   ```

6. Scale the worker:
   ```sh
   heroku ps:scale worker=1
   ```

7. Open the app:
   ```sh
   heroku open
   ```

### Note
These instructions are tailored for macOS users. If you are using a different operating system, please refer to the appropriate installation instructions for the Heroku CLI on the [Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-cli).
