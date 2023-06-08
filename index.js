import dotenv from 'dotenv'
import { Telegraf } from 'telegraf';
dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start(async (ctx) => {
    console.log(ctx)
    await ctx.reply(`Привет, ${ctx.from.first_name}`);
});
bot.hears('/party', async (ctx) => {

    const chatId = ctx.message.chat.id;

    await ctx.sendMessage('Началась сосисочная вечеринка, успей сделать заказ!', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Сделать заказ', web_app: {url: `https://magnificent-strudel-ccb39f.netlify.app?chatid=${chatId}`}}],
            ]
        }
    });
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));