const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
// @znayka_gpt_bot bot name

// Allowed group and user IDs from environment variables
const allowedGroupId = process.env.ALLOWED_GROUP_ID;
const allowedUserIds = process.env.ALLOWED_USER_ID.split(',');

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Ласкаво просимо до чат-бота OpenAI!');
});

// Handle /help command
/**
 * Start of Selection
 */
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Команди:\n/start - Почати\n/help - Допомога\n/userId - Отримати ваш ID\nПоставте питання, зазначивши @znayka_gpt_bot');
});
/**
 * End of Selection
 */

bot.onText(/\/userId/, (msg) => {
  const userId = msg.from.id;

  bot.sendMessage(userId, `Chat ID: ${userId}`);
});

// Handle messages mentioning the bot
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  // Ensure the message is from the allowed group or user
  if (chatId.toString() !== allowedGroupId && !allowedUserIds.includes(userId.toString())) {
    return;
  }

  // Ensure text is defined before checking for mentions
  if (text && (text.includes('@znayka_gpt_bot') || text.includes('всезнайка'))) {
    bot.sendChatAction(chatId, 'typing');

    const query = text.replace('@znayka_gpt_bot', '').replace('всезнайка', '').trim();
    const prompt = `Відповідай українською мовою на наступне повідомлення: ${query}`;

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
