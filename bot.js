const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
// @znayka_gpt_bot bot name

// Handle /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to the OpenAI chatbot! By rostyslav dzhohola');
});
bot.onText(/\/surprise/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Sorry, this feature is not implemented yet.');
});
bot.onText(/\/date/, (msg) => {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  bot.sendMessage(msg.chat.id, `Today's date is: ${date}`);
});
// Handle messages mentioning the bot
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ensure text is defined before checking for mentions
  if (text && (text.includes('@znayka_gpt_bot') || text.includes('всезнайка'))) {
    console.log("processing...");
    bot.sendChatAction(chatId, 'typing');

    const query = text.replace('@znayka_gpt_bot', '').replace('всезнайка', '').trim();
    const prompt = `Відповідай українською мовою на наступне запитання: ${query}`;

    try {
      // Send a placeholder message
      const placeholderMessage = await bot.sendMessage(chatId, 'думаю 🤔...');

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });

      const reply = response.data.choices[0].message.content.trim();
      // Edit the placeholder message with the actual response
      bot.editMessageText(reply, { chat_id: chatId, message_id: placeholderMessage.message_id });
    } catch (error) {
      bot.sendMessage(chatId, 'Error processing your request.');
      console.error(error);
    }
  }
});
